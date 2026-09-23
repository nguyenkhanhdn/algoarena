import { Lesson, Problem, Topic } from '../types';

export const supplementaryTopics: Topic[] = [
  {
    id: 'topic-functions',
    pathId: 'path-1',
    title: 'Hàm & Kỹ thuật Thiết kế Hàm (Functions & Modular Programming)',
    slug: 'ham-lap-trinh-thu-tuc',
    description: 'Tổ chức hàm con, truyền tham trị/tham chiếu (pass-by-reference), hàm kiểm tra điều kiện (predicate), biến toàn cục và cục bộ.',
    category: 'Nền tảng',
    order: 2,
    lessonsCount: 1,
    problemsCount: 2,
    icon: 'Code2',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-strings',
    pathId: 'path-1',
    title: 'Xử lý Chuỗi & Xâu Ký Tự (String Manipulation & Character Analysis)',
    slug: 'xu-ly-chuoi-xau-ky-tu',
    description: 'Xử lý ký tự ASCII, đếm tần suất, xâu đối xứng (Palindrome), chuẩn hóa xâu họ tên, tách ghép từ và so khớp xâu.',
    category: 'Nền tảng',
    order: 3,
    lessonsCount: 1,
    problemsCount: 2,
    icon: 'FileText',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-math',
    pathId: 'path-2',
    title: 'Số học & Các Dạng Đề Về Toán (Number Theory & Math in CP)',
    slug: 'so-hoc-toan-hoc',
    description: 'Sàng số nguyên tố Eratosthenes, ƯCLN (GCD/LCM), Phân tích thừa số nguyên tố, Lũy thừa nhị phân & Đồng dư Modulo.',
    category: 'Số học & Toán học',
    order: 4,
    lessonsCount: 1,
    problemsCount: 3,
    icon: 'Sparkles',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-recursion',
    pathId: 'path-2',
    title: 'Đệ Quy & Phân Rã Bài Toán (Recursion & Divide and Conquer)',
    slug: 'de-quy-phan-ra-bai-toan',
    description: 'Bản chất ngăn xếp gọi hàm (Call Stack), điểm dừng (Base Case), đệ quy Fibonacci, Giai thừa, và bài toán Tháp Hà Nội.',
    category: 'Thuật toán cơ bản',
    order: 5,
    lessonsCount: 1,
    problemsCount: 2,
    icon: 'GitFork',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-backtracking',
    pathId: 'path-2',
    title: 'Vét Cạn & Thuật Toán Quay Lui (Exhaustive Search & Backtracking)',
    slug: 'vet-can-quay-lui-backtracking',
    description: 'Mô hình Try(i) kinh điển, sinh cấu hình nhị phân, sinh hoán vị/tổ hợp, bài toán N Quân Hậu và kỹ thuật nhánh cận.',
    category: 'Thuật toán cơ bản',
    order: 6,
    lessonsCount: 1,
    problemsCount: 2,
    icon: 'Zap',
    levelBadge: 'Trung cấp',
  },
];

