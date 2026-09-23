import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Flame,
  LineChart,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Assignment, Problem, User } from '../../types';

interface StudentDashboardProps {
  onNavigate: (view: 'learning' | 'problems' | 'contests' | 'visualizer' | 'bookmarks' | 'progress' | 'profile') => void;
  onSelectProblem: (problem: Problem) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onSelectProblem,
}) => {
  const user = storageService.getCurrentUser();
  const profile = user.studentProfile || {
    school: 'THPT Chuyên',
    grade: 11,
    rating: 1450,
    target: 'HSG Tỉnh & Tin học trẻ Bảng B',
    currentStreak: 6,
    longestStreak: 14,
    problemsSolved: 18,
    totalSubmissions: 35,
    weakTopics: ['Đồ thị (Graph BFS/DFS)', 'Quy hoạch động 2 chiều'],
  };

  const recommendation = storageService.getRecommendation();
  const recentSubmissions = storageService.getSubmissions({ userId: user.id }).slice(0, 5);
  const upcomingContests = storageService.getContests().filter((c) => c.status !== 'ENDED');
  const assignments = storageService.getAssignments();
  const allProblems = storageService.getProblems();

  return (
    <div className="space-y-6">
      {/* Welcome & Target Banner */}
      <div className="bg-gradient-to-r from-emerald-950/30 via-[#18181c] to-zinc-900 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Khối {profile.grade} • {profile.school}
              </span>
              <span className="text-xs text-zinc-400">Mục tiêu: <strong className="text-zinc-200">{profile.target}</strong></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              Xin chào, {user.fullName}! 👋
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              Chào mừng bạn trở lại với đấu trường thuật toán AlgoArena. Hãy hoàn thành mục tiêu luyện thi hôm nay để giữ vững chuỗi phong độ!
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onNavigate('progress')}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950"
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Theo dõi tiến độ học tập</span>
              </button>
              <button
                onClick={() => onNavigate('learning')}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition border border-zinc-700 flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lộ trình chuyên đề</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-[#131316] p-3 rounded-xl border border-zinc-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-center">
              <Flame className="w-5 h-5 mx-auto mb-0.5" />
              <span className="text-xs font-bold">{profile.currentStreak} ngày</span>
              <span className="text-[9px] text-zinc-400 block">Streak</span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center">
              <Trophy className="w-5 h-5 mx-auto mb-0.5" />
              <span className="text-xs font-bold">{profile.rating}</span>
              <span className="text-[9px] text-zinc-400 block">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: "Hôm nay em nên học gì?" & Today's Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommendation Engine (8 Cols) */}
        <div className="lg:col-span-8 bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-100">Hôm nay em nên học gì?</h3>
                <p className="text-xs text-zinc-400">Gợi ý thông minh dựa trên kỹ năng còn yếu và mục tiêu thi</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('learning')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
            >
              Xem lộ trình <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weak Topics Callout */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300">
              <span className="font-bold text-amber-300">Vùng kiến thức cần củng cố:</span>{' '}
              {profile.weakTopics.join(', ')}. Chúng tôi ưu tiên các bài tập kiểm thử góc cạnh và kỹ thuật tối ưu thời gian.
            </div>
          </div>

          {/* Recommended Problem Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Bài tập thực chiến đề xuất hôm nay
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendation.recommendedProblems.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => onSelectProblem(prob)}
                  className="p-4 bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-800 hover:border-emerald-500/50 rounded-xl transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase mb-2 inline-block ${
                        prob.difficulty === 'BEGINNER'
                          ? 'bg-blue-950 text-blue-300'
                          : prob.difficulty === 'EASY'
                          ? 'bg-emerald-950 text-emerald-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {prob.rating} • {prob.difficulty}
                    </span>
                    <h5 className="font-semibold text-xs text-zinc-100 group-hover:text-emerald-400 transition line-clamp-2 mb-1">
                      {prob.title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{prob.topicTitle}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                    <span>Luyện ngay</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Goal (4 Cols) */}
        <div className="lg:col-span-4 bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-100">Mục tiêu hôm nay</h3>
                <p className="text-xs text-zinc-400">Duy trì thói quen mỗi ngày</p>
              </div>
            </div>

            {/* Solved Progress Bar */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-400">Số bài cần giải:</span>
                  <span className="font-mono font-bold text-zinc-200">
                    {recommendation.todayGoal.currentSolves} / {recommendation.todayGoal.targetSolves} bài
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{
                      width: `${(recommendation.todayGoal.currentSolves / recommendation.todayGoal.targetSolves) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Study Time Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-400">Thời gian luyện tập:</span>
                  <span className="font-mono font-bold text-zinc-200">
                    {recommendation.todayGoal.currentTimeMins} / {recommendation.todayGoal.targetTimeMins} phút
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{
                      width: `${(recommendation.todayGoal.currentTimeMins / recommendation.todayGoal.targetTimeMins) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <button
              onClick={() => onNavigate('visualizer')}
              className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 border border-zinc-700"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              Mở Visualizer Thuật Toán
            </button>

            <button
              onClick={() => onNavigate('problems')}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-emerald-950"
            >
              <Zap className="w-3.5 h-3.5" />
              Vào Kho Luyện Đề
            </button>
          </div>
        </div>
      </div>

      {/* Assignments from Teacher */}
      {assignments.length > 0 && (
        <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-100">
                  Bài Tập Về Nhà & Chuyên Đề Từ Thầy Cô
                </h3>
                <p className="text-xs text-zinc-400">
                  Nhiệm vụ được giao cho {profile.school} • Nộp đúng hạn để giáo viên chấm điểm
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((assign) => {
              const deadlineDate = new Date(assign.deadline);
              const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 3600 * 24));

              return (
                <div
                  key={assign.id}
                  className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/80 inline-block mb-1">
                        {assign.className}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-100">{assign.title}</h4>
                      <span className="text-[11px] text-zinc-400">Giao bởi: {assign.assignedBy}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
                        daysLeft <= 1
                          ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {daysLeft <= 0 ? 'Hết hạn' : `Còn ${daysLeft} ngày`}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400">{assign.description}</p>

                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <span className="text-[11px] font-semibold text-zinc-400 block">
                      Danh sách bài cần nộp ({assign.problemIds.length} bài • {assign.totalPoints}đ):
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {assign.problemIds.map((probId) => {
                        const prob = allProblems.find((p) => p.id === probId);
                        if (!prob) return null;
                        const isSolved = storageService.isProblemSolved(prob.id);

                        return (
                          <div
                            key={prob.id}
                            onClick={() => onSelectProblem(prob)}
                            className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/60 transition cursor-pointer flex items-center justify-between text-xs group"
                          >
                            <span className="text-zinc-200 group-hover:text-emerald-400 font-medium truncate">
                              • {prob.title}
                            </span>
                            {isSolved ? (
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                ✓ Đã AC 100đ
                              </span>
                            ) : (
                              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200">
                                Làm bài →
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lower Row: Upcoming Contests & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Contests (6 Cols) */}
        <div className="lg:col-span-6 bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Kỳ thi thử trực tuyến sắp diễn ra
            </h3>
            <button
              onClick={() => onNavigate('contests')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              Xem tất cả →
            </button>
          </div>

          <div className="space-y-3">
            {upcomingContests.map((contest) => (
              <div
                key={contest.id}
                onClick={() => onNavigate('contests')}
                className="p-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-xl transition cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        contest.status === 'RUNNING'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {contest.status === 'RUNNING' ? 'ĐANG DIỄN RA' : 'SẮP BẮT ĐẦU'}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{contest.durationMins} phút</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-emerald-400 transition">
                    {contest.title}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-zinc-300 block">
                    {contest.participants.length} thí sinh
                  </span>
                  <span className="text-[10px] text-zinc-400">Tham gia ngay</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions (6 Cols) */}
        <div className="lg:col-span-6 bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Lịch sử nộp bài gần đây
            </h3>
            <button
              onClick={() => onNavigate('problems')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Luyện tiếp →
            </button>
          </div>

          <div className="space-y-2.5">
            {recentSubmissions.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-4 text-center">Chưa có bài nộp nào.</p>
            ) : (
              recentSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        sub.verdict === 'ACCEPTED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {sub.verdict === 'ACCEPTED' ? 'ACCEPTED' : sub.verdict}
                    </span>
                    <span className="font-medium text-zinc-200 truncate max-w-[180px]">
                      {sub.problemTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
                    <span className="uppercase">{sub.language}</span>
                    <span>{sub.executionTime}s</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
