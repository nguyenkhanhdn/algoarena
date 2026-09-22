import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  FilePlus,
  GraduationCap,
  Plus,
  Save,
  Search,
  Sliders,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Assignment, Contest, Difficulty, Problem } from '../../types';

interface TeacherDashboardProps {
  onProblemCreated?: (newProb: Problem) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onProblemCreated }) => {
  const [activeTab, setActiveTab] = useState<
    'students' | 'assignments' | 'create_problem' | 'create_contest' | 'reports'
  >('students');

  // New problem form states
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDifficulty, setNewDifficulty] = useState<Difficulty>('EASY');
  const [newRating, setNewRating] = useState<number>(1100);
  const [newTopicId, setNewTopicId] = useState<string>('topic-binary-search');
  const [newStatement, setNewStatement] = useState<string>('');
  const [newInputFormat, setNewInputFormat] = useState<string>('');
  const [newOutputFormat, setNewOutputFormat] = useState<string>('');
  const [newSampleInput, setNewSampleInput] = useState<string>('');
  const [newSampleOutput, setNewSampleOutput] = useState<string>('');
  const [newSolutionPython, setNewSolutionPython] = useState<string>('');
  const [isSuccessCreated, setIsSuccessCreated] = useState<boolean>(false);

  // Assignment states
  const [assignments, setAssignments] = useState<Assignment[]>(storageService.getAssignments());
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState<boolean>(false);
  const [assignTitle, setAssignTitle] = useState<string>('');
  const [assignClass, setAssignClass] = useState<string>('Đội tuyển HSG Tin 11');
  const [assignDesc, setAssignDesc] = useState<string>('');
  const [assignDeadlineDays, setAssignDeadlineDays] = useState<number>(5);
  const [assignProblemIds, setAssignProblemIds] = useState<string[]>([]);

  // Contest creator states
  const [contestTitle, setContestTitle] = useState<string>('');
  const [contestDuration, setContestDuration] = useState<number>(120);
  const [contestFormat, setContestFormat] = useState<'ICPC' | 'IOI'>('IOI');
  const [contestDesc, setContestDesc] = useState<string>('');
  const [contestProblemIds, setContestProblemIds] = useState<string[]>([]);
  const [contestSuccessMsg, setContestSuccessMsg] = useState<string>('');

  const allProblems = storageService.getProblems();

  const topics = storageService.getTopics();
  const students = [
    {
      id: 's1',
      name: 'Nguyễn Hoàng Nam',
      school: 'THPT Chuyên Lê Hồng Phong',
      grade: 'Lớp 11 Tin',
      rating: 1450,
      solved: 24,
      streak: 6,
      progress: 68,
      status: 'Tích cực',
    },
    {
      id: 's2',
      name: 'Trần Thị Mai',
      school: 'THCS & THPT Nguyễn Khuyến',
      grade: 'Lớp 9',
      rating: 1220,
      solved: 16,
      streak: 4,
      progress: 45,
      status: 'Cần hỗ trợ DP',
    },
    {
      id: 's3',
      name: 'Lê Quốc Bảo',
      school: 'THPT Chuyên KHTN Hà Nội',
      grade: 'Lớp 10 Tin',
      rating: 1680,
      solved: 38,
      streak: 12,
      progress: 88,
      status: 'Xuất sắc',
    },
    {
      id: 's4',
      name: 'Phạm Đăng Khoa',
      school: 'THPT Chuyên Thăng Long',
      grade: 'Lớp 11 Tin',
      rating: 1350,
      solved: 19,
      streak: 3,
      progress: 52,
      status: 'Tích cực',
    },
  ];

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStatement.trim()) return;

    const topicObj = topics.find((t) => t.id === newTopicId);

    const created: Problem = {
      id: 'prob-custom-' + Date.now(),
      topicId: newTopicId,
      topicTitle: topicObj?.title || 'Thuật toán',
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      difficulty: newDifficulty,
      rating: newRating,
      statement: newStatement,
      inputFormat: newInputFormat,
      outputFormat: newOutputFormat,
      constraints: 'N <= 10^5. Thời gian <= 1.0s, bộ nhớ <= 256MB.',
      sampleInput: newSampleInput || '5\n1 2 3 4 5',
      sampleOutput: newSampleOutput || '15',
      sampleExplanation: 'Dữ liệu mẫu do giáo viên khởi tạo.',
      hints: ['Kiểm tra các trường hợp góc (Boundary cases).'],
      editorial: 'Thuật toán tối ưu cài đặt bằng Python / C++.',
      solutionPython: newSolutionPython,
      timeLimit: 1.0,
      memoryLimit: 256,
      tags: ['Đề giáo viên', topicObj?.title || 'Thuật toán'],
      totalSubmissions: 0,
      acceptedSubmissions: 0,
      testCases: [
        {
          id: 'tc-c1',
          input: newSampleInput || '5\n1 2 3 4 5',
          expectedOutput: newSampleOutput || '15',
          isHidden: false,
          scoreWeight: 50,
        },
        {
          id: 'tc-c2',
          input: '3\n10 20 30',
          expectedOutput: '60',
          isHidden: true,
          scoreWeight: 50,
        },
      ],
    };

    storageService.addProblem(created);
    setIsSuccessCreated(true);
    if (onProblemCreated) onProblemCreated(created);

    // Reset form
    setNewTitle('');
    setNewStatement('');
    setNewInputFormat('');
    setNewOutputFormat('');
    setNewSampleInput('');
    setNewSampleOutput('');
    setNewSolutionPython('');
    setTimeout(() => setIsSuccessCreated(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#18181c] border border-[#27272a] rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold mb-2">
            <GraduationCap className="w-4 h-4" />
            Bảng Quản Lý Dành Cho Giáo Viên & Huấn Luyện Viên
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">
            Giám Sát Tiến Độ Học Sinh & Quản Trị Đề Thi
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Theo dõi năng lực từng học sinh trong đội tuyển HSG, phát hiện chủ đề còn yếu và ra đề bài tập tự biên soạn.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#121214] p-1.5 rounded-xl border border-zinc-800">
          {[
            { id: 'students', label: 'Quản lý lớp học', icon: Users },
            { id: 'assignments', label: 'Bài tập & Chuyên đề', icon: FileCheck },
            { id: 'create_contest', label: 'Tổ chức Kỳ thi', icon: Trophy },
            { id: 'create_problem', label: 'Biên soạn đề mới', icon: FilePlus },
            { id: 'reports', label: 'Báo cáo & Phân tích', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab: Assignments Management */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                Quản Lý Bài Tập Về Nhà & Chuyên Đề Bồi Dưỡng
              </h2>
              <p className="text-xs text-zinc-400">
                Giao bài tập theo chủ đề, ấn định hạn chót (Deadline) và chấm tự động qua hệ thống Online Judge.
              </p>
            </div>

            <button
              onClick={() => setIsCreatingAssignment(!isCreatingAssignment)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              {isCreatingAssignment ? 'Đóng form' : 'Giao bài tập mới'}
            </button>
          </div>

          {/* Create Assignment Form Modal / Box */}
          {isCreatingAssignment && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!assignTitle.trim() || assignProblemIds.length === 0) return;
                const newAssign: Assignment = {
                  id: 'assign-' + Date.now(),
                  title: assignTitle,
                  description: assignDesc || 'Bài tập rèn luyện kỹ năng giải thuật toán.',
                  className: assignClass,
                  assignedBy: 'Thầy Trần Minh Tuấn',
                  deadline: new Date(Date.now() + assignDeadlineDays * 86400000).toISOString(),
                  problemIds: assignProblemIds,
                  totalPoints: assignProblemIds.length * 100,
                  status: 'ACTIVE',
                };
                storageService.addAssignment(newAssign);
                setAssignments(storageService.getAssignments());
                setIsCreatingAssignment(false);
                setAssignTitle('');
                setAssignDesc('');
                setAssignProblemIds([]);
              }}
              className="p-5 bg-[#18181c] border border-emerald-800/40 rounded-2xl space-y-4 shadow-xl"
            >
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2 pb-2 border-b border-zinc-800">
                <Sparkles className="w-4 h-4" /> Khởi tạo bài tập về nhà cho lớp
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-2">
                  <label className="block text-zinc-400 font-medium mb-1">Tiêu đề bài tập / Chuyên đề *</label>
                  <input
                    type="text"
                    required
                    value={assignTitle}
                    onChange={(e) => setAssignTitle(e.target.value)}
                    placeholder="Ví dụ: Chuyên đề tuần 4: Quy hoạch động 1 chiều"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Lớp / Đội tuyển áp dụng</label>
                  <select
                    value={assignClass}
                    onChange={(e) => setAssignClass(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                  >
                    <option value="Đội tuyển HSG Tin 11">Đội tuyển HSG Tin 11</option>
                    <option value="Lớp Chuyên Tin 10">Lớp Chuyên Tin 10</option>
                    <option value="Bồi dưỡng Tin học trẻ B">Bồi dưỡng Tin học trẻ B</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-zinc-400 font-medium mb-1">Mô tả & Hướng dẫn làm bài</label>
                  <input
                    type="text"
                    value={assignDesc}
                    onChange={(e) => setAssignDesc(e.target.value)}
                    placeholder="Lưu ý các trường hợp biên N=1, không dùng mảng tĩnh quá lớn..."
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Hạn nộp (Số ngày kể từ hôm nay)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={assignDeadlineDays}
                    onChange={(e) => setAssignDeadlineDays(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                  />
                </div>
              </div>

              {/* Problem Selector Checkboxes */}
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2">
                  Chọn các bài toán trong ngân hàng đề (Đã chọn {assignProblemIds.length} bài) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-2 bg-[#121214] rounded-xl border border-zinc-800">
                  {allProblems.map((prob) => {
                    const isChecked = assignProblemIds.includes(prob.id);
                    return (
                      <label
                        key={prob.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                            : 'border-zinc-800 hover:border-zinc-700 text-zinc-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAssignProblemIds([...assignProblemIds, prob.id]);
                            } else {
                              setAssignProblemIds(assignProblemIds.filter((id) => id !== prob.id));
                            }
                          }}
                          className="rounded text-emerald-600 focus:ring-0"
                        />
                        <span className="truncate">{prob.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingAssignment(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={assignProblemIds.length === 0}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg transition"
                >
                  Xác nhận giao bài
                </button>
              </div>
            </form>
          )}

          {/* Assignments List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((assign) => {
              const submissions = storageService.getAssignmentSubmissions(assign.id);
              const isSelected = selectedAssignmentId === assign.id;

              return (
                <div
                  key={assign.id}
                  className={`p-5 rounded-2xl border transition bg-[#18181c] ${
                    isSelected ? 'border-emerald-500 shadow-lg shadow-emerald-950/40' : 'border-[#27272a] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded-full inline-block mb-1">
                        {assign.className}
                      </span>
                      <h3 className="font-bold text-zinc-100 text-sm">{assign.title}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
                      {assign.totalPoints} điểm
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-3">{assign.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 py-2.5 border-t border-zinc-800 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      Hạn chót: {new Date(assign.deadline).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      {submissions.length} học sinh đã nộp
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedAssignmentId(isSelected ? null : assign.id)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      {isSelected ? 'Ẩn bảng điểm chi tiết' : 'Xem kết quả làm bài của học sinh →'}
                    </button>
                  </div>

                  {/* Expanded Submissions Matrix */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
                      <h4 className="text-xs font-bold text-zinc-300">
                        Bảng Điểm Nộp Bài Học Sinh ({submissions.length})
                      </h4>
                      {submissions.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic">Chưa có bài nộp nào.</p>
                      ) : (
                        <div className="space-y-1.5">
                          {submissions.map((sub, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 bg-[#121214] rounded-lg border border-zinc-800 flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-semibold text-zinc-200 block">{sub.studentName}</span>
                                <span className="text-[10px] text-zinc-500">
                                  Nộp lúc: {new Date(sub.submittedAt).toLocaleString('vi-VN')}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-emerald-400 font-mono block">
                                  {sub.totalScore}/{assign.totalPoints} đ
                                </span>
                                <span className="text-[10px] text-zinc-400">
                                  {sub.status === 'SUBMITTED' ? '✓ Đã hoàn tất' : 'Đang làm dở'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Contest Creator */}
      {activeTab === 'create_contest' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Tổ Chức Kỳ Thi Thử Nghiệm (Contest Creator)
            </h2>
            <p className="text-xs text-zinc-400">
              Tạo phòng thi thử trực tuyến với chuẩn luật chấm quốc tế: IOI (tính điểm từng Subtask) hoặc ACM/ICPC (tính điểm Penalty).
            </p>
          </div>

          {contestSuccessMsg && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-700 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {contestSuccessMsg}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!contestTitle.trim() || contestProblemIds.length === 0) return;

              const contestProblems = contestProblemIds.map((pid, idx) => {
                const prob = allProblems.find((p) => p.id === pid);
                return {
                  problemId: pid,
                  problemCode: String.fromCharCode(65 + idx),
                  title: prob ? prob.title : `Bài ${String.fromCharCode(65 + idx)}`,
                  points: 100,
                };
              });

              const newContest: Contest = {
                id: 'contest-' + Date.now(),
                title: contestTitle,
                description: contestDesc || 'Kỳ thi thử thuật toán dành cho học sinh giỏi.',
                startTime: new Date(Date.now() + 3600000).toISOString(),
                durationMins: contestDuration,
                format: contestFormat,
                status: 'UPCOMING',
                registeredCount: 1,
                problemCodes: contestProblemIds,
                problems: contestProblems,
                participants: [
                  {
                    userId: 'u1',
                    fullName: 'Lê Minh Khang',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                    school: 'THPT Chuyên Hà Nội - Amsterdam',
                    score: 0,
                    penalty: 0,
                    rank: 1,
                    submissions: {},
                  },
                ],
              };

              storageService.addContest(newContest);
              setContestSuccessMsg(`Đã tạo thành công kỳ thi "${contestTitle}". Thí sinh có thể vào thi tại mục Kỳ Thi!`);
              setContestTitle('');
              setContestDesc('');
              setContestProblemIds([]);
              setTimeout(() => setContestSuccessMsg(''), 5000);
            }}
            className="p-6 bg-[#18181c] border border-zinc-800 rounded-2xl space-y-4 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block text-zinc-400 font-medium mb-1">Tên kỳ thi / Đợt thi *</label>
                <input
                  type="text"
                  required
                  value={contestTitle}
                  onChange={(e) => setContestTitle(e.target.value)}
                  placeholder="Ví dụ: Thi Thử Tin Học Trẻ 2026 - Vòng 1"
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Thể thức thi đấu (Rule)</label>
                <select
                  value={contestFormat}
                  onChange={(e) => setContestFormat(e.target.value as any)}
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                >
                  <option value="IOI">IOI (HSG Quốc Gia / THT - Điểm Subtask)</option>
                  <option value="ICPC">ICPC (AC / Penalty thời gian)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Thời gian làm bài (Phút)</label>
                <input
                  type="number"
                  min={30}
                  max={300}
                  value={contestDuration}
                  onChange={(e) => setContestDuration(parseInt(e.target.value, 10) || 60)}
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-zinc-400 font-medium mb-1">Ghi chú & Thể lệ thi</label>
                <input
                  type="text"
                  value={contestDesc}
                  onChange={(e) => setContestDesc(e.target.value)}
                  placeholder="Đóng băng bảng xếp hạng 60 phút cuối, không dùng tài liệu..."
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-2">
                Chọn danh sách bài thi ({contestProblemIds.length} bài đã chọn) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-2 bg-[#121214] rounded-xl border border-zinc-800">
                {allProblems.map((prob) => {
                  const isChecked = contestProblemIds.includes(prob.id);
                  return (
                    <label
                      key={prob.id}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'bg-amber-950/40 border-amber-600 text-amber-300'
                          : 'border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setContestProblemIds([...contestProblemIds, prob.id]);
                          } else {
                            setContestProblemIds(contestProblemIds.filter((id) => id !== prob.id));
                          }
                        }}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span className="truncate">{prob.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={contestProblemIds.length === 0}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                <Trophy className="w-4 h-4" /> Xuất Bản Kỳ Thi Mới
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Students Management */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="bg-[#18181c] border border-[#27272a] rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-200">
                Danh sách học sinh Đội tuyển HSG Tin học ({students.length})
              </h3>
              <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Thêm học sinh
              </button>
            </div>

            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#121215] text-zinc-400 uppercase font-semibold text-[11px] border-b border-[#27272a]">
                <tr>
                  <th className="py-3.5 px-4">Họ và tên</th>
                  <th className="py-3.5 px-4">Trường & Khối lớp</th>
                  <th className="py-3.5 px-4 text-center">Rating</th>
                  <th className="py-3.5 px-4 text-center">Đã AC</th>
                  <th className="py-3.5 px-4 text-center">Chuỗi ngày</th>
                  <th className="py-3.5 px-4">Tiến độ khóa học</th>
                  <th className="py-3.5 px-4">Đánh giá sư phạm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-zinc-100">{st.name}</td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {st.school} • {st.grade}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-400 font-mono">
                      {st.rating}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">{st.solved} bài</td>
                    <td className="py-3.5 px-4 text-center font-mono">{st.streak} ngày</td>
                    <td className="py-3.5 px-4">
                      <div className="w-32 bg-zinc-800 h-2 rounded-full overflow-hidden inline-block mr-2 align-middle">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${st.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{st.progress}%</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          st.status === 'Xuất sắc'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : st.status === 'Tích cực'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Create New Problem */}
      {activeTab === 'create_problem' && (
        <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-base text-zinc-100">
                Biên Soạn & Khởi Tạo Bài Tập Mới
              </h3>
              <p className="text-xs text-zinc-400">
                Bài tập sau khi tạo sẽ lập tức xuất hiện trong ngân hàng đề để học sinh làm và hệ thống Judge tự chấm.
              </p>
            </div>
            {isSuccessCreated && (
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Đã thêm bài tập thành công!
              </span>
            )}
          </div>

          <form onSubmit={handleCreateProblem} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-zinc-400 font-medium mb-1">Tiêu đề bài toán *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Đếm cặp số có tổng bằng S..."
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Chuyên đề thuật toán</label>
                <select
                  value={newTopicId}
                  onChange={(e) => setNewTopicId(e.target.value)}
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-emerald-500"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Độ khó (Difficulty)</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as Difficulty)}
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200"
                >
                  <option value="BEGINNER">Beginner (Cơ bản)</option>
                  <option value="EASY">Easy (Dễ)</option>
                  <option value="MEDIUM">Medium (Trung bình)</option>
                  <option value="HARD">Hard (Khó)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Rating đề xuất (800 - 2000)</label>
                <input
                  type="number"
                  value={newRating}
                  onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Nội dung đề bài (Statement) *</label>
              <textarea
                required
                rows={4}
                value={newStatement}
                onChange={(e) => setNewStatement(e.target.value)}
                placeholder="Mô tả chi tiết bài toán, định nghĩa bài học..."
                className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-3 text-zinc-200 resize-none font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Quy cách đầu vào (Input Format)</label>
                <textarea
                  rows={2}
                  value={newInputFormat}
                  onChange={(e) => setNewInputFormat(e.target.value)}
                  placeholder="Dòng 1: Số nguyên N..."
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200 resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Quy cách đầu ra (Output Format)</label>
                <textarea
                  rows={2}
                  value={newOutputFormat}
                  onChange={(e) => setNewOutputFormat(e.target.value)}
                  placeholder="In ra một số nguyên duy nhất..."
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200 resize-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Sample Input</label>
                <textarea
                  rows={2}
                  value={newSampleInput}
                  onChange={(e) => setNewSampleInput(e.target.value)}
                  placeholder="5\n1 2 3 4 5"
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200 resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Sample Output</label>
                <textarea
                  rows={2}
                  value={newSampleOutput}
                  onChange={(e) => setNewSampleOutput(e.target.value)}
                  placeholder="15"
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-zinc-200 resize-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Lời giải mẫu Python 3 (Tùy chọn)</label>
              <textarea
                rows={3}
                value={newSolutionPython}
                onChange={(e) => setNewSolutionPython(e.target.value)}
                placeholder="import sys..."
                className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-2.5 text-emerald-300 resize-none font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950"
              >
                <Save className="w-4 h-4" /> Xuất Bản Bài Tập Vào Ngân Hàng Đề
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[#18181c] border border-[#27272a] rounded-xl">
            <span className="text-xs text-zinc-400 block mb-1">Tỷ lệ Accepted chung</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">72.4%</span>
            <p className="text-[11px] text-zinc-400 mt-2">Dựa trên 240 bài nộp trong tuần qua của học sinh</p>
          </div>

          <div className="p-5 bg-[#18181c] border border-[#27272a] rounded-xl">
            <span className="text-xs text-zinc-400 block mb-1">Chủ đề có điểm thấp nhất</span>
            <span className="text-2xl font-bold text-rose-400 font-mono">Quy hoạch động</span>
            <p className="text-[11px] text-zinc-400 mt-2">Nhiều học sinh gặp lỗi tràn chỉ số và MLE</p>
          </div>

          <div className="p-5 bg-[#18181c] border border-[#27272a] rounded-xl">
            <span className="text-xs text-zinc-400 block mb-1">Tổng thời gian luyện tập</span>
            <span className="text-2xl font-bold text-blue-400 font-mono">148 giờ</span>
            <p className="text-[11px] text-zinc-400 mt-2">Trung bình 2.5 giờ/ngày cho mỗi thí sinh</p>
          </div>
        </div>
      )}
    </div>
  );
};
