import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Award,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Flame,
  HelpCircle,
  Lock,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trophy,
  Unlock,
  Users,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Contest, Problem } from '../../types';

interface ContestArenaProps {
  onSelectProblem: (problem: Problem) => void;
}

export const ContestArena: React.FC<ContestArenaProps> = ({ onSelectProblem }) => {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [activeTab, setActiveTab] = useState<'problems' | 'scoreboard'>('problems');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(7200);
  const [isScoreboardFrozen, setIsScoreboardFrozen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'RUNNING' | 'UPCOMING' | 'ENDED'>('ALL');

  const contests = storageService.getContests();
  const allProblems = storageService.getProblems();
  const currentUser = storageService.getCurrentUser();

  // Simulated countdown timer for active contest
  useEffect(() => {
    if (selectedContest?.status === 'RUNNING') {
      const timer = setInterval(() => {
        setTimeLeftSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedContest?.status]);

  const formatSeconds = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleJoinContest = (contestId: string) => {
    storageService.joinContest(contestId);
    const updated = storageService.getContestById(contestId);
    if (updated) setSelectedContest(updated);
  };

  const handleExportCSV = () => {
    if (!selectedContest) return;
    const headers = ['Hang', 'Thi_sinh', 'Truong', 'Tong_diem', 'Penalty'];
    selectedContest.problems.forEach((p) => headers.push(`Bai_${p.problemCode}`));
    
    const rows = selectedContest.participants.map((part) => {
      const row = [part.rank, `"${part.fullName}"`, `"${part.school}"`, part.score, part.penalty];
      selectedContest.problems.forEach((p) => {
        const sub = part.submissions[p.problemId];
        row.push(sub ? (sub.solved ? `+${p.points}` : `-${sub.attempts}`) : '0');
      });
      return row.join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bang_diem_${selectedContest.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContests = contests.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {selectedContest ? (
        /* Inside a specific contest */
        <div className="space-y-6">
          {/* Top Contest Header Banner */}
          <div className="p-6 bg-[#18181c] border border-[#27272a] rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                onClick={() => setSelectedContest(null)}
                className="text-xs text-zinc-400 hover:text-emerald-400 transition font-medium mb-2 block"
              >
                ← Danh sách kỳ thi
              </button>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                {selectedContest.title}
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    selectedContest.status === 'RUNNING'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {selectedContest.status === 'RUNNING' ? 'ĐANG DIỄN RA' : 'SẮP BẮT ĐẦU'}
                </span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">{selectedContest.description}</p>
            </div>

            {/* Live Clock & Actions */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-semibold">
                  Thời gian còn lại:
                </span>
                <span className="font-mono text-xl font-bold text-emerald-400">
                  {formatSeconds(timeLeftSeconds)}
                </span>
              </div>

              <div className="h-8 w-px bg-zinc-700" />

              <button
                onClick={() => handleJoinContest(selectedContest.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-950"
              >
                Đăng Ký Tham Gia
              </button>
            </div>
          </div>

          {/* Exam Security Reminder Banner */}
          <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-amber-300">
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Chế độ phòng thi chính thức: Mọi lần nộp bài được ghi nhận và chống gian lận tự động theo chuẩn IOI/ICPC.
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              Thể thức: <strong className="text-zinc-200">{selectedContest.format || 'IOI'}</strong>
            </span>
          </div>

          {/* Contest Navigation Tabs */}
          <div className="flex items-center border-b border-[#27272a] bg-[#18181c] px-4 rounded-xl">
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === 'problems'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Bộ Đề Thi ({selectedContest.problems.length} bài)
            </button>
            <button
              onClick={() => setActiveTab('scoreboard')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === 'scoreboard'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Bảng Xếp Hạng Trực Tiếp (Live Leaderboard)
            </button>
          </div>

          {/* Content: Problems or Scoreboard */}
          {activeTab === 'problems' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedContest.problems.map((cp) => {
                const probObj = allProblems.find((p) => p.id === cp.problemId);
                const isSolved = probObj ? storageService.isProblemSolved(probObj.id) : false;

                return (
                  <div
                    key={cp.problemCode}
                    onClick={() => {
                      if (probObj) onSelectProblem(probObj);
                    }}
                    className="p-5 bg-[#18181c] hover:bg-[#202026] border border-[#27272a] rounded-xl transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 font-mono font-bold text-sm flex items-center justify-center text-emerald-400">
                        {cp.problemCode}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-zinc-100 group-hover:text-emerald-400 transition">
                          {cp.title}
                        </h4>
                        <span className="text-[11px] text-zinc-400">
                          Điểm tối đa: <strong className="text-zinc-200">{cp.points}đ</strong>
                        </span>
                      </div>
                    </div>

                    <div>
                      {isSolved ? (
                        <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-semibold">
                          Đã AC 100/100
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded font-medium">
                          Làm bài →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Live Scoreboard Table */
            <div className="bg-[#18181c] border border-[#27272a] rounded-xl overflow-hidden shadow-xl">
              {/* Scoreboard Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#121215] border-b border-[#27272a]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsScoreboardFrozen(!isScoreboardFrozen)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                      isScoreboardFrozen
                        ? 'bg-blue-950 text-blue-300 border-blue-800'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                    }`}
                  >
                    {isScoreboardFrozen ? <Lock className="w-3.5 h-3.5 text-blue-400" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
                    {isScoreboardFrozen ? 'Bảng điểm đang đóng băng' : 'Đóng băng 60 phút cuối'}
                  </button>
                  {isScoreboardFrozen && (
                    <span className="text-[11px] text-blue-400 italic">
                      (Bảo mật kết quả cho đến giờ trao giải)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  Xuất bảng điểm (CSV)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-[#121215] text-zinc-400 uppercase font-semibold text-[11px] border-b border-[#27272a]">
                    <tr>
                      <th className="py-3.5 px-4 w-12 text-center">Hạng</th>
                      <th className="py-3.5 px-4">Thí sinh</th>
                      <th className="py-3.5 px-4">Trường</th>
                      <th className="py-3.5 px-4 text-center">Tổng điểm</th>
                      <th className="py-3.5 px-4 text-center">Penalty</th>
                      {selectedContest.problems.map((p) => (
                        <th key={p.problemCode} className="py-3.5 px-4 text-center">
                          Bài {p.problemCode}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a]">
                    {selectedContest.participants.map((part) => (
                      <tr key={part.userId} className="hover:bg-zinc-800/40 transition">
                        <td className="py-3.5 px-4 text-center font-bold font-mono">
                          {part.rank === 1 ? (
                            <span className="text-amber-400">🥇 1</span>
                          ) : part.rank === 2 ? (
                            <span className="text-zinc-300">🥈 2</span>
                          ) : part.rank === 3 ? (
                            <span className="text-amber-600">🥉 3</span>
                          ) : (
                            part.rank
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-zinc-100 flex items-center gap-2">
                          <img
                            src={part.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full border border-zinc-700"
                          />
                          {part.fullName}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400">{part.school}</td>
                        <td className="py-3.5 px-4 text-center font-bold text-emerald-400 font-mono text-sm">
                          {part.score}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-zinc-400">
                          {part.penalty}
                        </td>
                        {selectedContest.problems.map((p) => {
                          const subInfo = part.submissions[p.problemId];
                          return (
                            <td key={p.problemId} className="py-3.5 px-4 text-center font-mono">
                              {subInfo && subInfo.solved ? (
                                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 text-[11px]">
                                  +{p.points}
                                </span>
                              ) : subInfo ? (
                                <span className="text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800 text-[11px]">
                                  -{subInfo.attempts}
                                </span>
                              ) : (
                                <span className="text-zinc-600">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Contests Overview List */
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-950/40 via-[#18181c] to-zinc-900 border border-purple-500/20 rounded-2xl p-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold mb-3">
                <Trophy className="w-3.5 h-3.5" />
                Đấu Trường Thi Thử Trực Tuyến
              </div>
              <h1 className="text-2xl font-bold text-zinc-100 mb-2">
                Kỳ Thi Thử Chuẩn Cấu Trúc Tin Học Trẻ & HSG
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Được biên soạn bởi đội ngũ cựu thí sinh đoạt giải quốc gia và giáo viên chuyên Tin. 
                Hệ thống chấm tự động với bảng xếp hạng thời gian thực và tính phạt penalty theo chuẩn ICPC/VNOI.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: `Tất cả (${contests.length})` },
              { id: 'RUNNING', label: 'Đang diễn ra' },
              { id: 'UPCOMING', label: 'Sắp diễn ra' },
              { id: 'ENDED', label: 'Đã kết thúc' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterStatus === f.id
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-[#18181c] text-zinc-400 hover:text-zinc-200 border border-[#27272a]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredContests.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedContest(c)}
                className="p-5 bg-[#18181c] hover:bg-[#202026] border border-[#27272a] rounded-xl transition cursor-pointer flex flex-wrap items-center justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        c.status === 'RUNNING'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                          : c.status === 'UPCOMING'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {c.status === 'RUNNING'
                        ? 'ĐANG DIỄN RA'
                        : c.status === 'UPCOMING'
                        ? 'SẮP BẮT ĐẦU'
                        : 'ĐÃ KẾT THÚC'}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Thời lượng: {c.durationMins} phút
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition">
                    {c.title}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xl">{c.description}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-zinc-200">
                      {c.problems.length} bài toán
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {c.participants.length} thí sinh đã đăng ký
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-950">
                    Vào phòng thi →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
