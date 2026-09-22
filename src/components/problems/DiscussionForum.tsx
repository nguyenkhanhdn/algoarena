import React, { useState } from 'react';
import {
  Code,
  GraduationCap,
  Heart,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
  User,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { ProblemComment } from '../../types';

interface DiscussionForumProps {
  problemId: string;
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({ problemId }) => {
  const [comments, setComments] = useState<ProblemComment[]>(
    storageService.getComments(problemId)
  );
  const [content, setContent] = useState<string>('');
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [isAddingCode, setIsAddingCode] = useState<boolean>(false);

  const currentUser = storageService.getCurrentUser();

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newComment = storageService.addComment({
      problemId,
      content,
      codeSnippet: isAddingCode && codeSnippet.trim() ? codeSnippet : undefined,
    });

    setComments(storageService.getComments(problemId));
    setContent('');
    setCodeSnippet('');
    setIsAddingCode(false);
  };

  const handleLike = (id: string) => {
    storageService.likeComment(id);
    setComments(storageService.getComments(problemId));
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="p-4 bg-blue-950/20 border border-blue-800/40 rounded-xl space-y-1">
        <h4 className="font-bold text-blue-300 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          Diễn Đàn Thảo Luận & Hỏi Đáp Thuật Toán
        </h4>
        <p className="text-xs text-zinc-300">
          Nơi học sinh trao đổi kinh nghiệm, giải đáp thắc mắc về các trường hợp góc và nhận hướng dẫn từ giáo viên.
        </p>
      </div>

      {/* New Comment Input Box */}
      <form onSubmit={handlePostComment} className="p-4 bg-[#141418] border border-zinc-800 rounded-xl space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <img
            src={currentUser.avatar}
            alt=""
            className="w-6 h-6 rounded-full border border-zinc-700"
          />
          <span className="text-xs font-semibold text-zinc-200">
            {currentUser.fullName}
            <span className="text-[10px] text-zinc-400 font-normal ml-1">
              ({currentUser.role === 'TEACHER' ? 'Giáo viên' : 'Học sinh'})
            </span>
          </span>
        </div>

        <textarea
          rows={3}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn có thắc mắc gì về thuật toán hoặc gặp lỗi WA ở test case nào? Viết bình luận tại đây..."
          className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-lg p-3 text-xs text-zinc-200 focus:ring-1 focus:ring-emerald-500 resize-none font-sans"
        />

        {isAddingCode && (
          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-mono">Đoạn code bạn đang phân vân:</span>
            <textarea
              rows={3}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="Dán đoạn code cần hỏi vào đây..."
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-2.5 text-xs text-emerald-300 font-mono resize-none"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setIsAddingCode(!isAddingCode)}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            {isAddingCode ? 'Ẩn đính kèm code' : '+ Đính kèm mã nguồn code'}
          </button>

          <button
            type="submit"
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow"
          >
            <Send className="w-3.5 h-3.5" /> Gửi bình luận
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Tất cả bình luận ({comments.length})
        </h4>

        {comments.length === 0 ? (
          <div className="p-6 text-center text-xs text-zinc-500 italic bg-[#141418] rounded-xl border border-zinc-800">
            Chưa có bình luận nào cho bài tập này. Hãy là người đầu tiên đặt câu hỏi!
          </div>
        ) : (
          comments.map((cm) => (
            <div
              key={cm.id}
              className="p-4 bg-[#141418] border border-zinc-800 rounded-xl space-y-2.5 hover:border-zinc-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={cm.userAvatar}
                    alt=""
                    className="w-7 h-7 rounded-full border border-zinc-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-zinc-200">{cm.userName}</span>
                      {cm.userRole === 'TEACHER' && (
                        <span className="px-1.5 py-0.2 bg-blue-950 text-blue-300 border border-blue-800 text-[10px] rounded font-bold flex items-center gap-1">
                          <GraduationCap className="w-2.5 h-2.5" /> Giáo viên
                        </span>
                      )}
                      {cm.userRole === 'SUPER_ADMIN' && (
                        <span className="px-1.5 py-0.2 bg-purple-950 text-purple-300 border border-purple-800 text-[10px] rounded font-bold flex items-center gap-1">
                          <Shield className="w-2.5 h-2.5" /> Ban Quản Trị
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(cm.createdAt).toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(cm.id)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-400 hover:text-rose-400 transition"
                >
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                  <span>{cm.likes}</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                {cm.content}
              </p>

              {cm.codeSnippet && (
                <div className="p-3 bg-[#0a0a0c] border border-zinc-800 rounded-lg">
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                    {cm.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
