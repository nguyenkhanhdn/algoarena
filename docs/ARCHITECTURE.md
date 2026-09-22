# KIẾN TRÚC HỆ THỐNG ALGOARENA VIETNAM
**Nền tảng Luyện thi Học sinh Giỏi Tin học & Tin học Trẻ Bảng B dành cho học sinh THCS/THPT Việt Nam**

---

## 1. PHÂN TÍCH YÊU CẦU (REQUIREMENTS ANALYSIS)
- **Mục tiêu cốt lõi**: Tạo ra một nền tảng không chỉ đơn thuần là "kho bài tập" (problem archive) mà là một **"Huấn luyện viên cá nhân ảo"** đồng hành cùng học sinh trường chuyên/lớp chọn và học sinh đam mê Tin học.
- **Đối tượng**:
  1. *Học sinh THCS & THPT*: Cần giao diện dễ tiếp cận, trực quan (visualizer), bài học đi từ trực quan đến chứng minh và code, hệ thống bài phân cấp rõ ràng (800 – 2000 rating), có phân tích lỗi thường gặp và tips thi đấu thực chiến.
  2. *Giáo viên / Huấn luyện viên*: Cần công cụ quản lý học sinh theo lớp/đội tuyển, giao đề, tổ chức contest thi thử có tính thời gian & bảng xếp hạng (Leaderboard), theo dõi chủ đề học sinh còn yếu.
  3. *Admin*: Quản lý người dùng, phân quyền (RBAC), kiểm duyệt bài giảng và đề thi.
- **Bốn trụ cột cốt lõi**:
  1. **CONTENT (Nội dung bài học chuẩn sư phạm thi đấu)**: Theo 5 cấp độ (Understand -> Implement -> Apply -> Combine -> Competition).
  2. **LEARNING PROGRESS & RECOMMENDATION (Huấn luyện viên cá nhân)**: Trả lời câu hỏi "Hôm nay em nên học gì?", phát hiện weak topics.
  3. **ONLINE JUDGE & CODE EDITOR (Hệ thống chấm bài & soạn thảo)**: Hỗ trợ Python & C++, chấm subtask, test cases, memory & time limits.
  4. **CONTEST SYSTEM (Thi đấu & Xếp hạng)**: Contest chính thức, contest luyện tập, tính penalty theo luật ICPC/HSG.

---

## 2. RỦI RO & ĐIỂM CẦN LƯU Ý (RISKS & MITIGATIONS)
1. **Rủi ro bảo mật mã nguồn (Arbitrary Code Execution)**:
   - *Rủi ro*: Nếu chạy code trực tiếp trên web server, người dùng có thể dùng `os.system`, `subprocess`, đọc file hệ thống hoặc DoS server.
   - *Giải pháp*: Kiến trúc tách biệt `JudgeService` abstraction. Ở môi trường production, Judge chạy trong Docker sandbox/Isolate container, vô hiệu hóa mạng (network none), giới hạn RAM/CPU và syscalls. Ở Phase 1 MVP, triển khai sandbox engine client/mock an toàn, validate cú pháp và chạy kiểm thử an toàn.
2. **Trải nghiệm gõ code và tương thích thiết bị**:
   - Học sinh có thể dùng máy tính bàn ở phòng máy trường học hoặc laptop cá nhân. Trình soạn thảo cần hỗ trợ tab indentation, phím tắt (Ctrl+Enter để chạy), hiển thị số dòng, theme tối chuyên nghiệp.
3. **Độ nặng của hệ thống Visualization**:
   - Thuật toán đồ thị và cây Segment Tree phức tạp nếu render sai cách sẽ gây giật lag. Visualizer cần thiết kế dạng state machine phân tách (Step Forward/Backward, Speed control, State log).

---

## 3. ĐỀ XUẤT KIẾN TRÚC (PROPOSED ARCHITECTURE)
```
[Client SPA / Next.js / React 19 Frontend]
  ├── UI Components (Tailwind v4, Lucide Icons, Motion)
  ├── Visualizer Engine (Step-by-step state machine)
  ├── Code Editor (Monaco / Interactive Code Workspace)
  ├── State & Cache Layer (LocalStorage Persistence + Reactive Sync)
  └── Rule-based Recommendation Engine
           │
           ▼
[Application & API Services Layer]
  ├── AuthService (RBAC: Student, Teacher, Admin)
  ├── LearningService (Path, Topic, Lesson)
  ├── ProblemService (Filters, Tags, Subtasks, Sample tests)
  ├── ContestService (Timer, Rules, Scoreboard, Penalty)
  └── JudgeService Interface (Compile, Execute, Sandbox Evaluation)
           │
           ▼
[Storage / Database Layer]
  └── Relational Schema (PostgreSQL / Prisma compliant data model)
```

