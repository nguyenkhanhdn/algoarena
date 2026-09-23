import React, { useState } from 'react';
import {
  Award,
  Bookmark,
  BookOpen,
  Calendar,
  Code2,
  Cpu,
  Flame,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Shield,
  Sparkles,
  Terminal,
  Trophy,
  User as UserIcon,
  UserCheck,
  UserPlus,
  X,
  Zap,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Role, User } from '../../types';
import { AuthModal } from '../auth/AuthModal';

export type ActiveNavTab =
  | 'dashboard'
  | 'learning'
  | 'problems'
  | 'progress'
  | 'visualizer'
  | 'contests'
  | 'bookmarks'
  | 'profile'
  | 'teacher';

interface AppLayoutProps {
  currentTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  children: React.ReactNode;
  onRoleChanged: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  children,
  onRoleChanged,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const currentUser = storageService.getCurrentUser();
  const allUsers = storageService.getAllUsers();

  const handleSwitchUserRole = (role: Role) => {
    storageService.switchRole(role);
    setIsRoleMenuOpen(false);
    if (role === 'TEACHER' || role === 'SUPER_ADMIN') {
      onSelectTab('teacher');
    } else {
      onSelectTab('dashboard');
    }
    onRoleChanged();
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsRoleMenuOpen(false);
  };

  const handleLogout = () => {
    storageService.logout();
    setIsRoleMenuOpen(false);
    onRoleChanged();
    onSelectTab('dashboard');
  };

  const navItems = [
    { id: 'dashboard', label: 'Bảng tin', icon: LayoutDashboard },
    { id: 'learning', label: 'Lộ trình học', icon: BookOpen },
    { id: 'problems', label: 'Ngân hàng bài', icon: Terminal },
    { id: 'progress', label: 'Tiến độ học', icon: LineChart },
    { id: 'visualizer', label: 'Visualizer', icon: Cpu, isHighlight: true },
    { id: 'contests', label: 'Thi thử', icon: Trophy },
    { id: 'bookmarks', label: 'Sổ tay', icon: Bookmark },
    { id: 'profile', label: 'Hồ sơ', icon: UserIcon },
  ];

  if (currentUser.role === 'TEACHER' || currentUser.role === 'SUPER_ADMIN') {
    navItems.push({
      id: 'teacher',
      label: currentUser.role === 'SUPER_ADMIN' ? 'Quản trị' : 'Quản lý lớp',
      icon: GraduationCap,
    });
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="h-16 border-b border-[#27272a] bg-[#121215]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between">
        {/* Left Brand Identity */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950 font-mono font-bold text-lg group-hover:scale-105 transition">
              A
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-zinc-100 flex items-center gap-1.5">
                AlgoArena <span className="text-emerald-400">Vietnam</span>
              </div>
              <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                <span>HSG & Tin học trẻ</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>Bảng B</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id as ActiveNavTab)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-emerald-400'
                        : item.isHighlight
                        ? 'text-emerald-400'
                        : 'text-zinc-400'
                    }`}
                  />
                  {item.label}
                  {item.isHighlight && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Mới
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Role Switcher & Profile */}
        <div className="flex items-center gap-3">
          {/* Student Streak Badge */}
          {currentUser.studentProfile && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold font-mono">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{currentUser.studentProfile.currentStreak} ngày</span>
            </div>
          )}

          {/* Role Switcher Popover */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 transition text-xs"
            >
              <img
                src={currentUser.avatar}
                alt=""
                className="w-6 h-6 rounded-full border border-zinc-700 object-cover"
              />
              <div className="hidden md:block text-left">
                <div className="font-semibold text-zinc-100 text-xs truncate max-w-[120px]">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-zinc-400">
                  Vai trò: <strong className="text-emerald-400">{currentUser.role}</strong>
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#18181c] border border-[#27272a] rounded-xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">
                    Chuyển đổi vai trò trải nghiệm:
                  </span>
                  <span className="text-zinc-300 text-xs font-semibold">{currentUser.fullName}</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleSwitchUserRole('STUDENT')}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${
                      currentUser.role === 'STUDENT'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="block">Học sinh (Đội tuyển HSG)</span>
                      <span className="text-[10px] text-zinc-400">Nguyễn Hoàng Nam • Lớp 11</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSwitchUserRole('TEACHER')}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${
                      currentUser.role === 'TEACHER'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="block">Giáo viên / HLV Chuyên Tin</span>
                      <span className="text-[10px] text-zinc-400">Thầy Trần Minh Tuấn</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSwitchUserRole('SUPER_ADMIN')}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${
                      currentUser.role === 'SUPER_ADMIN'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="block">Ban Quản Trị Hệ Thống</span>
                      <span className="text-[10px] text-zinc-400">Lê Viết Hoàng • Admin</span>
                    </div>
                  </button>
                </div>

                <div className="pt-2 mt-1 border-t border-zinc-800 space-y-1">
                  <button
                    onClick={() => {
                      setIsRoleMenuOpen(false);
                      onSelectTab('progress');
                    }}
                    className="w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 text-blue-400 font-semibold transition text-xs"
                  >
                    <LineChart className="w-4 h-4" />
                    <span>Theo Dõi Tiến Độ Luyện Thi</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsRoleMenuOpen(false);
                      onSelectTab('profile');
                    }}
                    className="w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 text-emerald-400 font-semibold transition text-xs"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Xem Hồ Sơ & Bảng Năng Lực</span>
                  </button>

                  <div className="pt-1 border-t border-zinc-800/60 my-1" />

                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 text-zinc-300 transition text-xs"
                  >
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Đăng Nhập Tài Khoản Khác</span>
                  </button>

                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 text-zinc-300 transition text-xs"
                  >
                    <UserPlus className="w-4 h-4 text-blue-400" />
                    <span>Đăng Ký Học Sinh Mới</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-rose-950/40 text-rose-400 transition text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng Xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Auth Trigger Buttons for convenience */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleOpenAuth('login')}
              className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg transition border border-zinc-700 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đăng nhập</span>
            </button>
            <button
              onClick={() => handleOpenAuth('register')}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition shadow-sm flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Đăng ký</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          onRoleChanged();
          onSelectTab('progress');
        }}
        initialMode={authModalMode}
      />

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#141418] border-b border-[#27272a] p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id as ActiveNavTab);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] bg-[#0e0e11] py-6 px-4 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-200">AlgoArena Vietnam</span>
            <span>• Nền tảng luyện thi thuật toán & Tin học trẻ Bảng B</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
            <span>Python 3.11</span>
            <span>•</span>
            <span>C++ 20 (GCC 13)</span>
            <span>•</span>
            <span>Sandbox Container Judge Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