export const supplementaryLessons: Lesson[] = [
  {
    id: 'lesson-functions-design',
    topicId: 'topic-functions',
    title: 'Thiết kế Hàm & Kỹ thuật Truyền Tham Trị / Tham Chiếu trong Thi Đấu',
    slug: 'thiet-ke-ham-va-truyen-tham-chieu',
    order: 1,
    objectives: [
      'Hiểu rõ sự khác biệt giữa Truyền tham trị (Pass by Value) và Truyền tham chiếu (Pass by Reference) trong C++.',
      'Tránh lỗi ngớ ngẩn TLE do sao chép mảng N = 10^5 phần tử mỗi lần gọi hàm.',
      'Thiết kế hàm kiểm tra điều kiện (Predicate function) sạch sẽ: bool check(mid), bool isPrime(n).',
      'Phân biệt phạm vi biến toàn cục (Global) và biến cục bộ (Local) trong đề thi HSG.',
    ],
    prerequisites: ['Cú pháp hàm cơ bản', 'Kiểu dữ liệu nguyên thủy', 'Mảng một chiều'],
    content: `
### 1. Bản chất của Hàm trong Lập trình Thi đấu
Hàm (Function) không chỉ giúp mã nguồn gọn gàng mà còn là cốt lõi để xây dựng **các thuật toán phức tạp**:
- Hàm kiểm tra tính hợp lệ trong Chặt nhị phân kết quả: \`bool check(long long mid)\`
- Hàm kiểm tra số học: \`bool isPrime(int n)\`, \`long long gcd(long long a, long long b)\`
- Hàm đệ quy phân rã: \`void Try(int i)\`

### 2. Cạm bẫy TLE chí tử: Truyền tham trị vs Tham chiếu trong C++
Khi bạn truyền một vector hoặc mảng vào hàm:
\`\`\`cpp
// ❌ NGUY HIỂM: Sao chép toàn bộ vector a mỗi lần gọi -> O(N) thời gian & bộ nhớ!
int sumArray(vector<int> a) { ... }

// ✅ CHUẨN THI ĐẤU: Dùng const vector<int>& -> O(1) chỉ truyền con trỏ địa chỉ
int sumArray(const vector<int>& a) { ... }
\`\`\`
Nếu hàm được gọi $10^5$ lần trong vòng lặp, việc quên dấu \`&\` sẽ biến thuật toán từ $O(N)$ thành $O(N^2)$, gây Time Limit Exceeded (TLE) ngay lập tức!

### 3. Thiết kế hàm kiểm tra điều kiện (Predicate)
Trong Python:
\`\`\`python
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
\`\`\`
    `,
    pseudocode: `HÀM KiemTraNguyenTo(N):
    NẾU N < 2 THÌ TRẢ VỀ False
    CHO i TỪ 2 ĐẾN căn_bậc_hai(N):
        NẾU N chia hết cho i THÌ:
            TRẢ VỀ False
    TRẢ VỀ True`,
    samplePython: `def is_prime(n: int) -> bool:
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

def count_primes_in_range(l: int, r: int) -> int:
    return sum(1 for x in range(l, r + 1) if is_prime(x))`,
    sampleCpp: `#include <iostream>
#include <vector>

using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}

// Truyền tham chiếu & để tránh sao chép tốn O(N)
int countPrimes(const vector<long long>& arr) {
    int cnt = 0;
    for (long long x : arr) {
        if (isPrime(x)) cnt++;
    }
    return cnt;
}`,
    timeComplexity: 'O(sqrt(N)) cho hàm isPrime, O(1) truyền tham chiếu',
    spaceComplexity: 'O(1)',
    commonMistakes: [
      'Quên dấu & khi truyền vector trong C++ làm bài toán bị TLE.',
      'Sử dụng biến toàn cục trùng tên với biến cục bộ bên trong hàm (Shadowing).',
      'Hàm có nhánh không trả về giá trị (Undefined Behavior trong C++).',
    ],
    contestTips: [
      'Tách bài toán lớn thành các hàm nhỏ (hàm đọc dữ liệu, hàm kiểm tra, hàm giải chính) để dễ gỡ lỗi khi làm bài thi.',
    ],
    relatedProblemIds: ['prob-function-super-prime'],
  },
  {
    id: 'lesson-string-manipulation',
    topicId: 'topic-strings',
    title: 'Kỹ thuật Xử lý Chuỗi & Xâu Ký Tự Chuẩn Đề Thi HSG',
    slug: 'ky-thuat-xu-ly-chuoi-hsg',
    order: 1,
    objectives: [
      'Nắm vững thao tác ký tự: bảng mã ASCII, chuyển đổi hoa/thường, đếm tần suất.',
      'Xử lý và chuẩn hóa chuỗi: xóa khoảng trắng thừa, viết hoa chữ cái đầu.',
      'Kiểm tra tính chất đối xứng (Palindrome) với kỹ thuật hai con trỏ.',
      'Tránh lỗi cộng xâu trong vòng lặp làm bùng nổ O(N^2) thời gian.',
    ],
    prerequisites: ['Mảng ký tự hoặc kiểu String', 'Vòng lặp for/while'],
    content: `
### 1. Bảng mã ASCII và Mảng đếm tần suất ký tự
Mỗi ký tự tiếng Anh thường ('a'..'z') có thể ánh xạ về chỉ số từ 0 đến 25 bằng công thức:
\`int index = s[i] - 'a';\`
👉 Mảng đếm tần suất \`int count[26] = {0};\` cho phép kiểm tra số lần xuất hiện của từng ký tự trong $O(1)$!

### 2. Xâu đối xứng (Palindrome)
Một xâu được gọi là xâu đối xứng nếu đọc từ trái sang phải hay từ phải sang trái đều giống nhau (ví dụ: \`"radar"\`, \`"level"\`, \`"abccba"\`).
Kỹ thuật kiểm tra tối ưu bằng hai con trỏ:
\`\`\`cpp
bool isPalindrome(const string& s) {
    int l = 0, r = (int)s.length() - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++;
        r--;
    }
    return true;
}
\`\`\`

### 3. Cạm bẫy nối xâu trong Python / C++
Trong Python: Viết \`s = s + ch\` trong vòng lặp $N$ lần sẽ tạo ra bản sao mới của chuỗi ở mỗi bước, tốn $O(N^2)$ thời gian!
👉 **Chuẩn thi đấu:** Gom ký tự vào danh sách và dùng \`"".join(chars)\` để đạt $O(N)$.
    `,
    pseudocode: `HÀM KiemTraDoiXung(S):
    left = 0
    right = do_dai(S) - 1
    KHI left < right:
        NẾU S[left] != S[right] THÌ:
            TRẢ VỀ False
        left = left + 1
        right = right - 1
    TRẢ VỀ True`,
    samplePython: `def is_palindrome(s: str) -> bool:
    # Lọc chỉ lấy chữ cái và số, chuyển về chữ thường
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    return filtered == filtered[::-1]

def normalize_name(s: str) -> str:
    # Chuẩn hóa xâu họ tên: xóa khoảng trắng thừa, viết hoa chữ cái đầu
    words = s.strip().split()
    return " ".join(w.capitalize() for w in words)`,
    sampleCpp: `#include <iostream>
#include <string>
#include <cctype>
#include <algorithm>

using namespace std;

bool isPalindrome(const string& s) {
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
    timeComplexity: 'O(N) duyệt tuyến tính độ dài xâu',
    spaceComplexity: 'O(1) cho kiểm tra hai con trỏ',
    commonMistakes: [
      'Nối xâu liên tục bằng toán tử + trong vòng lặp làm độ phức tạp tăng lên O(N^2).',
      'Quên xử lý trường hợp ký tự hoa - thường hoặc dấu cách.',
      'Truy cập vượt quá chỉ số xâu s[length] gây lỗi Runtime Error.',
    ],
    contestTips: [
      'Đề thi HSG rất hay có bài lọc các số hoặc từ trong một câu dài; hãy tận dụng stringstream trong C++ hoặc split() trong Python.',
    ],
    relatedProblemIds: ['prob-string-palindrome-clean'],
  },
  {
    id: 'lesson-math-number-theory',
    topicId: 'topic-math',
    title: 'Số học & Các Dạng Đề Về Toán Thường Gặp trong Tin Học',
    slug: 'so-hoc-va-toan-thi-dau',
    order: 1,
    objectives: [
      'Hiểu rõ thuật toán Euclid tìm Ước chung lớn nhất (GCD) và BCNN (LCM).',
      'Sàng số nguyên tố Eratosthenes giới hạn đến 10^7 trong O(N log log N).',
      'Tính lũy thừa nhị phân và đồng dư Modulo: (A^B) % M trong O(log B).',
      'Phân tích một số nguyên ra tích các thừa số nguyên tố.',
    ],
    prerequisites: ['Phép chia lấy dư %', 'Vòng lặp while', 'Độ phức tạp thuật toán'],
    content: `
### 1. Ước chung lớn nhất (GCD) & Thuật toán Euclid
Định lý Euclid: $\\gcd(a, b) = \\gcd(b, a \\pmod b)$ với điều kiện dừng $\\gcd(a, 0) = a$.
Độ phức tạp chỉ tốn $O(\\log(\\min(a, b)))$.
\`\`\`cpp
long long gcd(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}
long long lcm(long long a, long long b) {
    return (a / gcd(a, b)) * b; // Chia trước để tránh tràn số
}
\`\`\`

### 2. Sàng số nguyên tố Eratosthenes
Để kiểm tra nguyên tố cho nhiều số tới $N = 10^7$, dùng mảng đánh dấu:
- Khởi tạo \`isPrime[0..N] = true\`, đánh dấu \`isPrime[0] = isPrime[1] = false\`.
- Với mỗi số $i$ từ 2, nếu $i$ là nguyên tố thì gạch bỏ mọi bội số $i \\times i, i \\times (i+1), \\dots \\le N$.

### 3. Lũy thừa nhị phân (Binary Exponentiation)
Tính $A^B \\pmod M$ với $B \\le 10^{18}$ trong $O(\\log B)$ bước:
- Nếu $B$ chẵn: $A^B = (A^{B/2})^2$
- Nếu $B$ lẻ: $A^B = A \\times A^{B-1}$
    `,
    pseudocode: `HÀM LuuThuaNhiPhan(a, b, m):
    ans = 1
    a = a % m
    KHI b > 0:
        NẾU b là số lẻ THÌ:
            ans = (ans * a) % m
        a = (a * a) % m
        b = b // 2
    TRẢ VỀ ans`,
    samplePython: `def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a

def power_mod(a: int, b: int, m: int) -> int:
    ans = 1
    a %= m
    while b > 0:
        if b % 2 == 1:
            ans = (ans * a) % m
        a = (a * a) % m
        b //= 2
    return ans

def sieve(limit: int) -> list:
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(limit**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, limit + 1, i):
                is_prime[j] = False
    return [i for i, prime in enumerate(is_prime) if prime]`,
    sampleCpp: `#include <iostream>
#include <vector>

using namespace std;

long long powerMod(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (__int128)res * a % m;
        a = (__int128)a * a % m;
        b >>= 1;
    }
    return res;
}`,
    timeComplexity: 'GCD: O(log min(a,b)), Sàng: O(N log log N), Lũy thừa: O(log B)',
    spaceComplexity: 'Sàng: O(N), Lũy thừa: O(1)',
    commonMistakes: [
      'Tràn số 64-bit (long long) khi tính tích a * b trước khi chia dư.',
      'Sàng nguyên tố chạy j từ i thay vì i * i làm tốn thêm phép tính dư thừa.',
      'Không xử lý trường hợp số 0 hoặc số âm khi tính GCD.',
    ],
    contestTips: [
      'Trong bài toán chia lấy dư modulo 10^9+7, phép trừ cần cộng thêm MOD: (a - b % MOD + MOD) % MOD.',
    ],
    relatedProblemIds: ['prob-math-prime-factor'],
  },
  {
    id: 'lesson-recursion-fundamentals',
    topicId: 'topic-recursion',
    title: 'Tư duy Đệ Quy & Bản chất Ngăn Xếp Gọi Hàm (Call Stack)',
    slug: 'tu-duy-de-quy-co-ban',
    order: 1,
    objectives: [
      'Hiểu rõ bản chất đệ quy: Giải bài toán bằng cách gọi lại chính nó với quy mô nhỏ hơn.',
      'Nhận biết hai thành phần sống còn: Điểm dừng (Base Case) và Bước đệ quy (Recursive Step).',
      'Hiểu hiện tượng Stack Overflow (Tràn ngăn xếp) khi thiếu điểm dừng.',
      'Phân tích bài toán kinh điển Tháp Hà Nội (Tower of Hanoi) và công thức số bước 2^N - 1.',
    ],
    prerequisites: ['Khái niệm hàm', 'Cấu trúc điều khiển if-else'],
    content: `
### 1. Trực giác Đệ Quy (Recursion Intuition)
Đệ quy là phương pháp lập trình trong đó **một hàm tự gọi chính nó** để giải quyết một bài toán con tương tự nhưng có kích thước nhỏ hơn.
Mọi hàm đệ quy bắt buộc phải có 2 phần:
1. **Trường hợp cơ sở (Base Case):** Điểm dừng của bài toán mà đáp án có thể tìm ra trực tiếp mà không cần gọi đệ quy thêm (ví dụ $0! = 1$ hoặc $N = 1$).
2. **Bước đệ quy (Recursive Step):** Biến đổi bài toán hiện tại về bài toán con nhỏ hơn (ví dụ $N! = N \\times (N-1)!$).

### 2. Cạm bẫy Tràn Ngăn Xếp (Stack Overflow)
Mỗi lần hàm đệ quy được gọi, hệ điều hành cấp phát một khung bộ nhớ trên **Call Stack**.
Nếu bạn quên viết Base Case hoặc đệ quy quá sâu ($N > 10^5$ trong C++ hoặc $N > 1000$ trong Python), chương trình sẽ bị ngắt đột ngột (Runtime Error / Segmentation Fault).

### 3. Bài toán Tháp Hà Nội (Tower of Hanoi)
Chuyển $N$ đĩa từ cọc A sang cọc C thông qua cọc B:
- Bước 1: Chuyển $N-1$ đĩa trên từ A sang B (lấy C làm phụ).
- Bước 2: Chuyển đĩa lớn nhất còn lại từ A sang C.
- Bước 3: Chuyển $N-1$ đĩa từ B sang C (lấy A làm phụ).
👉 Tổng số bước luôn là $2^N - 1$.
    `,
    pseudocode: `HÀM ThapHaNoi(N, cocNguon, cocDich, cocTrungGian):
    NẾU N == 1 THÌ:
        IN "Chuyển đĩa từ " + cocNguon + " sang " + cocDich
        TRẢ VỀ
    ThapHaNoi(N - 1, cocNguon, cocTrungGian, cocDich)
    IN "Chuyển đĩa từ " + cocNguon + " sang " + cocDich
    ThapHaNoi(N - 1, cocTrungGian, cocDich, cocNguon)`,
    samplePython: `def hanoi(n: int, src: str, dest: str, aux: str):
    if n == 1:
        print(f"{src} -> {dest}")
        return
    hanoi(n - 1, src, aux, dest)
    print(f"{src} -> {dest}")
    hanoi(n - 1, aux, dest, src)

# Số bước = 2^N - 1`,
    sampleCpp: `#include <iostream>

using namespace std;

void hanoi(int n, char src, char dest, char aux) {
    if (n == 1) {
        cout << src << " -> " << dest << "\\n";
        return;
    }
    hanoi(n - 1, src, aux, dest);
    cout << src << " -> " << dest << "\\n";
    hanoi(n - 1, aux, dest, src);
}

int main() {
    int n = 3;
    cout << "Tổng số bước: " << (1 << n) - 1 << "\\n";
    hanoi(n, 'A', 'C', 'B');
    return 0;
}`,
    timeComplexity: 'Tháp Hà Nội: O(2^N), Giai thừa: O(N)',
    spaceComplexity: 'O(N) độ sâu ngăn xếp gọi hàm',
    commonMistakes: [
      'Quên viết điều kiện dừng (Base case) dẫn đến đệ quy vô hạn.',
      'Sử dụng đệ quy ngây thơ tính số Fibonacci O(2^N) mà không có mảng nhớ (Memoization).',
      'Độ sâu đệ quy vượt giới hạn của Python (mặc định 1000 bước, cần sys.setrecursionlimit).',
    ],
    contestTips: [
      'Nếu hàm đệ quy tính toán lại các trạng thái trùng lặp, hãy lưu kết quả vào mảng memo (đây chính là nền tảng của Quy hoạch động Top-Down).',
    ],
    relatedProblemIds: ['prob-recursion-tower-of-hanoi'],
  },
  {
    id: 'lesson-backtracking-exhaustive-search',
    topicId: 'topic-backtracking',
    title: 'Vét Cạn Toàn Bộ & Thuật Toán Quay Lui (Backtracking Framework)',
    slug: 'vet-can-va-thuat-toan-quay-lui',
    order: 1,
    objectives: [
      'Hiểu rõ mô hình quay lui Try(i) kinh điển trong giáo trình Chuyên Tin học Việt Nam.',
      'Nắm vững kỹ thuật Vét cạn: Thử - Ghi nhận - Hoàn tác (Undo/Backtrack).',
      'Áp dụng thành thạo: Sinh xâu nhị phân, sinh tập con, sinh hoán vị N! phần tử.',
      'Kỹ thuật Tỉa nhánh cận (Pruning / Branch and Bound) để không duyệt các trạng thái vô nghiệm.',
    ],
    prerequisites: ['Khái niệm hàm đệ quy', 'Mảng một chiều đánh dấu trạng thái'],
    content: `
### 1. Khung Thuật toán Quay lui chuẩn (Backtracking Template)
Quay lui là kỹ thuật tìm kiếm theo chiều sâu (DFS) trên cây không gian trạng thái:
\`\`\`cpp
void Try(int i) {
    for (mọi giá trị v có thể gán cho phần tử thứ i) {
        if (chấp nhận được giá trị v) {
            X[i] = v;          // 1. Thử chọn
            Ghi_nhận_trạng_thái;

            if (i == N) {
                Xuất_kết_quả;  // 2. Tìm thấy 1 nghiệm
            } else {
                Try(i + 1);    // 3. Đệ quy xét bước tiếp theo
            }

            Hoàn_tác_trạng_thái; // 4. Backtrack (hoàn trả trạng thái ban đầu)
        }
    }
}
\`\`\`

### 2. Các mô hình vét cạn quan trọng trong đề thi
1. **Sinh cấu hình nhị phân độ dài $N$:** Không gian nghiệm $2^N$. Dùng chọn tập con đồ vật hoặc bài toán Balo khi $N \\le 20$.
2. **Sinh hoán vị $N$ phần tử:** Không gian nghiệm $N!$. Dùng mảng \`used[x]\` để đánh dấu phần tử đã chọn.
3. **Bài toán $N$ Quân Hậu:** Đặt $N$ quân hậu vào ma trận $N \\times N$ sao cho không ăn nhau trên cùng cột, đường chéo xuôi và đường chéo ngược.

### 3. Kỹ thuật Nhánh Cận (Branch and Bound)
Nếu tại bước thứ $i$, chi phí hiện tại cộng với ước lượng tối thiểu ở các bước còn lại đã **vượt quá đáp án tối ưu đã tìm được**, ta ngắt ngay nhánh duyệt (Prune), không đi sâu tiếp.
    `,
    pseudocode: `HÀM Try(i):
    CHO j TỪ 1 ĐẾN M:
        NẾU GiaTriHopLe(j):
            Chon(j)
            NẾU i == N THÌ:
                GhiNhanNghiem()
            NGƯỢC LẠI:
                Try(i + 1)
            HuyChon(j) // Quay lui hoàn tác`,
    samplePython: `def generate_subsets(n: int):
    # Sinh mọi tập con độ dài n (2^n cấu hình)
    res = []
    x = [0] * n
    
    def backtrack(i):
        if i == n:
            res.append(list(x))
            return
        for val in (0, 1):
            x[i] = val
            backtrack(i + 1)
            
    backtrack(0)
    return res`,
    sampleCpp: `#include <iostream>
#include <vector>

using namespace std;

int n = 4;
vector<int> x(n);

void backtrack(int i) {
    for (int val = 0; val <= 1; val++) {
        x[i] = val;
        if (i == n - 1) {
            for (int v : x) cout << v;
            cout << "\\n";
        } else {
            backtrack(i + 1);
        }
    }
}

int main() {
    backtrack(0);
    return 0;
}`,
    timeComplexity: 'Sinh nhị phân: O(2^N), Hoán vị: O(N!), N Quân Hậu: O(N!)',
    spaceComplexity: 'O(N) lưu cấu hình nghiệm hiện tại',
    commonMistakes: [
      'Quên hoàn tác (undo) trạng thái mảng đánh dấu khi thoát khỏi nhánh đệ quy.',
      'Không chặn đệ quy kịp thời khi N quá lớn (N > 22 trong O(2^N) sẽ bị TLE).',
      'Đánh chỉ số đường chéo âm trong bài toán N Quân Hậu (cần cộng thêm N: row - col + N).',
    ],
    contestTips: [
      'Trong đề thi HSG, nếu N nhỏ (N <= 20) thì hãy nghĩ ngay tới Vét cạn quay lui để ăn trọn điểm Subtask 1 và Subtask 2!',
    ],
    relatedProblemIds: ['prob-backtrack-n-queens'],
  },
];

