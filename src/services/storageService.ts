import { extraProblems } from '../data/extraProblems';
import {
  mockAchievements,
  mockContests,
  mockLearningPaths,
  mockLessons,
  mockProblems,
  mockTopics,
  mockUsers,
} from '../data/mockData';
import {
  supplementaryLessons,
  supplementaryProblems,
  supplementaryTopics,
} from '../data/supplementaryData';
import {
  Achievement,
  Assignment,
  AssignmentSubmission,
  Bookmark,
  Contest,
  LearningPath,
  Lesson,
  Problem,
  ProblemComment,
  Role,
  Submission,
  Topic,
  User,
} from '../types';

const STORAGE_KEY_PREFIX = 'algoarena_v2_';

class StorageService {
  private users: User[] = [];
  private currentUserId: string = 'user-student-1';
  private learningPaths: LearningPath[] = [];
  private topics: Topic[] = [];
  private lessons: Lesson[] = [];
  private problems: Problem[] = [];
  private submissions: Submission[] = [];
  private contests: Contest[] = [];
  private bookmarks: Bookmark[] = [];
  private achievements: Achievement[] = [];
  private comments: ProblemComment[] = [];
  private assignments: Assignment[] = [];
  private assignmentSubmissions: AssignmentSubmission[] = [];
  private completedLessonIds: Set<string> = new Set();
  private solvedProblemIds: Set<string> = new Set();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Load or set initial users
    this.users = this.loadFromStorage('users', mockUsers);

    // Merge default paths, topics, lessons, problems
    const allTopics = [...mockTopics, ...supplementaryTopics];
    const allLessons = [...mockLessons, ...supplementaryLessons];
    const allProblems = [...mockProblems, ...extraProblems, ...supplementaryProblems];

    this.learningPaths = this.loadFromStorage('paths', mockLearningPaths);
    this.topics = this.mergeById(this.loadFromStorage('topics', allTopics), allTopics);
    this.lessons = this.mergeById(this.loadFromStorage('lessons', allLessons), allLessons);
    this.problems = this.mergeById(this.loadFromStorage('problems', allProblems), allProblems);
    this.contests = this.loadFromStorage('contests', mockContests);
    this.achievements = this.loadFromStorage('achievements', mockAchievements);

