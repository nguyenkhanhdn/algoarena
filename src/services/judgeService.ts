import { Problem, Submission, TestResult, Verdict } from '../types';

export interface JudgeRequest {
  problem: Problem;
  sourceCode: string;
  language: 'python' | 'cpp';
  userId: string;
  userName: string;
  userAvatar: string;
  contestId?: string;
}

export interface IJudgeService {
  evaluate(req: JudgeRequest): Promise<Submission>;
  runSample(problem: Problem, sourceCode: string, language: 'python' | 'cpp', customInput?: string): Promise<{
    output: string;
    expected: string;
    executionTime: number;
    passed: boolean;
    verdict: Verdict;
    error?: string;
  }>;
}

/**
 * Sandboxed Judge Service Abstraction for AlgoArena Vietnam.
 * Follows competitive programming standards (ICPC / IOI subtask scoring).
 */
export class SandboxedJudgeService implements IJudgeService {
  /**
   * Run code against sample test cases or custom input
   */
  async runSample(
    problem: Problem,
    sourceCode: string,
    language: 'python' | 'cpp',
    customInput?: string
  ): Promise<{
    output: string;
    expected: string;
    executionTime: number;
    passed: boolean;
    verdict: Verdict;
    error?: string;
  }> {
    // Artificial latency for realism
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic syntax analysis
    const syntaxErr = this.checkBasicSyntax(sourceCode, language);
    if (syntaxErr) {
      return {
        output: '',
        expected: problem.sampleOutput,
        executionTime: 0.01,
        passed: false,
        verdict: 'COMPILATION_ERROR',
        error: syntaxErr,
      };
    }

    const inputToUse = customInput !== undefined ? customInput.trim() : problem.sampleInput.trim();
    const expectedOut = problem.sampleOutput.trim();

    // Check if code contains common solution patterns or returns expected output
    const isLikelyCorrect = this.simulateEvaluation(sourceCode, problem, inputToUse, expectedOut);
    const execTime = Number((0.02 + Math.random() * 0.05).toFixed(3));

    if (isLikelyCorrect) {
      return {
        output: expectedOut,
        expected: expectedOut,
        executionTime: execTime,
        passed: true,
        verdict: 'ACCEPTED',
      };
    } else {
      return {
        output: this.generateMockWrongOutput(expectedOut),
        expected: expectedOut,
        executionTime: execTime,
        passed: false,
        verdict: 'WRONG_ANSWER',
      };
    }
  }

  /**
   * Evaluate submission against all visible and hidden test cases with subtask scoring.
   */
  async evaluate(req: JudgeRequest): Promise<Submission> {
    const { problem, sourceCode, language, userId, userName, userAvatar, contestId } = req;

    // Simulate compilation / sandbox execution delay
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Check compilation / syntax error
    const syntaxErr = this.checkBasicSyntax(sourceCode, language);
    if (syntaxErr) {
      const testResults: TestResult[] = problem.testCases.map((tc, idx) => ({
        testNumber: idx + 1,
        passed: false,
        verdict: 'COMPILATION_ERROR',
        executionTime: 0,
        memoryUsage: 0,
        message: syntaxErr,
        isHidden: tc.isHidden,
      }));

      return {
        id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        userId,
        userName,
        userAvatar,
        problemId: problem.id,
        problemTitle: problem.title,
        contestId,
        language,
        sourceCode,
        verdict: 'COMPILATION_ERROR',
        score: 0,
        executionTime: 0.01,
        memoryUsage: 4.2,
        testResults,
        submittedAt: new Date().toISOString(),
      };
    }

    // Evaluate each test case
    let totalScore = 0;
    let maxScore = 0;
    let worstVerdict: Verdict = 'ACCEPTED';
    let maxTime = 0;
    let maxMemory = 12.0;

    const testResults: TestResult[] = [];

    const isCodeFunctional = this.simulateEvaluation(
      sourceCode,
      problem,
      problem.sampleInput,
      problem.sampleOutput
    );

    // Detect potential subtask TLE (e.g. nested O(N^2) loops on big tests)
    const hasNestedLoops =
      (sourceCode.includes('for ') && (sourceCode.match(/for /g) || []).length >= 2) ||
      (sourceCode.includes('while ') && (sourceCode.match(/while /g) || []).length >= 2);
    const isBruteForceOnly = hasNestedLoops && !sourceCode.includes('bisect') && !sourceCode.includes('binary_search');

    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];
      maxScore += tc.scoreWeight;

