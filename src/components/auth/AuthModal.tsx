import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  School,
  Shield,
  Sparkles,
  Target,
  User,
  UserCheck,
  UserPlus,
  X,
  Zap,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Role } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regGrade, setRegGrade] = useState<number>(10);
  const [regSchool, setRegSchool] = useState('');
  const [regProvince, setRegProvince] = useState('Hà Nội');
  const [regTarget, setRegTarget] = useState('Tin học trẻ Bảng B & HSG Tỉnh');

  // Status & feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginIdentifier.trim()) {
      setErrorMsg('Vui lòng nhập tên đăng nhập hoặc email.');
      return;
    }

    const res = storageService.login(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    setSuccessMsg(res.message);
    setTimeout(() => {
      onAuthSuccess();
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regFullName.trim() || !regUsername.trim() || !regEmail.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ họ tên, tên đăng nhập và email.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    const res = storageService.register({
      fullName: regFullName,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: 'STUDENT',
      studentData: {
        school: regSchool.trim() || 'THPT Chuyên',
        className: `Lớp ${regGrade}`,
        province: regProvince,
        grade: regGrade,
        target: regTarget,
      },
    });

    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    setSuccessMsg(res.message);
    setTimeout(() => {
      onAuthSuccess();
      onClose();
    }, 600);
  };

  const handleQuickLogin = (role: Role) => {
    storageService.switchRole(role);
    setSuccessMsg(`Đã đăng nhập nhanh với vai trò ${role}`);
    setTimeout(() => {
      onAuthSuccess();
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141418] border border-[#27272a] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-[#18181c] to-zinc-900 border-b border-[#27272a]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold font-mono">
              A
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                AlgoArena Vietnam
              </span>
              <h2 className="text-xl font-bold text-zinc-100">
                {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản Học Sinh'}
              </h2>
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            {mode === 'login'
              ? 'Đăng nhập để lưu tiến độ giải bài, theo dõi chuỗi luyện thi và thi thử trực tuyến.'
              : 'Tạo tài khoản học sinh để theo dõi tiến độ luyện thi Tin học trẻ & HSG các cấp.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Đăng Nhập
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Đăng Ký Mới
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Notification Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Content */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Tên đăng nhập hoặc Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="ví dụ: hoangnam_coder hoặc nam.nh@..."
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Mật khẩu</label>
                  <span className="text-[11px] text-zinc-500">Mặc định tài khoản mẫu: 123456</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-950 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                Đăng Nhập Ngay
              </button>

              {/* Quick Login Section */}
              <div className="pt-4 border-t border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 text-center">
                  Hoặc đăng nhập nhanh bằng tài khoản mẫu:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('STUDENT')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-0.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      Học sinh
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">Hoàng Nam (10 Tin)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('TEACHER')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-blue-500/50 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Giáo viên
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">Thầy Minh Đức</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('SUPER_ADMIN')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold mb-0.5">
                      <Shield className="w-3.5 h-3.5" />
                      Admin
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">Ban Quản Trị</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Họ và tên học sinh *
                  </label>
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="ví dụ: Lê Bảo Minh"
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Tên đăng nhập (Username) *
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="ví dụ: baominh_hsg"
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Địa chỉ Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="baominh@gmail.com"
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Nhập lại mật khẩu *
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(Number(e.target.value))}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-2 py-2 text-xs text-zinc-100 focus:outline-none"
                  >
                    <option value={8}>Lớp 8 (THCS)</option>
                    <option value={9}>Lớp 9 (Chuyển cấp)</option>
                    <option value={10}>Lớp 10 (THPT)</option>
                    <option value={11}>Lớp 11 (Chuyên Tin)</option>
                    <option value={12}>Lớp 12 (Tuyển sinh)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Trường học
                  </label>
                  <input
                    type="text"
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    placeholder="THPT Chuyên / THCS..."
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <input
                    type="text"
                    value={regProvince}
                    onChange={(e) => setRegProvince(e.target.value)}
                    placeholder="Hà Nội, TP.HCM, Đà Nẵng..."
                    className="w-full bg-[#18181c] border border-zinc-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Mục tiêu luyện thi
                  </label>
                  <select
                    value={regTarget}
                    onChange={(e) => setRegTarget(e.target.value)}
                    className="w-full bg-[#18181c] border border-zinc-700 rounded-xl px-2 py-2 text-xs text-zinc-100 focus:outline-none"
                  >
                    <option value="Tin học trẻ Bảng B & HSG Tỉnh">Tin học trẻ Bảng B (THPT)</option>
                    <option value="Tin học trẻ Bảng B2 (THCS)">Tin học trẻ Bảng B2 (THCS)</option>
                    <option value="HSG Tỉnh Bảng A">HSG Tỉnh / Thành phố Bảng A</option>
                    <option value="Kỳ thi Duyên Hải & Olympic 30/4">Olympic 30/4 & Duyên Hải</option>
                    <option value="Luyện thi Chuyên Tin vào 10">Luyện thi vào 10 Chuyên Tin</option>
                    <option value="Nền tảng thuật toán cơ bản">Khởi động Nền tảng Thuật toán</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-950 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Hoàn Tất Đăng Ký Tài Khoản
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
