import { Problem } from '../types';

export const extraProblems: Problem[] = [
  {
    id: 'prob-kadane-max-subarray',
    topicId: 'topic-prefix-sum',
    topicTitle: 'Mảng cộng dồn & Mảng hiệu',
    title: 'Đoạn con có tổng lớn nhất (Kadane Algorithm)',
    slug: 'doan-con-co-tong-lon-nhat-kadane',
    difficulty: 'EASY',
    rating: 1100,
    statement: `Cho dãy số nguyên $A = (A_1, A_2, \\dots, A_N)$.
Hãy tìm một đoạn con liên tiếp không rỗng của $A$ sao cho tổng các phần tử trong đoạn là lớn nhất.`,
    inputFormat: `Dòng 1: Số nguyên $N$ ($1 \\le N \\le 10^5$).
Dòng 2: $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `In ra một số nguyên duy nhất là tổng lớn nhất tìm được.`,
    constraints: `$N \\le 10^5, |A_i| \\le 10^9$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `6
-2 1 -3 4 -1 2 1 -5 4`,
    sampleOutput: `6`,
    sampleExplanation: `Đoạn [4, -1, 2, 1] có tổng là 6 lớn nhất.`,
    hints: ['Thuật toán Kadane: Duy trì max_current = max(A[i], max_current + A[i]).'],
    editorial: `Độ phức tạp O(N), bộ nhớ O(1). Luôn reset tổng hiện tại nếu nó âm.`,
    solutionPython: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    a = [int(x) for x in data[1:1+n]]
    
    max_so_far = a[0]
    curr_max = a[0]
    for x in a[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['DP', 'Prefix Sum', 'Kadane', 'HSG Bảng B'],
    totalSubmissions: 410,
    acceptedSubmissions: 350,
    testCases: [
      { id: 'tc-k1', input: '8\n-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6', isHidden: false, scoreWeight: 50 },
      { id: 'tc-k2', input: '3\n-5 -2 -8', expectedOutput: '-2', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-bs-answer-wood-cutter',
    topicId: 'topic-binary-search',
    topicTitle: 'Tìm kiếm nhị phân',
    title: 'Chặt gỗ lấy mộc (EKO - Chặt nhị phân kết quả)',
    slug: 'chat-go-lay-moc-eko',
    difficulty: 'MEDIUM',
    rating: 1350,
    statement: `Có $N$ cái cây với chiều cao $H_1, H_2, \\dots, H_N$. Một chiếc máy cưa được thiết lập ở độ cao $H$.
Khi cưa hoạt động, tất cả phần ngọn của cây cao hơn $H$ sẽ bị cắt đi (mỗi cây bị cắt đi $H_i - H$ nếu $H_i > H$).
Bác nông dân cần thu hoạch ít nhất $M$ mét gỗ. Hãy tìm độ cao $H$ lớn nhất để máy cưa thu hoạch được ít nhất $M$ mét gỗ.`,
    inputFormat: `Dòng 1: Hai số nguyên $N$ và $M$ ($1 \\le N \\le 10^6, 1 \\le M \\le 2 \\times 10^9$).
Dòng 2: $N$ số nguyên chiều cao cây $H_i$ ($1 \\le H_i \\le 10^9$).`,
    outputFormat: `In ra độ cao nguyên $H$ lớn nhất thỏa mãn.`,
    constraints: `$N \\le 10^6, M \\le 2 \\times 10^9$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `4 7
20 15 10 17`,
    sampleOutput: `15`,
    sampleExplanation: `Nếu cắt ở độ cao 15: cây 1 được 5m, cây 2 được 0m, cây 3 được 0m, cây 4 được 2m. Tổng = 7m gỗ.`,
    hints: ['Chặt nhị phân trên tập giá trị H trong khoảng [0, max(H)].'],
    editorial: `Hàm kiểm tra f(H) là tổng lượng gỗ thu được khi cưa ở H. Nếu f(H) >= M thì H hợp lệ, ta thử tăng H lên để tìm giá trị tối ưu lớn hơn.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines: return
    n = int(lines[0])
    m = int(lines[1])
    trees = [int(x) for x in lines[2:2+n]]
    
    left = 0
    right = max(trees)
    ans = 0
    
    def check(h):
        return sum(x - h for x in trees if x > h) >= m
        
    while left <= right:
        mid = left + (right - left) // 2
        if check(mid):
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
            
    print(ans)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Binary Search on Answer', 'Tin học trẻ Bảng B', 'Kinh Điển'],
    totalSubmissions: 530,
    acceptedSubmissions: 380,
    testCases: [
      { id: 'tc-w1', input: '4 7\n20 15 10 17', expectedOutput: '15', isHidden: false, scoreWeight: 50 },
      { id: 'tc-w2', input: '5 20\n4 42 40 26 46', expectedOutput: '36', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-interval-scheduling',
    topicId: 'topic-sorting',
    topicTitle: 'Sắp xếp & Tư duy Tham lam',
    title: 'Lịch xem phim tối đa (Interval Scheduling)',
    slug: 'lich-xem-phim-toi-da',
    difficulty: 'EASY',
    rating: 1100,
    statement: `Có $N$ bộ phim, bộ phim thứ $i$ bắt đầu lúc $A_i$ và kết thúc lúc $B_i$.
Bạn chỉ có thể xem mỗi lần một bộ phim và không thể xem hai bộ phim có khoảng thời gian trùng nhau (nếu phim 1 kết thúc lúc $t$, phim 2 có thể bắt đầu lúc $t$).
Hãy tìm số lượng bộ phim tối đa bạn có thể xem trọn vẹn.`,
    inputFormat: `Dòng 1: Số nguyên $N$ ($1 \\le N \\le 10^5$).
$N$ dòng tiếp theo: Mỗi dòng gồm hai số nguyên $A_i, B_i$ ($1 \\le A_i < B_i \\le 10^9$).`,
    outputFormat: `In ra số lượng bộ phim tối đa.`,
    constraints: `$N \\le 10^5, A_i, B_i \\le 10^9$.`,
    sampleInput: `3
3 5
4 9
5 8`,
    sampleOutput: `2`,
    sampleExplanation: `Xem phim [3, 5] và phim [5, 8].`,
    hints: ['Tham lam: Sắp xếp các khoảng theo thời gian kết thúc B_i tăng dần.'],
    editorial: `Chiến thuật tham lam tối ưu là luôn ưu tiên chọn bộ phim kết thúc sớm nhất để chừa lại nhiều thời gian nhất cho các phim sau.`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines: return
    n = int(lines[0])
    movies = []
    idx = 1
    for _ in range(n):
        movies.append((int(lines[idx]), int(lines[idx+1])))
        idx += 2
        
    movies.sort(key=lambda x: x[1])
    count = 0
    last_end = -1
    for start, end in movies:
        if start >= last_end:
            count += 1
            last_end = end
    print(count)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Greedy', 'Sorting', 'HSG Tỉnh'],
    totalSubmissions: 390,
    acceptedSubmissions: 320,
    testCases: [
      { id: 'tc-i1', input: '3\n3 5\n4 9\n5 8', expectedOutput: '2', isHidden: false, scoreWeight: 50 },
      { id: 'tc-i2', input: '4\n1 2\n2 3\n3 4\n4 5', expectedOutput: '4', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-valid-parentheses',
    topicId: 'topic-stack-queue',
    topicTitle: 'Ngăn xếp & Hàng đợi',
    title: 'Kiểm tra dãy ngoặc đúng',
    slug: 'kiem-tra-day-ngoac-dung',
    difficulty: 'BEGINNER',
    rating: 850,
    statement: `Cho một xâu ký tự $S$ chỉ gồm các dấu ngoặc tròn \`(\` và \`)\`.
Dãy ngoặc được coi là đúng nếu:
1. Là xâu rỗng.
2. Nếu $A$ đúng thì \`(A)\` cũng đúng.
3. Nếu $A$ và $B$ đúng thì $AB$ cũng đúng.
Hãy kiểm tra xem xâu $S$ có phải dãy ngoặc đúng hay không. In ra \`YES\` hoặc \`NO\`.`,
    inputFormat: `Một dòng duy nhất chứa xâu $S$ ($1 \\le |S| \\le 10^5$).`,
    outputFormat: `In ra \`YES\` nếu đúng, ngược lại in ra \`NO\`.`,
    constraints: `$|S| \\le 10^5$.`,
    sampleInput: `(()())`,
    sampleOutput: `YES`,
    sampleExplanation: `Xâu có các cặp ngoặc đóng mở hợp lệ.`,
    hints: ['Dùng biến đếm bal hoặc ngăn xếp Stack.'],
    editorial: `Duyệt từng ký tự: gặp '(' tăng 1, gặp ')' giảm 1. Nếu biến đếm < 0 ở bất kỳ lúc nào thì sai. Kết thúc nếu biến đếm == 0 thì YES.`,
    solutionPython: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        print("YES")
        return
    bal = 0
    for ch in s:
        if ch == '(':
            bal += 1
        elif ch == ')':
            bal -= 1
            if bal < 0:
                print("NO")
                return
    print("YES" if bal == 0 else "NO")

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Stack', 'String', 'Tin Học Trẻ'],
    totalSubmissions: 610,
    acceptedSubmissions: 520,
    testCases: [
      { id: 'tc-p1', input: '(()())', expectedOutput: 'YES', isHidden: false, scoreWeight: 50 },
      { id: 'tc-p2', input: ')(', expectedOutput: 'NO', isHidden: false, scoreWeight: 25 },
      { id: 'tc-p3', input: '((()', expectedOutput: 'NO', isHidden: true, scoreWeight: 25 },
    ],
  },
  {
    id: 'prob-connected-components',
    topicId: 'topic-graph-bfs-dfs',
    topicTitle: 'Duyệt đồ thị: BFS & DFS',
    title: 'Đếm số lượng hòn đảo (Grid DFS Flood Fill)',
    slug: 'dem-so-luong-hon-dao-grid-dfs',
    difficulty: 'EASY',
    rating: 1100,
    statement: `Bản đồ vùng biển kích thước $R \\times C$ gồm các ô đất liền \`1\` và ô nước biển \`0\`.
Một hòn đảo được định nghĩa là một nhóm các ô đất liền kết nối với nhau theo 4 hướng (trên, dưới, trái, phải).
Hãy đếm số lượng hòn đảo trên bản đồ.`,
    inputFormat: `Dòng 1: Hai số nguyên $R$ và $C$ ($1 \\le R, C \\le 500$).
$R$ dòng tiếp theo: Mỗi dòng chứa một xâu độ dài $C$ gồm các ký tự \`0\` và \`1\`.`,
    outputFormat: `In ra một số nguyên là số hòn đảo.`,
    constraints: `$R, C \\le 500$.`,
    sampleInput: `4 5
11000
11000
00100
00011`,
    sampleOutput: `3`,
    sampleExplanation: `Có 3 hòn đảo riêng biệt.`,
    hints: ['Thuật toán loang DFS/BFS (Flood Fill). Khi gặp ô 1 chưa thăm, tăng đếm đảo và loang xóa toàn bộ đảo đó.'],
    editorial: `Duyệt qua từng ô ma trận. Nếu ô là '1' và chưa thăm, ta gọi hàm DFS để đánh dấu tất cả các ô thuộc cùng hòn đảo, và tăng kết quả lên 1.`,
    solutionPython: `import sys
sys.setrecursionlimit(300000)

def main():
    lines = sys.stdin.read().split()
    if not lines: return
    r = int(lines[0])
    c = int(lines[1])
    grid = [list(row) for row in lines[2:2+r]]
    
    def dfs(i, j):
        grid[i][j] = '0'
        for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < r and 0 <= nj < c and grid[ni][nj] == '1':
                dfs(ni, nj)
                
    count = 0
    for i in range(r):
        for j in range(c):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
                
    print(count)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['Graph', 'DFS', 'Flood Fill', 'HSG'],
    totalSubmissions: 420,
    acceptedSubmissions: 340,
    testCases: [
      { id: 'tc-c1', input: '4 5\n11000\n11000\n00100\n00011', expectedOutput: '3', isHidden: false, scoreWeight: 50 },
      { id: 'tc-c2', input: '2 2\n00\n00', expectedOutput: '0', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-lcs-strings',
    topicId: 'topic-dp-lis-lcs',
    topicTitle: 'Dãy con tăng dài nhất & Xâu con chung',
    title: 'Xâu con chung dài nhất (Longest Common Subsequence)',
    slug: 'xau-con-chung-dai-nhat-lcs',
    difficulty: 'MEDIUM',
    rating: 1300,
    statement: `Cho hai xâu ký tự $S$ và $T$. Hãy tìm độ dài của xâu con chung dài nhất của hai xâu này.
Một xâu con thu được bằng cách xóa đi một số ký tự mà không làm thay đổi thứ tự tương đối của các ký tự còn lại.`,
    inputFormat: `Dòng 1 chứa xâu $S$ ($1 \\le |S| \\le 2000$).
Dòng 2 chứa xâu $T$ ($1 \\le |T| \\le 2000$).`,
    outputFormat: `In ra một số nguyên là độ dài lớn nhất tìm được.`,
    constraints: `$|S|, |T| \\le 2000$. Thời gian $\\le 1.0$ giây.`,
    sampleInput: `abcde
ace`,
    sampleOutput: `3`,
    sampleExplanation: `Xâu con chung dài nhất là "ace" có độ dài 3.`,
    hints: ['Quy hoạch động 2 chiều: dp[i][j] là LCS của S[0..i] và T[0..j].'],
    editorial: `Nếu S[i-1] == T[j-1]: dp[i][j] = dp[i-1][j-1] + 1. Ngược lại dp[i][j] = max(dp[i-1][j], dp[i][j-1]).`,
    solutionPython: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2: return
    s = lines[0]
    t = lines[1]
    n = len(s)
    m = len(t)
    
    dp = [0] * (m + 1)
    for i in range(1, n + 1):
        prev = 0
        for j in range(1, m + 1):
            temp = dp[j]
            if s[i - 1] == t[j - 1]:
                dp[j] = prev + 1
            else:
                dp[j] = max(dp[j], dp[j - 1])
            prev = temp
            
    print(dp[m])

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['DP', 'Strings', 'LCS', 'HSG Quốc Gia'],
    totalSubmissions: 380,
    acceptedSubmissions: 280,
    testCases: [
      { id: 'tc-l1', input: 'abcde\nace', expectedOutput: '3', isHidden: false, scoreWeight: 50 },
      { id: 'tc-l2', input: 'abc\ndef', expectedOutput: '0', isHidden: true, scoreWeight: 50 },
    ],
  },
  {
    id: 'prob-climbing-stairs',
    topicId: 'topic-dp-basic',
    topicTitle: 'Quy hoạch động 1D & Bài toán Balo',
    title: 'Số cách bước lên cầu thang N bậc',
    slug: 'so-cach-buoc-len-cau-thang-n-bac',
    difficulty: 'BEGINNER',
    rating: 800,
    statement: `Bạn đang đứng ở chân cầu thang có $N$ bậc. Mỗi bước bạn có thể bước $1$ bậc hoặc $2$ bậc.
Hãy tính số cách khác nhau để bạn bước lên đến bậc thứ $N$.
Vì kết quả có thể rất lớn, hãy in ra kết quả sau khi chia lấy dư cho $10^9 + 7$.`,
    inputFormat: `Một số nguyên dương $N$ ($1 \\le N \\le 10^5$).`,
    outputFormat: `In ra số cách modulo $10^9 + 7$.`,
    constraints: `$N \\le 10^5$.`,
    sampleInput: `4`,
    sampleOutput: `5`,
    sampleExplanation: `5 cách: (1+1+1+1), (1+1+2), (1+2+1), (2+1+1), (2+2).`,
    hints: ['Quy hoạch động dạng Fibonacci: dp[i] = (dp[i-1] + dp[i-2]) % MOD.'],
    editorial: `Độ phức tạp O(N), bộ nhớ O(1) nếu chỉ lưu hai biến trước đó.`,
    solutionPython: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s: return
    n = int(s)
    mod = 1000000007
    if n == 1:
        print(1)
        return
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, (a + b) % mod
    print(b)

if __name__ == "__main__":
    main()`,
    timeLimit: 1.0,
    memoryLimit: 256,
    tags: ['DP', 'Math', 'Fibonacci', 'Beginner'],
    totalSubmissions: 670,
    acceptedSubmissions: 590,
    testCases: [
      { id: 'tc-st1', input: '4', expectedOutput: '5', isHidden: false, scoreWeight: 50 },
      { id: 'tc-st2', input: '10', expectedOutput: '89', isHidden: true, scoreWeight: 50 },
    ],
  },
];
