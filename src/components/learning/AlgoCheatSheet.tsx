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
  {
    id: 'string-processing-clean',
    category: 'Chuỗi & Xâu ký tự',
    title: 'Xử Lý Chuỗi: Đếm Tần Suất Ký Tự & Kiểm Tra Palindrome Hai Con Trỏ',
    description:
      'Các thao tác cốt lõi trên xâu ký tự: đếm tần số ký tự với mảng đếm bảng mã ASCII cnt[26], chuẩn hóa xâu họ tên, và kiểm tra tính chất đối xứng hai đầu trong O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) bộ nhớ phụ',
    pitfalls: [
      'Không dùng toán tử s = s + ch trong vòng lặp Python vì mỗi lần nối xâu tạo một bản sao mới tốn O(N^2), luôn dùng list và "".join().',
      'Cẩn thận với chỉ số âm hoặc truy cập vượt độ dài xâu s.length().',
      'Khi chuyển ký tự hoa thường trong C++, dùng tolower((unsigned char)c) để tránh undefined behavior.',
    ],
    tags: ['Strings', 'Palindrome', 'ASCII', 'Two Pointers'],
    cppCode: `// Xử lý chuỗi và kiểm tra xâu đối xứng bỏ qua ký tự đặc biệt
#include <iostream>
#include <string>
#include <vector>
#include <cctype>

using namespace std;

// Đếm tần suất chữ cái tiếng Anh 'a'..'z' trong O(N)
vector<int> countFrequency(const string& s) {
    vector<int> freq(26, 0);
    for (char c : s) {
        if (isalpha(c)) {
            freq[tolower(c) - 'a']++;
        }
    }
    return freq;
}

// Kiểm tra xâu đối xứng bằng 2 con trỏ O(N) thời gian, O(1) bộ nhớ
bool isPalindromeClean(const string& s) {
    int l = 0, r = (int)s.length() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++;
        r--;
    }
    return true;
}`,
    pythonCode: `# Template Xử lý Chuỗi & Palindrome trong Python 3
def count_frequency(s: str) -> dict:
    freq = {}
    for ch in s:
        if ch.isalpha():
            c = ch.lower()
            freq[c] = freq.get(c, 0) + 1
    return freq

def is_palindrome_clean(s: str) -> bool:
    # Lọc ký tự chữ số và đưa về chữ thường
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    l, r = 0, len(filtered) - 1
    while l < r:
        if filtered[l] != filtered[r]:
            return False
        l += 1
        r -= 1
    return True

def normalize_name(s: str) -> str:
    # Chuẩn hóa họ tên: xóa khoảng trắng thừa, viết hoa chữ cái đầu
    return " ".join(word.capitalize() for word in s.strip().split())`,
  },
  {
    id: 'math-modular-power-gcd',
    category: 'Số học & Toán học',
    title: 'Lũy Thừa Nhị Phân & Ước Chung Lớn Nhất (GCD & Binary Exponentiation)',
    description:
      'Tính (A^B) % M với B lên tới 10^18 trong O(log B) phép tính và tìm ƯCLN bằng thuật toán Euclid kinh điển.',
    timeComplexity: 'Lũy thừa O(log B), GCD O(log min(A, B))',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Tràn số khi nhân hai số 64-bit trước khi mod; trong C++ có thể dùng __int128 để nhân an toàn.',
      'Trường hợp B = 0 thì A^0 % M = 1 % M (chú ý khi M = 1 thì kết quả là 0).',
    ],
    tags: ['Math', 'GCD', 'Modular Exponentiation', 'Số học'],
    cppCode: `// Lũy thừa nhị phân A^B % M với độ phức tạp O(log B)
long long powerMod(long long a, long long b, long long m) {
    long long res = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (long long)((__int128)res * a % m);
        a = (long long)((__int128)a * a % m);
        b >>= 1;
    }
    return res;
}

// Thuật toán Euclid tìm ƯCLN trong O(log min(A, B))
long long gcd(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

// BCNN: Chia trước để tránh tràn số tích a * b
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd(a, b)) * b;
}`,
    pythonCode: `# Template Lũy thừa nhị phân và GCD chuẩn trong Python 3
def power_mod(a: int, b: int, m: int) -> int:
    res = 1 % m
    a %= m
    while b > 0:
        if b % 2 == 1:
            res = (res * a) % m
        a = (a * a) % m
        b //= 2
    return res

def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a

def lcm(a: int, b: int) -> int:
    if a == 0 or b == 0:
        return 0
    return (a // gcd(a, b)) * b`,
  },
  {
    id: 'functions-modular-design',
    category: 'Hàm & Thiết kế',
    title: 'Thiết Kế Hàm Thủ Tục & Truyền Tham Chiếu (Pass by Reference)',
    description:
      'Quy chuẩn thiết kế hàm con trong kỳ thi: dùng const reference để loại bỏ nguy cơ TLE do sao chép mảng, viết hàm kiểm tra predicate sạch sẽ.',
    timeComplexity: 'O(1) gọi hàm',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Quên dấu & khi truyền vector<int> a làm hàm sao chép toàn bộ mảng O(N), nếu gọi trong vòng lặp sẽ bị TLE.',
      'Tránh lạm dụng biến toàn cục làm sai lệch giá trị khi hàm được gọi nhiều lần.',
    ],
    tags: ['Functions', 'Pass by Reference', 'Clean Code', 'Templates'],
    cppCode: `// Template Thiết kế hàm sạch sẽ chuẩn thi đấu
#include <vector>
#include <iostream>

using namespace std;

// Hàm kiểm tra số nguyên tố: O(sqrt(N))
bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}

// BẮT BUỘC: Dùng const vector<T>& để O(1) con trỏ, không copy mảng
long long computeSum(const vector<int>& a) {
    long long total = 0;
    for (int x : a) total += x;
    return total;
}

// Hàm Predicate dùng trong Chặt nhị phân kết quả
bool checkCondition(long long mid, const vector<int>& a, int targetK) {
    int count = 0;
    for (int x : a) {
        count += x / mid;
    }
    return count >= targetK;
}`,
    pythonCode: `# Thiết kế hàm con & Scope biến trong Python
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

# Hàm kiểm tra điều kiện (Predicate) cho Chặt nhị phân
def check_condition(mid: int, arr: list, target_k: int) -> bool:
    if mid == 0:
        return False
    return sum(x // mid for x in arr) >= target_k`,
  },
  {
    id: 'recursion-tower-hanoi',
    category: 'Đệ quy',
    title: 'Tư Duy Đệ Quy & Bài Toán Tháp Hà Nội (Tower of Hanoi)',
    description:
      'Khung hàm đệ quy tổng quát: xác định trường hợp cơ sở (Base Case) và bước đệ quy (Recursive Step), giải bài toán Tháp Hà Nội trong 2^N - 1 bước.',
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N) độ sâu ngăn xếp gọi hàm',
    pitfalls: [
      'Thiếu Base Case sẽ gây vòng lặp đệ quy vô hạn dẫn tới lỗi tràn ngăn xếp (Stack Overflow).',
      'Trong Python cần tăng sys.setrecursionlimit() nếu bài toán đệ quy sâu quá 1000 bước.',
    ],
    tags: ['Recursion', 'Hanoi', 'Divide & Conquer', 'Call Stack'],
    cppCode: `// Khung đệ quy Tháp Hà Nội chuyển N đĩa từ cọc A sang cọc C
#include <iostream>

using namespace std;

void hanoi(int n, char src, char dest, char aux) {
    // 1. Trường hợp cơ sở (Base Case)
    if (n == 1) {
        cout << src << " -> " << dest << "\\n";
        return;
    }
    
    // 2. Bước đệ quy 1: Chuyển n-1 đĩa từ src sang aux
    hanoi(n - 1, src, aux, dest);
    
    // 3. Chuyển đĩa lớn nhất từ src sang dest
    cout << src << " -> " << dest << "\\n";
    
    // 4. Bước đệ quy 2: Chuyển n-1 đĩa từ aux sang dest
    hanoi(n - 1, aux, dest, src);
}

int main() {
    int n = 3;
    cout << "Tổng số bước tối thiểu: " << (1 << n) - 1 << "\\n";
    hanoi(n, 'A', 'C', 'B');
    return 0;
}`,
    pythonCode: `# Template Đệ quy Tháp Hà Nội trong Python 3
def solve_hanoi(n: int, src: str, dest: str, aux: str):
    if n == 1:
        print(f"{src} -> {dest}")
        return
    solve_hanoi(n - 1, src, aux, dest)
    print(f"{src} -> {dest}")
    solve_hanoi(n - 1, aux, dest, src)

# Số bước luôn là 2^n - 1`,
  },
  {
    id: 'backtracking-try-framework',
    category: 'Vét cạn & Quay lui',
    title: 'Khung Thuật Toán Quay Lui Chuẩn Try(i) & Bài Toán N Quân Hậu',
    description:
      'Mô hình quay lui kinh điển của giáo trình Chuyên Tin Việt Nam: Thử chọn giá trị -> Ghi nhận -> Gọi Try(i+1) -> Hoàn tác (Backtrack). Áp dụng cho sinh hoán vị và xếp N quân hậu.',
    timeComplexity: 'Sinh nhị phân O(2^N), Hoán vị O(N!)',
    spaceComplexity: 'O(N) lưu trạng thái và mảng đánh dấu',
    pitfalls: [
      'BẮT BUỘC hoàn tác lại mảng đánh dấu used[] sau khi đệ quy xong để tránh sai lệch nhánh tiếp theo.',
      'Đường chéo trong bàn cờ NxN: đường chéo chính (row - col + N), đường chéo phụ (row + col).',
    ],
    tags: ['Backtracking', 'Quay lui', 'Try(i)', 'Vét cạn', 'N-Queens'],
    cppCode: `// Khung thuật toán Quay lui Try(i) giải N Quân Hậu
#include <iostream>
#include <vector>

using namespace std;

int n = 8;
int totalSolutions = 0;
bool colUsed[30], diagMain[60], diagSub[60];

void Try(int row) {
    for (int col = 0; col < n; col++) {
        // Kiểm tra xem vị trí (row, col) có an toàn không
        if (!colUsed[col] && !diagMain[row - col + n] && !diagSub[row + col]) {
            // 1. Thử chọn & ghi nhận
            colUsed[col] = diagMain[row - col + n] = diagSub[row + col] = true;
            
            if (row == n - 1) {
                totalSolutions++; // Tìm thấy 1 cấu hình hợp lệ
            } else {
                Try(row + 1);    // 2. Xét tiếp hàng tiếp theo
            }
            
            // 3. Hoàn tác trạng thái (Backtrack)
            colUsed[col] = diagMain[row - col + n] = diagSub[row + col] = false;
        }
    }
}

int main() {
    Try(0);
    cout << "Số cách xếp: " << totalSolutions << "\\n";
    return 0;
}`,
    pythonCode: `# Template Quay lui Try(i) trong Python 3
def solve_n_queens(n: int) -> int:
    col_used = [False] * n
    diag_main = [False] * (2 * n)
    diag_sub = [False] * (2 * n)
    count = 0
    
    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for col in range(n):
            d1 = row - col + n
            d2 = row + col
            if not col_used[col] and not diag_main[d1] and not diag_sub[d2]:
                # 1. Thử chọn
                col_used[col] = diag_main[d1] = diag_sub[d2] = True
                # 2. Đệ quy
                backtrack(row + 1)
                # 3. Hoàn tác
                col_used[col] = diag_main[d1] = diag_sub[d2] = False
                
    backtrack(0)
    return count`,
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