    // Initial mock submissions for realistic history
    const initialSubmissions: Submission[] = [
      {
        id: 'sub-init-1',
        userId: 'user-student-1',
        userName: 'Nguyễn Hoàng Nam',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        problemId: 'prob-bs-search-val',
        problemTitle: 'Tìm kiếm phần tử trên mảng đã sắp xếp',
        language: 'python',
        sourceCode: `# Solution Python Binary Search
def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    ans = -1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == x:
            ans = mid + 1
            r = mid - 1
        elif arr[mid] < x:
            l = mid + 1
        else:
            r = mid - 1
    return ans`,
        verdict: 'ACCEPTED',
        score: 100,
        executionTime: 0.04,
        memoryUsage: 14.1,
        testResults: [
          { testNumber: 1, passed: true, verdict: 'ACCEPTED', executionTime: 0.03, memoryUsage: 14.0, isHidden: false },
          { testNumber: 2, passed: true, verdict: 'ACCEPTED', executionTime: 0.04, memoryUsage: 14.1, isHidden: false },
          { testNumber: 3, passed: true, verdict: 'ACCEPTED', executionTime: 0.04, memoryUsage: 14.2, isHidden: true },
        ],
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'sub-init-2',
        userId: 'user-student-1',
        userName: 'Nguyễn Hoàng Nam',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        problemId: 'prob-prefix-sum-basic',
        problemTitle: 'Tổng đoạn con liên tiếp',
        language: 'cpp',
        sourceCode: `// Solution C++ Prefix Sum`,
        verdict: 'ACCEPTED',
        score: 100,
        executionTime: 0.02,
        memoryUsage: 8.5,
        testResults: [
          { testNumber: 1, passed: true, verdict: 'ACCEPTED', executionTime: 0.02, memoryUsage: 8.4, isHidden: false },
          { testNumber: 2, passed: true, verdict: 'ACCEPTED', executionTime: 0.02, memoryUsage: 8.5, isHidden: true },
        ],
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];

    this.submissions = this.loadFromStorage('submissions', initialSubmissions);

    const initialBookmarks: Bookmark[] = [
      {
        id: 'bm-1',
        userId: 'user-student-1',
        itemType: 'LESSON',
        itemId: 'lesson-binary-search-intro',
        title: 'Tìm kiếm nhị phân cơ bản (Binary Search Fundamentals)',
        note: 'Cần ôn lại cách viết mid = l + (r - l) // 2 tránh tràn số trước ngày thi HSG.',
        tags: ['Nhị phân', 'Cần ôn', 'HSG'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'bm-2',
        userId: 'user-student-1',
        itemType: 'PROBLEM',
        itemId: 'prob-knapsack-01',
        title: 'Balo 0/1 (0/1 Knapsack Problem)',
        note: 'Duyệt ngược vòng lặp sức chứa W từ W về w_i để tránh chọn 1 đồ vật nhiều lần.',
        tags: ['Quy hoạch động', 'Balo'],
        createdAt: new Date(Date.now() - 43200000).toISOString(),
      },
    ];

    this.bookmarks = this.loadFromStorage('bookmarks', initialBookmarks);

    const initialComments: ProblemComment[] = [
      {
        id: 'cm-1',
        problemId: 'prob-bs-search-val',
        userId: 'user-student-2',
        userName: 'Trần Thị Mai',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        userRole: 'STUDENT',
        content: 'Cho em hỏi vì sao khi tìm vị trí xuất hiện đầu tiên thì ta lại gán r = mid - 1 sau khi tìm thấy arr[mid] == x ạ?',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        likes: 4,
      },
      {
        id: 'cm-2',
        problemId: 'prob-bs-search-val',
        userId: 'user-teacher-1',
        userName: 'Thầy Trần Minh Tuấn',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        userRole: 'TEACHER',
        content: 'Chào em, vì mảng đã sắp xếp không giảm, nên các phần tử bằng x có thể còn nằm bên trái của mid. Ta lưu kết quả tạm thời ans = mid rồi thu hẹp không gian tìm kiếm sang nửa trái r = mid - 1 để tìm vị trí xuất hiện nhỏ hơn nhé!',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        likes: 9,
        codeSnippet: `if arr[mid] == x:\n    ans = mid + 1 # 1-based indexing\n    r = mid - 1   # Tiếp tục tìm bên trái`,
      },
      {
        id: 'cm-3',
        problemId: 'prob-prefix-sum-basic',
        userId: 'user-student-1',
        userName: 'Nguyễn Hoàng Nam',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        userRole: 'STUDENT',
        content: 'Bài này các bạn lưu ý mảng cộng dồn nên khai báo kích thước N+1 và kiểu dữ liệu long long (C++) để tránh tràn số khi N = 10^5 và A[i] = 10^9 nhé!',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        likes: 12,
      },
    ];
    this.comments = this.loadFromStorage('comments', initialComments);

    const initialAssignments: Assignment[] = [
      {
        id: 'assign-1',
        title: 'Chuyên đề Tuần 3: Tìm kiếm nhị phân & Mảng cộng dồn',
        description: 'Các em trong đội tuyển hoàn thành 3 bài tập cơ bản trước buổi học chiều thứ Bảy.',
        className: 'Đội tuyển HSG Tin 11',
        assignedBy: 'Thầy Trần Minh Tuấn',
        deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
        problemIds: ['prob-bs-search-val', 'prob-prefix-sum-basic', 'prob-two-sum-sorted'],
        totalPoints: 300,
        status: 'ACTIVE',
      },
      {
        id: 'assign-2',
        title: 'Luyện đề Tin học trẻ Bảng B - Vòng loại khu vực',
        description: 'Tập dượt giải đề tốc độ trong 120 phút, chú ý tối ưu thuật toán tránh TLE ở Subtask 2.',
        className: 'Đội tuyển HSG Tin 11',
        assignedBy: 'Thầy Trần Minh Tuấn',
        deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
        problemIds: ['prob-kadane-max-subarray', 'prob-bs-answer-wood', 'prob-subseq-sum-div-k'],
        totalPoints: 300,
        status: 'ACTIVE',
      },
    ];
    this.assignments = this.loadFromStorage('assignments', initialAssignments);

    const initialAssignmentSubmissions: AssignmentSubmission[] = [
      {
        assignmentId: 'assign-1',
        studentId: 'user-student-1',
        studentName: 'Nguyễn Hoàng Nam',
        problemResults: {
          'prob-bs-search-val': { solved: true, score: 100 },
          'prob-prefix-sum-basic': { solved: true, score: 100 },
          'prob-two-sum-sorted': { solved: true, score: 100 },
        },
        totalScore: 300,
        submittedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        status: 'SUBMITTED',
      },
      {
        assignmentId: 'assign-1',
        studentId: 'user-student-3',
        studentName: 'Lê Quốc Bảo',
        problemResults: {
          'prob-bs-search-val': { solved: true, score: 100 },
          'prob-prefix-sum-basic': { solved: true, score: 100 },
          'prob-two-sum-sorted': { solved: true, score: 100 },
        },
        totalScore: 300,
        submittedAt: new Date(Date.now() - 3600000 * 16).toISOString(),
        status: 'SUBMITTED',
      },
      {
        assignmentId: 'assign-1',
        studentId: 'user-student-2',
        studentName: 'Trần Thị Mai',
        problemResults: {
          'prob-bs-search-val': { solved: true, score: 100 },
          'prob-prefix-sum-basic': { solved: true, score: 100 },
          'prob-two-sum-sorted': { solved: false, score: 0 },
        },
        totalScore: 200,
        submittedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        status: 'PENDING',
      },
    ];
    this.assignmentSubmissions = this.loadFromStorage('assignment_submissions', initialAssignmentSubmissions);

    const savedCompletedLessons = this.loadFromStorage<string[]>('completed_lessons', [
      'lesson-binary-search-intro',
      'lesson-two-pointers',
      'lesson-prefix-sum',
    ]);
    this.completedLessonIds = new Set(savedCompletedLessons);

    const savedSolvedProblems = this.loadFromStorage<string[]>('solved_problems', [
      'prob-bs-search-val',
      'prob-prefix-sum-basic',
      'prob-valid-parentheses',
    ]);
    this.solvedProblemIds = new Set(savedSolvedProblems);
  }

  private mergeById<T extends { id: string }>(stored: T[], defaults: T[]): T[] {
    const map = new Map<string, T>();
    defaults.forEach((item) => map.set(item.id, item));
    stored.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  }

  private loadFromStorage<T>(key: string, defaultVal: T): T {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return defaultVal;
  }

  private saveToStorage(key: string, val: any) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
    } catch {
      // ignore
    }
  }

  // --- Users, Auth & Roles ---
  getCurrentUser(): User {
    const user = this.users.find((u) => u.id === this.currentUserId) || this.users[0];
    return user;
  }

  setCurrentUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.currentUserId = user.id;
      this.saveToStorage('current_user_id', user.id);
    }
  }

  login(
    usernameOrEmail: string,
    password?: string
  ): { success: boolean; message: string; user?: User } {
    const trimmed = usernameOrEmail.trim().toLowerCase();
    const found = this.users.find(
      (u) =>
        u.username.toLowerCase() === trimmed ||
        u.email.toLowerCase() === trimmed
    );

    if (!found) {
      return {
        success: false,
        message: 'Tài khoản hoặc email không tồn tại trong hệ thống. Vui lòng kiểm tra lại hoặc Đăng ký.',
      };
    }

    // If password provided and user has password, check match (or allow demo default)
    if (password && found.password && found.password !== password) {
      return {
        success: false,
        message: 'Mật khẩu không chính xác. Mật khẩu mặc định tài khoản mẫu là "123456".',
      };
    }

    this.currentUserId = found.id;
    this.saveToStorage('current_user_id', found.id);

    return {
      success: true,
      message: `Đăng nhập thành công! Chào mừng ${found.fullName} trở lại AlgoArena.`,
      user: found,
    };
  }

  register(data: {
    username: string;
    email: string;
    fullName: string;
    password: string;
    role?: Role;
    studentData?: {
      school: string;
      className: string;
      province: string;
      grade: number;
      target: string;
    };
  }): { success: boolean; message: string; user?: User } {
    const usernameClean = data.username.trim();
    const emailClean = data.email.trim().toLowerCase();

    // Check duplicate username or email
    const exists = this.users.some(
      (u) =>
        u.username.toLowerCase() === usernameClean.toLowerCase() ||
        u.email.toLowerCase() === emailClean
    );

    if (exists) {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc Email đã tồn tại. Vui lòng chọn tên khác.',
      };
    }

    const newId = `user-student-${Date.now()}`;
    const avatarList = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ];
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    const newUser: User = {
      id: newId,
      username: usernameClean,
      email: emailClean,
      password: data.password,
      fullName: data.fullName.trim(),
      avatar: randomAvatar,
      role: data.role || 'STUDENT',
      studentProfile: {
        school: data.studentData?.school || 'THPT Chuyên',
        className: data.studentData?.className || '10 Tin',
        province: data.studentData?.province || 'Hà Nội',
        grade: data.studentData?.grade || 10,
        target: data.studentData?.target || 'Tin học trẻ Bảng B & HSG Tỉnh',
        rating: 1200,
        currentStreak: 1,
        longestStreak: 1,
        problemsSolved: 0,
        totalSubmissions: 0,
        weakTopics: ['Đồ thị', 'Quy hoạch động'],
        strongTopics: ['Cú pháp cơ bản'],
        joinedDate: new Date().toISOString().split('T')[0],
      },
    };

    this.users.unshift(newUser);
    this.saveToStorage('users', this.users);

    this.currentUserId = newUser.id;
    this.saveToStorage('current_user_id', newUser.id);

    return {
      success: true,
      message: `Đăng ký thành công! Chào mừng ${newUser.fullName} tham gia cộng đồng AlgoArena.`,
      user: newUser,
    };
  }

  logout(): void {
    // Switch to first student default
    if (this.users.length > 0) {
      this.currentUserId = this.users[0].id;
      this.saveToStorage('current_user_id', this.users[0].id);
    }
  }

  switchRole(role: Role) {
    const user = this.users.find((u) => u.role === role);
    if (user) {
      this.currentUserId = user.id;
      this.saveToStorage('current_user_id', user.id);
    }
  }

  getAllUsers(): User[] {
    return this.users;
  }

  updateStudentProfile(profileUpdate: Partial<NonNullable<User['studentProfile']>>) {
    const user = this.getCurrentUser();
    if (user && user.studentProfile) {
      user.studentProfile = { ...user.studentProfile, ...profileUpdate };
      this.saveToStorage('users', this.users);
    }
  }

  // --- Detailed Student Learning & Exam Practice Analytics ---
  getUserLearningProgress(targetUserId?: string) {
    const user = targetUserId ? (this.users.find((u) => u.id === targetUserId) || this.getCurrentUser()) : this.getCurrentUser();
    const userSubmissions = this.submissions.filter((s) => s.userId === user.id);

    const totalLessons = this.lessons.length;
    const completedLessons = Array.from(this.completedLessonIds);
    const completedLessonsCount = completedLessons.length;
    const lessonCompletionRate = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    const totalProblems = this.problems.length;
    // Solved problems by this user
    const solvedProblemIds = new Set<string>();
    userSubmissions.forEach((s) => {
      if (s.verdict === 'ACCEPTED') solvedProblemIds.add(s.problemId);
    });
    // Add default solved if student 1
    if (user.id === 'user-student-1') {
      this.solvedProblemIds.forEach((id) => solvedProblemIds.add(id));
    }
    const solvedProblemsCount = solvedProblemIds.size;
    const problemSolvingRate = totalProblems > 0 ? Math.round((solvedProblemsCount / totalProblems) * 100) : 0;

    // By Difficulty
    const solvedByDifficulty = {
      BEGINNER: 0,
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
      EXPERT: 0,
    };
    this.problems.forEach((p) => {
      if (solvedProblemIds.has(p.id)) {
        if (solvedByDifficulty[p.difficulty] !== undefined) {
          solvedByDifficulty[p.difficulty]++;
        }
      }
    });

    // By Learning Path
    const pathProgress = this.learningPaths.map((path) => {
      const pathTopics = this.topics.filter((t) => t.pathId === path.id);
      const pathTopicIds = new Set(pathTopics.map((t) => t.id));
      const pathLessons = this.lessons.filter((l) => pathTopicIds.has(l.topicId));
      const pathProblems = this.problems.filter((p) => pathTopicIds.has(p.topicId));

      const doneLessons = pathLessons.filter((l) => this.completedLessonIds.has(l.id)).length;
      const solvedProblems = pathProblems.filter((p) => solvedProblemIds.has(p.id)).length;

      const totalItems = pathLessons.length + pathProblems.length;
      const doneItems = doneLessons + solvedProblems;
      const percent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

      return {
        path,
        totalLessons: pathLessons.length,
        doneLessons,
        totalProblems: pathProblems.length,
        solvedProblems,
        percent,
      };
    });

    // By Topic Detail
    const topicProgress = this.topics.map((t) => {
      const topicLessonsList = this.lessons.filter((l) => l.topicId === t.id);
      const topicProblemsList = this.problems.filter((p) => p.topicId === t.id);

      const doneLessons = topicLessonsList.filter((l) => this.completedLessonIds.has(l.id)).length;
      const solvedProblems = topicProblemsList.filter((p) => solvedProblemIds.has(p.id)).length;

      const total = topicLessonsList.length + topicProblemsList.length;
      const done = doneLessons + solvedProblems;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;

      let status: 'MASTERED' | 'IN_PROGRESS' | 'NOT_STARTED' = 'NOT_STARTED';
      if (percent >= 80) status = 'MASTERED';
      else if (percent > 0) status = 'IN_PROGRESS';

      return {
        topic: t,
        totalLessons: topicLessonsList.length,
        doneLessons,
        totalProblems: topicProblemsList.length,
        solvedProblems,
        percent,
        status,
      };
    });

    // Submissions Breakdown
    const verdictCounts: Record<string, number> = {
      ACCEPTED: 0,
      WRONG_ANSWER: 0,
      TIME_LIMIT_EXCEEDED: 0,
      MEMORY_LIMIT_EXCEEDED: 0,
      RUNTIME_ERROR: 0,
      COMPILATION_ERROR: 0,
    };
    userSubmissions.forEach((s) => {
      if (verdictCounts[s.verdict] !== undefined) {
        verdictCounts[s.verdict]++;
      }
    });

    // Language Usage
    const langCounts = {
      cpp: userSubmissions.filter((s) => s.language === 'cpp').length,
      python: userSubmissions.filter((s) => s.language === 'python').length,
    };

    // Exam Readiness Index (0 - 100%)
    const userRating = user.studentProfile?.rating || 1200;
    const readinessIndex = Math.min(
      100,
      Math.round(
        (Math.min(userRating, 1600) / 1600) * 50 +
        (Math.min(solvedProblemsCount, 30) / 30) * 35 +
        (Math.min(completedLessonsCount, 15) / 15) * 15
      )
    );

    return {
      user,
      totalLessons,
      completedLessonsCount,
      lessonCompletionRate,
      totalProblems,
      solvedProblemsCount,
      problemSolvingRate,
      solvedByDifficulty,
      pathProgress,
      topicProgress,
      verdictCounts,
      totalSubmissions: userSubmissions.length,
      langCounts,
      readinessIndex,
      currentStreak: user.studentProfile?.currentStreak || 1,
      rating: userRating,
      targetContest: user.studentProfile?.target || 'HSG Tỉnh Bảng A & Tin học trẻ Bảng B',
    };
  }

  // --- Learning Paths, Topics, Lessons ---
  getLearningPaths(): LearningPath[] {
    return this.learningPaths;
  }

  getTopics(): Topic[] {
    return this.topics;
  }

  getTopicBySlug(slug: string): Topic | undefined {
    return this.topics.find((t) => t.slug === slug || t.id === slug);
  }

  getLessonsByTopic(topicId: string): Lesson[] {
    return this.lessons.filter((l) => l.topicId === topicId).sort((a, b) => a.order - b.order);
  }

  getLessonBySlug(slug: string): Lesson | undefined {
    return this.lessons.find((l) => l.slug === slug || l.id === slug);
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.completedLessonIds.has(lessonId);
  }

  toggleLessonCompleted(lessonId: string): boolean {
    if (this.completedLessonIds.has(lessonId)) {
      this.completedLessonIds.delete(lessonId);
    } else {
      this.completedLessonIds.add(lessonId);
    }
    this.saveToStorage('completed_lessons', Array.from(this.completedLessonIds));
    return this.completedLessonIds.has(lessonId);
  }

  // --- Problems ---
  getProblems(): Problem[] {
    return this.problems;
  }

  getProblemBySlug(slug: string): Problem | undefined {
    return this.problems.find((p) => p.slug === slug || p.id === slug);
  }

  isProblemSolved(problemId: string): boolean {
    return this.solvedProblemIds.has(problemId);
  }

  addProblem(newProblem: Problem) {
    this.problems.unshift(newProblem);
    this.saveToStorage('problems', this.problems);
  }

  // --- Submissions ---
  recordSubmission(sub: Submission) {
    this.submissions.unshift(sub);
    this.saveToStorage('submissions', this.submissions);

    if (sub.verdict === 'ACCEPTED') {
      this.solvedProblemIds.add(sub.problemId);
      this.saveToStorage('solved_problems', Array.from(this.solvedProblemIds));

      // Update current user statistics
      const user = this.getCurrentUser();
      if (user.studentProfile) {
        user.studentProfile.problemsSolved = this.solvedProblemIds.size;
        user.studentProfile.totalSubmissions += 1;
        this.saveToStorage('users', this.users);
      }
    }
  }

  getSubmissions(filter?: { userId?: string; problemId?: string; contestId?: string }): Submission[] {
    let result = [...this.submissions];
    if (filter?.userId) {
      result = result.filter((s) => s.userId === filter.userId);
    }
    if (filter?.problemId) {
      result = result.filter((s) => s.problemId === filter.problemId);
    }
    if (filter?.contestId) {
      result = result.filter((s) => s.contestId === filter.contestId);
    }
    return result;
  }

  // --- Contests ---
  getContests(): Contest[] {
    return this.contests;
  }

  getContestById(id: string): Contest | undefined {
    return this.contests.find((c) => c.id === id || c.slug === id);
  }

  joinContest(contestId: string) {
    const contest = this.getContestById(contestId);
    const user = this.getCurrentUser();
    if (contest && !contest.participants.some((p) => p.userId === user.id)) {
      contest.participants.push({
        userId: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        school: user.studentProfile?.school || 'THPT Chuyên',
        score: 0,
        penalty: 0,
        rank: contest.participants.length + 1,
        submissions: {},
      });
      this.saveToStorage('contests', this.contests);
    }
  }

  // --- Bookmarks ---
  getBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  isBookmarked(itemId: string): boolean {
    return this.bookmarks.some((b) => b.itemId === itemId);
  }

  toggleBookmark(itemType: Bookmark['itemType'], itemId: string, title: string, note?: string): boolean {
    const idx = this.bookmarks.findIndex((b) => b.itemId === itemId);
    if (idx >= 0) {
      this.bookmarks.splice(idx, 1);
      this.saveToStorage('bookmarks', this.bookmarks);
      return false;
    } else {
      const user = this.getCurrentUser();
      const newBm: Bookmark = {
        id: 'bm-' + Date.now(),
        userId: user.id,
        itemType,
        itemId,
        title,
        note: note || '',
        tags: [itemType === 'PROBLEM' ? 'Bài tập' : 'Lý thuyết'],
        createdAt: new Date().toISOString(),
      };
      this.bookmarks.unshift(newBm);
      this.saveToStorage('bookmarks', this.bookmarks);
      return true;
    }
  }

  updateBookmarkNote(bookmarkId: string, note: string) {
    const bm = this.bookmarks.find((b) => b.id === bookmarkId);
    if (bm) {
      bm.note = note;
      this.saveToStorage('bookmarks', this.bookmarks);
    }
  }

  deleteBookmark(bookmarkId: string) {
    this.bookmarks = this.bookmarks.filter((b) => b.id !== bookmarkId);
    this.saveToStorage('bookmarks', this.bookmarks);
  }

  // --- Achievements ---
  getAchievements(): Achievement[] {
    return this.achievements;
  }

  // --- Comments & Discussions (Phase 2) ---
  getComments(problemId: string): ProblemComment[] {
    return this.comments.filter((c) => c.problemId === problemId);
  }

  addComment(data: {
    problemId: string;
    content: string;
    codeSnippet?: string;
  }): ProblemComment {
    const user = this.getCurrentUser();
    const newComment: ProblemComment = {
      id: 'cm-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      problemId: data.problemId,
      userId: user.id,
      userName: user.fullName,
      userAvatar: user.avatar,
      userRole: user.role,
      content: data.content,
      codeSnippet: data.codeSnippet,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    this.comments.unshift(newComment);
    this.saveToStorage('comments', this.comments);
    return newComment;
  }

  likeComment(commentId: string) {
    const comment = this.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.likes += 1;
      this.saveToStorage('comments', this.comments);
    }
  }

  // --- Assignments & Homework (Phase 2) ---
  getAssignments(): Assignment[] {
    return this.assignments;
  }

  addAssignment(assignment: Assignment) {
    this.assignments.unshift(assignment);
    this.saveToStorage('assignments', this.assignments);
  }

  getAssignmentSubmissions(assignmentId: string): AssignmentSubmission[] {
    return this.assignmentSubmissions.filter((s) => s.assignmentId === assignmentId);
  }

  // --- Contests Management (Phase 2) ---
  addContest(contest: Contest) {
    this.contests.unshift(contest);
    this.saveToStorage('contests', this.contests);
  }

  // --- Recommendation Engine: "Hôm nay em nên học gì?" ---
  getRecommendation() {
    const user = this.getCurrentUser();
    const solvedCount = this.solvedProblemIds.size;
    const weakTopics = user.studentProfile?.weakTopics || ['Đồ thị', 'Quy hoạch động'];

    // Unsolved problems from weak topics or basic algorithms
    const recommendedProblems = this.problems
      .filter((p) => !this.solvedProblemIds.has(p.id))
      .sort((a, b) => a.rating - b.rating)
      .slice(0, 3);

    // Current in-progress topic
    const currentTopic = this.topics.find((t) => t.id === 'topic-binary-search') || this.topics[0];

    const todayGoal = {
      targetSolves: 3,
      currentSolves: 1,
      targetTimeMins: 60,
      currentTimeMins: 42,
    };

    return {
      currentTopic,
      weakTopics,
      recommendedProblems,
      todayGoal,
      solvedCount,
      streak: user.studentProfile?.currentStreak || 6,
    };
  }
}

export const storageService = new StorageService();
