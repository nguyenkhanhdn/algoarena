import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Layers,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

export interface SnippetItem {
  id: string;
  category: string;
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  pitfalls: string[];
  cppCode: string;
  pythonCode: string;
  tags: string[];
}

const SNIPPETS: SnippetItem[] = [
  {
    id: 'fast-io-file',
    category: 'Cấu hình & Tối ưu I/O',
    title: 'Fast I/O & Đọc Ghi File Chuẩn Thi HSG (.INP / .OUT)',
    description:
      'Tối ưu luồng nhập xuất chuẩn cin/cout đạt tốc độ tương đương scanf/printf và cấu hình đọc ghi file tự động cho các kỳ thi HSG cấp Tỉnh/Quốc gia và Tin học trẻ.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Không dùng endl vì endl tự động xả đệm (flush buffer) gây chậm; luôn thay bằng ký tự "\\n".',
      'Không dùng đồng thời cả cin/cout lẫn scanf/printf khi đã bật ios_base::sync_with_stdio(false).',
      'Tên file INP/OUT phân biệt hoa thường tùy hệ điều hành máy chủ chấm bài (Linux).',
    ],
    tags: ['Fast I/O', 'freopen', 'Templates', 'HSG', 'Tin học trẻ'],
    cppCode: `// AlgoArena Vietnam - Template Chuẩn Thi HSG & Tin Học Trẻ
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void setupIO(const string& problemName = "") {
    // Tối ưu hóa tốc độ luồng nhập xuất
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Nếu kỳ thi yêu cầu đọc ghi file (ví dụ: BAI1.INP, BAI1.OUT)
    if (!problemName.empty()) {
        #ifndef ONLINE_JUDGE
        freopen((problemName + ".INP").c_str(), "r", stdin);
        freopen((problemName + ".OUT").c_str(), "w", stdout);
        #endif
    }
}

int main() {
    setupIO("BAI1"); // Đổi thành tên bài theo yêu cầu đề

    int n;
    if (cin >> n) {
        cout << "Đã đọc N = " << n << "\\n";
    }

    return 0;
}`,
    pythonCode: `# Template Python 3 Tối ưu I/O cho kỳ thi
import sys

def setup_io(problem_name=""):
    # Đọc ghi file theo thể thức thi Học Sinh Giỏi
    if problem_name:
        try:
            sys.stdin = open(f"{problem_name}.INP", "r")
            sys.stdout = open(f"{problem_name}.OUT", "w")
        except FileNotFoundError:
            pass # Chạy I/O chuẩn nếu không tìm thấy file

def solve():
    setup_io("BAI1")
    # Đọc toàn bộ đầu vào siêu tốc bằng sys.stdin.read
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    sys.stdout.write(f"Đã đọc N = {n}\\n")

if __name__ == "__main__":
    solve()`,
  },
  {
    id: 'binary-search-answer',
    category: 'Tìm kiếm & Con trỏ',
    title: 'Chặt Nhị Phân Kết Quả (Binary Search on Answer)',
    description:
      'Dạng toán xuất hiện trong 80% đề thi HSG & Tin học trẻ Bảng B: Chuyển đổi bài toán tối ưu (tìm Min/Max thỏa điều kiện) sang bài toán kiểm tra tính hợp lệ bằng hàm bool check(mid).',
    timeComplexity: 'O(log(R - L) * T(check))',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Cận tìm kiếm low và high phải bao phủ hết miền đáp án, cẩn thận tràn số khi dùng kiểu int cho high (dùng long long).',
      'Cách tính mid = low + (high - low) / 2 tránh tràn số so với (low + high) / 2.',
      'Cập nhật low = mid + 1 hoặc high = mid - 1 tùy thuộc hàm check(mid) tăng dần hay giảm dần.',
    ],
    tags: ['Binary Search', 'BS on Answer', 'Trung cấp', 'HSG B'],
    cppCode: `// Tìm giá trị nhỏ nhất mid thỏa mãn hàm check(mid) == true
long long binarySearchAnswer(long long low, long long high, const vector<long long>& a) {
    long long ans = high;

    auto check = [&](long long mid) -> bool {
        // Viết logic kiểm tra: với ngưỡng mid, có phân chia/chọn được không?
        long long count = 0;
        for (long long x : a) {
            count += x / mid;
        }
        return count >= 10; // Ví dụ điều kiện
    };

    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (check(mid)) {
            ans = mid;         // Ghi nhận đáp án tốt hơn
            high = mid - 1;    // Tiếp tục tìm giá trị nhỏ hơn ở nửa trái
        } else {
            low = mid + 1;     // Tăng ngưỡng để thỏa mãn
        }
    }
    return ans;
}`,
    pythonCode: `def binary_search_answer(low: int, high: int, arr: list) -> int:
    def check(mid: int) -> bool:
        # Kiểm tra tính khả thi với nghiệm thử mid
        count = sum(x // mid for x in arr if mid > 0)
        return count >= 10

    ans = high
    while low <= high:
        mid = (low + high) // 2
        if check(mid):
            ans = mid
            high = mid - 1 # Thu hẹp miền tìm kiếm bên trái
        else:
            low = mid + 1  # Tăng ngưỡng bên phải
    return ans`,
  },
  {
    id: 'prefix-sum-2d',
    category: 'Mảng & Dãy số',
    title: 'Mảng Cộng Dồn 2D (2D Prefix Sum Array)',
    description:
      'Tính tổng các phần tử của một hình chữ nhật con từ ô (x1, y1) tới ô (x2, y2) trong ma trận kích thước M x N trong độ phức tạp O(1) sau khi tiền xử lý O(M * N).',
    timeComplexity: 'Tiền xử lý O(M*N), Truy vấn O(1)',
    spaceComplexity: 'O(M*N)',
    pitfalls: [
      'Bảng 1-indexed giúp tránh kiểm tra điều kiện biên x1 - 1 < 0.',
      'Công thức hình học: P[x2][y2] - P[x1-1][y2] - P[x2][y1-1] + P[x1-1][y1-1] (phải cộng bù góc trên bên trái bị trừ 2 lần).',
    ],
    tags: ['Prefix Sum', '2D Matrix', 'Ma Trận', 'O(1) Query'],
    cppCode: `// Xây dựng mảng cộng dồn 2D kích thước (M+1) x (N+1)
vector<vector<long long>> buildPrefix2D(int m, int n, const vector<vector<int>>& grid) {
    vector<vector<long long>> P(m + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            P[i][j] = grid[i - 1][j - 1] 
                    + P[i - 1][j] 
                    + P[i][j - 1] 
                    - P[i - 1][j - 1];
        }
    }
    return P;
}

// Truy vấn tổng hình chữ nhật con [x1..x2, y1..y2] (1-indexed) trong O(1)
long long querySubmatrix(const vector<vector<long long>>& P, int x1, int y1, int x2, int y2) {
    return P[x2][y2] - P[x1 - 1][y2] - P[x2][y1 - 1] + P[x1 - 1][y1 - 1];
}`,
    pythonCode: `def build_prefix_2d(m: int, n: int, grid: list):
    P = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            P[i][j] = grid[i - 1][j - 1] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1]
    return P

def query_submatrix(P: list, x1: int, y1: int, x2: int, y2: int) -> int:
    return P[x2][y2] - P[x1 - 1][y2] - P[x2][y1 - 1] + P[x1 - 1][y1 - 1]`,
  },
  {
    id: 'sieve-eratosthenes',
    category: 'Số học & Lý thuyết số',
    title: 'Sàng Số Nguyên Tố Eratosthenes & Phân Tích Thừa Số O(log N)',
    description:
      'Sàng số nguyên tố kinh điển đến giới hạn N = 10^7 và lưu ước nguyên tố nhỏ nhất (Smallest Prime Factor - SPF) để phân tích bất kỳ số nào ra thừa số nguyên tố trong O(log N).',
    timeComplexity: 'Sàng O(N log log N), Phân tích O(log N)',
    spaceComplexity: 'O(N)',
    pitfalls: [
      'Biến i * i có thể bị tràn kiểu int 32-bit khi N > 5 * 10^4, luôn ép kiểu (long long)i * i.',
      'Sử dụng vector<bool> hoặc bitset trong C++ giúp tiết kiệm bộ nhớ gấp 8 lần.',
    ],
    tags: ['Sàng Eratosthenes', 'Số nguyên tố', 'Số học', 'SPF'],
    cppCode: `const int MAXN = 10000000;
int spf[MAXN + 1]; // spf[x] là ước nguyên tố nhỏ nhất của x

void sieveSPF() {
    for (int i = 1; i <= MAXN; i++) spf[i] = i;
    for (int i = 2; (long long)i * i <= MAXN; i++) {
        if (spf[i] == i) { // i là số nguyên tố
            for (int j = i * i; j <= MAXN; j += i) {
                if (spf[j] == j) spf[j] = i;
            }
        }
    }
}

// Phân tích n ra các thừa số nguyên tố trong O(log n)
vector<int> factorize(int n) {
    vector<int> factors;
    while (n > 1) {
        factors.push_back(spf[n]);
        n /= spf[n];
    }
    return factors;
}`,
    pythonCode: `MAXN = 1_000_000
spf = list(range(MAXN + 1))

def sieve_spf():
    for i in range(2, int(MAXN**0.5) + 1):
        if spf[i] == i:
            for j in range(i * i, MAXN + 1, i):
                if spf[j] == j:
                    spf[j] = i

def factorize(n: int) -> list:
    factors = []
    while n > 1:
        factors.append(spf[n])
        n //= spf[n]
    return factors`,
  },
  {
    id: 'dsu-disjoint-set',
    category: 'Cấu trúc dữ liệu & Đồ thị',
    title: 'Disjoint Set Union (DSU) - Cấu Trúc Các Tập Hợp Rời Nhau',
    description:
      'Cấu trúc dữ liệu tối quan trọng trong các bài toán đồ thị, hợp nhất cụm, kiểm tra chu trình và thuật toán Kruskal tìm cây khung nhỏ nhất.',
    timeComplexity: 'Gần như O(1) mỗi thao tác - O(alpha(N))',
    spaceComplexity: 'O(N)',
    pitfalls: [
      'Bắt buộc kết hợp cả 2 kỹ thuật: Nén đường đi (Path Compression) và Hợp nhất theo kích thước (Union by Size/Rank) để đạt độ phức tạp tối ưu.',
      'Gọi findRoot(u) trước khi so sánh thay vì so sánh trực tiếp parent[u] == parent[v].',
    ],
    tags: ['DSU', 'Đồ thị', 'Union-Find', 'Kruskal'],
    cppCode: `struct DSU {
    vector<int> parent;
    vector<int> sz;
    int numSets;

    DSU(int n) {
        parent.resize(n + 1);
        sz.assign(n + 1, 1);
        numSets = n;
        for (int i = 1; i <= n; i++) parent[i] = i;
    }

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Nén đường đi (Path compression)
    }

    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false; // Cùng tập hợp, bỏ qua

        // Hợp nhất theo kích thước (Union by size)
        if (sz[rootI] < sz[rootJ]) swap(rootI, rootJ);
        parent[rootJ] = rootI;
        sz[rootI] += sz[rootJ];
        numSets--;
        return true;
    }

    bool isSame(int i, int j) {
        return find(i) == find(j);
    }
};`,
    pythonCode: `class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n + 1))
        self.sz = [1] * (n + 1)
        self.num_sets = n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def unite(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i == root_j:
            return False
        
        if self.sz[root_i] < self.sz[root_j]:
            root_i, root_j = root_j, root_i
        
        self.parent[root_j] = root_i
        self.sz[root_i] += self.sz[root_j]
        self.num_sets -= 1
        return True`,
  },
  {
    id: 'lis-nlogn',
    category: 'Quy hoạch động',
    title: 'Dãy Con Tăng Dài Nhất (Longest Increasing Subsequence - LIS) O(N log N)',
    description:
      'Thuật toán Quy hoạch động kết hợp Tìm kiếm nhị phân (lower_bound) để tìm độ dài dãy con tăng dài nhất trong O(N log N), thay thế thuật toán O(N^2) truyền thống.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    pitfalls: [
      'Dãy con tăng ngặt: dùng std::lower_bound.',
      'Dãy con không giảm (có thể bằng nhau): dùng std::upper_bound.',
      'Mảng tail[k] lưu giá trị kết thúc nhỏ nhất của một dãy con tăng độ dài k+1.',
    ],
    tags: ['LIS', 'DP', 'Quy hoạch động', 'lower_bound', 'N log N'],
    cppCode: `#include <vector>
#include <algorithm>

// Tìm độ dài dãy con tăng nghiêm ngặt dài nhất
int longestIncreasingSubsequence(const std::vector<int>& a) {
    std::vector<int> tails;

    for (int x : a) {
        // Tìm vị trí phần tử đầu tiên >= x
        auto it = std::lower_bound(tails.begin(), tails.end(), x);

        if (it == tails.end()) {
            tails.push_back(x); // x lớn hơn tất cả phần tử cuối hiện có
        } else {
            *it = x;            // Cập nhật giá trị kết thúc nhỏ hơn cho độ dài tương ứng
        }
    }

    return tails.size(); // Độ dài LIS chính là kích thước mảng tails
}`,
    pythonCode: `import bisect

def longest_increasing_subsequence(arr: list) -> int:
    tails = []
    for x in arr:
        # Tìm vị trí phần tử đầu tiên >= x
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
  },
];

export const AlgoCheatSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLang, setActiveLang] = useState<'cpp' | 'python'>('cpp');
  const [expandedId, setExpandedId] = useState<string>('fast-io-file');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['ALL', ...Array.from(new Set(SNIPPETS.map((s) => s.category)))];

  const filteredSnippets = SNIPPETS.filter((s) => {
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleCopyCode = (snippet: SnippetItem) => {
    const code = activeLang === 'cpp' ? snippet.cppCode : snippet.pythonCode;
    navigator.clipboard.writeText(code);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-[#18181c] via-[#1c1c24] to-[#18181c] border border-[#27272a] rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Cẩm Nang Code Mẫu Chuẩn HSG & Tin Học Trẻ
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            Sổ Tay Thuật Toán & Template Thi Đấu
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Tuyển tập các khung mẫu chuẩn hóa C++20 và Python 3 tối ưu I/O, mảng cộng dồn 2D, chặt nhị phân kết quả, sàng số nguyên tố và DSU sẵn sàng sử dụng trong kỳ thi.
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveLang('cpp')}
            className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeLang === 'cpp'
                ? 'bg-blue-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            C++ 20 (STL)
          </button>
          <button
            onClick={() => setActiveLang('python')}
            className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeLang === 'python'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Python 3
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#141417] border border-[#27272a] rounded-xl">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên thuật toán, từ khóa, DSU, LIS, freopen..."
            className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat === 'ALL' ? 'Tất cả chuyên đề' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Cards List */}
      <div className="space-y-4">
        {filteredSnippets.map((item) => {
          const isExpanded = expandedId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-[#18181c] border border-[#27272a] rounded-xl overflow-hidden transition shadow-lg hover:border-zinc-700"
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-zinc-800/30 transition"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-800/90 text-emerald-400 border border-zinc-700 mt-0.5">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        ⏱️ {item.timeComplexity}
                      </span>
                      <span className="text-[11px] font-mono text-purple-400">
                        💾 {item.spaceComplexity}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-100">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-3xl">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(item);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Đã chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Chép Code
                      </>
                    )}
                  </button>

                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="border-t border-[#27272a] bg-[#121215] p-5 space-y-4">
                  {/* Pitfalls & Edge Cases */}
                  {item.pitfalls && item.pitfalls.length > 0 && (
                    <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl">
                      <span className="text-xs font-bold text-amber-400 block mb-1.5 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Bẫy lỗi & Lưu ý quan trọng khi nộp bài:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-amber-200/90 leading-relaxed">
                        {item.pitfalls.map((p, pIdx) => (
                          <li key={pIdx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Editor Box */}
                  <div className="rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0c0e]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#18181c] border-b border-[#27272a] text-xs">
                      <span className="font-mono text-zinc-300 font-semibold flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        {activeLang === 'cpp' ? 'template_hsg.cpp (C++20)' : 'template_hsg.py (Python 3)'}
                      </span>
                      <button
                        onClick={() => handleCopyCode(item)}
                        className="text-xs text-zinc-400 hover:text-emerald-400 transition flex items-center gap-1"
                      >
                        {isCopied ? 'Đã sao chép!' : 'Sao chép khối code'}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed">
                      <code>{activeLang === 'cpp' ? item.cppCode : item.pythonCode}</code>
                    </pre>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSnippets.length === 0 && (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-400">Không tìm thấy mã mẫu nào phù hợp với từ khóa.</p>
          </div>
        )}
      </div>
    </div>
  );
};
