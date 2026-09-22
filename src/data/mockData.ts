import {
  Achievement,
  Contest,
  LearningPath,
  Lesson,
  Problem,
  Topic,
  User,
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-student-1',
    username: 'hoangnam_coder',
    email: 'nam.nh@chuyentunhien.edu.vn',
    fullName: 'Nguyễn Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'STUDENT',
    studentProfile: {
      school: 'THPT Chuyên Khoa Học Tự Nhiên - ĐHQGHN',
      className: '10 Tin',
      province: 'Hà Nội',
      grade: 10,
      target: 'Giải Nhất HSG Thành Phố & Tin học trẻ Bảng B Toàn quốc',
      rating: 1480,
      currentStreak: 6,
      longestStreak: 18,
      problemsSolved: 28,
      totalSubmissions: 74,
      weakTopics: ['Đồ thị (Dijkstra/LCA)', 'Quy hoạch động trên cây (Tree DP)'],
      strongTopics: ['Mảng cộng dồn (Prefix Sum)', 'Tìm kiếm nhị phân (Binary Search)', 'Hai con trỏ (Two Pointers)'],
      joinedDate: '2025-09-05',
    },
  },
  {
    id: 'user-teacher-1',
    username: 'thay_duc_tin',
    email: 'ductm@chuyenamsterdam.edu.vn',
    fullName: 'Thầy Trần Minh Đức',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'TEACHER',
    teacherProfile: {
      school: 'THPT Chuyên Hà Nội - Amsterdam',
      department: 'Tổ Tin học',
      specialization: 'Huấn luyện viên Đội tuyển Học sinh Giỏi Quốc gia',
      managedClasses: ['10 Tin', '11 Tin Chuyên', 'Đội tuyển Tin học trẻ Bảng B'],
    },
  },
  {
    id: 'user-admin-1',
    username: 'admin_algoarena',
    email: 'admin@algoarena.edu.vn',
    fullName: 'Quản trị viên Hệ thống AlgoArena',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'SUPER_ADMIN',
  },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Lộ trình 1 – Nền tảng Lập trình & Độ phức tạp',
    slug: 'nen-tang-lap-trinh',
    description: 'Nắm vững cú pháp Python/C++ chuẩn thi đấu, xử lý I/O nhanh, tối ưu Big-O O(1), O(log N), O(N).',
    order: 1,
    badge: 'Nền tảng',
    topicsCount: 2,
    totalProblemsCount: 6,
  },
  {
    id: 'path-2',
    title: 'Lộ trình 2 – Thuật toán Cơ bản & Kỹ thuật Mảng',
    slug: 'thuat-toan-co-ban',
    description: 'Vũ khí chủ lực bảng B: Mảng cộng dồn, Mảng hiệu, Hai con trỏ, Tìm kiếm nhị phân, Tham lam.',
    order: 2,
    badge: 'Cơ bản',
    topicsCount: 4,
    totalProblemsCount: 16,
  },
  {
    id: 'path-3',
    title: 'Lộ trình 3 – Cấu trúc Dữ liệu Quan trọng',
    slug: 'cau-truc-du-lieu',
    description: 'Ngăn xếp, Hàng đợi, Hàng đợi ưu tiên, Cây phân đoạn (Segment Tree), Tập hợp rời nhau (DSU).',
    order: 3,
    badge: 'Trung cấp',
    topicsCount: 3,
    totalProblemsCount: 10,
  },
  {
    id: 'path-4',
    title: 'Lộ trình 4 – Thuật toán Đồ thị (Graph Algorithms)',
    slug: 'thuat-toan-do-thi',
    description: 'Biểu diễn đồ thị, BFS loang trên lưới, DFS tìm thành phần liên thông, Đường đi ngắn nhất Dijkstra.',
    order: 4,
    badge: 'Trung cấp',
    topicsCount: 3,
    totalProblemsCount: 10,
  },
  {
    id: 'path-5',
    title: 'Lộ trình 5 – Quy hoạch động (Dynamic Programming)',
    slug: 'quy-hoach-dong',
    description: 'Trực giác thiết kế mảng DP, bài toán Balo 0/1, Dãy con tăng dài nhất (LIS), DP mảng 2 chiều.',
    order: 5,
    badge: 'Nâng cao',
    topicsCount: 3,
    totalProblemsCount: 12,
  },
  {
    id: 'path-6',
    title: 'Lộ trình 6 – Thuật toán Chuyên sâu & Tối ưu',
    slug: 'thuat-toan-chuyen-sau',
    description: 'Nén tọa độ (Coordinate Compression), Monotonic Stack, Chia để trị, Bảng thưa (Sparse Table).',
    order: 6,
    badge: 'Chuyên sâu',
    topicsCount: 2,
    totalProblemsCount: 8,
  },
  {
    id: 'path-7',
    title: 'Lộ trình 7 – Luyện đề HSG & Tin học trẻ',
    slug: 'luyen-de-thi',
    description: 'Tổng hợp các đề thi thử thực tế có format 3-4 bài phân hóa thời gian 180 phút chuẩn tỉnh/quốc gia.',
    order: 7,
    badge: 'Luyện thi',
    topicsCount: 2,
    totalProblemsCount: 10,
  },
];

