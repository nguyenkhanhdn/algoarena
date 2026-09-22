import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Gauge,
  Info,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';

interface BenchmarkResult {
  name: string;
  complexity: string;
  timeMs: number;
  operations: number;
  status: 'FAST' | 'MEDIUM' | 'SLOW' | 'TLE';
}

export const BenchmarkTool: React.FC = () => {
  const [sizeN, setSizeN] = useState<number>(5000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);

  const runBenchmark = () => {
    setIsRunning(true);

    // Yield to let React show running state
    setTimeout(() => {
      const N = sizeN;
      const testArray = Array.from({ length: N }, () => Math.floor(Math.random() * 100000));

      // 1. O(N) Linear Scan
      const t1Start = performance.now();
      let linearSum = 0;
      let linearOps = 0;
      for (let i = 0; i < N; i++) {
        linearSum += testArray[i];
        linearOps++;
      }
      const t1End = performance.now();
      const t1 = Number((t1End - t1Start).toFixed(2));

      // 2. O(N log N) Sort / Binary Search
      const t2Start = performance.now();
      const sorted = [...testArray];
      sorted.sort((a, b) => a - b);
      let logOps = Math.round(N * Math.log2(N));
      // binary search test
      let l = 0, r = N - 1;
      while (l <= r) {
        const m = (l + r) >> 1;
        if (sorted[m] > 50000) r = m - 1;
        else l = m + 1;
      }
      const t2End = performance.now();
      const t2 = Number((t2End - t2Start).toFixed(2));

      // 3. O(N^2) Nested Loop (Simulated if N > 20000 to prevent browser crash)
      let t3 = 0;
      let quadraticOps = 0;
      let isTLE = false;

      if (N <= 15000) {
        const t3Start = performance.now();
        let pairCount = 0;
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            if (testArray[i] + testArray[j] > 100000) {
              pairCount++;
            }
          }
        }
        const t3End = performance.now();
        t3 = Number((t3End - t3Start).toFixed(2));
        quadraticOps = (N * (N - 1)) / 2;
      } else {
        // Sample 3000 elements to extrapolate accurately
        const sampleSize = 3000;
        const t3Start = performance.now();
        let pairCount = 0;
        for (let i = 0; i < sampleSize; i++) {
          for (let j = i + 1; j < sampleSize; j++) {
            if (testArray[i] + testArray[j] > 100000) {
              pairCount++;
            }
          }
        }
        const t3End = performance.now();
        const sampleTime = t3End - t3Start;
        // Ratio of (N^2) / (sampleSize^2)
        const ratio = (N * N) / (sampleSize * sampleSize);
        t3 = Number((sampleTime * ratio).toFixed(2));
        quadraticOps = (N * (N - 1)) / 2;
        isTLE = t3 > 1000;
      }

      setResults([
        {
          name: 'Thuật toán Tuyến tính (Linear Scan)',
          complexity: 'O(N)',
          timeMs: Math.max(0.01, t1),
          operations: linearOps,
          status: 'FAST',
        },
        {
          name: 'Sắp xếp & Chặt nhị phân (Sort / Binary Search)',
          complexity: 'O(N log N)',
          timeMs: Math.max(0.05, t2),
          operations: logOps,
          status: 'FAST',
        },
        {
          name: 'Duyệt trâu lồng nhau (Naive Nested Loops)',
          complexity: 'O(N²)',
          timeMs: t3,
          operations: quadraticOps,
          status: isTLE || t3 > 1000 ? 'TLE' : t3 > 300 ? 'SLOW' : 'MEDIUM',
        },
      ]);

      setIsRunning(false);
    }, 100);
  };

  const maxTime = results ? Math.max(...results.map((r) => r.timeMs), 1) : 1;

  return (
    <div className="bg-[#18181c] border border-[#27272a] rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" />
            Phòng Đo Hiệu Năng Thực Tế (Big-O Benchmark Lab)
          </h3>
          <p className="text-xs text-zinc-400">
            Trực tiếp kiểm chứng tốc độ thực thi JavaScript/CPU giữa các độ phức tạp thuật toán
          </p>
        </div>

        {/* N Selector & Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-xl p-1 text-xs">
            <span className="px-2 text-zinc-400 font-semibold">Cỡ mẫu N:</span>
            {[1000, 5000, 10000, 20000, 50000].map((val) => (
              <button
                key={val}
                onClick={() => setSizeN(val)}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold transition ${
                  sizeN === val
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {val >= 1000 ? `${val / 1000}k` : val}
              </button>
            ))}
          </div>

          <button
            onClick={runBenchmark}
            disabled={isRunning}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-950"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang đo đạc...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                Chạy Kiểm Thử ({sizeN.toLocaleString()} phần tử)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Benchmark Results */}
      {results ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((res, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-3 ${
                  res.status === 'TLE'
                    ? 'bg-rose-950/20 border-rose-800/60'
                    : res.status === 'SLOW'
                    ? 'bg-amber-950/20 border-amber-800/60'
                    : 'bg-emerald-950/20 border-emerald-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-300">{res.name}</span>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                      res.status === 'TLE'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : res.status === 'SLOW'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {res.complexity}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl font-black font-mono ${
                      res.status === 'TLE'
                        ? 'text-rose-400'
                        : res.status === 'SLOW'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {res.timeMs} ms
                  </span>
                  {res.status === 'TLE' && (
                    <span className="text-[10px] font-bold text-rose-400 uppercase">
                      Quá 1.0s (TLE)
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-zinc-400 space-y-1 pt-1 border-t border-zinc-800">
                  <div className="flex justify-between">
                    <span>Số phép tính ước lượng:</span>
                    <span className="font-mono text-zinc-200">
                      {res.operations.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Đánh giá chuẩn thi HSG:</span>
                    <span
                      className={`font-semibold ${
                        res.status === 'TLE'
                          ? 'text-rose-400'
                          : res.status === 'SLOW'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {res.status === 'TLE'
                        ? '❌ Bị chấm 0 điểm Subtask lớn'
                        : res.status === 'SLOW'
                        ? '⚠️ Nguy cơ quá giờ nếu test lớn'
                        : '✓ Vượt qua 100% Test Cases'}
                    </span>
                  </div>
                </div>

                {/* Progress bar visual comparison */}
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      res.status === 'TLE'
                        ? 'bg-rose-500'
                        : res.status === 'SLOW'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, (res.timeMs / maxTime) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Educational Insight Banner */}
          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
              <span className="font-bold text-zinc-100 block">
                💡 Bài học rút ra cho kỳ thi Học sinh Giỏi & Tin học trẻ Bảng B:
              </span>
              <p>
                Với kích thước N = {sizeN.toLocaleString()}, thuật toán O(N) và O(N log N) chỉ mất <strong>dưới 10ms</strong>. Trong khi đó, thuật toán O(N²) cần tới <strong>{results[2].operations.toLocaleString()} phép tính</strong>. Đây là minh chứng rõ ràng nhất lý do vì sao thí sinh phải luôn phân tích độ phức tạp thời gian trước khi gõ code!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 border border-dashed border-zinc-800 rounded-xl text-center space-y-3 bg-zinc-900/30">
          <Cpu className="w-8 h-8 text-emerald-400 mx-auto opacity-80" />
          <div className="text-xs text-zinc-300">
            Chọn cỡ mẫu $N$ và nhấn <strong className="text-emerald-400">"Chạy Kiểm Thử"</strong> để bắt đầu đo đạc thời gian thực.
          </div>
        </div>
      )}
    </div>
  );
};
