export type Role = 'STUDENT' | 'TEACHER' | 'SUPER_ADMIN';

export type Difficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';

export type Verdict =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'JUDGING';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  role: Role;
  studentProfile?: StudentProfile;
  teacherProfile?: TeacherProfile;
}

export interface StudentProfile {
  school: string;
  className: string;
  province: string;
  grade: number; // 8, 9, 10, 11, 12
  target: string; // 'HSG Tỉnh Bảng A' | 'Tin học trẻ Bảng B' | 'Olympic 30/4'
  rating: number;
  currentStreak: number;
  longestStreak: number;
  problemsSolved: number;
  totalSubmissions: number;
  weakTopics: string[];
  strongTopics: string[];
  joinedDate: string;
}

export interface TeacherProfile {
  school: string;
  department: string;
  specialization: string;
  managedClasses: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  badge: string;
  topicsCount: number;
  totalProblemsCount: number;
}

export interface Topic {
  id: string;
  pathId: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  order: number;
  lessonsCount: number;
  problemsCount: number;
  icon: string;
  levelBadge: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | 'Chuyên sâu';
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  order: number;
  objectives: string[];
  prerequisites: string[];
  content: string; // Markdown formatted in Vietnamese
  pseudocode?: string;
  samplePython?: string;
  sampleCpp?: string;
  timeComplexity: string;
  spaceComplexity: string;
  commonMistakes: string[];
  contestTips: string[];
  visualizerType?: 'BINARY_SEARCH' | 'TWO_POINTERS' | 'SORTING' | 'GRAPH_BFS' | 'PREFIX_SUM' | 'STACK';
  relatedProblemIds: string[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  scoreWeight: number;
}

export interface Problem {
  id: string;
  topicId: string;
  topicTitle: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  rating: number; // 800 - 2000
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  sampleExplanation?: string;
  hints?: string[];
  editorial?: string;
  solutionPython?: string;
  solutionCpp?: string;
  timeLimit: number; // seconds
  memoryLimit: number; // MB
  tags: string[];
  totalSubmissions: number;
  acceptedSubmissions: number;
  testCases: TestCase[];
}

export interface TestResult {
  testNumber: number;
  passed: boolean;
  verdict: Verdict;
  executionTime: number; // seconds
  memoryUsage: number; // MB
  message?: string;
  isHidden: boolean;
  input?: string;
  expectedOutput?: string;
  actualOutput?: string;
}

export interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  problemId: string;
  problemTitle: string;
  contestId?: string;
  language: 'python' | 'cpp';
  sourceCode: string;
  verdict: Verdict;
  score: number; // 0 - 100
  executionTime: number;
  memoryUsage: number;
  testResults: TestResult[];
  submittedAt: string;
}

export interface ContestProblem {
  problemId: string;
  problemCode: string; // 'A' | 'B' | 'C' | 'D'
  title: string;
  points: number;
}

export interface ContestParticipant {
  userId: string;
  fullName: string;
  avatar: string;
  school: string;
  score: number;
  penalty: number;
  rank: number;
  submissions: Record<string, { solved: boolean; attempts: number; timeMinutes: number }>;
}

export interface Contest {
  id: string;
  title: string;
  slug?: string;
  description: string;
  startTime: string;
  endTime?: string;
  durationMins: number;
  isOfficial?: boolean;
  rules?: string;
  format?: 'ICPC' | 'IOI';
  problems: ContestProblem[];
  participants: ContestParticipant[];
  status: 'UPCOMING' | 'RUNNING' | 'ENDED';
  registeredCount?: number;
  problemCodes?: string[];
}

export interface Bookmark {
  id: string;
  userId: string;
  itemType: 'LESSON' | 'PROBLEM' | 'ALGORITHM' | 'EDITORIAL';
  itemId: string;
  title: string;
  note?: string;
  tags: string[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  badgeIcon: string;
  category: 'SOLVING' | 'STREAK' | 'CONTEST' | 'MASTERY';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface VisualizerStep {
  stepIndex: number;
  array: number[];
  pointers: { name: string; index: number; color: string }[];
  highlightLine: number;
  explanation: string;
  stateDescription?: string;
  auxiliary?: any;
}

export interface ProblemComment {
  id: string;
  problemId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: Role;
  content: string;
  createdAt: string;
  likes: number;
  codeSnippet?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  className: string;
  assignedBy: string; // Teacher name
  deadline: string;
  problemIds: string[];
  totalPoints: number;
  status: 'ACTIVE' | 'CLOSED';
}

export interface AssignmentSubmission {
  assignmentId: string;
  studentId: string;
  studentName: string;
  problemResults: Record<string, { solved: boolean; score: number }>;
  totalScore: number;
  submittedAt: string;
  status: 'SUBMITTED' | 'LATE' | 'PENDING';
}

export interface StressTestRun {
  testId: number;
  input: string;
  userOutput: string;
  bruteOutput: string;
  passed: boolean;
  timeTaken: number;
}