export const mockTopics: Topic[] = [
  {
    id: 'topic-prefix-sum',
    pathId: 'path-2',
    title: 'Mảng cộng dồn & Mảng hiệu (Prefix Sum & Difference Array)',
    slug: 'prefix-sum-difference-array',
    description: 'Kỹ thuật tính tổng đoạn con trong O(1) và cập nhật đoạn trong O(1). Tuyệt chiêu ăn điểm bài 1-2 trong đề thi.',
    category: 'Thuật toán cơ bản',
    order: 1,
    lessonsCount: 2,
    problemsCount: 5,
    icon: 'Layers',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-two-pointers',
    pathId: 'path-2',
    title: 'Kỹ thuật Hai con trỏ & Cửa sổ trượt (Two Pointers & Sliding Window)',
    slug: 'two-pointers-sliding-window',
    description: 'Giảm độ phức tạp từ O(N^2) xuống O(N) khi duyệt mảng đã sắp xếp hoặc tìm đoạn con thỏa mãn điều kiện.',
    category: 'Thuật toán cơ bản',
    order: 2,
    lessonsCount: 2,
    problemsCount: 5,
    icon: 'SlidersHorizontal',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-binary-search',
    pathId: 'path-2',
    title: 'Tìm kiếm nhị phân (Binary Search & Chặt nhị phân kết quả)',
    slug: 'binary-search',
    description: 'Tìm kiếm trên mảng đã sắp xếp trong O(log N) và kỹ thuật chặt nhị phân trên tập kết quả (Binary Search on Answer).',
    category: 'Thuật toán cơ bản',
    order: 3,
    lessonsCount: 3,
    problemsCount: 6,
    icon: 'Search',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-sorting',
    pathId: 'path-2',
    title: 'Sắp xếp & Tư duy Tham lam (Sorting & Greedy)',
    slug: 'sorting-greedy',
    description: 'Tận dụng hàm sắp xếp O(N log N) kết hợp chiến thuật tham lam cục bộ để đạt tối ưu toàn cục.',
    category: 'Thuật toán cơ bản',
    order: 4,
    lessonsCount: 2,
    problemsCount: 5,
    icon: 'ArrowDownUp',
    levelBadge: 'Cơ bản',
  },
  {
    id: 'topic-stack-queue',
    pathId: 'path-3',
    title: 'Ngăn xếp & Hàng đợi (Stack, Queue & Monotonic Stack)',
    slug: 'stack-queue',
    description: 'Cấu trúc dữ liệu LIFO, FIFO và kỹ thuật mảng đơn điệu tìm phần tử lớn hơn/nhỏ hơn gần nhất.',
    category: 'Cấu trúc dữ liệu',
    order: 5,
    lessonsCount: 2,
    problemsCount: 4,
    icon: 'Database',
    levelBadge: 'Trung cấp',
  },
  {
    id: 'topic-dsu',
    pathId: 'path-3',
    title: 'Tập hợp rời nhau (Disjoint Set Union - DSU)',
    slug: 'disjoint-set-union',
    description: 'Quản lý các tập hợp liên thông với phép gộp Union và tìm gốc Find có nén đường đi đạt độ phức tạp gần như O(1).',
    category: 'Cấu trúc dữ liệu',
    order: 6,
    lessonsCount: 2,
    problemsCount: 4,
    icon: 'Network',
    levelBadge: 'Trung cấp',
  },
  {
    id: 'topic-graph-bfs-dfs',
    pathId: 'path-4',
    title: 'Duyệt đồ thị: BFS & DFS (Graph Traversal)',
    slug: 'graph-bfs-dfs',
    description: 'Tìm kiếm theo chiều rộng (BFS) tìm đường đi ngắn nhất không trọng số, DFS loang vùng liên thông trên ma trận.',
    category: 'Đồ thị',
    order: 7,
    lessonsCount: 3,
    problemsCount: 6,
    icon: 'GitFork',
    levelBadge: 'Trung cấp',
  },
  {
    id: 'topic-dijkstra',
    pathId: 'path-4',
    title: 'Đường đi ngắn nhất: Thuật toán Dijkstra (Shortest Path)',
    slug: 'dijkstra-shortest-path',
    description: 'Tìm đường đi ngắn nhất trên đồ thị có trọng số không âm bằng hàng đợi ưu tiên Priority Queue O((V+E) log V).',
    category: 'Đồ thị',
    order: 8,
    lessonsCount: 2,
    problemsCount: 4,
    icon: 'Compass',
    levelBadge: 'Trung cấp',
  },
  {
    id: 'topic-dp-basic',
    pathId: 'path-5',
    title: 'Quy hoạch động 1D & Bài toán Balo (1D DP & Knapsack)',
    slug: 'dp-basic-knapsack',
    description: 'Chuyển từ đệ quy nhớ sang bảng quy hoạch động. Bài toán Balo 0/1 và Balo không giới hạn kinh điển trong các kỳ thi.',
    category: 'Quy hoạch động',
    order: 9,
    lessonsCount: 3,
    problemsCount: 6,
    icon: 'Box',
    levelBadge: 'Nâng cao',
  },
  {
    id: 'topic-dp-lis-lcs',
    pathId: 'path-5',
    title: 'Dãy con tăng dài nhất & Xâu con chung (LIS & LCS)',
    slug: 'dp-lis-lcs',
    description: 'Longest Increasing Subsequence O(N^2) và tối ưu O(N log N) bằng tìm kiếm nhị phân; Longest Common Subsequence.',
    category: 'Quy hoạch động',
    order: 10,
    lessonsCount: 2,
    problemsCount: 5,
    icon: 'TrendingUp',
    levelBadge: 'Nâng cao',
  },
  {
    id: 'topic-segment-tree',
    pathId: 'path-3',
    title: 'Cây đoạn (Segment Tree) & Cập nhật khoảng',
    slug: 'segment-tree',
    description: 'Cấu trúc dữ liệu dạng cây giải quyết các truy vấn đoạn (Range Query) và cập nhật điểm/đoạn trong O(log N).',
    category: 'Cấu trúc dữ liệu',
    order: 11,
    lessonsCount: 2,
    problemsCount: 4,
    icon: 'GitPullRequest',
    levelBadge: 'Chuyên sâu',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-binary-search-intro',
    topicId: 'topic-binary-search',
    title: 'Tìm kiếm nhị phân cơ bản (Binary Search Fundamentals)',
    slug: 'tim-kiem-nhi-phan-co-ban',
    order: 1,
    objectives: [
      'Hiểu bản chất trực quan: Mỗi bước chia đôi không gian tìm kiếm, độ phức tạp O(log N).',
      'Phân biệt cận dưới (lower_bound) và cận trên (upper_bound).',
      'Tránh lỗi vòng lặp vô tận (Infinite Loop) do tính sai mid.',
    ],
    prerequisites: ['Mảng một chiều', 'Mảng đã được sắp xếp tăng dần', 'Vòng lặp while'],
    content: `
### 1. Trực giác bài toán (Intuition)
Hãy tưởng tượng bạn đang đoán một số bí mật trong khoảng từ 1 đến 100. Nếu người ra đề chỉ trả lời **"Lớn hơn"** hoặc **"Nhỏ hơn"**, chiến lược tối ưu nhất là luôn đoán số **ở chính giữa**:
- Lần 1: Đoán 50. Nếu nhỏ hơn -> Khoảng còn lại [1..49]
- Lần 2: Đoán 25. Nếu lớn hơn -> Khoảng còn lại [26..49]
- Sau tối đa $\\approx \\log_2(100) \\approx 7$ lần hỏi, bạn luôn tìm ra đáp án!

### 2. Điều kiện áp dụng
Dãy số phải có **tính đơn điệu** (Monotonicity) — tức là đã được sắp xếp tăng dần hoặc giảm dần.

### 3. Công thức tính chỉ số giữa an toàn
Thay vì viết \`mid = (left + right) // 2\`, trong các ngôn ngữ có kiểu dữ liệu nguyên cố định như C++, phép cộng \`left + right\` có thể bị tràn số nếu $left + right > 2^{31}-1$.
👉 **Chuẩn thi đấu:**
\`\`\`cpp
int mid = left + (right - left) / 2;
\`\`\`
`,
    pseudocode: `HÀM BinarySearch(A, N, X):
    left = 0
    right = N - 1
    KHI left <= right:
        mid = left + (right - left) // 2
        NẾU A[mid] == X THÌ:
            TRẢ VỀ mid
        NẾU A[mid] < X THÌ:
            left = mid + 1
        NGƯỢC LẠI:
            right = mid - 1
    TRẢ VỀ -1 (Không tìm thấy)`,
    samplePython: `import sys

def binary_search(arr, x):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Ví dụ kiểm thử
if __name__ == "__main__":
    data = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
    target = 23
    idx = binary_search(data, target)
    print(f"Phần tử {target} được tìm thấy tại vị trí: {idx}")`,
    sampleCpp: `#include <iostream>
#include <vector>

using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    cout << binarySearch(a, 23) << "\\n";
    return 0;
}`,
    timeComplexity: 'O(log N) với N là số lượng phần tử',
    spaceComplexity: 'O(1) bộ nhớ phụ trợ',
    commonMistakes: [
      'Quên sắp xếp mảng trước khi chặt nhị phân.',
      'Viết điều kiện while (left < right) nhưng gán left = mid dẫn đến lặp vô hạn (TLE).',
      'Tràn số nguyên khi tính (left + right) / 2 trên C++ nếu phạm vi là 10^9.',
      'Sử dụng input() nhiều lần trong Python gây TLE thay vì sys.stdin.readline().',
    ],
    contestTips: [
      'Trong thư viện C++, hãy tận dụng std::lower_bound và std::upper_bound thay vì tự code lại.',
      'Trong Python, thư viện chuẩn có module bisect: bisect_left(arr, x) và bisect_right(arr, x).',
      'Khi $N = 10^5$, thuật toán O(N) duyệt tuần tự sẽ mất ~0.05s, nhưng với $Q = 10^5$ truy vấn, $O(Q \\times N) = 10^{10}$ chắc chắn TLE (giới hạn 1s là $10^8$ phép tính). Chuyển sang $O(Q \\log N) \\approx 1.7 \\times 10^6$ phép tính chạy chỉ 0.02s.',
    ],
    visualizerType: 'BINARY_SEARCH',
    relatedProblemIds: ['prob-bs-search-val', 'prob-bs-first-occurrence', 'prob-bs-sqrt'],
  },
  {
    id: 'lesson-two-pointers',
    topicId: 'topic-two-pointers',
    title: 'Kỹ thuật Hai con trỏ (Two Pointers Technique)',
    slug: 'ky-thuat-hai-con-tro',
    order: 1,
    objectives: [
      'Hiểu cơ chế duyệt hai biến trỏ ngược chiều hoặc cùng chiều.',
      'Biến đổi bài toán $O(N^2)$ tìm cặp số thành $O(N \\log N)$ hoặc $O(N)$.',
      'Áp dụng thành thạo cho bài toán cặp số có tổng bằng S.',
    ],
    prerequisites: ['Mảng một chiều', 'Thuật toán sắp xếp cơ bản'],
    content: `
### 1. Ý tưởng cốt lõi (Core Idea)
Xét bài toán: *Cho mảng số nguyên đã sắp xếp tăng dần, tìm hai số có tổng đúng bằng $S$.*
- **Cách thô (Brute Force):** Dùng 2 vòng lặp lồng nhau thử mọi cặp $(i, j)$ -> Độ phức tạp $O(N^2)$. Nếu $N = 10^5$, số phép tính là $10^{10} \\rightarrow$ **TLE**.
- **Kỹ thuật Hai con trỏ:**
  - Đặt $left = 0$ (đầu mảng) và $right = N - 1$ (cuối mảng).
  - Tính tổng hiện tại: $cur = A[left] + A[right]$.
  - Nếu $cur == S$: Tìm thấy cặp nghiệm!
  - Nếu $cur < S$: Cần tăng tổng lên, ta tăng $left = left + 1$.
  - Nếu $cur > S$: Cần giảm tổng xuống, ta giảm $right = right - 1$.
  - Vì mỗi bước hoặc $left$ tăng hoặc $right$ giảm, vòng lặp chỉ chạy tối đa $N$ bước $\\rightarrow O(N)$!
`,
    pseudocode: `HÀM TwoSumSorted(A, N, S):
    left = 0
    right = N - 1
    KHI left < right:
        tong = A[left] + A[right]
        NẾU tong == S THÌ:
            TRẢ VỀ (left, right)
        NẾU tong < S THÌ:
            left = left + 1
        NGƯỢC LẠI:
            right = right - 1
    TRẢ VỀ KHÔNG_TÌM_THẤY`,
    samplePython: `def find_pair_sum(arr, target):
    arr.sort() # Nếu mảng chưa sắp xếp
    left = 0
    right = len(arr) - 1
    
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (arr[left], arr[right])
        elif s < target:
            left += 1
        else:
            right -= 1
            
    return None`,
    sampleCpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

bool hasPairWithSum(vector<int>& a, int target) {
    sort(a.begin(), a.end());
    int left = 0, right = a.size() - 1;
    while (left < right) {
        int s = a[left] + a[right];
        if (s == target) return true;
        if (s < target) left++;
        else right--;
    }
    return false;
}`,
    timeComplexity: 'O(N) nếu đã sắp xếp, O(N log N) nếu cần sắp xếp trước',
    spaceComplexity: 'O(1)',
    commonMistakes: [
      'Quên mảng phải được sắp xếp trước khi chạy hai con trỏ ngược chiều.',
      'Xử lý trường hợp mảng có các phần tử trùng lặp khi cần đếm số cặp.',
    ],
    contestTips: [
      'Đây là dạng bài xuất hiện cực kỳ nhiều trong bài 1 và bài 2 của đề thi Tin học trẻ Bảng B.',
    ],
    visualizerType: 'TWO_POINTERS',
    relatedProblemIds: ['prob-two-sum-target', 'prob-three-sum-zero'],
  },
  {
    id: 'lesson-prefix-sum',
    topicId: 'topic-prefix-sum',
    title: 'Mảng cộng dồn (Prefix Sum Array)',
    slug: 'mang-cong-don-prefix-sum',
    order: 1,
    objectives: [
      'Hiểu cách tiền xử lý mảng $P$ trong $O(N)$.',
      'Trả lời truy vấn tổng đoạn con từ $L$ đến $R$ trong thời gian tức thời $O(1)$.',
      'Mở rộng lên mảng 2 chiều (2D Prefix Sum) cho ma trận.',
    ],
    prerequisites: ['Mảng 1 chiều cơ bản'],
    content: `
### 1. Vấn đề thực tế
Cho mảng $A$ gồm $N$ phần tử và $Q$ truy vấn, mỗi truy vấn hỏi: *Tính tổng các số từ vị trí $L$ đến $R$*.
Nếu với mỗi truy vấn bạn dùng vòng lặp chạy từ $L$ đến $R$, mỗi truy vấn tốn $O(N) \\rightarrow$ Tổng thời gian $O(Q \\times N)$.
Khi $N = 10^5, Q = 10^5 \\rightarrow 10^{10}$ thao tác $\\rightarrow$ **TLE nặng**.

### 2. Ý tưởng Mảng cộng dồn
Xây dựng mảng $P$ trong đó $P[i]$ là tổng từ $A[1]$ đến $A[i]$:
- $P[0] = 0$
- $P[i] = P[i-1] + A[i]$ (với $i \\ge 1$)

Khi muốn tính tổng đoạn $[L, R]$:
$$\\text{Tổng}(L, R) = P[R] - P[L - 1]$$
Chỉ mất đúng **1 phép trừ duy nhất** $\\rightarrow$ **$O(1)$**!
`,
    pseudocode: `HÀM BuildPrefixSum(A, N):
    Tạo mảng P kích thước N + 1 với P[0] = 0
    CHO i TỪ 1 ĐẾN N:
        P[i] = P[i - 1] + A[i - 1]
    TRẢ VỀ P

HÀM QuerySum(P, L, R):
    TRẢ VỀ P[R] - P[L - 1]`,
    samplePython: `import sys

def solve():
    # Giả sử đầu vào: N, Q
    # 5 3
    # 1 2 3 4 5
    # 1 3 -> 1+2+3 = 6
    arr = [1, 2, 3, 4, 5]
    n = len(arr)
    
    # Xây dựng prefix sum 1-indexed
    p = [0] * (n + 1)
    for i in range(1, n + 1):
        p[i] = p[i - 1] + arr[i - 1]
        
    # Truy vấn (L, R) 1-based
    def query(l, r):
        return p[r] - p[l - 1]
        
    print("Tổng từ 1 đến 3:", query(1, 3)) # 6
    print("Tổng từ 2 đến 4:", query(2, 4)) # 9`,
    sampleCpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n = 5;
    vector<long long> a = {1, 2, 3, 4, 5};
    vector<long long> p(n + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        p[i] = p[i - 1] + a[i - 1];
    }
    
    // Query [L, R] 1-based
    auto query = [&](int l, int r) {
        return p[r] - p[l - 1];
    };
    
    cout << query(1, 3) << "\\n"; // 6
    return 0;
}`,
    timeComplexity: 'Tiền xử lý O(N), Mỗi truy vấn O(1)',
    spaceComplexity: 'O(N)',
    commonMistakes: [
      'Nhầm lẫn giữa chỉ số 0-based và 1-based (dẫn đến lấy P[L] thay vì P[L-1]).',
      'Tràn số: Tổng các phần tử mảng có thể lên tới $10^5 \\times 10^9 = 10^{14}$ vượt quá kiểu int 32-bit (tối đa $2 \\times 10^9$). Phải dùng long long trong C++!',
    ],
    contestTips: [
      'Gặp bài toán có nhiều truy vấn trên mảng tĩnh không đổi giá trị, phản xạ đầu tiên luôn là: Liệu có dùng được Prefix Sum không?',
    ],
    visualizerType: 'PREFIX_SUM',
    relatedProblemIds: ['prob-prefix-sum-basic', 'prob-max-subarray-len-k'],
  },
  {
    id: 'lesson-graph-bfs',
    topicId: 'topic-graph-bfs-dfs',
    title: 'Duyệt đồ thị theo chiều rộng (Breadth-First Search - BFS)',
    slug: 'duyet-do-thi-bfs',
    order: 1,
    objectives: [
      'Hiểu cơ chế hoạt động của hàng đợi Queue theo nguyên lý FIFO (First-In-First-Out).',
      'Tìm đường đi ngắn nhất trên đồ thị không trọng số hoặc bảng ô vuông (Grid).',
      'Đánh dấu mảng visited để tránh chu trình lặp vô hạn.',
    ],
    prerequisites: ['Hàng đợi Queue', 'Biểu diễn đồ thị danh sách kề hoặc ma trận'],
    content: `
### 1. Ý tưởng trực quan (Wave Propagation)
BFS giống như bạn ném một viên sỏi xuống mặt hồ phẳng lặng: Những vòng sóng sẽ loang dần ra xung quanh từ tâm, lần lượt đi qua các đỉnh ở khoảng cách 1 bước, 2 bước, 3 bước...
Do đó, đỉnh nào được thăm trước thì khoảng cách từ đỉnh xuất phát tới đỉnh đó **luôn là ngắn nhất**!

### 2. Thuật toán BFS từng bước
1. Khởi tạo hàng đợi \`Q\` rỗng và mảng \`visited\` toàn \`false\`.
2. Đẩy đỉnh xuất phát \`s\` vào \`Q\`, đánh dấu \`visited[s] = true\`, khoảng cách \`dist[s] = 0\`.
3. Khi \`Q\` chưa rỗng:
   - Lấy đỉnh \`u\` ở đầu hàng đợi ra.
   - Với mỗi đỉnh kề \`v\` của \`u\`:
     - Nếu \`v\` chưa được thăm:
       - \`visited[v] = true\`
       - \`dist[v] = dist[u] + 1\`
       - Đẩy \`v\` vào hàng đợi \`Q\`.
`,
    pseudocode: `HÀM BFS(start_node, adj_list):
    Tạo queue Q
    Tạo mảng visited initialized False
    Tạo mảng dist initialized vô_cùng
    
    Q.push(start_node)
    visited[start_node] = True
    dist[start_node] = 0
    
    KHI Q không rỗng:
        u = Q.pop_front()
        CHO MỖI đỉnh v kề với u:
            NẾU CHƯA visited[v]:
                visited[v] = True
                dist[v] = dist[u] + 1
                Q.push(v)`,
    samplePython: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    dist = {start: 0}
    
    while queue:
        u = queue.popleft()
        for v in graph.get(u, []):
            if v not in visited:
                visited.add(v)
                dist[v] = dist[u] + 1
                queue.append(v)
                
    return dist`,
    sampleCpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void bfs(int start, const vector<vector<int>>& adj, int n) {
    vector<bool> visited(n + 1, false);
    vector<int> dist(n + 1, -1);
    queue<int> q;
    
    q.push(start);
    visited[start] = true;
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}`,
    timeComplexity: 'O(V + E) với V là số đỉnh và E là số cạnh',
    spaceComplexity: 'O(V)',
    commonMistakes: [
      'Quên đánh dấu visited ngay lúc đẩy vào Queue, dẫn đến một đỉnh bị đẩy vào queue nhiều lần gây tràn bộ nhớ (MLE).',
      'Quên kiểm tra biên ma trận khi chạy BFS loang 4 hướng (trên, dưới, trái, phải).',
    ],
    contestTips: [
      'BFS trên lưới 2 chiều là dạng bài thường xuyên nhất của đồ thị ở Bảng B Tin học trẻ.',
    ],
    visualizerType: 'GRAPH_BFS',
    relatedProblemIds: ['prob-bfs-maze-shortest-path', 'prob-connected-components'],
  },
  {
    id: 'lesson-sorting-algorithms',
    topicId: 'topic-sorting',
    title: 'Các thuật toán Sắp xếp & Cơ chế so sánh (Sorting Algorithms)',
    slug: 'cac-thuat-toan-sap-xep',
    order: 1,
    objectives: [
      'Hiểu cơ chế hoán đổi và so sánh của Bubble Sort, Selection Sort, Merge Sort.',
      'Sử dụng hàm sắp xếp thư viện có sẵn với Custom Comparator.',
    ],
    prerequisites: ['Mảng 1 chiều'],
    content: `
### So sánh các thuật toán sắp xếp
- **Bubble Sort (Sắp xếp nổi bọt):** $O(N^2)$, liên tục đổi chỗ 2 phần tử liền kề nếu ngược thứ tự.
- **Selection Sort (Sắp xếp chọn):** $O(N^2)$, tìm phần tử nhỏ nhất đặt về đầu.
- **Merge Sort / Quick Sort:** $O(N \\log N)$, chuẩn mực cho các hàm \`sort()\` hiện đại.
`,
    pseudocode: `BubbleSort(A):
    for i = 0 to n - 1:
        for j = 0 to n - i - 2:
            if A[j] > A[j+1]:
                swap(A[j], A[j+1])`,
    samplePython: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    sampleCpp: `#include <vector>
#include <algorithm>

using namespace std;

void sortCustom(vector<pair<int, int>>& points) {
    // Sắp xếp theo hoành độ tăng dần, nếu bằng nhau sắp theo tung độ giảm dần
    sort(points.begin(), points.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second > b.second;
    });
}`,
    timeComplexity: 'O(N^2) cho Bubble Sort, O(N log N) cho thư viện chuẩn',
    spaceComplexity: 'O(1)',
    commonMistakes: ['Tự viết thuật toán O(N^2) khi đi thi thay vì dùng std::sort O(N log N)'],
    contestTips: ['Luôn ưu tiên dùng sort() của thư viện vì đã được tối ưu Introsort cực mạnh.'],
    visualizerType: 'SORTING',
    relatedProblemIds: ['prob-sort-even-odd', 'prob-fractional-knapsack'],
  },
  {
    id: 'lesson-knapsack-dp',
    topicId: 'topic-dp-basic',
    title: 'Quy hoạch động: Bài toán Balo 0/1 (0/1 Knapsack Problem)',
    slug: 'bai-toan-balo-0-1',
    order: 1,
    objectives: [
      'Xác định trạng thái DP: dp[i][w] là giá trị lớn nhất chọn từ i đồ vật với sức chứa w.',
      'Công thức truy hồi (Transition) giữa chọn và không chọn đồ vật.',
      'Tối ưu bộ nhớ từ ma trận 2D về mảng 1D chạy ngược.',
    ],
    prerequisites: ['Đệ quy có nhớ', 'Mảng 2 chiều'],
    content: `
### 1. Đặt bài toán
Bạn có một chiếc balo có thể chứa tối đa trọng lượng $W$. Có $N$ món đồ, món thứ $i$ có trọng lượng $w_i$ và giá trị $v_i$. Mỗi món chỉ được chọn tối đa **1 lần** (0 hoặc 1).
Hãy chọn các món đồ sao cho tổng trọng lượng không vượt quá $W$ và tổng giá trị thu được là **lớn nhất**.

### 2. Công thức quy hoạch động
Gọi $dp[w]$ là giá trị lớn nhất có thể thu được với balo sức chứa $w$:
Với mỗi món đồ $(w_i, v_i)$, ta duyệt $w$ từ $W$ **ngược về** $w_i$:
$$dp[w] = \\max(dp[w], dp[w - w_i] + v_i)$$
*Tại sao phải duyệt ngược?* Để đảm bảo mỗi món đồ chỉ được chọn một lần duy nhất!
`,
    pseudocode: `HÀM Knapsack(W, weights, values, N):
    dp = mảng kích thước W + 1 khởi tạo toàn 0
    CHO i TỪ 0 ĐẾN N - 1:
        CHO w TỪ W GIẢM VỀ weights[i]:
            dp[w] = MAX(dp[w], dp[w - weights[i]] + values[i])
    TRẢ VỀ dp[W]`,
    samplePython: `def knapsack(W, weights, values):
    dp = [0] * (W + 1)
    n = len(weights)
    for i in range(n):
        w_i = weights[i]
        v_i = values[i]
        for w in range(W, w_i - 1, -1):
            dp[w] = max(dp[w], dp[w - w_i] + v_i)
    return dp[W]`,
    sampleCpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n, W;
    if (!(cin >> n >> W)) return 0;
    vector<int> w(n), v(n);
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];
    
    vector<long long> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    cout << dp[W] << "\\n";
    return 0;
}`,
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W)',
    commonMistakes: [
      'Duyệt xuôi từ w_i đến W trong bài toán 0/1 (điều này biến bài toán thành Balo vô hạn lần chọn).',
      'W quá lớn (ví dụ W = 10^9) thì không thể dùng mảng DP này mà phải dùng nhánh cận hoặc chặt nhị phân.',
    ],
    contestTips: [
      'Dạng bài cơ bản của mọi kỳ thi chọn HSG Tỉnh Bảng B.',
    ],
    relatedProblemIds: ['prob-knapsack-01', 'prob-subset-sum-target'],
  },
];

export const mockProblems: Problem[] = [
  {
    id: 'prob-bs-search-val',
    topicId: 'topic-binary-search',
    topicTitle: 'Tìm kiếm nhị phân',
    title: 'Tìm kiếm phần tử trên mảng đã sắp xếp',
    slug: 'tim-kiem-phan-tu-tren-mang-da-sap-xep',
    difficulty: 'EASY',
    rating: 900,
    statement: `Cho một dãy số nguyên $A$ gồm $N$ phần tử đã được sắp xếp tăng dần và một số nguyên $X$.
