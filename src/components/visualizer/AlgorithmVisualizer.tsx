import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Cpu,
  Gauge,
  Info,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { BenchmarkTool } from './BenchmarkTool';

export type VisualizerAlgorithm =
  | 'BINARY_SEARCH'
  | 'TWO_POINTERS'
  | 'SORTING'
  | 'PREFIX_SUM'
  | 'KNAPSACK_DP'
  | 'STACK'
  | 'GRAPH_BFS';

interface Step {
  array: number[];
  pointers: { name: string; index: number; color: string }[];
  highlightLine: number;
  explanation: string;
  variables: Record<string, string | number>;
  auxiliary?: any;
}

interface AlgorithmVisualizerProps {
  initialAlgorithm?: VisualizerAlgorithm;
  onClose?: () => void;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  initialAlgorithm = 'BINARY_SEARCH',
  onClose,
}) => {
  const [algorithm, setAlgorithm] = useState<VisualizerAlgorithm>(initialAlgorithm);
  const [viewMode, setViewMode] = useState<'visualizer' | 'benchmark'>('visualizer');
  const [arrayInput, setArrayInput] = useState<string>('3, 8, 12, 17, 24, 35, 49, 62, 78, 91');
  const [targetVal, setTargetVal] = useState<number>(35);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse input array safely
  const parsedArray = useMemo(() => {
    return arrayInput
      .split(',')
      .map((v) => parseInt(v.trim(), 10))
      .filter((n) => !isNaN(n));
  }, [arrayInput]);

  // Generate steps based on chosen algorithm
  const steps: Step[] = useMemo(() => {
    if (parsedArray.length === 0) return [];

    if (algorithm === 'BINARY_SEARCH') {
      const arr = [...parsedArray].sort((a, b) => a - b);
      const generated: Step[] = [];
      let left = 0;
      let right = arr.length - 1;
      let stepNum = 1;

      generated.push({
        array: [...arr],
        pointers: [
          { name: 'L', index: left, color: '#3b82f6' },
          { name: 'R', index: right, color: '#ef4444' },
        ],
        highlightLine: 1,
        explanation: `Khởi tạo tìm kiếm: Left = 0, Right = ${right}. Cần tìm giá trị X = ${targetVal}.`,
        variables: { left, right, target: targetVal },
      });

      while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const midVal = arr[mid];

        generated.push({
          array: [...arr],
          pointers: [
            { name: 'L', index: left, color: '#3b82f6' },
            { name: 'M', index: mid, color: '#10b981' },
            { name: 'R', index: right, color: '#ef4444' },
          ],
          highlightLine: 3,
          explanation: `Bước ${stepNum}: Tính mid = (${left} + ${right}) // 2 = ${mid}. Giá trị tại A[mid] = ${midVal}.`,
          variables: { left, right, mid, 'A[mid]': midVal },
        });

        if (midVal === targetVal) {
          generated.push({
            array: [...arr],
            pointers: [{ name: 'FOUND!', index: mid, color: '#10b981' }],
            highlightLine: 4,
            explanation: `🎉 Tìm thấy giá trị ${targetVal} tại chỉ số ${mid}! Thuật toán kết thúc thành công.`,
            variables: { foundIndex: mid, 'A[mid]': midVal },
          });
          break;
        } else if (midVal < targetVal) {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'L', index: mid + 1, color: '#3b82f6' },
              { name: 'R', index: right, color: '#ef4444' },
            ],
            highlightLine: 6,
            explanation: `Vì A[mid] = ${midVal} < ${targetVal}, loại bỏ nửa trái [${left}..${mid}]. Dịch Left = ${mid + 1}.`,
            variables: { left: mid + 1, right, mid },
          });
          left = mid + 1;
        } else {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'L', index: left, color: '#3b82f6' },
              { name: 'R', index: mid - 1, color: '#ef4444' },
            ],
            highlightLine: 8,
            explanation: `Vì A[mid] = ${midVal} > ${targetVal}, loại bỏ nửa phải [${mid}..${right}]. Dịch Right = ${mid - 1}.`,
            variables: { left, right: mid - 1, mid },
          });
          right = mid - 1;
        }
        stepNum++;
      }

      if (left > right) {
        generated.push({
          array: [...arr],
          pointers: [],
          highlightLine: 9,
          explanation: `Left (${left}) > Right (${right}): Không tìm thấy giá trị ${targetVal} trong mảng. Kết quả -1.`,
          variables: { result: -1 },
        });
      }
      return generated;
    }

    if (algorithm === 'TWO_POINTERS') {
      const arr = [...parsedArray].sort((a, b) => a - b);
      const generated: Step[] = [];
      let l = 0;
      let r = arr.length - 1;
      const targetSum = targetVal;

      generated.push({
        array: [...arr],
        pointers: [
          { name: 'L', index: l, color: '#3b82f6' },
          { name: 'R', index: r, color: '#ef4444' },
        ],
        highlightLine: 1,
        explanation: `Khởi tạo 2 con trỏ: L tại đầu mảng (${arr[l]}), R tại cuối mảng (${arr[r]}). Mục tiêu tổng = ${targetSum}.`,
        variables: { L: l, R: r, 'A[L]': arr[l], 'A[R]': arr[r], TargetSum: targetSum },
      });

      while (l < r) {
        const sum = arr[l] + arr[r];
        generated.push({
          array: [...arr],
          pointers: [
            { name: 'L', index: l, color: '#3b82f6' },
            { name: 'R', index: r, color: '#ef4444' },
          ],
          highlightLine: 3,
          explanation: `Xét tổng: A[L] + A[R] = ${arr[l]} + ${arr[r]} = ${sum}.`,
          variables: { L: l, R: r, CurrentSum: sum, Target: targetSum },
        });

        if (sum === targetSum) {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'MATCH!', index: l, color: '#10b981' },
              { name: 'MATCH!', index: r, color: '#10b981' },
            ],
            highlightLine: 4,
            explanation: `🎉 Tìm thấy cặp số: A[${l}] (${arr[l]}) + A[${r}] (${arr[r]}) = ${targetSum}!`,
            variables: { pair: `(${arr[l]}, ${arr[r]})` },
          });
          break;
        } else if (sum < targetSum) {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'L++', index: l + 1, color: '#3b82f6' },
              { name: 'R', index: r, color: '#ef4444' },
            ],
            highlightLine: 6,
            explanation: `Tổng ${sum} < ${targetSum}: Cần tăng tổng lên, dịch con trỏ trái L sang phải (L = ${l + 1}).`,
            variables: { L: l + 1, R: r },
          });
          l++;
        } else {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'L', index: l, color: '#3b82f6' },
              { name: 'R--', index: r - 1, color: '#ef4444' },
            ],
            highlightLine: 8,
            explanation: `Tổng ${sum} > ${targetSum}: Cần giảm tổng xuống, dịch con trỏ phải R sang trái (R = ${r - 1}).`,
            variables: { L: l, R: r - 1 },
          });
          r--;
        }
      }
      return generated;
    }

    if (algorithm === 'SORTING') {
      const arr = [...parsedArray];
      const generated: Step[] = [];
      const n = arr.length;

      generated.push({
        array: [...arr],
        pointers: [],
        highlightLine: 1,
        explanation: 'Bắt đầu Bubble Sort: Duyệt qua các cặp phần tử liền kề và đổi chỗ nếu sai thứ tự.',
        variables: { n },
      });

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          generated.push({
            array: [...arr],
            pointers: [
              { name: 'j', index: j, color: '#3b82f6' },
              { name: 'j+1', index: j + 1, color: '#f59e0b' },
            ],
            highlightLine: 3,
            explanation: `So sánh A[${j}] = ${arr[j]} và A[${j + 1}] = ${arr[j + 1]}.`,
            variables: { i, j, 'A[j]': arr[j], 'A[j+1]': arr[j + 1] },
          });

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            generated.push({
              array: [...arr],
              pointers: [
                { name: 'SWAP', index: j, color: '#ef4444' },
                { name: 'SWAP', index: j + 1, color: '#ef4444' },
              ],
              highlightLine: 4,
              explanation: `Hoán đổi ${temp} và ${arr[j]} vì ${temp} > ${arr[j]}.`,
              variables: { swapped: `A[${j}] <-> A[${j + 1}]` },
            });
          }
        }
      }

      generated.push({
        array: [...arr],
        pointers: [],
        highlightLine: 6,
        explanation: '✅ Mảng đã được sắp xếp hoàn chỉnh theo thứ tự tăng dần!',
        variables: { status: 'SORTED' },
      });
      return generated;
    }

    if (algorithm === 'PREFIX_SUM') {
      const arr = [...parsedArray];
      const pref: number[] = [0];
      const generated: Step[] = [];

      generated.push({
        array: [...arr],
        pointers: [],
        highlightLine: 1,
        explanation: 'Mảng ban đầu A. Ta sẽ xây dựng mảng cộng dồn P với P[0] = 0.',
        variables: { P0: 0 },
        auxiliary: { prefixArray: [0] },
      });

      for (let i = 0; i < arr.length; i++) {
        const nextVal = pref[pref.length - 1] + arr[i];
        pref.push(nextVal);
        generated.push({
          array: [...arr],
          pointers: [{ name: `A[${i}]`, index: i, color: '#10b981' }],
          highlightLine: 3,
          explanation: `Tính P[${i + 1}] = P[${i}] + A[${i}] = ${pref[i]} + ${arr[i]} = ${nextVal}.`,
          variables: { i, 'A[i]': arr[i], 'P[i+1]': nextVal },
          auxiliary: { prefixArray: [...pref] },
        });
      }

      generated.push({
        array: [...arr],
        pointers: [
          { name: 'L', index: 1, color: '#3b82f6' },
          { name: 'R', index: Math.min(4, arr.length - 1), color: '#ef4444' },
        ],
        highlightLine: 5,
        explanation: `Truy vấn mẫu: Tổng đoạn [1..4] = P[4] - P[0] = ${pref[4] || pref[pref.length - 1]} - 0 tính trong O(1)!`,
        variables: { queryTime: 'O(1)' },
        auxiliary: { prefixArray: [...pref] },
      });

      return generated;
    }

    if (algorithm === 'KNAPSACK_DP') {
      const items = [
        { name: 'Vật 1', w: 2, v: 3 },
        { name: 'Vật 2', w: 3, v: 4 },
        { name: 'Vật 3', w: 4, v: 5 },
        { name: 'Vật 4', w: 5, v: 8 },
      ];
      const maxW = 7;
      const dp: number[][] = Array.from({ length: items.length + 1 }, () =>
        Array(maxW + 1).fill(0)
      );

      const generated: Step[] = [];

      generated.push({
        array: items.map((it) => it.v),
        pointers: [],
        highlightLine: 1,
        explanation: 'Khởi tạo bảng Quy hoạch động DP kích thước (N+1) x (W+1) với tất cả bằng 0. Sức chứa túi W = 7.',
        variables: { N: items.length, MaxW: maxW },
        auxiliary: { dpTable: dp.map((row) => [...row]), items, maxW, activeI: 0, activeW: 0 },
      });

      for (let i = 1; i <= items.length; i++) {
        const item = items[i - 1];
        for (let w = 0; w <= maxW; w++) {
          if (w < item.w) {
            dp[i][w] = dp[i - 1][w];
            generated.push({
              array: items.map((it) => it.v),
              pointers: [],
              highlightLine: 4,
              explanation: `Xét đồ vật ${i} (${item.name}, w=${item.w}, v=${item.v}) với tải trọng w=${w}. Vì w < ${item.w}, túi không chứa vừa, lấy kết quả từ dòng trên: DP[${i}][${w}] = DP[${i - 1}][${w}] = ${dp[i][w]}.`,
              variables: { i, w, 'item.w': item.w, 'item.v': item.v, 'DP[i][w]': dp[i][w] },
              auxiliary: { dpTable: dp.map((row) => [...row]), items, maxW, activeI: i, activeW: w, fromTop: true },
            });
          } else {
            const notTake = dp[i - 1][w];
            const take = dp[i - 1][w - item.w] + item.v;
            dp[i][w] = Math.max(notTake, take);
            const took = take > notTake;
            generated.push({
              array: items.map((it) => it.v),
              pointers: [],
              highlightLine: 5,
              explanation: `Xét đồ vật ${i} (${item.name}, w=${item.w}, v=${item.v}) với tải trọng w=${w}. Không chọn: ${notTake}, Có chọn: ${take}. Chọn max: DP[${i}][${w}] = ${dp[i][w]} ${took ? '(CHỌN món này)' : '(BỎ món này)'}.`,
              variables: { i, w, notTake, take, 'DP[i][w]': dp[i][w] },
              auxiliary: { dpTable: dp.map((row) => [...row]), items, maxW, activeI: i, activeW: w, prevW: w - item.w, took },
            });
          }
        }
      }

      generated.push({
        array: items.map((it) => it.v),
        pointers: [],
        highlightLine: 6,
        explanation: `🎉 Hoàn thành bảng DP! Giá trị lớn nhất có thể thu được với túi sức chứa 7 là DP[4][7] = ${dp[items.length][maxW]} điểm (Chọn Vật 1 và Vật 4)!`,
        variables: { optimalValue: dp[items.length][maxW], chosen: 'Vật 1 + Vật 4' },
        auxiliary: { dpTable: dp.map((row) => [...row]), items, maxW, activeI: items.length, activeW: maxW, done: true },
      });

      return generated;
    }

    // Default fallback
    return [];
  }, [algorithm, parsedArray, targetVal]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(1200 / speed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleRandomize = () => {
    const len = 8 + Math.floor(Math.random() * 4);
    const nums: number[] = [];
    for (let i = 0; i < len; i++) {
      nums.push(Math.floor(Math.random() * 90) + 5);
    }
    nums.sort((a, b) => a - b);
    setArrayInput(nums.join(', '));
    setTargetVal(nums[Math.floor(nums.length / 2)]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const getPseudocode = () => {
    if (algorithm === 'BINARY_SEARCH') {
      return [
        '1: L = 0, R = N - 1',
        '2: while L <= R:',
        '3:     mid = L + (R - L) // 2',
        '4:     if A[mid] == X: return mid',
        '5:     elif A[mid] < X:',
        '6:         L = mid + 1',
        '7:     else:',
        '8:         R = mid - 1',
        '9: return -1 (Not found)',
      ];
    }
    if (algorithm === 'TWO_POINTERS') {
      return [
        '1: L = 0, R = N - 1 (Mảng đã sắp xếp)',
        '2: while L < R:',
        '3:     cur = A[L] + A[R]',
        '4:     if cur == S: return (A[L], A[R])',
        '5:     elif cur < S:',
        '6:         L = L + 1',
        '7:     else:',
        '8:         R = R - 1',
      ];
    }
    if (algorithm === 'SORTING') {
      return [
        '1: for i in range(N - 1):',
        '2:     for j in range(N - i - 1):',
        '3:         if A[j] > A[j+1]:',
        '4:             swap(A[j], A[j+1])',
        '5: return A',
      ];
    }
    if (algorithm === 'PREFIX_SUM') {
      return [
        '1: P[0] = 0',
        '2: for i from 1 to N:',
        '3:     P[i] = P[i-1] + A[i-1]',
        '4: function Query(L, R):',
        '5:     return P[R] - P[L - 1] // O(1)',
      ];
    }
    if (algorithm === 'KNAPSACK_DP') {
      return [
        '1: dp = [[0]*(W+1) for _ in range(N+1)]',
        '2: for i in 1..N (vật i: w[i], v[i]):',
        '3:     for w in 0..W (tải trọng túi):',
        '4:         if w < w[i]: dp[i][w] = dp[i-1][w]',
        '5:         else: dp[i][w] = max(dp[i-1][w], dp[i-1][w - w[i]] + v[i])',
        '6: return dp[N][W] // Lời giải tối ưu',
      ];
    }
    return [];
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl text-zinc-100 overflow-hidden shadow-2xl">
      {/* Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#27272a] px-5 py-3.5 bg-[#121214] gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-zinc-100 flex items-center gap-2">
              Phòng Thí Nghiệm Trực Quan Thuật Toán
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Visualizer Studio
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Mô phỏng từng bước (Step-by-step) con trỏ, ma trận quy hoạch động & kiểm thử Big-O thực tế
            </p>
          </div>
        </div>

        {/* Mode Switcher & Algorithm Picker */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewMode('visualizer')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'visualizer'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Mô Phỏng Trực Quan
            </button>
            <button
              onClick={() => setViewMode('benchmark')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'benchmark'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              Đo Hiệu Năng Big-O
            </button>
          </div>

          {viewMode === 'visualizer' && (
            <select
              value={algorithm}
              onChange={(e) => {
                setAlgorithm(e.target.value as VisualizerAlgorithm);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="bg-[#27272a] text-xs font-medium text-zinc-200 border border-zinc-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="BINARY_SEARCH">Tìm kiếm nhị phân (Binary Search)</option>
              <option value="TWO_POINTERS">Hai con trỏ (Two Pointers)</option>
              <option value="SORTING">Sắp xếp nổi bọt (Bubble Sort)</option>
              <option value="PREFIX_SUM">Mảng cộng dồn (Prefix Sum)</option>
              <option value="KNAPSACK_DP">Quy hoạch động Cái Túi (0/1 Knapsack DP)</option>
            </select>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition"
            >
              Đóng
            </button>
          )}
        </div>
      </div>

      {viewMode === 'benchmark' ? (
        <div className="p-5 bg-[#0f0f12]">
          <BenchmarkTool />
        </div>
      ) : (
        <>
          {/* Control Configuration Strip */}
          <div className="px-5 py-3 border-b border-[#27272a] bg-[#1a1a1e] flex flex-wrap items-center justify-between gap-4 text-xs">
            {algorithm === 'KNAPSACK_DP' ? (
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="font-semibold text-emerald-400">Bài toán Cái Túi 0/1:</span>
                <span>4 đồ vật (w=[2,3,4,5], v=[3,4,5,8]), Tải trọng túi W=7</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                <span className="text-zinc-400 font-medium">Mảng A:</span>
                <input
                  type="text"
                  value={arrayInput}
                  onChange={(e) => {
                    setArrayInput(e.target.value);
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="flex-1 bg-[#121214] border border-zinc-700 rounded px-2.5 py-1 text-zinc-200 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                  placeholder="Các số cách nhau bởi dấu phẩy"
                />
                <button
                  onClick={handleRandomize}
                  title="Ngẫu nhiên mảng"
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 flex items-center gap-1"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Random
                </button>
              </div>
            )}

            {(algorithm === 'BINARY_SEARCH' || algorithm === 'TWO_POINTERS') && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 font-medium">
                  {algorithm === 'BINARY_SEARCH' ? 'Giá trị X:' : 'Mục tiêu tổng S:'}
                </span>
                <input
                  type="number"
                  value={targetVal}
                  onChange={(e) => {
                    setTargetVal(parseInt(e.target.value, 10) || 0);
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="w-16 bg-[#121214] border border-zinc-700 rounded px-2 py-1 text-zinc-200 font-mono text-xs focus:ring-1 focus:ring-emerald-500 text-center"
                />
              </div>
            )}
          </div>

          {/* Visual Canvas Area */}
          <div className="p-6 bg-[#0f0f12]">
            {/* DP Matrix Table or Array Cells */}
            <div className="flex flex-col items-center justify-center min-h-[170px]">
              {algorithm === 'KNAPSACK_DP' && currentStep?.auxiliary?.dpTable ? (
                <div className="w-full max-w-2xl overflow-x-auto p-4 bg-[#141418] border border-zinc-800 rounded-xl mb-4">
                  <div className="text-center mb-3">
                    <span className="text-xs font-bold text-emerald-400 block">
                      Bảng Quy Hoạch Động 2D: DP[đồ vật i][sức chứa w]
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Ô xanh lá: Ô đang tính • Ô xanh dương: Không chọn đồ vật • Ô tím: Có chọn đồ vật
                    </span>
                  </div>
                  <table className="w-full text-center text-xs border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-zinc-700 text-zinc-400">
                        <th className="p-1.5 text-left text-[11px]">i / Đồ vật</th>
                        {Array.from({ length: currentStep.auxiliary.maxW + 1 }, (_, w) => (
                          <th key={w} className="p-1.5 min-w-[34px]">w={w}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {currentStep.auxiliary.dpTable.map((row: number[], i: number) => {
                        const it = i > 0 ? currentStep.auxiliary.items[i - 1] : null;
                        return (
                          <tr key={i} className="hover:bg-zinc-800/30">
                            <td className="p-1.5 text-left text-zinc-300 font-sans text-[11px] whitespace-nowrap">
                              {i === 0 ? '0: Khởi tạo' : `${i}: ${it?.name} (w=${it?.w}, v=${it?.v})`}
                            </td>
                            {row.map((val: number, w: number) => {
                              const isActive =
                                currentStep.auxiliary.activeI === i &&
                                currentStep.auxiliary.activeW === w;
                              const isPrevTop =
                                currentStep.auxiliary.activeI - 1 === i &&
                                currentStep.auxiliary.activeW === w;
                              const isPrevTake =
                                currentStep.auxiliary.activeI - 1 === i &&
                                currentStep.auxiliary.prevW === w;

                              return (
                                <td
                                  key={w}
                                  className={`p-1.5 transition-all duration-200 ${
                                    isActive
                                      ? 'bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500 rounded'
                                      : isPrevTop
                                      ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/50 rounded'
                                      : isPrevTake
                                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/50 rounded'
                                      : 'text-zinc-400'
                                  }`}
                                >
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5 items-center justify-center mb-6">
                  {currentStep &&
                    currentStep.array.map((val, idx) => {
                      const activePointer = currentStep.pointers.find((p) => p.index === idx);
                      const isTargetFound =
                        activePointer?.name.includes('FOUND') ||
                        activePointer?.name.includes('MATCH');

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          {/* Pointer Indicator */}
                          <div className="h-6 flex items-end justify-center mb-1">
                            {activePointer && (
                              <span
                                style={{ backgroundColor: activePointer.color }}
                                className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow animate-bounce"
                              >
                                {activePointer.name}
                              </span>
                            )}
                          </div>

                          {/* Array Box */}
                          <div
                            style={{
                              borderColor: isTargetFound
                                ? '#10b981'
                                : activePointer
                                ? activePointer.color
                                : '#27272a',
                              backgroundColor: isTargetFound
                                ? 'rgba(16, 185, 129, 0.2)'
                                : activePointer
                                ? 'rgba(59, 130, 246, 0.15)'
                                : '#18181b',
                            }}
                            className="w-12 h-14 rounded-lg border-2 flex items-center justify-center text-base font-bold font-mono text-zinc-100 shadow-md transition-all duration-300"
                          >
                            {val}
                          </div>

                          {/* Index Label */}
                          <span className="text-[10px] text-zinc-400 font-mono mt-1">[{idx}]</span>
                        </div>
                      );
                    })}
                </div>
              )}

          {/* Auxiliary Data Display (e.g. Prefix Sum Array) */}
          {currentStep?.auxiliary?.prefixArray && (
            <div className="mt-2 w-full max-w-xl p-3 bg-[#18181b] border border-zinc-800 rounded-lg text-center">
              <span className="text-xs font-semibold text-emerald-400 mb-2 block">
                Mảng cộng dồn P (1-indexed):
              </span>
              <div className="flex flex-wrap gap-2 justify-center font-mono text-xs">
                {currentStep.auxiliary.prefixArray.map((pVal: number, pIdx: number) => (
                  <div key={pIdx} className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-zinc-200">
                    <span className="text-[9px] text-zinc-400 block">P[{pIdx}]</span>
                    <span className="font-bold text-emerald-300">{pVal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step Explanation Banner */}
        <div className="mt-4 p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-blue-300">Giải thích bước {currentStepIndex + 1}/{steps.length}:</span>{' '}
            <span className="text-zinc-200 leading-relaxed">{currentStep?.explanation}</span>
          </div>
        </div>
      </div>

      {/* Dual Panel: Live Pseudocode & Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#27272a] bg-[#141417]">
        {/* Pseudocode Tracker */}
        <div className="p-4 border-r border-[#27272a]">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-emerald-400" />
            Mã giả thực thi (Pseudocode)
          </div>
          <div className="bg-[#0b0b0e] p-3 rounded-lg border border-zinc-800 font-mono text-xs space-y-1">
            {getPseudocode().map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrent = currentStep?.highlightLine === lineNum;
              return (
                <div
                  key={idx}
                  className={`px-2 py-0.5 rounded transition ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                      : 'text-zinc-400'
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>

        {/* Variables Inspector */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Gauge className="w-4 h-4 text-amber-400" />
            Biến & Trạng thái hiện tại
          </div>
          <div className="bg-[#0b0b0e] p-3 rounded-lg border border-zinc-800 font-mono text-xs min-h-[140px]">
            {currentStep?.variables && Object.keys(currentStep.variables).length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentStep.variables).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-[#18181b] rounded border border-zinc-800">
                    <span className="text-zinc-400">{key}:</span>
                    <span className="font-bold text-amber-300">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-zinc-400">Đang nạp trạng thái...</span>
            )}
          </div>
        </div>
      </div>

      {/* Playback Control Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[#111114] border-t border-[#27272a] gap-4">
        {/* Step Scrubber */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <span className="text-xs text-zinc-400 font-mono">
            {currentStepIndex + 1}/{steps.length}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, steps.length - 1)}
            value={currentStepIndex}
            onChange={(e) => {
              setCurrentStepIndex(parseInt(e.target.value, 10));
              setIsPlaying(false);
            }}
            className="w-full accent-emerald-500 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Player Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            title="Khởi động lại (Reset)"
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition border border-zinc-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              setIsPlaying(false);
            }}
            disabled={currentStepIndex === 0}
            title="Lùi lại 1 bước"
            className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 rounded-lg transition border border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Tạm dừng' : 'Phát tự động'}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-emerald-950"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Tạm dừng
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Chạy tiếp
              </>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              setIsPlaying(false);
            }}
            disabled={currentStepIndex >= steps.length - 1}
            title="Tiến tới 1 bước"
            className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 rounded-lg transition border border-zinc-700"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Speed Presets */}
          <div className="flex items-center ml-2 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 text-[11px] font-mono transition ${
                  speed === s ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