export const supplementaryProblems: Problem[] = [
  {
    id: 'prob-string-palindrome-clean',
    topicId: 'topic-strings',
    topicTitle: 'Xử lý Chuỗi & Xâu Ký Tự',
    title: 'Kiểm tra Xâu Đối Xứng Chuẩn Hóa (Palindrome)',
    slug: 'kiem-tra-xau-doi-xung-palindrome',
    fileIoName: 'PALIN',
    difficulty: 'EASY',
    rating: 950,
    statement: `Cho một xâu ký tự $S$ có thể chứa chữ cái in hoa, in thường, chữ số, khoảng trắng và các dấu câu.
Một xâu được coi là đối xứng (Palindrome) nếu khi ta loại bỏ tất cả các ký tự không phải là chữ cái và chữ số (chỉ giữ lại ký tự \`isalnum\`), đồng thời chuyển tất cả chữ cái về dạng chữ thường, thì xâu đọc xuôi hay đọc ngược đều hoàn toàn giống nhau.

Nhiệm vụ của bạn là kiểm tra xem xâu $S$ có phải là xâu đối xứng hay không. In ra \`YES\` nếu đúng, ngược lại in ra \`NO\`.`,
    inputFormat: `Gồm một dòng duy nhất chứa xâu ký tự $S$ ($1 \\le |S| \\le 10^5$).`,
    outputFormat: `In ra \`YES\` nếu $S$ là xâu đối xứng, ngược lại in ra \`NO\`.`,
    constraints: `$1 \\le |S| \\le 10^5$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `A man, a plan, a canal: Panama`,
    sampleOutput: `YES`,
    sampleExplanation: `Sau khi loại bỏ dấu cách và dấu câu, chuyển về chữ thường, xâu trở thành "amanaplanacanalpanama" là một xâu đối xứng hoàn hảo.`,
    hints: ['Sử dụng kỹ thuật hai con trỏ left từ đầu xâu, right từ cuối xâu, bỏ qua các ký tự không hợp lệ.'],
    editorial: `Khởi tạo l = 0, r = len(s) - 1. Khi l < r: nếu s[l] không phải chữ cái/số thì tăng l; nếu s[r] không phải chữ cái/số thì giảm r; nếu tolower(s[l]) != tolower(s[r]) thì kết luận NO; ngược lại tăng l và giảm r. Độ phức tạp O(N), bộ nhớ O(1).`,
    solutionPython: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        print("YES")
        return
        
    l = 0
    r = len(s) - 1
    
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            print("NO")
            return
        l += 1
        r -= 1
        
    print("YES")

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>
#include <string>
#include <cctype>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    string s;
    if (!getline(cin, s)) {
        cout << "YES\\n";
        return 0;
    }
    
    int l = 0, r = (int)s.length() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) {
            cout << "NO\\n";
            return 0;
        }
        l++;
        r--;
    }
    cout << "YES\\n";
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Strings', 'Two Pointers', 'Tin Học Trẻ', 'HSG Cấp Huyện'],
    totalSubmissions: 380,
    acceptedSubmissions: 310,
    testCases: [
      { id: 'tc-str-1', input: 'A man, a plan, a canal: Panama', expectedOutput: 'YES', isHidden: false, scoreWeight: 25 },
      { id: 'tc-str-2', input: 'race a car', expectedOutput: 'NO', isHidden: false, scoreWeight: 25 },
      { id: 'tc-str-3', input: 'Was it a car or a cat I saw?', expectedOutput: 'YES', isHidden: true, scoreWeight: 25 },
      { id: 'tc-str-4', input: 'AlgoArena 2026', expectedOutput: 'NO', isHidden: true, scoreWeight: 25 },
    ],
  },
  {
    id: 'prob-math-prime-factor',
    topicId: 'topic-math',
    topicTitle: 'Số học & Các Dạng Đề Về Toán',
    title: 'Phân Tích Thừa Số Nguyên Tố (Prime Factorization)',
    slug: 'phan-tich-thua-so-nguyen-to',
    fileIoName: 'PRIME',
    difficulty: 'EASY',
    rating: 1050,
    statement: `Cho một số nguyên dương $N$.
Hãy phân tích số $N$ thành tích của các thừa số nguyên tố theo định dạng:
$p_1\\text{\\textasciicircum}e_1 \\times p_2\\text{\\textasciicircum}e_2 \\times \\dots \\times p_k\\text{\\textasciicircum}e_k$
trong đó $p_1 < p_2 < \\dots < p_k$ là các số nguyên tố tăng dần và $e_i$ là số mũ tương ứng.
Định dạng in ra: các cặp được nối với nhau bằng chuỗi \` * \` (dấu sao có khoảng trắng hai bên), ví dụ \`2^2 * 3^1 * 5^1\`.`,
    inputFormat: `Gồm một số nguyên dương $N$ ($2 \\le N \\le 10^{12}$).`,
    outputFormat: `In ra xâu biểu diễn tích các thừa số nguyên tố của $N$.`,
    constraints: `$2 \\le N \\le 10^{12}$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `60`,
    sampleOutput: `2^2 * 3^1 * 5^1`,
    sampleExplanation: `60 = 2^2 * 3^1 * 5^1 = 4 * 3 * 5.`,
    hints: ['Chạy d từ 2 đến sqrt(N). Nếu N chia hết cho d, đếm số lần chia hết rồi chia N liên tục.'],
    editorial: `Duyệt d từ 2 tới khi d * d > N. Khi N % d == 0, ta đếm số mũ cnt và chia N cho d. Sau vòng lặp nếu N > 1 thì N còn lại chính là thừa số nguyên tố cuối cùng với số mũ 1. Độ phức tạp O(sqrt(N)).`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    
    factors = []
    d = 2
    while d * d <= n:
        if n % d == 0:
            cnt = 0
            while n % d == 0:
                cnt += 1
                n //= d
            factors.append(f"{d}^{cnt}")
        d += 1
        
    if n > 1:
        factors.append(f"{n}^1")
        
    print(" * ".join(factors))

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    long long n;
    if (!(cin >> n)) return 0;
    
    vector<string> parts;
    for (long long d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            int cnt = 0;
            while (n % d == 0) {
                cnt++;
                n /= d;
            }
            parts.push_back(to_string(d) + "^" + to_string(cnt));
        }
    }
    if (n > 1) {
        parts.push_back(to_string(n) + "^1");
    }
    
    for (size_t i = 0; i < parts.size(); i++) {
        cout << parts[i];
        if (i + 1 < parts.size()) cout << " * ";
    }
    cout << "\\n";
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Math', 'Number Theory', 'Prime', 'HSG Bảng B'],
    totalSubmissions: 420,
    acceptedSubmissions: 330,
    testCases: [
      { id: 'tc-math-1', input: '60', expectedOutput: '2^2 * 3^1 * 5^1', isHidden: false, scoreWeight: 25 },
      { id: 'tc-math-2', input: '17', expectedOutput: '17^1', isHidden: false, scoreWeight: 25 },
      { id: 'tc-math-3', input: '100', expectedOutput: '2^2 * 5^2', isHidden: true, scoreWeight: 25 },
      { id: 'tc-math-4', input: '1024', expectedOutput: '2^10', isHidden: true, scoreWeight: 25 },
    ],
  },
  {
    id: 'prob-function-super-prime',
    topicId: 'topic-functions',
    topicTitle: 'Hàm & Kỹ thuật Thiết kế Hàm',
    title: 'Số Siêu Nguyên Tố (Super Prime Numbers)',
    slug: 'so-sieu-nguyen-to-functions',
    fileIoName: 'SPRIME',
    difficulty: 'MEDIUM',
    rating: 1150,
    statement: `Số siêu nguyên tố là số nguyên tố mà khi xóa lần lượt từng chữ số từ bên phải sang bên trái thì các số thu được ở mọi bước đều vẫn là số nguyên tố.
Ví dụ: $233$ là số siêu nguyên tố vì:
- $233$ là số nguyên tố.
- Xóa chữ số 3 ở hàng đơn vị được $23$ là số nguyên tố.
- Xóa tiếp chữ số 3 được $2$ cũng là số nguyên tố.

Yêu cầu bài toán: Cho số nguyên dương $N$ ($1 \\le N \\le 6$). Hãy tìm và in ra tất cả các số siêu nguyên tố có đúng $N$ chữ số theo thứ tự tăng dần, cách nhau bởi khoảng trắng.
Bài toán yêu cầu bạn tổ chức chương trình bằng cách thiết kế hàm con:
- Hàm \`bool isPrime(int x)\`: Kiểm tra một số nguyên có phải là số nguyên tố hay không.
- Hàm sinh/đệ quy mở rộng chữ số hợp lệ.`,
    inputFormat: `Gồm một số nguyên dương $N$ ($1 \\le N \\le 6$).`,
    outputFormat: `In ra các số siêu nguyên tố có $N$ chữ số cách nhau bởi một dấu cách trên một dòng.`,
    constraints: `$1 \\le N \\le 6$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `2`,
    sampleOutput: `23 29 31 37 53 59 71 73 79`,
    sampleExplanation: `Các số có 2 chữ số siêu nguyên tố: 23, 29, 31, 37, 53, 59, 71, 73, 79. Cả 2 chữ số và chữ số đầu tiên của chúng đều là số nguyên tố.`,
    hints: ['Viết hàm isPrime(x). Bắt đầu từ các số nguyên tố có 1 chữ số {2, 3, 5, 7}, đệ quy ghép thêm các chữ số {1, 3, 7, 9} vào bên phải.'],
    editorial: `Thiết kế hàm isPrime(x) kiểm tra trong O(sqrt(x)). Dùng đệ quy DFS(val, len): nếu len == N thì lưu val; ngược lại thử ghép thêm digit trong [1, 2, ..., 9]. Nếu val * 10 + digit là số nguyên tố thì DFS(val * 10 + digit, len + 1).`,
    solutionPython: `import sys

def is_prime(x: int) -> bool:
    if x < 2:
        return False
    d = 2
    while d * d <= x:
        if x % d == 0:
            return False
        d += 1
    return True

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    
    results = []
    
    def dfs(val: int, length: int):
        if length == n:
            results.append(val)
            return
        for digit in [1, 3, 7, 9]:
            nxt = val * 10 + digit
            if is_prime(nxt):
                dfs(nxt, length + 1)
                
    for start in [2, 3, 5, 7]:
        if n == 1:
            results.append(start)
        else:
            dfs(start, 1)
            
    print(*(sorted(results)))

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int d = 2; d * d <= x; d++) {
        if (x % d == 0) return false;
    }
    return true;
}