Nhiệm vụ của bạn là kiểm tra xem số $X$ có xuất hiện trong dãy $A$ hay không. Nếu có, in ra chỉ số (1-based) của phần tử đó; nếu có nhiều phần tử bằng $X$, in ra chỉ số đầu tiên. Nếu không có, in ra \`-1\`.`,
    inputFormat: `Dòng 1 chứa hai số nguyên $N$ và $X$ ($1 \\le N \\le 10^5, -10^9 \\le X \\le 10^9$).
Dòng 2 chứa $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `In ra chỉ số 1-based tìm được, hoặc \`-1\` nếu không tồn tại.`,
    constraints: `$N \\le 10^5, |A_i|, |X| \\le 10^9$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `5 12
2 5 8 12 19`,
    sampleOutput: `4`,
    sampleExplanation: `Số 12 nằm ở vị trí thứ 4 trong mảng đã cho.`,
    hints: ['Sử dụng thuật toán Binary Search để đạt độ phức tạp O(log N).'],
    editorial: `Ta khởi tạo left = 0, right = N - 1. Tại mỗi bước xét mid = (left + right) // 2. Nếu A[mid] >= X, ta cập nhật kết quả và thử tìm tiếp về bên trái bằng cách gán right = mid - 1. Ngược lại left = mid + 1.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    x = int(lines[1])
    a = [int(v) for v in lines[2:2+n]]
    
    left = 0
    right = n - 1
    ans = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        if a[mid] == x:
            ans = mid + 1
            right = mid - 1 # Tìm vị trí đầu tiên
        elif a[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
            
    print(ans)

if __name__ == "__main__":
    main()`,
    solutionCpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long x;
    if (!(cin >> n >> x)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int left = 0, right = n - 1, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (a[mid] == x) {
            ans = mid + 1;
            right = mid - 1;
        } else if (a[mid] < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Binary Search', 'Basic', 'HSG Bảng B'],
    totalSubmissions: 342,
    acceptedSubmissions: 285,
    testCases: [
      { id: 'tc-1', input: '5 12\n2 5 8 12 19', expectedOutput: '4', isHidden: false, scoreWeight: 20 },
      { id: 'tc-2', input: '4 7\n1 3 5 9', expectedOutput: '-1', isHidden: false, scoreWeight: 20 },
      { id: 'tc-3', input: '6 5\n1 5 5 5 8 10', expectedOutput: '2', isHidden: true, scoreWeight: 30 },
      { id: 'tc-4', input: '1 100\n100', expectedOutput: '1', isHidden: true, scoreWeight: 30 },
    ],
  },
  {
    id: 'prob-two-sum-target',
    topicId: 'topic-two-pointers',
    topicTitle: 'Kỹ thuật Hai con trỏ',
    title: 'Cặp số có tổng bằng S',
    slug: 'cap-so-co-tong-bang-s',
    difficulty: 'EASY',
    rating: 1000,
    statement: `Cho một dãy số nguyên $A$ gồm $N$ phần tử và một số nguyên $S$.
Hãy tìm hai vị trí phân biệt $i$ và $j$ ($1 \\le i < j \\le N$) sao cho $A_i + A_j = S$.
Nếu có nhiều cặp thỏa mãn, in ra một cặp bất kỳ. Nếu không có cặp nào, in ra \`-1\`.`,
    inputFormat: `Dòng đầu tiên chứa hai số nguyên $N$ và $S$ ($2 \\le N \\le 10^5, -10^9 \\le S \\le 10^9$).
Dòng thứ hai chứa $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `In ra hai số nguyên là hai giá trị $A_i, A_j$ thỏa mãn tổng bằng $S$ cách nhau bởi dấu cách, hoặc \`-1\` nếu không tìm thấy.`,
    constraints: `$2 \\le N \\le 10^5, |A_i|, |S| \\le 10^9$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `5 14
2 7 11 12 3`,
    sampleOutput: `3 11`,
    sampleExplanation: `Hai số 3 và 11 có tổng bằng 14.`,
    hints: ['Sắp xếp mảng lại rồi dùng hai con trỏ left ở đầu mảng, right ở cuối mảng.'],
    editorial: `Sau khi sắp xếp mảng tăng dần, dùng hai con trỏ left = 0 và right = n - 1. Nếu tổng A[left] + A[right] == S thì ta tìm thấy. Nếu nhỏ hơn S ta tăng left, nếu lớn hơn S ta giảm right.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    s = int(lines[1])
    a = [int(x) for x in lines[2:2+n]]
    
    a.sort()
    l = 0
    r = n - 1
    while l < r:
        cur = a[l] + a[r]
        if cur == s:
            print(f"{a[l]} {a[r]}")
            return
        elif cur < s:
            l += 1
        else:
            r -= 1
            
    print("-1")

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Two Pointers', 'Sorting', 'Tin Học Trẻ'],
    totalSubmissions: 418,
    acceptedSubmissions: 312,
    testCases: [
      { id: 'tc-1', input: '5 14\n2 7 11 12 3', expectedOutput: '3 11', isHidden: false, scoreWeight: 25 },
      { id: 'tc-2', input: '3 20\n1 2 3', expectedOutput: '-1', isHidden: false, scoreWeight: 25 },
      { id: 'tc-3', input: '4 10\n5 5 1 9', expectedOutput: '1 9', isHidden: true, scoreWeight: 25 },
      { id: 'tc-4', input: '2 100\n50 50', expectedOutput: '50 50', isHidden: true, scoreWeight: 25 },
    ],
  },
  {
    id: 'prob-prefix-sum-basic',
    topicId: 'topic-prefix-sum',
    topicTitle: 'Mảng cộng dồn',
    title: 'Tổng đoạn con liên tiếp',
    slug: 'tong-doan-con-lien-tiep',
    difficulty: 'BEGINNER',
    rating: 800,
    statement: `Cho dãy số nguyên $A$ gồm $N$ phần tử và $Q$ truy vấn.
Mỗi truy vấn gồm hai chỉ số $L$ và $R$ ($1 \\le L \\le R \\le N$).
Yêu cầu: Với mỗi truy vấn, hãy tính tổng các phần tử từ $A_L$ đến $A_R$, tức là:
$$S = \\sum_{i=L}^{R} A_i$$`,
    inputFormat: `Dòng đầu tiên chứa hai số nguyên $N, Q$ ($1 \\le N, Q \\le 10^5$).
Dòng thứ hai chứa $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).
$Q$ dòng tiếp theo, mỗi dòng chứa hai số nguyên $L, R$.`,
    outputFormat: `Với mỗi truy vấn, in ra kết quả trên một dòng.`,
    constraints: `$N, Q \\le 10^5, |A_i| \\le 10^9$. Lưu ý tổng có thể vượt quá kiểu 32-bit int.`,
    sampleInput: `5 3
2 4 6 8 10
1 3
2 4
1 5`,
    sampleOutput: `12
18
30`,
    sampleExplanation: `Đoạn 1..3: 2 + 4 + 6 = 12. Đoạn 2..4: 4 + 6 + 8 = 18. Đoạn 1..5: tổng toàn mảng = 30.`,
    hints: ['Tiền xử lý mảng Prefix Sum p[i] = p[i-1] + A[i-1]. Kết quả mỗi truy vấn là p[R] - p[L-1].'],
    editorial: `Độ phức tạp tiền xử lý O(N), mỗi truy vấn O(1). Tổng độ phức tạp O(N + Q).`,
    solutionPython: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    q = int(input_data[1])
    
    idx = 2
    a = [int(x) for x in input_data[idx:idx+n]]
    idx += n
    
    pref = [0] * (n + 1)
    for i in range(1, n + 1):
        pref[i] = pref[i - 1] + a[i - 1]
        
    out = []
    for _ in range(q):
        l = int(input_data[idx])
        r = int(input_data[idx+1])
        idx += 2
        out.append(str(pref[r] - pref[l - 1]))
        
    sys.stdout.write("\\n".join(out) + "\\n")

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Prefix Sum', 'Beginner', 'Math'],
    totalSubmissions: 620,
    acceptedSubmissions: 540,
    testCases: [
      { id: 'tc-1', input: '5 3\n2 4 6 8 10\n1 3\n2 4\n1 5', expectedOutput: '12\n18\n30', isHidden: false, scoreWeight: 30 },
      { id: 'tc-2', input: '3 2\n-5 10 -2\n1 1\n1 3', expectedOutput: '-5\n3', isHidden: false, scoreWeight: 30 },
      { id: 'tc-3', input: '4 1\n1000000000 1000000000 1000000000 1000000000\n1 4', expectedOutput: '4000000000', isHidden: true, scoreWeight: 40 },
    ],
  },
  {
    id: 'prob-bfs-maze-shortest-path',
    topicId: 'topic-graph-bfs-dfs',
    topicTitle: 'Duyệt đồ thị: BFS & DFS',
    title: 'Mê cung thoát hiểm (Grid Shortest Path)',
    slug: 'me-cung-thoat-hiem-bfs',
    difficulty: 'MEDIUM',
    rating: 1300,
    statement: `Bạn đang ở vị trí xuất phát $(1, 1)$ trong một mê cung kích thước $R \\times C$.
Mỗi ô trong mê cung có thể là:
- Ký tự \`.\`: Đường đi an toàn.
- Ký tự \`#\`: Bức tường đá không thể đi qua.

Từ một ô, bạn có thể di chuyển sang 4 ô kề cạnh (trên, dưới, trái, phải).
Hãy tìm số bước di chuyển ít nhất để đi từ ô xuất phát $(1, 1)$ đến lối thoát tại ô $(R, C)$. Nếu không có cách nào thoát ra được, in ra \`-1\`.`,
    inputFormat: `Dòng 1 chứa hai số nguyên $R$ và $C$ ($1 \\le R, C \\le 500$).
$R$ dòng tiếp theo, mỗi dòng chứa một xâu độ dài $C$ chỉ gồm các ký tự \`.\` và \`#\`. Ô $(1, 1)$ và $(R, C)$ luôn là \`.\`.`,
    outputFormat: `In ra số bước di chuyển ít nhất, hoặc \`-1\` nếu không đến được.`,
    constraints: `$1 \\le R, C \\le 500$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `4 5
..#..
#...#
.#.#.
...#.`,
    sampleOutput: `7`,
    sampleExplanation: `Đường đi ngắn nhất tốn 7 bước di chuyển.`,
    hints: ['Sử dụng thuật toán BFS để đảm bảo tính ngắn nhất trên lưới đồ thị.'],
    editorial: `Xem mỗi ô (r, c) là một đỉnh đồ thị với cạnh nối tới 4 ô kề nếu là '.'. BFS xuất phát từ (0, 0) sẽ tìm ra khoảng cách ngắn nhất tới (R-1, C-1).`,
    solutionPython: `import sys
from collections import deque

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    r = int(lines[0])
    c = int(lines[1])
    grid = lines[2:2+r]
    
    dist = [[-1] * c for _ in range(r)]
    queue = deque([(0, 0)])
    dist[0][0] = 0
    
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]
    
    while queue:
        cr, cc = queue.popleft()
        if cr == r - 1 and cc == c - 1:
            print(dist[cr][cc])
            return
            
        for d in range(4):
            nr = cr + dr[d]
            nc = cc + dc[d]
            if 0 <= nr < r and 0 <= nc < c and grid[nr][nc] == '.' and dist[nr][nc] == -1:
                dist[nr][nc] = dist[cr][cc] + 1
                queue.append((nr, nc))
                
    print(-1)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Graph', 'BFS', 'Shortest Path', 'HSG Tỉnh'],
    totalSubmissions: 310,
    acceptedSubmissions: 204,
    testCases: [
      { id: 'tc-1', input: '4 5\n..#..\n#...#\n.#.#.\n...#.', expectedOutput: '7', isHidden: false, scoreWeight: 30 },
      { id: 'tc-2', input: '2 2\n.#\n#.', expectedOutput: '-1', isHidden: false, scoreWeight: 30 },
      { id: 'tc-3', input: '3 3\n...\n.#.\n...', expectedOutput: '4', isHidden: true, scoreWeight: 40 },
    ],
  },
  {
    id: 'prob-knapsack-01',
    topicId: 'topic-dp-basic',
    topicTitle: 'Quy hoạch động 1D & Bài toán Balo',
    title: 'Balo 0/1 (0/1 Knapsack Problem)',
    slug: 'balo-0-1-knapsack',
    difficulty: 'MEDIUM',
    rating: 1400,
    statement: `Có $N$ món đồ vật được đánh số từ $1$ đến $N$.
Món đồ thứ $i$ có trọng lượng $W_i$ và giá trị $V_i$.
Bạn có một chiếc balo với sức chứa tối đa là $S$.
Mỗi đồ vật bạn chỉ có thể chọn hoặc bỏ qua (chọn tối đa 1 lần).
Hãy chọn một tập hợp các món đồ sao cho tổng trọng lượng của chúng không vượt quá sức chứa $S$ và tổng giá trị đạt được là lớn nhất có thể.`,
    inputFormat: `Dòng 1: Hai số nguyên $N$ và $S$ ($1 \\le N \\le 100, 1 \\le S \\le 10^5$).
$N$ dòng tiếp theo: Mỗi dòng gồm hai số nguyên $W_i, V_i$ ($1 \\le W_i \\le S, 1 \\le V_i \\le 10^9$).`,
    outputFormat: `In ra giá trị lớn nhất có thể thu được.`,
    constraints: `$N \\le 100, S \\le 10^5$. Thời gian chạy $\\le 1.0$ giây.`,
    sampleInput: `4 7
3 4
4 5
2 3
5 7`,
    sampleOutput: `9`,
    sampleExplanation: `Chọn món 1 (nặng 3, giá 4) và món 2 (nặng 4, giá 5) có tổng trọng lượng 3 + 4 = 7 <= 7 và tổng giá trị 4 + 5 = 9.`,
    hints: ['Quy hoạch động với dp[j] là giá trị lớn nhất khi sức chứa là j, duyệt j từ S giảm dần về W_i.'],
    editorial: `Sử dụng mảng 1D dp kích thước S+1. Với mỗi đồ vật (w, v), ta cập nhật ngược: dp[j] = max(dp[j], dp[j - w] + v) với j chạy từ S về w.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    max_w = int(lines[1])
    
    weights = []
    values = []
    idx = 2
    for _ in range(n):
        weights.append(int(lines[idx]))
        values.append(int(lines[idx+1]))
        idx += 2
        
    dp = [0] * (max_w + 1)
    
    for i in range(n):
        w = weights[i]
        v = values[i]
        for j in range(max_w, w - 1, -1):
            if dp[j - w] + v > dp[j]:
                dp[j] = dp[j - w] + v
                
    print(dp[max_w])

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Dynamic Programming', 'Knapsack', 'HSG Quốc Gia'],
    totalSubmissions: 520,
    acceptedSubmissions: 390,
    testCases: [
      { id: 'tc-1', input: '4 7\n3 4\n4 5\n2 3\n5 7', expectedOutput: '9', isHidden: false, scoreWeight: 30 },
      { id: 'tc-2', input: '3 3\n4 10\n5 20\n6 30', expectedOutput: '0', isHidden: false, scoreWeight: 30 },
      { id: 'tc-3', input: '5 10\n2 3\n3 4\n4 5\n5 6\n1 2', expectedOutput: '13', isHidden: true, scoreWeight: 40 },
    ],
  },
  {
    id: 'prob-lis-sequence',
    topicId: 'topic-dp-lis-lcs',
    topicTitle: 'Dãy con tăng dài nhất & Xâu con chung',
    title: 'Dãy con tăng dài nhất (LIS)',
    slug: 'day-con-tang-dai-nhat-lis',
    difficulty: 'MEDIUM',
    rating: 1400,
    statement: `Cho một dãy số nguyên $A = (A_1, A_2, \\dots, A_N)$.
Một dãy con của $A$ thu được bằng cách xóa đi một số phần tử (hoặc không xóa phần tử nào) và giữ nguyên thứ tự tương đối của các phần tử còn lại.
Dãy con được gọi là tăng nghiêm ngặt nếu mỗi phần tử đều lớn hơn phần tử đứng ngay trước nó.
Hãy tìm độ dài của dãy con tăng nghiêm ngặt dài nhất (Longest Increasing Subsequence).`,
    inputFormat: `Dòng đầu tiên chứa số nguyên $N$ ($1 \\le N \\le 2 \\times 10^5$).
Dòng thứ hai chứa $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `In ra độ dài của dãy con tăng dài nhất.`,
    constraints: `$N \\le 2 \\times 10^5, |A_i| \\le 10^9$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `6
10 20 9 33 21 50`,
    sampleOutput: `4`,
    sampleExplanation: `Dãy con tăng dài nhất là (10, 20, 33, 50) hoặc (9, 21, 50) có độ dài 4.`,
    hints: ['Thuật toán O(N^2) sẽ bị TLE vì N = 200,000. Hãy dùng mảng đuôi tails kết hợp Binary Search để đạt O(N log N).'],
    editorial: `Duy trì mảng tails trong đó tails[i] là giá trị nhỏ nhất của phần tử cuối cùng của dãy con tăng độ dài i+1. Với mỗi x trong A, dùng bisect_left tìm vị trí thích hợp trong tails để thay thế hoặc nối dài.`,
    solutionPython: `import sys
import bisect

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    a = [int(x) for x in lines[1:1+n]]
    
    tails = []
    for x in a:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
            
    print(len(tails))

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['DP', 'Binary Search', 'LIS', 'Chuyên Tin'],
    totalSubmissions: 480,
    acceptedSubmissions: 310,
    testCases: [
      { id: 'tc-1', input: '6\n10 20 9 33 21 50', expectedOutput: '4', isHidden: false, scoreWeight: 30 },
      { id: 'tc-2', input: '5\n5 4 3 2 1', expectedOutput: '1', isHidden: false, scoreWeight: 30 },
      { id: 'tc-3', input: '7\n1 2 3 4 5 6 7', expectedOutput: '7', isHidden: true, scoreWeight: 40 },
    ],
  },
  {
    id: 'prob-dsu-connected-components',
    topicId: 'topic-dsu',
    topicTitle: 'Tập hợp rời nhau',
    title: 'Đếm thành phần liên thông với DSU',
    slug: 'dem-thanh-phan-lien-thong-dsu',
    difficulty: 'MEDIUM',
    rating: 1350,
    statement: `Có $N$ thành phố được đánh số từ $1$ đến $N$. Ban đầu không có con đường nào giữa các thành phố.
Lần lượt có $M$ con đường hai chiều được xây dựng kết nối hai thành phố $U$ và $V$.
Sau khi xây dựng tất cả $M$ con đường, hãy đếm số lượng vùng liên thông (nhóm các thành phố có thể đi lại được với nhau).`,
    inputFormat: `Dòng 1: Hai số nguyên $N$ và $M$ ($1 \\le N \\le 10^5, 0 \\le M \\le 2 \\times 10^5$).
$M$ dòng tiếp theo: Mỗi dòng chứa hai số nguyên $U, V$ biểu thị một con đường.`,
    outputFormat: `In ra số thành phần liên thông còn lại.`,
    constraints: `$N \\le 10^5, M \\le 2 \\times 10^5$.`,
    sampleInput: `5 3
1 2
2 3
4 5`,
    sampleOutput: `2`,
    sampleExplanation: `Có 2 nhóm: {1, 2, 3} và {4, 5}.`,
    hints: ['Sử dụng Disjoint Set Union (DSU) với nén đường đi (Path Compression).'],
    editorial: `Ban đầu có N tập hợp. Mỗi khi nối (u, v) có chung gốc hay không: nếu khác gốc, gộp lại và số thành phần liên thông giảm đi 1.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    m = int(lines[1])
    
    parent = list(range(n + 1))
    components = n
    
    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]
        
    def union(i, j):
        nonlocal components
        root_i = find(i)
        root_j = find(j)
        if root_i != root_j:
            parent[root_i] = root_j
            components -= 1
            
    idx = 2
    for _ in range(m):
        u = int(lines[idx])
        v = int(lines[idx+1])
        union(u, v)
        idx += 2
        
    print(components)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['DSU', 'Graph', 'HSG Bảng B'],
    totalSubmissions: 390,
    acceptedSubmissions: 310,
    testCases: [
      { id: 'tc-1', input: '5 3\n1 2\n2 3\n4 5', expectedOutput: '2', isHidden: false, scoreWeight: 50 },
      { id: 'tc-2', input: '4 0', expectedOutput: '4', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-dijkstra-shortest',
    topicId: 'topic-dijkstra',
    topicTitle: 'Đường đi ngắn nhất',
    title: 'Đường đi ngắn nhất trên đồ thị có trọng số (Dijkstra)',
    slug: 'duong-di-ngan-nhat-dijkstra',
    difficulty: 'HARD',
    rating: 1600,
    statement: `Cho một đồ thị có hướng gồm $N$ đỉnh và $M$ cạnh, mỗi cạnh có trọng số không âm $W$.
Hãy tìm độ dài đường đi ngắn nhất từ đỉnh $1$ đến đỉnh $N$. Nếu không có đường đi, in ra \`-1\`.`,
    inputFormat: `Dòng 1: Hai số nguyên $N$ và $M$ ($1 \\le N \\le 10^5, 1 \\le M \\le 2 \\times 10^5$).
$M$ dòng tiếp theo: Mỗi dòng gồm ba số nguyên $U, V, W$ ($1 \\le U, V \\le N, 0 \\le W \\le 10^9$) biểu thị cạnh từ $U$ đến $V$ có trọng số $W$.`,
    outputFormat: `In ra khoảng cách ngắn nhất, hoặc \`-1\`.`,
    constraints: `$N \\le 10^5, M \\le 2 \\times 10^5, W \\le 10^9$. Thời gian $\\le 1.5$ giây.`,
    sampleInput: `4 4
1 2 2
2 3 3
1 3 6
3 4 1`,
    sampleOutput: `6`,
    sampleExplanation: `Đường đi tối ưu là 1 -> 2 -> 3 -> 4 có tổng trọng số 2 + 3 + 1 = 6.`,
    hints: ['Thuật toán Dijkstra sử dụng min-heap / Priority Queue để đạt O((V + E) log V).'],
    editorial: `Khởi tạo dist[1] = 0, các đỉnh khác là vô cùng. Dùng heapq trong Python hoặc priority_queue trong C++.`,
    solutionPython: `import sys
import heapq

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    m = int(lines[1])
    
    adj = [[] for _ in range(n + 1)]
    idx = 2
    for _ in range(m):
        u = int(lines[idx])
        v = int(lines[idx+1])
        w = int(lines[idx+2])
        adj[u].append((v, w))
        idx += 3
        
    dist = [float('inf')] * (n + 1)
    dist[1] = 0
    pq = [(0, 1)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        if u == n:
            print(d)
            return
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
                
    print(-1)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.5,
    memoryLimit: 256,
    tags: ['Graph', 'Dijkstra', 'Priority Queue', 'Chuyên Sâu'],
    totalSubmissions: 290,
    acceptedSubmissions: 175,
    testCases: [
      { id: 'tc-1', input: '4 4\n1 2 2\n2 3 3\n1 3 6\n3 4 1', expectedOutput: '6', isHidden: false, scoreWeight: 50 },
      { id: 'tc-2', input: '3 1\n1 2 10', expectedOutput: '-1', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-monotonic-stack-next-greater',
    topicId: 'topic-stack-queue',
    topicTitle: 'Ngăn xếp & Hàng đợi',
    title: 'Phần tử lớn hơn đầu tiên bên phải (Next Greater Element)',
    slug: 'phan-tu-lon-hon-dau-tien-ben-phai',
    difficulty: 'EASY',
    rating: 1100,
    statement: `Cho dãy số nguyên $A$ gồm $N$ phần tử. Với mỗi phần tử $A_i$, hãy tìm phần tử đầu tiên đứng sau nó (bên phải nó) có giá trị lớn hơn $A_i$. Nếu không có phần tử nào lớn hơn, in ra \`-1\`.`,
    inputFormat: `Dòng 1: Số nguyên $N$ ($1 \\le N \\le 10^5$).
Dòng 2: $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `In ra $N$ số nguyên là kết quả cho từng phần tử, cách nhau bởi khoảng trắng.`,
    constraints: `$N \\le 10^5$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `4
4 5 2 25`,
    sampleOutput: `5 25 25 -1`,
    sampleExplanation: `Sau 4 là 5; sau 5 là 25; sau 2 là 25; sau 25 không có số nào lớn hơn nên in -1.`,
    hints: ['Sử dụng Ngăn xếp đơn điệu (Monotonic Stack) duyệt từ phải sang trái hoặc từ trái sang phải.'],
    editorial: `Duyệt mảng từ cuối về đầu. Duy trì một stack chứa các phần tử giảm dần. Khi gặp phần tử A[i], pop các phần tử <= A[i] khỏi stack. Phần tử còn lại trên đỉnh stack chính là đáp án. Sau đó push A[i] vào stack.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    a = [int(x) for x in lines[1:1+n]]
    
    ans = [-1] * n
    stack = [] # Lưu giá trị
    
    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= a[i]:
            stack.pop()
        if stack:
            ans[i] = stack[-1]
        stack.append(a[i])
        
    print(*(ans))

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Stack', 'Monotonic Stack', 'Tin học trẻ'],
    totalSubmissions: 350,
    acceptedSubmissions: 260,
    testCases: [
      { id: 'tc-1', input: '4\n4 5 2 25', expectedOutput: '5 25 25 -1', isHidden: false, scoreWeight: 50 },
      { id: 'tc-2', input: '3\n13 7 6', expectedOutput: '-1 -1 -1', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-segment-tree-rmq',
    topicId: 'topic-segment-tree',
    topicTitle: 'Cây đoạn',
    title: 'Truy vấn giá trị nhỏ nhất trên đoạn (RMQ Segment Tree)',
    slug: 'truy-van-gia-tri-nho-nhat-rmq',
    difficulty: 'HARD',
    rating: 1700,
    statement: `Cho dãy số nguyên $A$ gồm $N$ phần tử và $Q$ thao tác:
- Thao tác 1 ($1 \\ u \\ v$): Cập nhật giá trị tại phần tử $A_u = v$.
- Thao tác 2 ($2 \\ l \\ r$): Tìm giá trị nhỏ nhất trong đoạn từ $A_l$ đến $A_r$.`,
    inputFormat: `Dòng 1: Hai số nguyên $N, Q$ ($1 \\le N, Q \\le 10^5$).
Dòng 2: $N$ số nguyên $A_1, A_2, \\dots, A_N$.
$Q$ dòng tiếp theo mô tả thao tác.`,
    outputFormat: `Với mỗi thao tác 2, in ra giá trị nhỏ nhất trên một dòng.`,
    constraints: `$N, Q \\le 10^5$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `5 3
3 1 4 2 5
2 1 5
1 2 6
2 1 5`,
    sampleOutput: `1
2`,
    sampleExplanation: `Ban đầu min(3, 1, 4, 2, 5) = 1. Sau khi đổi A[2] thành 6, dãy trở thành (3, 6, 4, 2, 5) có min là 2.`,
    hints: ['Cây Segment Tree cho phép cập nhật điểm và truy vấn đoạn trong O(log N).'],
    editorial: `Xây dựng cây Segment Tree 4*N phần tử. Hàm build mất O(N), hàm update mất O(log N) và query mất O(log N).`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    q = int(lines[1])
    a = [int(x) for x in lines[2:2+n]]
    
    tree = [float('inf')] * (4 * n)
    
    def build(node, start, end):
        if start == end:
            tree[node] = a[start]
            return
        mid = (start + end) // 2
        build(2 * node, start, mid)
        build(2 * node + 1, mid + 1, end)
        tree[node] = min(tree[2 * node], tree[2 * node + 1])
        
    def update(node, start, end, idx, val):
        if start == end:
            a[idx] = val
            tree[node] = val
            return
        mid = (start + end) // 2
        if start <= idx <= mid:
            update(2 * node, start, mid, idx, val)
        else:
            update(2 * node + 1, mid + 1, end, idx, val)
        tree[node] = min(tree[2 * node], tree[2 * node + 1])
        
    def query(node, start, end, l, r):
        if r < start or end < l:
            return float('inf')
        if l <= start and end <= r:
            return tree[node]
        mid = (start + end) // 2
        p1 = query(2 * node, start, mid, l, r)
        p2 = query(2 * node + 1, mid + 1, end, l, r)
        return min(p1, p2)
        
    build(1, 0, n - 1)
    
    idx = 2 + n
    out = []
    for _ in range(q):
        t = int(lines[idx])
        if t == 1:
            u = int(lines[idx+1]) - 1
            v = int(lines[idx+2])
            update(1, 0, n - 1, u, v)
        else:
            l = int(lines[idx+1]) - 1
            r = int(lines[idx+2]) - 1
            out.append(str(query(1, 0, n - 1, l, r)))
        idx += 3
        
    print("\\n".join(out))

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Segment Tree', 'Data Structure', 'Chuyên Tin'],
    totalSubmissions: 210,
    acceptedSubmissions: 140,
    testCases: [
      { id: 'tc-1', input: '5 3\n3 1 4 2 5\n2 1 5\n1 2 6\n2 1 5', expectedOutput: '1\n2', isHidden: false, scoreWeight: 50 },
      { id: 'tc-2', input: '3 1\n10 20 30\n2 2 3', expectedOutput: '20', isHidden: true, scoreWeight: 50 },
    ],
  },
];