---

## 4. THIẾT KẾ DATABASE SCHEMA (PRISMA COMPLIANT)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  STUDENT
  TEACHER
  SUPER_ADMIN
}

enum Difficulty {
  BEGINNER
  EASY
  MEDIUM
  HARD
  EXPERT
}

enum Verdict {
  ACCEPTED
  WRONG_ANSWER
  TIME_LIMIT_EXCEEDED
  MEMORY_LIMIT_EXCEEDED
  COMPILATION_ERROR
  RUNTIME_ERROR
  JUDGING
}

model User {
  id            String          @id @default(uuid())
  username      String          @unique
  email         String          @unique
  passwordHash  String
  fullName      String
  avatar        String?
  role          Role            @default(STUDENT)
  studentProfile StudentProfile?
  teacherProfile TeacherProfile?
  submissions   Submission[]
  bookmarks     Bookmark[]
  progress      Progress[]
  achievements  UserAchievement[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model StudentProfile {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  school          String
  className       String
  province        String
  grade           Int
  target          String
  rating          Int      @default(1200)
  currentStreak   Int      @default(0)
  longestStreak   Int      @default(0)
  problemsSolved  Int      @default(0)
  weakTopics      String[]
  strongTopics    String[]
}

model TeacherProfile {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  school          String
  department      String
  bio             String?
}

model LearningPath {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String
  order       Int
  courses     Course[]
}

model Course {
  id             String        @id @default(uuid())
  learningPathId String
  learningPath   LearningPath  @relation(fields: [learningPathId], references: [id])
  title          String
  slug           String        @unique
  description    String
  order          Int
  topics         Topic[]
}

model Topic {
  id          String   @id @default(uuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])
  title       String
  slug        String   @unique
  description String
  category    String
  order       Int
  lessons     Lesson[]
  problems    Problem[]
}

model Lesson {
  id            String     @id @default(uuid())
  topicId       String
  topic         Topic      @relation(fields: [topicId], references: [id])
  title         String
  slug          String     @unique
  order         Int
  prerequisites String[]
  objectives    String[]
  content       String     // Markdown / MDX format
  pseudocode    String?
  samplePython  String?
  sampleCpp     String?
  timeComplexity String
  spaceComplexity String
  commonMistakes String[]
  contestTips   String[]
  visualizerType String?   // "BINARY_SEARCH" | "TWO_POINTERS" | "SORTING" | "GRAPH_BFS" | etc.
}

model Problem {
  id            String       @id @default(uuid())
  topicId       String?
  topic         Topic?       @relation(fields: [topicId], references: [id])
  title         String
  slug          String       @unique
  difficulty    Difficulty
  rating        Int          @default(1000)
  statement     String       // Markdown
  inputFormat   String
  outputFormat  String
  constraints   String
  sampleInput   String
  sampleOutput  String
  sampleExplanation String?
  editorial     String?
  solutionPython String?
  solutionCpp   String?
  timeLimit     Float        @default(1.0)
  memoryLimit   Int          @default(256)
  tags          String[]
  testCases     TestCase[]
  submissions   Submission[]
}

model TestCase {
  id          String   @id @default(uuid())
  problemId   String
  problem     Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
  input       String
  expectedOutput String
  isHidden    Boolean  @default(false)
  scoreWeight Int      @default(10)
}

model Submission {
  id             String    @id @default(uuid())
  userId         String
  user           User      @relation(fields: [userId], references: [id])
  problemId      String
  problem        Problem   @relation(fields: [problemId], references: [id])
  contestId      String?
  language       String    // "python" | "cpp"
  sourceCode     String
  verdict        Verdict
  score          Int
  executionTime  Float
  memoryUsage    Float
  testDetails    String?   // JSON array of per-test results
  createdAt      DateTime  @default(now())
}

model Contest {
  id           String             @id @default(uuid())
  title        String
  slug         String             @unique
  description  String
  startTime    DateTime
  endTime      DateTime
  durationMins Int
  isOfficial   Boolean            @default(true)
  problems     ContestProblem[]
  participants ContestParticipant[]
}

model ContestProblem {
  id        String   @id @default(uuid())
  contestId String
  contest   Contest  @relation(fields: [contestId], references: [id])
  problemId String
  problem   Problem  @relation(fields: [problemId], references: [id])
  problemCode String // A, B, C, D
  points    Int      @default(100)
}

model ContestParticipant {
  id        String   @id @default(uuid())
  contestId String
  contest   Contest  @relation(fields: [contestId], references: [id])
  userId    String
  score     Int      @default(0)
  penalty   Int      @default(0)
  rank      Int?
}

model Bookmark {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  itemType  String   // "LESSON" | "PROBLEM" | "EDITORIAL"
  itemId    String
  title     String
  note      String?
  tags      String[]
  createdAt DateTime @default(now())
}

model Achievement {
  id          String   @id @default(uuid())
  code        String   @unique
  title       String
  description String
  badgeIcon   String
  category    String
}
```

---

## 5. PAGE MAP & ROUTING
- `/` : Landing Page (Tổng quan, mục tiêu, lộ trình 7 bước, thống kê)
- `/dashboard` : Dashboard học sinh ("Hôm nay em nên học gì?", streak, lộ trình đang học, gợi ý bài tập)
- `/learning-paths` : Toàn bộ 7 lộ trình từ Nền tảng -> Thuật toán cơ bản -> Cấu trúc dữ liệu -> Đồ thị -> Quy hoạch động -> Nâng cao -> Luyện đề
- `/lessons/:slug` : Chi tiết bài học (Mục tiêu, Lý thuyết trực quan, Animation Visualizer nhúng, Code Python & C++, Tips thi đấu, Lỗi thường gặp, Bài tập áp dụng)
- `/visualizer` : Phòng thí nghiệm Trực quan hóa Thuật toán độc lập (Binary Search, Two Pointers, Bubble/Quick Sort, BFS Graph, Prefix Sum, Stack)
- `/problems` : Danh mục bài tập luyện thi (Lọc theo Topic, Difficulty 800 - 2000, Rating, Tags, Trạng thái AC/Unsolved, Search)
- `/problems/:slug` : Không gian giải bài (Split-view: Đề bài LaTeX + Editor Monaco-style + Chấm thử sample test + Nộp bài + Lịch sử chấm + Lời giải/Editorial)
- `/contests` : Danh sách kỳ thi thử (Đề thi HSG, Tin học trẻ Bảng B)
- `/contests/:id` : Phòng thi & Bảng xếp hạng trực tiếp (Scoreboard, Penalty)
- `/bookmarks` : Quản lý bài tập & bài học đã lưu kèm ghi chú cá nhân
- `/profile` : Hồ sơ học sinh, thống kê bài đã giải theo chủ đề, huy hiệu
- `/teacher` : CMS & Bảng điều khiển Giáo viên (Quản lý học sinh, thống kê độ làm bài, giao bài tập)

---

## 6. KẾ HOẠCH TRIỂN KHAI PHASE 1 (MVP EXECUTION PLAN)
- **Step 1**: Tạo Types, Models, Database Schema & Mock Database Service hoàn chỉnh với đầy đủ Seed Data (10 topics, 20 lessons, 40+ realistic problems HSG/Tin học trẻ, 3 contests, 10 achievements).
- **Step 2**: Xây dựng Judge Service Interface & Simulation Sandbox (chấm subtask, tính time/memory, trả về AC, WA, TLE, RE).
- **Step 3**: Thiết kế Hệ thống Visualizer tương tác độc lập (Binary Search, Two Pointers, Sorting, BFS, Prefix Sum).
- **Step 4**: Thiết kế Layout chuẩn Competitive Programming & EdTech (Dark/Light aesthetic, VS Code tone, navigation sidebar, quick role switcher).
- **Step 5**: Triển khai các màn hình:
  1. Student Dashboard ("Hôm nay em nên học gì?")
  2. Learning Paths & Lesson Detail với Markdown/LaTeX styling
  3. Visualizer Studio tương tác
  4. Problem Bank & Split-Screen Problem Solver với Code Editor, Test runner & Submission feedback
  5. Contest & Live Leaderboard
  6. Bookmarks & Personal Notes
  7. Student Profile & Achievements
  8. Teacher CMS & Class Monitoring
- **Step 6**: Kiểm thử toàn diện (Type-checking, linting, production build).