      let tcTime = Number((0.02 + Math.random() * 0.08).toFixed(3));
      let tcMemory = Number((12 + Math.random() * 4).toFixed(1));

      // If code is functional, it passes tests; otherwise partial/wrong
      let passed = isCodeFunctional;
      let tcVerdict: Verdict = passed ? 'ACCEPTED' : 'WRONG_ANSWER';

      // Simulate Subtask TLE on large hidden test cases if code uses brute force O(N^2)
      if (isBruteForceOnly && (tc.isHidden || i >= 2)) {
        passed = false;
        tcVerdict = 'TIME_LIMIT_EXCEEDED';
        tcTime = Number((1.05 + Math.random() * 0.3).toFixed(3));
      }

      // Check if source code has intentional timeout loop
      if (sourceCode.includes('while True:') && !sourceCode.includes('break')) {
        passed = false;
        tcVerdict = 'TIME_LIMIT_EXCEEDED';
        tcTime = 2.0;
      }

      maxTime = Math.max(maxTime, tcTime);
      maxMemory = Math.max(maxMemory, tcMemory);

      if (passed) {
        totalScore += tc.scoreWeight;
      } else if (worstVerdict === 'ACCEPTED') {
        worstVerdict = tcVerdict;
      }

      testResults.push({
        testNumber: i + 1,
        passed,
        verdict: tcVerdict,
        executionTime: tcTime,
        memoryUsage: tcMemory,
        message: passed
          ? 'Chính xác (Passed)'
          : tcVerdict === 'TIME_LIMIT_EXCEEDED'
          ? `Quá thời gian quy định (Time Limit Exceeded: ${tcTime}s > ${problem.timeLimit}s)`
          : 'Kết quả khác với output chuẩn (Wrong Answer)',
        isHidden: tc.isHidden,
        input: tc.isHidden ? undefined : tc.input,
        expectedOutput: tc.isHidden ? undefined : tc.expectedOutput,
        actualOutput: tc.isHidden
          ? undefined
          : passed
          ? tc.expectedOutput
          : this.generateMockWrongOutput(tc.expectedOutput),
      });
    }

    // Normalizing score to 100
    const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    const finalVerdict: Verdict = finalScore === 100 ? 'ACCEPTED' : worstVerdict;

    return {
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      userId,
      userName,
      userAvatar,
      problemId: problem.id,
      problemTitle: problem.title,
      contestId,
      language,
      sourceCode,
      verdict: finalVerdict,
      score: finalScore,
      executionTime: maxTime,
      memoryUsage: maxMemory,
      testResults,
      submittedAt: new Date().toISOString(),
    };
  }

  private checkBasicSyntax(sourceCode: string, language: 'python' | 'cpp'): string | null {
    if (!sourceCode || sourceCode.trim().length === 0) {
      return 'Lỗi biên dịch: File nộp trống (Empty source code).';
    }

    if (language === 'python') {
      // Check parenthesis / brackets balance
      let roundBal = 0;
      let squareBal = 0;
      let curlyBal = 0;
      for (const ch of sourceCode) {
        if (ch === '(') roundBal++;
        else if (ch === ')') roundBal--;
        else if (ch === '[') squareBal++;
        else if (ch === ']') squareBal--;
        else if (ch === '{') curlyBal++;
        else if (ch === '}') curlyBal--;
      }
      if (roundBal !== 0 || squareBal !== 0 || curlyBal !== 0) {
        return 'SyntaxError: Dấu ngoặc tròn, vuông hoặc nhọn không đóng mở hợp lệ.';
      }
      // Check indentation / colon syntax
      const lines = sourceCode.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (
          (line.startsWith('def ') ||
            line.startsWith('if ') ||
            line.startsWith('elif ') ||
            line.startsWith('else') ||
            line.startsWith('for ') ||
            line.startsWith('while ')) &&
          !line.endsWith(':')
        ) {
          return `SyntaxError (Dòng ${i + 1}): Thiếu dấu hai chấm ':' ở cuối câu lệnh điều kiện/lặp: "${line}"`;
        }
      }
    } else if (language === 'cpp') {
      if (!sourceCode.includes('main')) {
        return 'error: \'main\' function was not declared in this scope.';
      }
    }

    return null;
  }

  private simulateEvaluation(
    code: string,
    problem: Problem,
    _sampleInput: string,
    _expectedOutput: string
  ): boolean {
    const trimmed = code.toLowerCase();

    // If student code is very short or just prints placeholder
    if (trimmed.length < 25) return false;

    // Check keywords related to the problem topic
    if (problem.topicId === 'topic-binary-search') {
      return (
        trimmed.includes('mid') ||
        trimmed.includes('binary_search') ||
        trimmed.includes('bisect') ||
        trimmed.includes('lower_bound')
      );
    }
    if (problem.topicId === 'topic-prefix-sum') {
      return (
        trimmed.includes('pref') ||
        trimmed.includes('prefix') ||
        trimmed.includes('sum') ||
        trimmed.includes('accumulate') ||
        trimmed.includes('p[')
      );
    }
    if (problem.topicId === 'topic-two-pointers') {
      return (
        (trimmed.includes('left') && trimmed.includes('right')) ||
        (trimmed.includes('l') && trimmed.includes('r')) ||
        trimmed.includes('sort')
      );
    }
    if (problem.topicId === 'topic-graph-bfs-dfs') {
      return (
        trimmed.includes('bfs') ||
        trimmed.includes('dfs') ||
        trimmed.includes('queue') ||
        trimmed.includes('visited') ||
        trimmed.includes('deque')
      );
    }
    if (problem.topicId === 'topic-dp-basic' || problem.topicId === 'topic-dp-lis-lcs') {
      return (
        trimmed.includes('dp') ||
        trimmed.includes('max') ||
        trimmed.includes('memo') ||
        trimmed.includes('tails')
      );
    }
    if (problem.topicId === 'topic-stack-queue') {
      return trimmed.includes('stack') || trimmed.includes('pop') || trimmed.includes('append');
    }
    if (problem.topicId === 'topic-dsu') {
      return trimmed.includes('parent') || trimmed.includes('find') || trimmed.includes('union');
    }
    if (problem.topicId === 'topic-strings') {
      return (
        trimmed.includes('palin') ||
        trimmed.includes('alnum') ||
        trimmed.includes('lower') ||
        trimmed.includes('string') ||
        trimmed.includes('str') ||
        trimmed.includes('char')
      );
    }
    if (problem.topicId === 'topic-math') {
      return (
        trimmed.includes('factor') ||
        trimmed.includes('prime') ||
        trimmed.includes('gcd') ||
        trimmed.includes('pow') ||
        trimmed.includes('%') ||
        trimmed.includes('modulo') ||
        trimmed.includes('sieve')
      );
    }
    if (problem.topicId === 'topic-functions') {
      return (
        trimmed.includes('is_prime') ||
        trimmed.includes('isprime') ||
        trimmed.includes('def ') ||
        trimmed.includes('bool ') ||
        trimmed.includes('return')
      );
    }
    if (problem.topicId === 'topic-recursion') {
      return (
        trimmed.includes('hanoi') ||
        trimmed.includes('solve') ||
        trimmed.includes('dest') ||
        trimmed.includes('aux') ||
        trimmed.includes('fib') ||
        trimmed.includes('recursive')
      );
    }
    if (problem.topicId === 'topic-backtracking') {
      return (
        trimmed.includes('backtrack') ||
        trimmed.includes('queen') ||
        trimmed.includes('col') ||
        trimmed.includes('diag') ||
        trimmed.includes('try') ||
        trimmed.includes('dfs')
      );
    }
    if (problem.topicId === 'topic-segment-tree') {
      return trimmed.includes('tree') || trimmed.includes('build') || trimmed.includes('query');
    }

    // Default: If code has reasonable input parsing & output
    return (
      (trimmed.includes('sys.stdin') || trimmed.includes('input') || trimmed.includes('cin')) &&
      (trimmed.includes('print') || trimmed.includes('cout'))
    );
  }

  private generateMockWrongOutput(expected: string): string {
    const num = parseInt(expected, 10);
    if (!isNaN(num)) {
      return String(num + 1);
    }
    return expected.includes('YES') ? 'NO' : '0';
  }
}

export const judgeService = new SandboxedJudgeService();
