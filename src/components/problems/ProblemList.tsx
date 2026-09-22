import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Circle,
  Filter,
  Flame,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Difficulty, Problem } from '../../types';

interface ProblemListProps {
  onSelectProblem: (problem: Problem) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({ onSelectProblem }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SOLVED' | 'UNSOLVED'>('ALL');
  const [sortBy, setSortBy] = useState<'rating_asc' | 'rating_desc' | 'title'>('rating_asc');

  const allProblems = storageService.getProblems();
  const allTopics = storageService.getTopics();

  const filteredProblems = useMemo(() => {
    return allProblems
      .filter((p) => {
        // Keyword Search
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Topic Filter
        if (selectedTopic !== 'ALL' && p.topicId !== selectedTopic) {
          return false;
        }

        // Difficulty Filter
        if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
          return false;
        }

        // Solved status
        const isSolved = storageService.isProblemSolved(p.id);
        if (statusFilter === 'SOLVED' && !isSolved) return false;
        if (statusFilter === 'UNSOLVED' && isSolved) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating_asc') return a.rating - b.rating;
        if (sortBy === 'rating_desc') return b.rating - a.rating;
        return a.title.localeCompare(b.title);
      });
  }, [allProblems, searchQuery, selectedTopic, selectedDifficulty, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#18181c] to-zinc-900 border border-[#27272a] rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Ngân Hàng Bài Tập Thuật Toán HSG & Tin Học Trẻ
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mb-2">
            Luyện Đề Thực Chiến & Chinh Phục Điểm Tuyệt Đối
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Hơn 40 bài tập phân hóa theo độ khó từ 800 đến 2000 điểm chuẩn VNOI / Codeforces. 
            Mỗi bài đều có giới hạn thời gian (Time Limit) và bộ nhớ (Memory Limit) chuẩn thi đấu.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bài, tag (Binary Search, DP, BFS)..."
              className="w-full bg-[#121214] border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-zinc-400"
            />
          </div>

          {/* Topic Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="ALL">Tất cả chủ đề ({allTopics.length})</option>
              {allTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div className="md:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="ALL">Mọi độ khó</option>
              <option value="BEGINNER">Beginner (800)</option>
              <option value="EASY">Easy (1000 - 1200)</option>
              <option value="MEDIUM">Medium (1300 - 1500)</option>
              <option value="HARD">Hard (1600+)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            {(['ALL', 'UNSOLVED', 'SOLVED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition border ${
                  statusFilter === s
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-zinc-700'
                }`}
              >
                {s === 'ALL' ? 'Tất cả' : s === 'UNSOLVED' ? 'Chưa giải' : 'Đã AC'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Table */}
      <div className="bg-[#18181c] border border-[#27272a] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-[#121215] text-zinc-400 uppercase font-semibold text-[11px] border-b border-[#27272a]">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Trạng thái</th>
                <th className="py-3.5 px-4">Tên bài toán</th>
                <th className="py-3.5 px-4">Chủ đề</th>
                <th className="py-3.5 px-4 text-center">Độ khó / Rating</th>
                <th className="py-3.5 px-4">Tags</th>
                <th className="py-3.5 px-4 text-right">Tỉ lệ AC</th>
                <th className="py-3.5 px-4 text-center w-16">Lưu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    Không tìm thấy bài toán nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((problem) => {
                  const isSolved = storageService.isProblemSolved(problem.id);
                  const isBm = storageService.isBookmarked(problem.id);
                  const acRate =
                    problem.totalSubmissions > 0
                      ? Math.round((problem.acceptedSubmissions / problem.totalSubmissions) * 100)
                      : 0;

                  return (
                    <tr
                      key={problem.id}
                      onClick={() => onSelectProblem(problem)}
                      className="hover:bg-zinc-800/50 transition cursor-pointer group"
                    >
                      {/* Solved Icon */}
                      <td className="py-3.5 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <Circle className="w-4 h-4 text-zinc-600 mx-auto group-hover:text-zinc-400" />
                        )}
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4 font-medium text-zinc-100 group-hover:text-emerald-400 transition">
                        <div className="flex items-center gap-2">
                          <span>{problem.title}</span>
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4 text-zinc-400 text-[11px]">
                        {problem.topicTitle}
                      </td>

                      {/* Difficulty & Rating */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                            problem.difficulty === 'BEGINNER'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : problem.difficulty === 'EASY'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : problem.difficulty === 'MEDIUM'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {problem.rating}
                        </span>
                      </td>

                      {/* Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* AC Rate */}
                      <td className="py-3.5 px-4 text-right font-mono text-zinc-400 text-[11px]">
                        {acRate}% <span className="text-[9px] text-zinc-400">({problem.acceptedSubmissions})</span>
                      </td>

                      {/* Bookmark icon */}
                      <td
                        className="py-3.5 px-4 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          storageService.toggleBookmark('PROBLEM', problem.id, problem.title);
                        }}
                      >
                        {isBm ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-400 mx-auto" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-zinc-600 hover:text-zinc-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
