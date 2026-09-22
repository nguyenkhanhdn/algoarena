import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Crown,
  Eye,
  FileCode,
  Flame,
  GraduationCap,
  LineChart,
  MapPin,
  Medal,
  Play,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Achievement, Problem, Submission, Verdict } from '../../types';

interface ProfileHubProps {
  onSelectProblem: (problem: Problem) => void;
  onNavigateToContests?: () => void;
  onNavigateToProblems?: () => void;
}

export const ProfileHub: React.FC<ProfileHubProps> = ({
  onSelectProblem,
  onNavigateToContests,
  onNavigateToProblems,
}) => {
  const currentUser = storageService.getCurrentUser();
  const profile = currentUser.studentProfile;
  const allSubmissions = storageService.getSubmissions({ userId: currentUser.id });
  const allProblems = storageService.getProblems();
  const achievements = storageService.getAchievements();

  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'achievements'>('overview');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filterVerdict, setFilterVerdict] = useState<string>('ALL');
  const [filterLang, setFilterLang] = useState<string>('ALL');
  const [searchProblem, setSearchProblem] = useState<string>('');

  // Rating History mock data points for Elo progression
  const ratingHistory = [
    { contest: 'Khởi tạo rating ban đầu', date: '01/09', rating: 1200, change: 0 },
    { contest: 'Contest 01 - Tiền Đề HSG', date: '10/09', rating: 1285, change: +85 },
    { contest: 'Luyện tập Bảng B Tuần 2', date: '18/09', rating: 1360, change: +75 },
    { contest: 'Thử thách Thuật toán Tháng 9', date: '25/09', rating: 1420, change: +60 },
    { contest: 'Vòng sơ loại Tin học trẻ 2026', date: '02/10', rating: 1480, change: +60 },
  ];

  // Algorithmic Skills radar metrics
  const skillMetrics = [
    { label: 'Tìm kiếm nhị phân & Hai con trỏ', level: 95, color: '#10b981', count: '12/12 bài' },
    { label: 'Mảng cộng dồn & Mảng hiệu', level: 90, color: '#059669', count: '10/11 bài' },
    { label: 'Quy hoạch động (DP)', level: 80, color: '#3b82f6', count: '8/10 bài' },
    { label: 'Số học & Tham lam', level: 82, color: '#8b5cf6', count: '9/11 bài' },
    { label: 'Đồ thị & BFS/DFS', level: 68, color: '#f59e0b', count: '5/8 bài' },
    { label: 'Cấu trúc dữ liệu (ST/BIT)', level: 60, color: '#ef4444', count: '3/6 bài' },
  ];

  // Filter submissions
  const filteredSubmissions = allSubmissions.filter((sub) => {
    if (filterVerdict !== 'ALL' && sub.verdict !== filterVerdict) return false;
    if (filterLang !== 'ALL' && sub.language !== filterLang) return false;
    if (searchProblem.trim()) {
      const matchTitle = sub.problemTitle?.toLowerCase().includes(searchProblem.toLowerCase());
      const matchId = sub.problemId.toLowerCase().includes(searchProblem.toLowerCase());
      if (!matchTitle && !matchId) return false;
    }
    return true;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-yellow-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-400" />;
      default: return <Medal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Banner & Hero Info */}
      <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-20 h-20 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400 shadow-md">
                10 Tin
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-100">{currentUser.fullName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold">
                  @{currentUser.username}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-semibold">
                  Học sinh Chuyên Tin
                </span>
              </div>

              {profile && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                    {profile.school}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {profile.province}
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-medium">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    Mục tiêu: {profile.target}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Stat Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Rating</span>
              <span className="text-lg font-black font-mono text-emerald-400">
                {profile?.rating || 1480}
              </span>
              <span className="text-[10px] text-zinc-500 block">Candidate Master</span>
            </div>

            <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Đã AC</span>
              <span className="text-lg font-black font-mono text-zinc-100">
                {profile?.problemsSolved || 28}
              </span>
              <span className="text-[10px] text-zinc-500 block">bài toán</span>
            </div>

            <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Chuỗi Streak</span>
              <div className="flex items-center justify-center gap-1 text-amber-400 text-lg font-black font-mono">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{profile?.currentStreak || 6}</span>
              </div>
              <span className="text-[10px] text-zinc-500 block">ngày liên tục</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800">
          {[
            { id: 'overview', label: 'Tổng quan & Năng lực', icon: LineChart },
            { id: 'submissions', label: `Lịch sử nộp bài (${allSubmissions.length})`, icon: Code2 },
            { id: 'achievements', label: `Huy hiệu & Thành tựu (${achievements.length})`, icon: Trophy },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                  activeTab === t.id
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800 shadow-sm'
                    : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Rating History Chart & Weak/Strong Topics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Rating Evolution Graph */}
            <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-emerald-400" />
                    Biểu Đồ Tăng Trưởng Rating Thi Đấu (Elo Graph)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Theo dõi sự tiến bộ qua từng kỳ thi thử HSG & Tin học trẻ
                  </p>
                </div>
                <button
                  onClick={onNavigateToContests}
                  className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-900 transition flex items-center gap-1"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  Đăng ký thi tiếp
                </button>
              </div>

              {/* Visual SVG Rating Timeline */}
              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
                <div className="relative h-44 w-full flex items-end justify-between px-6 pt-6">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-20">
                    <div className="border-b border-zinc-500 w-full" />
                    <div className="border-b border-zinc-500 w-full" />
                    <div className="border-b border-zinc-500 w-full" />
                  </div>

                  {/* Nodes and Polyline */}
                  {ratingHistory.map((item, idx) => {
                    const minR = 1150;
                    const maxR = 1550;
                    const pct = ((item.rating - minR) / (maxR - minR)) * 100;

                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center group relative z-10"
                        style={{ height: `${pct}%` }}
                      >
                        {/* Rating change bubble */}
                        <div className="mb-2 opacity-90 group-hover:opacity-100 transition text-[10px] font-mono font-bold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-200 shadow-md">
                          {item.rating}
                          {item.change > 0 && (
                            <span className="text-emerald-400 ml-1">+{item.change}</span>
                          )}
                        </div>

                        {/* Dot indicator */}
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-lg shadow-emerald-500/50 group-hover:scale-125 transition" />

                        {/* Date label */}
                        <span className="text-[10px] font-mono text-zinc-400 mt-2">
                          {item.date}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span>Mức xuất phát: <strong>1200</strong> (Beginner)</span>
                  <span>Hiện tại: <strong className="text-emerald-400">1480</strong> (Candidate Master)</span>
                  <span>Mục tiêu: <strong className="text-amber-400">1600+</strong> (Master HSG)</span>
                </div>
              </div>
            </div>

            {/* Weak & Strong Topics analysis */}
            <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                Chẩn Đoán Chủ Đề Mạnh & Điểm Yếu Cần Khắc Phục
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strong Topics */}
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    Chủ Đề Sở Trường (Tỷ lệ AC &gt; 85%)
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Tìm kiếm nhị phân trên tập kết quả
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Mảng cộng dồn 1D & 2D (Prefix Sum)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Hai con trỏ co giãn đoạn (Two Pointers)
                    </li>
                  </ul>
                </div>

                {/* Weak Topics */}
                <div className="p-4 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                    <Sparkles className="w-4 h-4" />
                    Chủ Đề Cần Cải Thiện (Weak Topics)
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Đồ thị: Thuật toán Dijkstra tìm đường đi
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Quy hoạch động trên cây (Tree DP)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Cây phân đoạn (Segment Tree Lazy Update)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Algorithmic Skill Radar Bars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Chỉ Số Năng Lực Thuật Toán (Skill Radar)
                </h3>
                <p className="text-xs text-zinc-400">
                  Đo lường mức độ thành thạo các dạng đề thi HSG cấp Tỉnh / Quốc gia
                </p>
              </div>

              <div className="space-y-4">
                {skillMetrics.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-200">{skill.label}</span>
                      <span className="font-mono text-zinc-400 font-semibold">{skill.count}</span>
                    </div>

                    <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                  <span>Khuyên dùng bài tập hôm nay:</span>
                  <button
                    onClick={() => {
                      const recoProb = allProblems.find((p) => p.tags.includes('Graph') || p.tags.includes('DP'));
                      if (recoProb) onSelectProblem(recoProb);
                    }}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Luyện Đồ thị Dijkstra →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Submissions History */}
      {activeTab === 'submissions' && (
        <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Toàn Bộ Lịch Sử Nộp Bài ({filteredSubmissions.length})
            </h3>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <input
                type="text"
                placeholder="Tìm bài toán..."
                value={searchProblem}
                onChange={(e) => setSearchProblem(e.target.value)}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
              />

              <select
                value={filterVerdict}
                onChange={(e) => setFilterVerdict(e.target.value)}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 text-xs focus:outline-none"
              >
                <option value="ALL">Mọi kết quả</option>
                <option value="ACCEPTED">ACCEPTED (100đ)</option>
                <option value="WRONG_ANSWER">WRONG ANSWER</option>
                <option value="TIME_LIMIT_EXCEEDED">TIME LIMIT EXCEEDED</option>
              </select>

              <select
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 text-xs focus:outline-none"
              >
                <option value="ALL">Mọi ngôn ngữ</option>
                <option value="python">Python 3</option>
                <option value="cpp">C++ 20</option>
              </select>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-semibold">
                  <th className="p-3">Mã nộp</th>
                  <th className="p-3">Bài toán</th>
                  <th className="p-3">Ngôn ngữ</th>
                  <th className="p-3">Kết quả</th>
                  <th className="p-3">Điểm</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Bộ nhớ</th>
                  <th className="p-3">Thời điểm</th>
                  <th className="p-3 text-right">Mã nguồn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-zinc-500 italic">
                      Không có bài nộp nào phù hợp bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => {
                    const prob = allProblems.find((p) => p.id === sub.problemId);
                    return (
                      <tr key={sub.id} className="hover:bg-zinc-800/30 transition">
                        <td className="p-3 font-mono text-zinc-400">{sub.id.substring(0, 8)}</td>
                        <td className="p-3">
                          <button
                            onClick={() => prob && onSelectProblem(prob)}
                            className="font-medium text-zinc-200 hover:text-emerald-400 transition truncate max-w-[200px] block"
                          >
                            {sub.problemTitle || sub.problemId}
                          </button>
                        </td>
                        <td className="p-3 font-mono uppercase text-zinc-400">{sub.language}</td>
                        <td className="p-3">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-[10px] font-mono ${
                              sub.verdict === 'ACCEPTED'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {sub.verdict}
                          </span>
                        </td>
                        <td className="p-3 font-bold font-mono text-zinc-200">{sub.score}đ</td>
                        <td className="p-3 font-mono text-zinc-400">{sub.executionTime}s</td>
                        <td className="p-3 font-mono text-zinc-400">{sub.memoryUsage}MB</td>
                        <td className="p-3 text-zinc-500">
                          {new Date(sub.submittedAt).toLocaleString('vi-VN')}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedSubmission(sub)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-medium transition"
                          >
                            Xem code
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Achievements */}
      {activeTab === 'achievements' && (
        <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Kho Huy Hiệu & Danh Hiệu Đạt Được ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </h3>
            <p className="text-xs text-zinc-400">
              Hoàn thành các mốc thử thách để mở khóa danh hiệu vinh danh trên bảng xếp hạng toàn quốc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border transition space-y-3 ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-emerald-500/30 shadow-lg'
                    : 'bg-zinc-900/40 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-md">
                    {getBadgeIcon(ach.badgeIcon)}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      ach.unlocked
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {ach.unlocked ? 'Đã mở khóa' : 'Chưa đạt'}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-zinc-100">{ach.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{ach.description}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>Tiến trình:</span>
                    <span>
                      {ach.progress}/{ach.maxProgress}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        ach.unlocked ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Code Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181c] border border-zinc-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-zinc-100">
                  Chi tiết mã nguồn nộp bài #{selectedSubmission.id}
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {selectedSubmission.problemTitle} • Ngôn ngữ: {selectedSubmission.language.toUpperCase()} • Kết quả: {selectedSubmission.verdict} ({selectedSubmission.score}đ)
                </span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-lg bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-black/60">
              <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
                {selectedSubmission.sourceCode}
              </pre>
            </div>

            <div className="p-4 border-t border-zinc-800 bg-[#16161a] flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">
                Thời gian chạy: {selectedSubmission.executionTime}s • Bộ nhớ: {selectedSubmission.memoryUsage}MB
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedSubmission.sourceCode);
                  alert('Đã sao chép mã nguồn!');
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition"
              >
                Sao chép mã nguồn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
