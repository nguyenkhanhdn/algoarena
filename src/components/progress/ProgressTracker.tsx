import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Cpu,
  Flame,
  GraduationCap,
  LineChart,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Problem, Topic } from '../../types';

interface ProgressTrackerProps {
  onSelectProblem?: (problem: Problem) => void;
  onNavigateToLearning?: () => void;
  onNavigateToProblems?: () => void;
  onNavigateToContests?: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  onSelectProblem,
  onNavigateToLearning,
  onNavigateToProblems,
  onNavigateToContests,
}) => {
  const currentUser = storageService.getCurrentUser();
  const allUsers = storageService.getAllUsers();
  const studentUsers = allUsers.filter((u) => u.role === 'STUDENT');

  // If teacher or admin, allow viewing any student
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    currentUser.role === 'STUDENT' ? currentUser.id : (studentUsers[0]?.id || currentUser.id)
  );

  const [topicFilter, setTopicFilter] = useState<'ALL' | 'MASTERED' | 'IN_PROGRESS' | 'NOT_STARTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real progress from storageService
  const progressData = storageService.getUserLearningProgress(selectedStudentId);
  const targetStudent = progressData.user;
  const studentProfile = targetStudent.studentProfile;
  const submissions = storageService.getSubmissions({ userId: targetStudent.id });

  // Filter topics
  const filteredTopics = progressData.topicProgress.filter((tp) => {
    if (topicFilter !== 'ALL' && tp.status !== topicFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tp.topic.title.toLowerCase().includes(q);
      const matchCat = tp.topic.category.toLowerCase().includes(q);
      if (!matchTitle && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Teacher / Admin Student Selector Banner */}
      {(currentUser.role === 'TEACHER' || currentUser.role === 'SUPER_ADMIN') && (
        <div className="p-4 bg-[#141418] border border-blue-900/40 rounded-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-xs font-bold text-blue-300 block">
                Chế độ Giáo viên: Theo dõi tiến độ học sinh
              </span>
              <span className="text-[11px] text-zinc-400">
                Chọn học sinh trong danh sách đội tuyển để xem chi tiết năng lực & lộ trình luyện thi.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-400" />
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-semibold"
            >
              {studentUsers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentProfile?.className || 'Lớp Tin'} - {s.studentProfile?.school || ''})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Overview & Exam Readiness Banner */}
      <div className="bg-gradient-to-r from-emerald-950/30 via-[#18181c] to-[#121215] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Mục tiêu: {progressData.targetContest}
              </span>
              <span className="text-xs font-mono text-zinc-400 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
                Khối {studentProfile?.grade || 10} • {studentProfile?.school || 'Chuyên Tin'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-3">
              <span>Hồ Sơ Tiến Độ: {targetStudent.fullName}</span>
              {progressData.readinessIndex >= 70 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sẵn sàng thi đấu
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Hệ thống tự động đồng bộ hóa kết quả làm bài tập, bài học lý thuyết, lịch sử nộp code và điểm số Elo để tính toán năng lực toàn diện cho học sinh.
            </p>
          </div>

          {/* Readiness Gauge & Streak */}
          <div className="flex items-center gap-4 bg-[#141418]/90 border border-zinc-800 p-4 rounded-2xl shadow-xl">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-20 h-20">
                  <circle
                    className="text-zinc-800"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r="32"
                    cx="40"
                    cy="40"
                  />
                  <circle
                    className="text-emerald-500 transition-all duration-1000"
                    strokeWidth="6"
                    strokeDasharray={200}
                    strokeDashoffset={200 - (200 * progressData.readinessIndex) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="32"
                    cx="40"
                    cy="40"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-bold font-mono text-zinc-100">
                    {progressData.readinessIndex}%
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-zinc-400 block mt-1">Độ sẵn sàng kỳ thi</span>
            </div>

            <div className="h-14 w-px bg-zinc-800" />

            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">
                  {progressData.currentStreak} ngày liên tục
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold font-mono text-emerald-300">
                  {progressData.rating} Elo Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-zinc-300">
                  <strong>{progressData.solvedProblemsCount}</strong> bài đã giải AC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Lessons Progress */}
        <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium block mb-1">Tiến độ bài giảng</span>
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {progressData.completedLessonsCount}
              <span className="text-xs font-normal text-zinc-500"> / {progressData.totalLessons}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">
              {progressData.lessonCompletionRate}% hoàn thành
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Problem Solving Progress */}
        <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium block mb-1">Ngân hàng bài tập AC</span>
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {progressData.solvedProblemsCount}
              <span className="text-xs font-normal text-zinc-500"> / {progressData.totalProblems}</span>
            </div>
            <span className="text-[11px] font-semibold text-blue-400">
              {progressData.problemSolvingRate}% kho bài tập
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-blue-400">
            <Terminal className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Submissions & Accuracy */}
        <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium block mb-1">Tổng lượt nộp code</span>
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {progressData.totalSubmissions}
            </div>
            <span className="text-[11px] font-semibold text-purple-400">
              AC: {progressData.verdictCounts['ACCEPTED'] || 0} lần
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <Code2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Difficulty Distribution */}
        <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium block mb-1">Phân bố bài đã giải</span>
            <div className="flex items-center gap-1.5 text-xs font-mono mt-1">
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                E: {progressData.solvedByDifficulty.EASY}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 font-bold">
                M: {progressData.solvedByDifficulty.MEDIUM}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 font-bold">
                H: {progressData.solvedByDifficulty.HARD}
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">Dễ / Trung bình / Khó</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-950/50 border border-amber-800/40 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Learning Path Progress Trackers (3 tracks) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            Tiến độ 3 Lộ Trình Huấn Luyện Chủ Lực
          </h2>
          {onNavigateToLearning && (
            <button
              onClick={onNavigateToLearning}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
            >
              Xem chi tiết lộ trình <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressData.pathProgress.map((p) => (
            <div
              key={p.path.id}
              className="p-5 bg-[#141418] border border-[#27272a] rounded-xl hover:border-zinc-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {p.path.badge}
                  </span>
                  <span className="text-xs font-bold font-mono text-zinc-200">{p.percent}%</span>
                </div>
                <h3 className="font-bold text-sm text-zinc-100 mb-1">{p.path.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{p.path.description}</p>
              </div>

              <div>
                {/* Progress Bar */}
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>
                    Bài giảng: <strong>{p.doneLessons}/{p.totalLessons}</strong>
                  </span>
                  <span>
                    Bài tập: <strong>{p.solvedProblems}/{p.totalProblems}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Mastery Matrix (Includes Strings, Math, Functions, Recursion, Backtracking) */}
      <div className="p-6 bg-[#141418] border border-[#27272a] rounded-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Bảng Đánh Giá Mức Độ Thành Thạo Chuyên Đề (Topic Mastery)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Theo dõi chi tiết từng mảng kiến thức: Chuỗi, Số học, Hàm, Đệ quy, Vét cạn, Mảng, Quy hoạch động.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm chuyên đề..."
                className="bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
              <button
                onClick={() => setTopicFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  topicFilter === 'ALL' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tất cả ({progressData.topicProgress.length})
              </button>
              <button
                onClick={() => setTopicFilter('MASTERED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  topicFilter === 'MASTERED'
                    ? 'bg-emerald-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Đã thành thạo
              </button>
              <button
                onClick={() => setTopicFilter('IN_PROGRESS')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  topicFilter === 'IN_PROGRESS'
                    ? 'bg-amber-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Đang học
              </button>
            </div>
          </div>
        </div>

        {/* Topics List Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTopics.map((item) => {
            const isMastered = item.status === 'MASTERED';
            const isStarted = item.status === 'IN_PROGRESS';

            return (
              <div
                key={item.topic.id}
                className="p-4 bg-[#18181c] border border-zinc-800 hover:border-zinc-700 rounded-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {item.topic.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isMastered
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : isStarted
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isMastered ? '✓ Đã thành thạo' : isStarted ? '⏳ Đang luyện' : 'Chưa bắt đầu'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-100 mb-1">{item.topic.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{item.topic.description}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">
                      Bài đọc: <strong>{item.doneLessons}/{item.totalLessons}</strong> • Bài AC:{' '}
                      <strong>{item.solvedProblems}/{item.totalProblems}</strong>
                    </span>
                    <span className="font-mono font-bold text-zinc-200">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMastered ? 'bg-emerald-500' : isStarted ? 'bg-amber-500' : 'bg-zinc-700'
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Recommended Milestones */}
        <div className="p-6 bg-[#141418] border border-[#27272a] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Đề Xuất Bước Luyện Tiếp Theo (Next Action)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Cá nhân hóa
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-200 block">Luyện bài tập: Xử lý Chuỗi (PALIN)</span>
                  <span className="text-zinc-400 text-[11px]">Kỹ thuật hai con trỏ kiểm tra tính đối xứng chuẩn hóa.</span>
                </div>
              </div>
              {onNavigateToProblems && (
                <button
                  onClick={onNavigateToProblems}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shrink-0"
                >
                  Làm ngay
                </button>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-200 block">Đọc bài giảng: Vét cạn & Thuật toán Quay lui</span>
                  <span className="text-zinc-400 text-[11px]">Nắm vững mô hình Try(i) giải quyết bài toán N Quân Hậu.</span>
                </div>
              </div>
              {onNavigateToLearning && (
                <button
                  onClick={onNavigateToLearning}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold transition shrink-0"
                >
                  Đọc ngay
                </button>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-200 block">Tham gia Thi thử Bảng B cuối tuần</span>
                  <span className="text-zinc-400 text-[11px]">Cọ xát áp lực phòng thi thật, kiểm tra điểm danh dự Elo.</span>
                </div>
              </div>
              {onNavigateToContests && (
                <button
                  onClick={onNavigateToContests}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold transition shrink-0"
                >
                  Đăng ký
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Recent Submissions History */}
        <div className="p-6 bg-[#141418] border border-[#27272a] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Lịch Sử Chấm Bài Gần Đây (Recent Activity)
            </h3>
            <span className="text-xs text-zinc-400 font-mono">{submissions.length} bài đã nộp</span>
          </div>

          <div className="space-y-2.5">
            {submissions.slice(0, 5).map((sub) => {
              const isAC = sub.verdict === 'ACCEPTED';
              return (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isAC ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-200 truncate block">
                        {sub.problemTitle || sub.problemId}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {sub.language.toUpperCase()} • {sub.executionTime}ms • {sub.memoryUsage}MB
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                      isAC
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {isAC ? 'ACCEPTED' : sub.verdict}
                  </span>
                </div>
              );
            })}

            {submissions.length === 0 && (
              <div className="py-8 text-center text-zinc-500 text-xs">
                Chưa có lượt nộp bài nào. Hãy bắt đầu giải bài tập đầu tiên!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
