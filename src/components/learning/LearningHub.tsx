import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Flame,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { LearningPath, Lesson, Problem, Topic } from '../../types';
import { AlgoCheatSheet } from './AlgoCheatSheet';

interface LearningHubProps {
  onOpenVisualizer: (algo?: any) => void;
  onSelectProblem: (problem: Problem) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({
  onOpenVisualizer,
  onSelectProblem,
}) => {
  const [selectedPathId, setSelectedPathId] = useState<string>('path-1');
  const [mainMode, setMainMode] = useState<'roadmap' | 'snippets'>('roadmap');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const paths = storageService.getLearningPaths();
  const allTopics = storageService.getTopics();

  const currentPath = paths.find((p) => p.id === selectedPathId) || paths[0];
  const currentPathTopics = allTopics.filter((t) => t.pathId === (currentPath ? currentPath.id : selectedPathId));

  // When a topic is selected, fetch its lessons
  const topicLessons = selectedTopic ? storageService.getLessonsByTopic(selectedTopic.id) : [];

  const handleToggleLessonComplete = (lessonId: string) => {
    storageService.toggleLessonCompleted(lessonId);
    // Force re-render
    setSelectedLesson((prev) => (prev ? { ...prev } : null));
  };

  return (
    <div className="space-y-6">
      {/* Top Switcher Navigation */}
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-xl p-1 text-xs">
          <button
            onClick={() => setMainMode('roadmap')}
            className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${
              mainMode === 'roadmap'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Lộ Trình & Chuyên Đề Học
          </button>
          <button
            onClick={() => setMainMode('snippets')}
            className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${
              mainMode === 'snippets'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Sổ Tay Code Mẫu Chuẩn HSG
          </button>
        </div>
      </div>

      {mainMode === 'snippets' ? (
        <AlgoCheatSheet />
      ) : selectedLesson && selectedTopic ? (
        <div className="space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#18181c] border border-[#27272a] rounded-xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <button
                onClick={() => setSelectedLesson(null)}
                className="hover:text-emerald-400 transition flex items-center gap-1 font-medium"
              >
                ← {selectedTopic.title}
              </button>
              <span>/</span>
              <span className="text-zinc-200 font-semibold">{selectedLesson.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedTopic.slug.includes('binary-search')) onOpenVisualizer('BINARY_SEARCH');
                  else if (selectedTopic.slug.includes('prefix-sum')) onOpenVisualizer('PREFIX_SUM');
                  else if (selectedTopic.slug.includes('two-pointers')) onOpenVisualizer('TWO_POINTERS');
                  else onOpenVisualizer();
                }}
                className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                Mở Visualizer mô phỏng
              </button>

              <button
                onClick={() => handleToggleLessonComplete(selectedLesson.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                  storageService.isLessonCompleted(selectedLesson.id)
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {storageService.isLessonCompleted(selectedLesson.id)
                  ? 'Đã hoàn thành'
                  : 'Đánh dấu hoàn thành'}
              </button>
            </div>
          </div>

          {/* Lesson Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Theory & Visual Content */}
              <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    Bài giảng lý thuyết & Cài đặt chuẩn thi đấu
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-100">{selectedLesson.title}</h1>
                  <p className="text-xs text-zinc-400 mt-1">Bài số {selectedLesson.order} trong chuyên đề</p>
                </div>

                {/* Markdown / Content Body */}
                <div className="text-sm text-zinc-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {selectedLesson.content}
                </div>

                {/* Code Snippet Box */}
                {(selectedLesson.samplePython || selectedLesson.sampleCpp) && (
                  <div className="border border-zinc-800 rounded-xl overflow-hidden bg-[#0d0d10]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#141418] border-b border-zinc-800 text-xs">
                      <span className="font-mono font-semibold text-emerald-400 flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Mã nguồn chuẩn mẫu (Standard Implementation)
                      </span>
                      <button
                        onClick={() => {
                          const code = selectedLesson.samplePython || selectedLesson.sampleCpp || '';
                          navigator.clipboard.writeText(code);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 1500);
                        }}
                        className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedCode ? 'Đã chép' : 'Sao chép'}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      {selectedLesson.samplePython || selectedLesson.sampleCpp}
                    </pre>
                  </div>
                )}
              </div>

              {/* Common Pitfalls / Bẫy thường gặp trong kỳ thi */}
              {selectedLesson.commonMistakes && selectedLesson.commonMistakes.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-rose-400" />
                    Bẫy thuật toán & Sai lầm phổ biến cần tránh
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {selectedLesson.commonMistakes.map((pitfall: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Sidebar: Complexity, Practice Problems */}
            <div className="lg:col-span-4 space-y-5">
              {/* Complexity Card */}
              <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Độ phức tạp tính toán
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">Thời gian (Time):</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {selectedLesson.timeComplexity || 'O(log N)'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">Bộ nhớ (Space):</span>
                    <span className="font-bold text-blue-400 text-sm">
                      {selectedLesson.spaceComplexity || 'O(1)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Practice Problems for this Lesson */}
              <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Bài tập thực hành đề xuất
                </h4>
                <div className="space-y-2">
                  {storageService
                    .getProblems()
                    .filter((p) => p.topicId === selectedTopic.id)
                    .slice(0, 3)
                    .map((prob) => {
                      const isSolved = storageService.isProblemSolved(prob.id);
                      return (
                        <div
                          key={prob.id}
                          onClick={() => onSelectProblem(prob)}
                          className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="text-xs font-semibold text-zinc-200 block truncate max-w-[200px]">
                              {prob.title}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              Độ khó: {prob.rating} • {prob.difficulty}
                            </span>
                          </div>
                          {isSolved ? (
                            <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                              Đã AC
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                              Luyện ngay
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Next Lessons in Topic */}
              <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Các bài học khác trong chuyên đề
                </h4>
                <div className="space-y-1.5">
                  {topicLessons.map((l) => {
                    const isCurrent = l.id === selectedLesson.id;
                    const isDone = storageService.isLessonCompleted(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => setSelectedLesson(l)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between ${
                          isCurrent
                            ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30'
                            : 'hover:bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        <span className="truncate pr-2">{l.title}</span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : selectedTopic ? (
        /* Topic Detail: 5 Progression Levels */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedTopic(null)}
            className="text-xs text-zinc-400 hover:text-emerald-400 transition flex items-center gap-1 font-medium"
          >
            ← Quay lại danh sách chuyên đề
          </button>

          <div className="bg-gradient-to-r from-zinc-900 to-[#18181c] border border-[#27272a] rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Chuyên Đề Thuật Toán
                </span>
                <h1 className="text-2xl font-bold text-zinc-100">{selectedTopic.title}</h1>
                <p className="text-sm text-zinc-400 mt-2 max-w-2xl">{selectedTopic.description}</p>
              </div>

              <button
                onClick={() => {
                  if (selectedTopic.slug.includes('binary-search')) onOpenVisualizer('BINARY_SEARCH');
                  else if (selectedTopic.slug.includes('prefix-sum')) onOpenVisualizer('PREFIX_SUM');
                  else if (selectedTopic.slug.includes('two-pointers')) onOpenVisualizer('TWO_POINTERS');
                  else onOpenVisualizer();
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950"
              >
                <Play className="w-4 h-4" />
                Mở Visualizer Thuật Toán
              </button>
            </div>
          </div>

          {/* Lessons List - 5 Level Progression */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              Lộ trình 5 bước chinh phục (5-Level Progression)
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {topicLessons.map((lesson, index) => {
                const isCompleted = storageService.isLessonCompleted(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className="p-4 bg-[#18181c] hover:bg-[#202026] border border-[#27272a] rounded-xl transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-zinc-100 text-sm group-hover:text-emerald-400 transition">
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                            Bài {lesson.order}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                          {lesson.content.substring(0, 110)}...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                        {lesson.timeComplexity}
                      </span>
                      <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-zinc-200 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Path View: Overview of 3 Tracks and Topics */
        <div className="space-y-6">
          {/* Path Switcher Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paths.map((p) => {
              const isSelected = p.id === selectedPathId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPathId(p.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/20 border-emerald-500 text-zinc-100 shadow-lg'
                      : 'bg-[#18181c] border-[#27272a] hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {p.badge}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{p.topicsCount} Chuyên đề</span>
                  </div>
                  <h3 className="font-bold text-sm text-zinc-100 mb-1">{p.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
                </div>
              );
            })}
          </div>

          {/* Topics Grid for Selected Path */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Các chuyên đề thuộc lộ trình ({currentPathTopics.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPathTopics.map((topic) => {
                const topicLessonsList = storageService.getLessonsByTopic(topic.id);
                const completedCount = topicLessonsList.filter((l) =>
                  storageService.isLessonCompleted(l.id)
                ).length;
                const progressPct =
                  topicLessonsList.length > 0
                    ? Math.round((completedCount / topicLessonsList.length) * 100)
                    : 0;

                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="p-5 bg-[#18181c] hover:bg-[#202026] border border-[#27272a] rounded-xl transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase">
                          {topic.levelBadge}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {completedCount}/{topicLessonsList.length} bài hoàn thành
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-zinc-100 group-hover:text-emerald-400 transition mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span>Tiến độ học tập</span>
                        <span className="font-bold text-zinc-200">{progressPct}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
