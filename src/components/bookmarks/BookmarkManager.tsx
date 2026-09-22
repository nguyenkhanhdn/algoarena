import React, { useState } from 'react';
import {
  Bookmark,
  BookOpen,
  Edit2,
  ExternalLink,
  FileCode,
  Save,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Bookmark as BookmarkType, Problem } from '../../types';

interface BookmarkManagerProps {
  onSelectProblem: (problem: Problem) => void;
  onNavigateToLearning: () => void;
}

export const BookmarkManager: React.FC<BookmarkManagerProps> = ({
  onSelectProblem,
  onNavigateToLearning,
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(storageService.getBookmarks());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const handleDelete = (id: string) => {
    storageService.deleteBookmark(id);
    setBookmarks(storageService.getBookmarks());
  };

  const handleStartEdit = (bm: BookmarkType) => {
    setEditingId(bm.id);
    setEditingNote(bm.note || '');
  };

  const handleSaveEdit = (id: string) => {
    storageService.updateBookmarkNote(id, editingNote);
    setBookmarks(storageService.getBookmarks());
    setEditingId(null);
  };

  const handleOpenItem = (bm: BookmarkType) => {
    if (bm.itemType === 'PROBLEM') {
      const prob = storageService.getProblemBySlug(bm.itemId);
      if (prob) onSelectProblem(prob);
    } else {
      onNavigateToLearning();
    }
  };

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.note?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-[#18181c] border border-[#27272a] rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            Sổ Tay Dấu Trang & Ghi Chú Cá Nhân
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Lưu trữ bài học lý thuyết quan trọng, bài tập tâm đắc và ghi chép kinh nghiệm tránh bẫy thuật toán.
          </p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm theo tiêu đề, ghi chú hoặc tag..."
            className="w-full bg-[#121214] border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-12 bg-[#18181c] border border-[#27272a] rounded-xl text-zinc-400 text-xs">
            Bạn chưa lưu dấu trang nào hoặc không tìm thấy ghi chú phù hợp.
          </div>
        ) : (
          filteredBookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-5 bg-[#18181c] border border-[#27272a] rounded-xl space-y-3 hover:border-zinc-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`p-2 rounded-lg ${
                      bm.itemType === 'PROBLEM'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {bm.itemType === 'PROBLEM' ? (
                      <FileCode className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <h3
                      onClick={() => handleOpenItem(bm)}
                      className="font-bold text-sm text-zinc-100 hover:text-emerald-400 transition cursor-pointer flex items-center gap-2"
                    >
                      {bm.title}
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </h3>
                    <span className="text-[11px] text-zinc-400">
                      Lưu lúc: {new Date(bm.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(bm)}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition"
                    title="Chỉnh sửa ghi chú"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(bm.id)}
                    className="p-1.5 bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 rounded transition"
                    title="Xóa dấu trang"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content / Editing */}
              {editingId === bm.id ? (
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <textarea
                    value={editingNote}
                    onChange={(e) => setEditingNote(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg p-3 text-xs text-zinc-200 focus:ring-1 focus:ring-emerald-500 resize-none"
                    rows={3}
                    placeholder="Nhập ghi chú cá nhân của bạn..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded text-xs"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSaveEdit(bm.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" /> Lưu lại
                    </button>
                  </div>
                </div>
              ) : (
                bm.note && (
                  <div className="p-3 bg-[#121214] rounded-lg border border-zinc-800/80 text-xs text-zinc-300 italic">
                    📝 Ghi chú: {bm.note}
                  </div>
                )
              )}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {bm.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
