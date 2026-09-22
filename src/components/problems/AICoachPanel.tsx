import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  Copy,
  Cpu,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldAlert,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { Problem, Verdict } from '../../types';

interface AICoachPanelProps {
  problem: Problem;
  sourceCode: string;
  language: 'python' | 'cpp';
  lastVerdict?: Verdict | null;
  lastTestError?: string;
  onApplyCodeSnippet?: (snippet: string) => void;
}

interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  mode?: string;
}

export const AICoachPanel: React.FC<AICoachPanelProps> = ({
  problem,
  sourceCode,
  language,
  lastVerdict,
  lastTestError,
  onApplyCodeSnippet,
}) => {
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'welcome',
      sender: 'coach',
      text: `Chào em! Thầy là **AlgoCoach VN** – Huấn luyện viên cá nhân của em cho bài toán **"${problem.title}"**.\n\nThầy có thể giúp em:\n- 💡 Gợi ý tư duy theo phương pháp Socratic (không spoil đáp án)\n- 🐛 Phân tích nguyên nhân bị Wrong Answer hoặc TLE\n- 🧪 Sinh bộ test case phản ví dụ để kiểm tra\n- ⚡ Tối ưu thời gian chạy & cấu trúc dữ liệu\n\nHãy nhấn vào các nút gợi ý nhanh bên dưới hoặc đặt câu hỏi bất kỳ cho thầy nhé!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAskCoach = async (mode: 'HINT' | 'DIAGNOSE' | 'COUNTER_TEST' | 'CONVERT' | 'CUSTOM', customPrompt?: string) => {
    const questionText =
      customPrompt ||
      (mode === 'HINT'
        ? 'Thầy có thể cho em một gợi ý tư duy về thuật toán mà không spoil code được không ạ?'
        : mode === 'DIAGNOSE'
        ? 'Code của em đang gặp lỗi hoặc chưa AC. Thầy xem giúp em xem có lỗi logic hay tràn số không ạ?'
        : mode === 'COUNTER_TEST'
        ? 'Thầy sinh giúp em một vài bộ test case phản ví dụ (corner cases) để em test lại bài ạ?'
        : mode === 'CONVERT'
        ? `Thầy hướng dẫn em chuyển đổi tối ưu sang ${language === 'python' ? 'C++20' : 'Python 3'} ạ?`
        : inputText);

    if (!questionText.trim()) return;

    const userMsg: CoachMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: problem.title,
          problemStatement: problem.statement,
          userCode: sourceCode,
          language,
          userQuestion: questionText,
          mode: mode === 'CUSTOM' ? 'EXPLAIN' : mode,
          testCaseInfo: lastVerdict
            ? {
                verdict: lastVerdict,
                error: lastTestError,
              }
            : undefined,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Xin lỗi em, hiện tại hệ thống phản hồi đang bận, em hãy thử lại sau ít giây nhé.';

      const coachMsg: CoachMessage = {
        id: 'coach-' + Date.now(),
        sender: 'coach',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      const fallbackMsg: CoachMessage = {
        id: 'coach-' + Date.now(),
        sender: 'coach',
        text: `### 💡 Nhận xét từ Huấn luyện viên:\n- Kiểm tra độ phức tạp: Với $N = 10^5$, hãy đảm bảo thuật toán đạt $\\mathcal{O}(N \\log N)$ trở xuống.\n- Kiểm tra tràn số: Nếu là C++, chú ý dùng \`long long\` cho các biến tính tổng hoặc tích.\n- Kiểm tra trường hợp biên: $N=1$, giá trị âm, hoặc các phần tử giống nhau.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#121214] border border-[#27272a] rounded-xl overflow-hidden">
      {/* Coach Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-[#121214] border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-100">AlgoCoach AI Mentoring</h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Socratic Mode
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Cố vấn thuật toán thông minh • Không spoil code • Chuẩn kiến thức HSG Quốc Gia
            </p>
          </div>
        </div>

        {lastVerdict && (
          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border ${
              lastVerdict === 'ACCEPTED'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : 'bg-rose-950/60 text-rose-300 border-rose-700'
            }`}
          >
            <span>Trạng thái:</span>
            <span>{lastVerdict}</span>
          </div>
        )}
      </div>

      {/* Quick Action Chips */}
      <div className="p-3 bg-[#151518] border-b border-zinc-800/80 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-zinc-400 font-semibold mr-1">Hỏi nhanh:</span>
        <button
          onClick={() => handleAskCoach('HINT')}
          disabled={isLoading}
          className="px-2.5 py-1.5 bg-zinc-800/80 hover:bg-emerald-950/50 hover:text-emerald-300 hover:border-emerald-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition flex items-center gap-1.5 font-medium disabled:opacity-50"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Gợi ý tư duy (Socratic)
        </button>

        <button
          onClick={() => handleAskCoach('DIAGNOSE')}
          disabled={isLoading}
          className="px-2.5 py-1.5 bg-zinc-800/80 hover:bg-rose-950/50 hover:text-rose-300 hover:border-rose-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition flex items-center gap-1.5 font-medium disabled:opacity-50"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          Bắt lỗi Wrong Answer / TLE
        </button>

        <button
          onClick={() => handleAskCoach('COUNTER_TEST')}
          disabled={isLoading}
          className="px-2.5 py-1.5 bg-zinc-800/80 hover:bg-blue-950/50 hover:text-blue-300 hover:border-blue-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition flex items-center gap-1.5 font-medium disabled:opacity-50"
        >
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          Sinh test phản ví dụ (Counter-test)
        </button>

        <button
          onClick={() => handleAskCoach('CONVERT')}
          disabled={isLoading}
          className="px-2.5 py-1.5 bg-zinc-800/80 hover:bg-purple-950/50 hover:text-purple-300 hover:border-purple-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition flex items-center gap-1.5 font-medium disabled:opacity-50"
        >
          <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
          Chuyển sang {language === 'python' ? 'C++20' : 'Python'}
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[480px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 font-bold ${
                msg.sender === 'user'
                  ? 'bg-zinc-700 text-zinc-200'
                  : 'bg-emerald-600 text-white shadow-sm'
              }`}
            >
              {msg.sender === 'user' ? 'Me' : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed space-y-2 border ${
                msg.sender === 'user'
                  ? 'bg-emerald-950/30 border-emerald-800 text-zinc-200'
                  : 'bg-[#18181c] border-zinc-800 text-zinc-200 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px] text-zinc-500 pb-1 border-b border-zinc-800/60">
                <span className="font-semibold text-zinc-400">
                  {msg.sender === 'user' ? 'Bạn' : 'AlgoCoach VN'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Body rendering */}
              <div className="whitespace-pre-wrap font-sans text-zinc-200 space-y-1">
                {msg.text}
              </div>

              {msg.sender === 'coach' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        Đã sao chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Sao chép phản hồi
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-emerald-400 p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl w-fit">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Thầy đang phân tích mã nguồn và đề bài...</span>
          </div>
        )}
      </div>

      {/* Input Prompt Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAskCoach('CUSTOM');
        }}
        className="p-3 bg-[#151518] border-t border-zinc-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập câu hỏi hoặc vướng mắc của em (ví dụ: 'Tại sao em bị TLE ở test 12?')..."
          disabled={isLoading}
          className="flex-1 bg-[#121214] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
          Gửi
        </button>
      </form>
    </div>
  );
};