export const mockContests: Contest[] = [
  {
    id: 'contest-hsg-tinh-2026',
    title: 'Kỳ thi thử HSG Tỉnh Bảng B - Đợt 1 (Mùa thi 2026)',
    slug: 'thi-thu-hsg-tinh-bang-b-2026',
    description: 'Đề thi chuẩn cấu trúc 4 bài thi trong 180 phút do tổ chuyên môn AlgoArena biên soạn. Gồm các chủ đề: Mảng cộng dồn, Hai con trỏ, BFS trên lưới và Quy hoạch động Balo.',
    startTime: '2026-09-25T14:00:00Z',
    endTime: '2026-09-25T17:00:00Z',
    durationMins: 180,
    isOfficial: true,
    status: 'UPCOMING',
    rules: 'Chấm bài theo hệ thống Subtask. Điểm số tính theo số test cases đúng. Không giới hạn số lần nộp bài.',
    problems: [
      { problemId: 'prob-prefix-sum-basic', problemCode: 'A', title: 'Bài 1: Tổng đoạn con liên tiếp', points: 25 },
      { problemId: 'prob-two-sum-target', problemCode: 'B', title: 'Bài 2: Cặp số có tổng bằng S', points: 25 },
      { problemId: 'prob-bfs-maze-shortest-path', problemCode: 'C', title: 'Bài 3: Mê cung thoát hiểm', points: 25 },
      { problemId: 'prob-knapsack-01', problemCode: 'D', title: 'Bài 4: Balo 0/1', points: 25 },
    ],
    participants: [
      {
        userId: 'user-student-1',
        fullName: 'Nguyễn Hoàng Nam',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        school: 'THPT Chuyên Khoa Học Tự Nhiên',
        score: 100,
        penalty: 45,
        rank: 1,
        submissions: {
          A: { solved: true, attempts: 1, timeMinutes: 8 },
          B: { solved: true, attempts: 1, timeMinutes: 14 },
          C: { solved: true, attempts: 2, timeMinutes: 32 },
          D: { solved: true, attempts: 1, timeMinutes: 45 },
        },
      },
      {
        userId: 'p-2',
        fullName: 'Lê Minh Khôi',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        school: 'THPT Chuyên Hà Nội - Amsterdam',
        score: 75,
        penalty: 58,
        rank: 2,
        submissions: {
          A: { solved: true, attempts: 1, timeMinutes: 6 },
          B: { solved: true, attempts: 1, timeMinutes: 18 },
          C: { solved: true, attempts: 1, timeMinutes: 58 },
          D: { solved: false, attempts: 3, timeMinutes: 0 },
        },
      },
      {
        userId: 'p-3',
        fullName: 'Trần Thảo My',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        school: 'THPT Chuyên Lê Hồng Phong - TP.HCM',
        score: 50,
        penalty: 34,
        rank: 3,
        submissions: {
          A: { solved: true, attempts: 1, timeMinutes: 12 },
          B: { solved: true, attempts: 2, timeMinutes: 34 },
          C: { solved: false, attempts: 1, timeMinutes: 0 },
          D: { solved: false, attempts: 0, timeMinutes: 0 },
        },
      },
    ],
  },
  {
    id: 'contest-tin-hoc-tre-b',
    title: 'Tin Học Trẻ Bảng B - Đấu trường Khởi động 2026',
    slug: 'tin-hoc-tre-bang-b-khoi-dong',
    description: 'Kỳ thi tốc độ 120 phút rèn phản xạ tư duy thuật toán cho học sinh THCS & THPT Bảng B.',
    startTime: '2026-09-20T08:00:00Z',
    endTime: '2026-09-20T10:00:00Z',
    durationMins: 120,
    isOfficial: true,
    status: 'ENDED',
    rules: 'Luật tính điểm theo chuẩn ICPC: Giải đúng nhiều bài nhất trong thời gian sớm nhất. Mỗi lần nộp sai tính penalty 20 phút.',
    problems: [
      { problemId: 'prob-bs-search-val', problemCode: 'A', title: 'Tìm kiếm phần tử', points: 100 },
      { problemId: 'prob-two-sum-target', problemCode: 'B', title: 'Cặp số có tổng bằng S', points: 100 },
      { problemId: 'prob-monotonic-stack-next-greater', problemCode: 'C', title: 'Phần tử lớn hơn bên phải', points: 100 },
    ],
    participants: [
      {
        userId: 'user-student-1',
        fullName: 'Nguyễn Hoàng Nam',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        school: 'THPT Chuyên Khoa Học Tự Nhiên',
        score: 300,
        penalty: 62,
        rank: 1,
        submissions: {
          A: { solved: true, attempts: 1, timeMinutes: 10 },
          B: { solved: true, attempts: 1, timeMinutes: 22 },
          C: { solved: true, attempts: 1, timeMinutes: 30 },
        },
      },
    ],
  },
  {
    id: 'contest-weekly-arena-12',
    title: 'AlgoArena Weekly Round #12 - Chuyên đề Quy Hoạch Động',
    slug: 'algoarena-weekly-round-12',
    description: 'Vòng thi tuần rèn luyện bản lĩnh thi đấu với 3 bài tập DP từ trung cấp đến nâng cao.',
    startTime: '2026-09-28T19:30:00Z',
    endTime: '2026-09-28T21:30:00Z',
    durationMins: 120,
    isOfficial: false,
    status: 'UPCOMING',
    rules: 'Tính điểm xếp hạng Rating trên AlgoArena.',
    problems: [
      { problemId: 'prob-knapsack-01', problemCode: 'A', title: 'Balo 0/1', points: 100 },
      { problemId: 'prob-lis-sequence', problemCode: 'B', title: 'Dãy con tăng dài nhất', points: 100 },
    ],
    participants: [],
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-first-solve',
    code: 'FIRST_SOLVE',
    title: 'Phát Súng Đầu Tiên',
    description: 'Nộp bài và đạt Accepted (AC) bài tập đầu tiên trên AlgoArena.',
    badgeIcon: 'Zap',
    category: 'SOLVING',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 'ach-10-problems',
    code: 'TEN_PROBLEMS',
    title: 'Tân Binh Luyện Đề',
    description: 'Giải quyết thành công 10 bài tập thuật toán.',
    badgeIcon: 'Award',
    category: 'SOLVING',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
  },
  {
    id: 'ach-50-problems',
    code: 'FIFTY_PROBLEMS',
    title: 'Kẻ Săn Thuật Toán',
    description: 'Giải quyết thành công 50 bài tập thuật toán.',
    badgeIcon: 'Flame',
    category: 'SOLVING',
    unlocked: false,
    progress: 28,
    maxProgress: 50,
  },
  {
    id: 'ach-7-day-streak',
    code: 'STREAK_7_DAYS',
    title: 'Kiên Trì Thép',
    description: 'Duy trì chuỗi học tập và giải bài 7 ngày liên tiếp.',
    badgeIcon: 'FlameKindling',
    category: 'STREAK',
    unlocked: false,
    progress: 6,
    maxProgress: 7,
  },
  {
    id: 'ach-bs-master',
    code: 'BINARY_SEARCH_MASTER',
    title: 'Bậc Thầy Chặt Nhị Phân',
    description: 'Hoàn thành trọn bộ 5 bài tập Tìm kiếm nhị phân & Chặt trên tập nghiệm.',
    badgeIcon: 'Target',
    category: 'MASTERY',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
  },
  {
    id: 'ach-graph-explorer',
    code: 'GRAPH_EXPLORER',
    title: 'Nhà Thám Hiểm Đồ Thị',
    description: 'Chinh phục bài toán BFS/DFS và Dijkstra đầu tiên.',
    badgeIcon: 'Compass',
    category: 'MASTERY',
    unlocked: true,
    progress: 2,
    maxProgress: 2,
  },
  {
    id: 'ach-dp-master',
    code: 'DP_CONQUEROR',
    title: 'Chiến Thần Quy Hoạch Động',
    description: 'Giải bài Balo 0/1 và LIS trong lần nộp đầu tiên.',
    badgeIcon: 'ShieldCheck',
    category: 'MASTERY',
    unlocked: true,
    progress: 2,
    maxProgress: 2,
  },
  {
    id: 'ach-contest-debut',
    code: 'CONTEST_DEBUT',
    title: 'Vươn Ra Đấu Trường',
    description: 'Tham gia kỳ thi thử chính thức đầu tiên trên hệ thống.',
    badgeIcon: 'Trophy',
    category: 'CONTEST',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 'ach-perfect-contest',
    code: 'PERFECT_CONTEST',
    title: 'Tuyệt Đối 100/100',
    description: 'Đạt điểm tối đa trong một kỳ thi chính thức.',
    badgeIcon: 'Crown',
    category: 'CONTEST',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 'ach-speed-demon',
    code: 'SPEED_DEMON',
    title: 'Bàn Tay Ánh Sáng',
    description: 'Nộp bài và AC trong vòng dưới 10 phút kể từ khi mở bài.',
    badgeIcon: 'Sparkles',
    category: 'SOLVING',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
  },
];
