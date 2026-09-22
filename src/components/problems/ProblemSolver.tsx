import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Award,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Eye,
  FileCode,
  HardDrive,
  Lightbulb,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Terminal,
  XCircle,
  Zap,
  Bot,
} from 'lucide-react';
import { judgeService } from '../../services/judgeService';
import { storageService } from '../../services/storageService';
import { Problem, Submission, Verdict } from '../../types';
import { AICoachPanel } from './AICoachPanel';
import { DiscussionForum } from './DiscussionForum';
import { StressTestEngine } from './StressTestEngine';

interface ProblemSolverProps {
  problem: Problem;
  onBack: () => void;
  onSelectOtherProblem?: (slug: string) => void;
}

const DEFAULT_PYTHON_TEMPLATE = `# AlgoArena Vietnam - Template Python 3
import sys

def solve():
    # Nhập dữ liệu nhanh chuẩn thi đấu
    input_data = sys.stdin.read().split()
    if not input_data:
        return
        
    # Code của bạn ở đây
    # Ví dụ: n = int(input_data[0])
    pass

if __name__ == "__main__":
    solve()
`;

const DEFAULT_CPP_TEMPLATE = `// AlgoArena Vietnam - Template C++ 20
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Tối ưu I/O cho kỳ thi HSG / VNOI
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Code của bạn ở đây
    
    return 0;
}
`;

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  problem,
  onBack,
  onSelectOtherProblem,
}) => {
  const [activeTab, setActiveTab] = useState<
    'statement' | 'hints' | 'aicoach' | 'editorial' | 'discussion' | 'stresstest' | 'submissions'
  >('statement');
  const [language, setLanguage] = useState<'python' | 'cpp'>('python');
  const [sourceCode, setSourceCode] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(14);
  const [isRunningTest, setIsRunningTest] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sampleRunResult, setSampleRunResult] = useState<{
    output: string;
    expected: string;
    executionTime: number;
    passed: boolean;
    verdict: Verdict;
    error?: string;
  } | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copiedSample, setCopiedSample] = useState<boolean>(false);
  const [copiedEditorialCode, setCopiedEditorialCode] = useState<boolean>(false);
  const [editorialUnlocked, setEditorialUnlocked] = useState<boolean>(false);

  const editorTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved draft or default template
  useEffect(() => {
    const draftKey = `draft_${problem.id}_${language}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setSourceCode(savedDraft);
    } else {
      setSourceCode(language === 'python' ? DEFAULT_PYTHON_TEMPLATE : DEFAULT_CPP_TEMPLATE);
    }

    setIsBookmarked(storageService.isBookmarked(problem.id));
    setSampleRunResult(null);
    setCurrentSubmission(null);
  }, [problem.id, language]);

  // Auto-save draft
  const handleCodeChange = (newCode: string) => {
    setSourceCode(newCode);
    const draftKey = `draft_${problem.id}_${language}`;
    localStorage.setItem(draftKey, newCode);
  };

  // Keyboard tab indentation handling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = sourceCode.substring(0, start) + '    ' + sourceCode.substring(end);
      setSourceCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    // Ctrl+Enter or Cmd+Enter to Run Sample
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunSample();
    }
  };

  const handleToggleBookmark = () => {
    const nextState = storageService.toggleBookmark('PROBLEM', problem.id, problem.title);
    setIsBookmarked(nextState);
  };

  const handleLoadSolution = () => {
    if (language === 'python' && problem.solutionPython) {
      handleCodeChange(problem.solutionPython);
    } else if (language === 'cpp' && problem.solutionCpp) {
      handleCodeChange(problem.solutionCpp);
    } else {
      handleCodeChange(language === 'python' ? DEFAULT_PYTHON_TEMPLATE : DEFAULT_CPP_TEMPLATE);
    }
  };

  const handleRunSample = async () => {
    setIsRunningTest(true);
    setSampleRunResult(null);
    try {
      const result = await judgeService.runSample(problem, sourceCode, language);
      setSampleRunResult(result);
    } finally {
      setIsRunningTest(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSampleRunResult(null);
    try {
      const user = storageService.getCurrentUser();
      const sub = await judgeService.evaluate({
        problem,
        sourceCode,
        language,
        userId: user.id,
        userName: user.fullName,
        userAvatar: user.avatar,
      });

      storageService.recordSubmission(sub);
      setCurrentSubmission(sub);
      setActiveTab('submissions');

      // Trigger celebration if Accepted
      if (sub.verdict === 'ACCEPTED') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const recentSubmissions = storageService.getSubmissions({ problemId: problem.id });

  // Get line numbers
  const lineCount = Math.max(sourceCode.split('\n').length, 18);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-[#0f0f12] text-zinc-100 overflow-hidden">
      {/* Top Header Bar */}
      <div className="h-12 border-b border-[#27272a] bg-[#141418] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-xs px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition"
          >
            ← Danh sách bài
          </button>
          <div className="h-4 w-px bg-zinc-700" />
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 truncate">
            {problem.title}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                problem.difficulty === 'BEGINNER'
                  ? 'bg-blue-900/60 text-blue-300'
                  : problem.difficulty === 'EASY'
                  ? 'bg-emerald-900/60 text-emerald-300'
                  : problem.difficulty === 'MEDIUM'
                  ? 'bg-amber-900/60 text-amber-300'
                  : 'bg-rose-900/60 text-rose-300'
              }`}
            >
              {problem.difficulty} • {problem.rating}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded transition text-xs flex items-center gap-1 border ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-zinc-700'
            }`}
            title="Lưu dấu trang"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBookmarked ? 'Đã lưu' : 'Lưu bài'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Statement, Editorial, Submissions */}
        <div className="lg:col-span-6 flex flex-col border-r border-[#27272a] bg-[#121215] overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-[#27272a] bg-[#18181c] px-2 overflow-x-auto">
            {[
              { id: 'statement', label: 'Đề bài', icon: FileCode },
              { id: 'aicoach', label: 'AI Coach', icon: Bot, isHighlight: true },
              { id: 'hints', label: 'Gợi ý', icon: Lightbulb },
              { id: 'editorial', label: 'Lời giải', icon: Eye },
              { id: 'discussion', label: 'Thảo luận', icon: MessageSquare },
              { id: 'stresstest', label: 'Stress Test', icon: Zap },
              { id: 'submissions', label: `Lịch sử (${recentSubmissions.length})`, icon: Award },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition ${
                    activeTab === t.id
                      ? 'border-emerald-500 text-emerald-400 bg-[#121215]'
                      : (t as any).isHighlight
                      ? 'border-transparent text-emerald-400 hover:text-emerald-300 font-semibold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                  {(t as any).isHighlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 p-5 overflow-y-auto text-sm leading-relaxed space-y-5">
            {activeTab === 'statement' && (
              <>
                {/* Meta Constraints Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    Giới hạn thời gian:{' '}
                    <span className="font-semibold text-zinc-200">{problem.timeLimit}s</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
                    Giới hạn bộ nhớ:{' '}
                    <span className="font-semibold text-zinc-200">{problem.memoryLimit}MB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    Chủ đề:{' '}
                    <span className="font-semibold text-emerald-400">{problem.topicTitle}</span>
                  </div>
                </div>

                {/* Problem Statement */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Đề bài
                  </h4>
                  <div className="text-zinc-200 whitespace-pre-line leading-relaxed">
                    {problem.statement}
                  </div>
                </div>

                {/* Input Format */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Đầu vào (Input)
                  </h4>
                  <div className="text-zinc-300 text-xs bg-[#18181c] p-3 rounded-lg border border-zinc-800 whitespace-pre-line font-mono">
                    {problem.inputFormat}
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Đầu ra (Output)
                  </h4>
                  <div className="text-zinc-300 text-xs bg-[#18181c] p-3 rounded-lg border border-zinc-800 whitespace-pre-line font-mono">
                    {problem.outputFormat}
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Ràng buộc (Constraints)
                  </h4>
                  <div className="text-amber-300/90 text-xs bg-amber-950/20 p-3 rounded-lg border border-amber-900/30 whitespace-pre-line font-mono">
                    {problem.constraints}
                  </div>
                </div>

                {/* Sample Test Case */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Ví dụ minh họa
                    </h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(problem.sampleInput);
                        setCopiedSample(true);
                        setTimeout(() => setCopiedSample(false), 1500);
                      }}
                      className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedSample ? 'Đã sao chép' : 'Sao chép Input'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="bg-[#0c0c0e] p-3 rounded-lg border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block mb-1 uppercase">Sample Input</span>
                      <pre className="text-emerald-400 whitespace-pre-wrap">{problem.sampleInput}</pre>
                    </div>
                    <div className="bg-[#0c0c0e] p-3 rounded-lg border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block mb-1 uppercase">Sample Output</span>
                      <pre className="text-blue-400 whitespace-pre-wrap">{problem.sampleOutput}</pre>
                    </div>
                  </div>
                  {problem.sampleExplanation && (
                    <div className="mt-2 text-xs text-zinc-400 italic bg-zinc-900/40 p-2.5 rounded border border-zinc-800">
                      💡 Giải thích: {problem.sampleExplanation}
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40">
                  <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Gợi ý giải thuật (Hints)
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Hãy thử tự suy nghĩ trong ít nhất 15-20 phút trước khi mở gợi ý hoặc xem lời giải.
                  </p>
                </div>
                {problem.hints && problem.hints.length > 0 ? (
                  problem.hints.map((h, i) => (
                    <div key={i} className="p-3.5 bg-zinc-900/70 border border-zinc-800 rounded-lg text-xs text-zinc-200">
                      <span className="font-bold text-emerald-400 mr-1.5">Gợi ý {i + 1}:</span>
                      {h}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-400">Chưa có gợi ý thêm cho bài tập này.</p>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4">
                {!editorialUnlocked ? (
                  <div className="text-center p-8 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <Eye className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-zinc-200 text-sm mb-1">
                      Lời giải chi tiết & Phân tích Thuật toán
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                      Bạn có chắc chắn muốn xem lời giải? Tự mình suy nghĩ và tìm ra bug sẽ giúp tư duy thuật toán tiến bộ nhanh nhất.
                    </p>
                    <button
                      onClick={() => setEditorialUnlocked(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition"
                    >
                      Tôi muốn mở khóa Lời giải
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-xs text-zinc-200 space-y-2">
                      <span className="font-bold text-emerald-300 block text-sm">
                        💡 Phân tích ý tưởng thuật toán chuẩn:
                      </span>
                      <p className="leading-relaxed">
                        {problem.editorial || 'Thuật toán tối ưu sử dụng cấu trúc dữ liệu và kỹ thuật tương ứng với chủ đề.'}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-900/40">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                          Thời gian: O({problem.timeLimit <= 1 ? 'N log N' : 'N'})
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                          Bộ nhớ: O(N)
                        </span>
                      </div>
                    </div>

                    {/* Python Solution */}
                    {problem.solutionPython && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                          <span>Mã nguồn tham khảo Python 3:</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(problem.solutionPython || '');
                              setCopiedEditorialCode(true);
                              setTimeout(() => setCopiedEditorialCode(false), 1500);
                            }}
                            className="hover:text-zinc-200 flex items-center gap-1 text-[11px]"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedEditorialCode ? 'Đã sao chép' : 'Sao chép Python'}
                          </button>
                        </div>
                        <pre className="p-3 bg-black/60 rounded-lg border border-zinc-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                          {problem.solutionPython}
                        </pre>
                      </div>
                    )}

                    {/* C++ Solution */}
                    {problem.solutionCpp && (
                      <div className="space-y-1">
                        <span className="text-xs text-zinc-400 font-mono block">
                          Mã nguồn tham khảo C++ 20:
                        </span>
                        <pre className="p-3 bg-black/60 rounded-lg border border-zinc-800 text-xs font-mono text-blue-300 overflow-x-auto">
                          {problem.solutionCpp}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'aicoach' && (
              <div className="h-full">
                <AICoachPanel
                  problem={problem}
                  sourceCode={sourceCode}
                  language={language}
                  lastVerdict={currentSubmission?.verdict || sampleRunResult?.verdict}
                  lastTestError={sampleRunResult?.error}
                  onApplyCodeSnippet={(snippet) => setSourceCode(snippet)}
                />
              </div>
            )}

            {activeTab === 'discussion' && (
              <DiscussionForum problemId={problem.id} />
            )}

            {activeTab === 'stresstest' && (
              <StressTestEngine problem={problem} sourceCode={sourceCode} language={language} />
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase">
                  Lịch sử nộp bài ({recentSubmissions.length})
                </h4>
                {recentSubmissions.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">Bạn chưa nộp bài lần nào cho bài toán này.</p>
                ) : (
                  recentSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 rounded-lg border border-zinc-800 bg-[#16161a] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            sub.verdict === 'ACCEPTED'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {sub.verdict === 'ACCEPTED' ? 'AC 100/100' : `${sub.verdict} (${sub.score}đ)`}
                        </span>
                        <span className="text-zinc-400 uppercase font-mono">{sub.language}</span>
                        <span className="text-zinc-400">
                          {new Date(sub.submittedAt).toLocaleTimeString('vi-VN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
                        <span>{sub.executionTime}s</span>
                        <span>{sub.memoryUsage}MB</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Runner Panel */}
        <div className="lg:col-span-6 flex flex-col bg-[#141418] overflow-hidden">
          {/* Editor Header */}
          <div className="h-10 border-b border-[#27272a] bg-[#1a1a1f] px-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'python' | 'cpp')}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2 py-1 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
              >
                <option value="python">Python 3 (CPython)</option>
                <option value="cpp">C++ 20 (GCC 13)</option>
              </select>

              {/* Font Size Selector */}
              <select
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2 py-1 font-mono text-xs"
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLoadSolution}
                className="px-2 py-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition flex items-center gap-1"
                title="Tải lời giải tham khảo vào trình soạn thảo"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Nạp Code Mẫu</span>
              </button>
              <button
                onClick={() => handleCodeChange(language === 'python' ? DEFAULT_PYTHON_TEMPLATE : DEFAULT_CPP_TEMPLATE)}
                className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition"
                title="Khôi phục template mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Workspace */}
          <div className="flex-1 flex overflow-hidden bg-[#0d0d10] font-mono relative">
            {/* Line Numbers */}
            <div className="w-12 py-3 bg-[#0a0a0d] border-r border-[#222226] text-right pr-2 text-zinc-600 select-none text-xs">
              {lineNumbers.map((n) => (
                <div key={n} style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}>
                  {n}
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={editorTextareaRef}
              value={sourceCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
              className="flex-1 p-3 bg-transparent text-emerald-300 font-mono resize-none focus:outline-none focus:ring-0 selection:bg-emerald-900 selection:text-white"
              placeholder="# Gõ code thuật toán tại đây..."
            />
          </div>

          {/* Execution Result Drawer (Sample Run or Submission Verdict) */}
          {(sampleRunResult || currentSubmission) && (
            <div className="h-44 border-t border-[#27272a] bg-[#111114] p-3 overflow-y-auto text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Kết quả kiểm thử
                </span>
                <button
                  onClick={() => {
                    setSampleRunResult(null);
                    setCurrentSubmission(null);
                  }}
                  className="text-zinc-400 hover:text-zinc-200 text-xs"
                >
                  ✕ Đóng
                </button>
              </div>

              {/* Sample Run Output */}
              {sampleRunResult && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        sampleRunResult.passed
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {sampleRunResult.verdict}
                    </span>
                    <span className="text-zinc-400">Thời gian: {sampleRunResult.executionTime}s</span>
                  </div>

                  {sampleRunResult.error ? (
                    <div className="p-2 bg-rose-950/40 border border-rose-900 text-rose-300 rounded text-xs">
                      {sampleRunResult.error}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                        <span className="text-[10px] text-zinc-400 block">Output của bạn:</span>
                        <pre className="text-zinc-200 whitespace-pre-wrap">{sampleRunResult.output}</pre>
                      </div>
                      <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                        <span className="text-[10px] text-zinc-400 block">Output chuẩn (Expected):</span>
                        <pre className="text-emerald-400 whitespace-pre-wrap">{sampleRunResult.expected}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Official Submission Verdict */}
              {currentSubmission && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded font-bold text-xs ${
                          currentSubmission.verdict === 'ACCEPTED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-rose-950 text-rose-300 border border-rose-700'
                        }`}
                      >
                        {currentSubmission.verdict === 'ACCEPTED'
                          ? '✅ ACCEPTED (100/100)'
                          : `❌ ${currentSubmission.verdict} (${currentSubmission.score}/100)`}
                      </span>
                      <span className="text-zinc-400">Thời gian: {currentSubmission.executionTime}s</span>
                      <span className="text-zinc-400">Bộ nhớ: {currentSubmission.memoryUsage}MB</span>
                    </div>
                  </div>

                  {/* Subtask Test Case Breakdown */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2">
                    {currentSubmission.testResults.map((tr) => (
                      <button
                        key={tr.testNumber}
                        type="button"
                        onClick={() => setSelectedTestCaseIdx(tr.testNumber)}
                        className={`p-2 rounded border text-center transition cursor-pointer hover:scale-102 ${
                          selectedTestCaseIdx === tr.testNumber ? 'ring-2 ring-emerald-400' : ''
                        } ${
                          tr.passed
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                            : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                        }`}
                      >
                        <div className="text-[10px] font-bold">
                          Test #{tr.testNumber} {tr.isHidden ? '(Ẩn)' : ''}
                        </div>
                        <div className="text-xs font-semibold">{tr.passed ? 'PASSED' : 'FAILED'}</div>
                        <div className="text-[9px] text-zinc-400">{tr.executionTime}s</div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Test Case Detailed Inspector */}
                  {selectedTestCaseIdx !== null && (
                    <div className="mt-3 p-3 bg-zinc-900 border border-zinc-700 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-xs pb-1 border-b border-zinc-800">
                        <span className="font-bold text-zinc-200">
                          Chi tiết Test Case #{selectedTestCaseIdx}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedTestCaseIdx(null)}
                          className="text-zinc-400 hover:text-zinc-200 text-xs"
                        >
                          Đóng
                        </button>
                      </div>

                      {(() => {
                        const tr = currentSubmission.testResults.find(
                          (t) => t.testNumber === selectedTestCaseIdx
                        );
                        if (!tr) return null;

                        if (tr.isHidden) {
                          return (
                            <div className="p-2.5 bg-zinc-950 rounded text-xs text-zinc-400 border border-zinc-800 space-y-1">
                              <p className="text-amber-400 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Bộ test đánh giá bí mật (Hidden Subtask)
                              </p>
                              <p className="text-[11px] leading-relaxed">
                                Nhằm đảm bảo tính bảo mật và mô phỏng chuẩn kỳ thi HSG Quốc gia / Tin học trẻ, nội dung chi tiết của test ẩn không được hiển thị công khai.
                              </p>
                              <div className="flex gap-4 pt-1 text-[11px]">
                                <span>Trạng thái: <strong className={tr.passed ? 'text-emerald-400' : 'text-rose-400'}>{tr.verdict}</strong></span>
                                <span>Thời gian chạy: <strong>{tr.executionTime}s</strong></span>
                                <span>Bộ nhớ: <strong>{tr.memoryUsage}MB</strong></span>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-2 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2 bg-black/50 rounded border border-zinc-800">
                                <span className="text-[10px] text-zinc-400 block mb-0.5">Dữ liệu vào (Input):</span>
                                <pre className="text-zinc-200 font-mono text-[11px]">
                                  {tr.input || problem.sampleInput}
                                </pre>
                              </div>
                              <div className="p-2 bg-black/50 rounded border border-zinc-800">
                                <span className="text-[10px] text-zinc-400 block mb-0.5">Kết quả của bạn (Output):</span>
                                <pre className={tr.passed ? 'text-emerald-300 font-mono text-[11px]' : 'text-rose-400 font-mono text-[11px]'}>
                                  {tr.actualOutput || (tr.passed ? problem.sampleOutput : '0')}
                                </pre>
                              </div>
                            </div>

                            {!tr.passed && (
                              <div className="p-2 bg-rose-950/30 rounded border border-rose-900/50">
                                <span className="text-[10px] text-rose-300 block mb-0.5 font-bold">
                                  Kết quả chuẩn ban giám khảo mong đợi (Expected):
                                </span>
                                <pre className="text-emerald-300 font-mono text-[11px]">
                                  {tr.expectedOutput || problem.sampleOutput}
                                </pre>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Editor Action Bottom Bar */}
          <div className="h-14 border-t border-[#27272a] bg-[#17171b] px-4 flex items-center justify-between shrink-0">
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span>Nhấn <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 text-[10px]">Ctrl + Enter</kbd> để chạy test</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRunSample}
                disabled={isRunningTest || isSubmitting}
                className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-200 text-xs font-medium rounded-lg transition flex items-center gap-1.5 border border-zinc-700"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                {isRunningTest ? 'Đang chạy test...' : 'Chạy thử Sample'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isRunningTest}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-emerald-950"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Đang chấm bài...' : 'Nộp bài (Submit)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