int n;
vector<int> results;

void dfs(int val, int len) {
    if (len == n) {
        results.push_back(val);
        return;
    }
    int digits[] = {1, 3, 7, 9};
    for (int d : digits) {
        int nxt = val * 10 + d;
        if (isPrime(nxt)) {
            dfs(nxt, len + 1);
        }
    }
}

int main() {
    if (!(cin >> n)) return 0;
    
    int primes[] = {2, 3, 5, 7};
    for (int p : primes) {
        if (n == 1) results.push_back(p);
        else dfs(p, 1);
    }
    
    sort(results.begin(), results.end());
    for (size_t i = 0; i < results.size(); i++) {
        cout << results[i] << (i + 1 < results.size() ? " " : "\\n");
    }
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Functions', 'Recursion', 'Primes', 'HSG Tỉnh'],
    totalSubmissions: 390,
    acceptedSubmissions: 280,
    testCases: [
      { id: 'tc-super-1', input: '2', expectedOutput: '23 29 31 37 53 59 71 73 79', isHidden: false, scoreWeight: 30 },
      { id: 'tc-super-2', input: '1', expectedOutput: '2 3 5 7', isHidden: false, scoreWeight: 30 },
      { id: 'tc-super-3', input: '3', expectedOutput: '233 239 293 311 313 317 373 379 593 599 719 733 739 797', isHidden: true, scoreWeight: 40 },
    ],
  },
  {
    id: 'prob-recursion-tower-of-hanoi',
    topicId: 'topic-recursion',
    topicTitle: 'Đệ Quy & Phân Rã Bài Toán',
    title: 'Bài Toán Tháp Hà Nội (Tower of Hanoi)',
    slug: 'bai-toan-thap-ha-noi',
    fileIoName: 'HANOI',
    difficulty: 'EASY',
    rating: 1000,
    statement: `Bài toán Tháp Hà Nội là bài toán kinh điển về tư duy đệ quy:
Có $3$ cọc $A, B, C$ và $N$ chiếc đĩa có kích thước khác nhau ban đầu được đặt ở cọc $A$ theo thứ tự đĩa nhỏ nằm trên đĩa lớn.
Quy tắc di chuyển:
1. Mỗi lần chỉ được di chuyển đúng $1$ chiếc đĩa trên cùng của một cọc sang cọc khác.
2. Không bao giờ được đặt đĩa lớn hơn lên trên đĩa nhỏ hơn.

Yêu cầu: Hãy tìm số bước di chuyển tối thiểu và liệt kê thứ tự từng bước di chuyển đĩa để chuyển toàn bộ $N$ đĩa từ cọc $A$ sang cọc $C$ (sử dụng cọc $B$ làm trung gian).`,
    inputFormat: `Gồm một số nguyên dương $N$ ($1 \\le N \\le 15$).`,
    outputFormat: `Dòng đầu tiên in ra số bước di chuyển tối thiểu ($K = 2^N - 1$).
$K$ dòng tiếp theo, mỗi dòng in theo định dạng \`X -> Y\` biểu thị bước di chuyển một chiếc đĩa từ cọc $X$ sang cọc $Y$.`,
    constraints: `$1 \\le N \\le 15$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `2`,
    sampleOutput: `3
A -> B
A -> C
B -> C`,
    sampleExplanation: `Với N = 2, chuyển đĩa 1 sang B, đĩa 2 sang C, rồi đĩa 1 sang C. Tổng cộng 3 bước.`,
    hints: ['Để chuyển N đĩa từ A sang C: chuyển N-1 đĩa từ A sang B; chuyển đĩa thứ N từ A sang C; chuyển N-1 đĩa từ B sang C.'],
    editorial: `Hàm hanoi(n, a, c, b): nếu n == 1 in ra a -> c; ngược lại gọi hanoi(n-1, a, b, c), in a -> c, rồi gọi hanoi(n-1, b, c, a). Tổng số bước là 2^N - 1.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    
    total_steps = (1 << n) - 1
    print(total_steps)
    
    def solve(count, src, dest, aux):
        if count == 1:
            print(f"{src} -> {dest}")
            return
        solve(count - 1, src, aux, dest)
        print(f"{src} -> {dest}")
        solve(count - 1, aux, dest, src)
        
    solve(n, 'A', 'C', 'B')

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>

using namespace std;

void hanoi(int n, char src, char dest, char aux) {
    if (n == 1) {
        cout << src << " -> " << dest << "\\n";
        return;
    }
    hanoi(n - 1, src, aux, dest);
    cout << src << " -> " << dest << "\\n";
    hanoi(n - 1, aux, dest, src);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    cout << (1 << n) - 1 << "\\n";
    hanoi(n, 'A', 'C', 'B');
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Recursion', 'Classic', 'Divide and Conquer'],
    totalSubmissions: 450,
    acceptedSubmissions: 390,
    testCases: [
      { id: 'tc-hanoi-1', input: '2', expectedOutput: '3\nA -> B\nA -> C\nB -> C', isHidden: false, scoreWeight: 50 },
      { id: 'tc-hanoi-2', input: '3', expectedOutput: '7\nA -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-backtrack-n-queens',
    topicId: 'topic-backtracking',
    topicTitle: 'Vét Cạn & Thuật Toán Quay Lui',
    title: 'Bài Toán N Quân Hậu (N-Queens Backtracking)',
    slug: 'bai-toan-n-quan-hau-backtracking',
    fileIoName: 'NQUEEN',
    difficulty: 'MEDIUM',
    rating: 1300,
    statement: `Bài toán $N$ Quân Hậu là bài toán mẫu mực của thuật toán Vét cạn & Quay lui:
Cho một bàn cờ kích thước $N \\times N$. Hãy đếm số cách đặt $N$ quân hậu lên bàn cờ sao cho không có hai quân hậu nào có thể tấn công lẫn nhau.
Theo luật cờ vua, hai quân hậu tấn công lẫn nhau nếu chúng nằm trên cùng một hàng, cùng một cột, hoặc cùng một đường chéo.`,
    inputFormat: `Gồm một số nguyên dương $N$ ($1 \\le N \\le 12$).`,
    outputFormat: `In ra một số nguyên duy nhất là số cách đặt thỏa mãn.`,
    constraints: `$1 \\le N \\le 12$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `4`,
    sampleOutput: `2`,
    sampleExplanation: `Với bàn cờ 4x4 có đúng 2 cấu hình đặt 4 quân hậu không ăn nhau: (2, 4, 1, 3) và (3, 1, 4, 2).`,
    hints: ['Dùng mảng đánh dấu cột col[], đường chéo chính d1[row - col + N], và đường chéo phụ d2[row + col].'],
    editorial: `Hàm Try(row): lặp col từ 0 đến N-1. Nếu !usedCol[col] và !usedD1[row - col + N] và !usedD2[row + col], ta đánh dấu true, nếu row == N-1 thì tăng ans, ngược lại gọi Try(row + 1), sau đó hoàn tác đánh dấu false.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    
    col_used = [False] * n
    diag1 = [False] * (2 * n)
    diag2 = [False] * (2 * n)
    count = 0
    
    def backtrack(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            d1 = r - c + n
            d2 = r + c
            if not col_used[c] and not diag1[d1] and not diag2[d2]:
                col_used[c] = diag1[d1] = diag2[d2] = True
                backtrack(r + 1)
                col_used[c] = diag1[d1] = diag2[d2] = False
                
    backtrack(0)
    print(count)

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>
#include <vector>

using namespace std;

int n;
int countSolutions = 0;
bool colUsed[30], diag1[60], diag2[60];

void backtrack(int r) {
    if (r == n) {
        countSolutions++;
        return;
    }
    for (int c = 0; c < n; c++) {
        int d1 = r - c + n;
        int d2 = r + c;
        if (!colUsed[c] && !diag1[d1] && !diag2[d2]) {
            colUsed[c] = diag1[d1] = diag2[d2] = true;
            backtrack(r + 1);
            colUsed[c] = diag1[d1] = diag2[d2] = false;
        }
    }
}

int main() {
    if (!(cin >> n)) return 0;
    backtrack(0);
    cout << countSolutions << "\\n";
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Backtracking', 'Exhaustive Search', 'Chess', 'HSG Bảng B'],
    totalSubmissions: 510,
    acceptedSubmissions: 390,
    testCases: [
      { id: 'tc-queen-1', input: '4', expectedOutput: '2', isHidden: false, scoreWeight: 25 },
      { id: 'tc-queen-2', input: '1', expectedOutput: '1', isHidden: false, scoreWeight: 25 },
      { id: 'tc-queen-3', input: '8', expectedOutput: '92', isHidden: true, scoreWeight: 25 },
      { id: 'tc-queen-4', input: '6', expectedOutput: '4', isHidden: true, scoreWeight: 25 },
    ],
  },
];
