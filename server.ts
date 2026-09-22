import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '2mb' }));

// Lazy initialization for Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Algorithm Coach API (Socratic Mentoring & Debugging)
app.post('/api/coach', async (req, res) => {
  const {
    problemTitle,
    problemStatement,
    userCode,
    language,
    userQuestion,
    mode, // 'HINT' | 'DIAGNOSE' | 'COUNTER_TEST' | 'CONVERT' | 'EXPLAIN'
    testCaseInfo,
  } = req.body;

  const ai = getGemini();

  // If Gemini API Key is configured, generate real AI response
  if (ai) {
    try {
      let systemPrompt = `Bạn là một Huấn Luyện Viên Đội Tuyển Học Sinh Giỏi Tin Học Việt Nam (VNOI / HSG Quốc Gia).
Tên bạn là "AlgoCoach VN". Bạn giao tiếp bằng Tiếng Việt sư phạm, mạch lạc, tôn trọng tư duy của học sinh.
Nhiệm vụ của bạn là hướng dẫn học sinh giải bài toán lập trình thi đấu, tuân thủ các nguyên tắc:
1. GỢI Ý SOCRATIC: Không đưa thẳng code hoàn chỉnh nếu học sinh đang xin gợi ý hoặc hỏi cách làm. Hãy gợi ý từng bước (ý tưởng quy hoạch động, tính chất đơn điệu, bất biến, cấu trúc dữ liệu phù hợp).
2. NẮNG NGHE LỖI SAI: Khi phân tích code bị WA/TLE/MLE, hãy chỉ ra các lỗi kinh điển:
   - Tràn số nguyên (Dùng int thay vì long long trong C++ khi giá trị vượt 2*10^9).
   - Độ phức tạp thời gian quá lớn (O(N^2) khi N = 10^5 dẫn đến TLE).
   - Lỗi biên (Edge cases: N=1, dãy rỗng, số âm, phần tử trùng nhau).
   - Chậm do I/O (Chưa tắt sync_with_stdio trong C++ hoặc chưa dùng sys.stdin trong Python).
3. ĐỊNH DẠNG: Trả về câu trả lời có cấu trúc rõ ràng với Markdown, làm nổi bật công thức toán học hoặc đoạn code nhỏ minh họa.`;

      let prompt = `BÀI TOÁN: ${problemTitle || 'Bài tập thuật toán'}
ĐỀ BÀI TÓM TẮT:
${problemStatement || 'Không có'}

NGÔN NGỮ: ${language || 'Python'}
MÃ NGUỒN CỦA HỌC SINH:
\`\`\`${language || 'python'}
${userCode || '// Chưa có mã nguồn'}
\`\`\`
`;

      if (testCaseInfo) {
        prompt += `\nTHÔNG TIN KIỂM THỬ: ${JSON.stringify(testCaseInfo)}\n`;
      }

      if (mode === 'HINT') {
        prompt += `\nYÊU CẦU: Học sinh đang cần GỢI Ý TƯ DUY. Hãy phân tích các ràng buộc đề bài, gợi ý mô hình thuật toán phù hợp (e.g. Tham lam, DP, Hai con trỏ, Binary search) mà KHÔNG cho code trọn vẹn.`;
      } else if (mode === 'DIAGNOSE') {
        prompt += `\nYÊU CẦU: Mã nguồn của học sinh bị lỗi hoặc chưa qua hết test. Hãy chỉ ra lỗi tư duy/cú pháp/biên, phân tích tại sao thuật toán thất bại trên một số trường hợp.`;
      } else if (mode === 'COUNTER_TEST') {
        prompt += `\nYÊU CẦU: Hãy tạo 1-3 bộ test case phản ví dụ (Input nhỏ) khiến code trên cho kết quả sai, kèm Output đúng của bài toán và Output mà code học sinh sẽ in ra.`;
      } else if (mode === 'CONVERT') {
        prompt += `\nYÊU CẦU: Chuyển đổi mã nguồn của học sinh giữa C++20 và Python 3, kèm các chú thích tối ưu tốc độ I/O và thư viện chuẩn phù hợp thi HSG.`;
      } else {
        prompt += `\nCÂU HỎI CỦA HỌC SINH: ${userQuestion || 'Hãy hướng dẫn em cách giải tối ưu bài này.'}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });

      return res.json({
        success: true,
        reply: response.text,
        source: 'gemini',
      });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to heuristic mentor:', err?.message);
    }
  }

  // Smart Heuristic Fallback when GEMINI_API_KEY is not configured or in offline preview
  let heuristicReply = '';
  const codeLower = (userCode || '').toLowerCase();

  if (mode === 'HINT') {
    heuristicReply = `### 💡 Gợi ý tư duy từ Huấn luyện viên (Socratic Hint):
1. **Phân tích ràng buộc kích thước (Constraints)**:
   - Xem kỹ giới hạn của $N$. Nếu $N \\le 10^5$, thuật toán tối ưu phải đạt độ phức tạp thời gian từ $\\mathcal{O}(N)$ đến $\\mathcal{O}(N \\log N)$. Thuật toán $\\mathcal{O}(N^2)$ hai vòng lặp lồng nhau sẽ chạy khoảng $10^{10}$ phép tính và chắc chắn nhận kết quả **Time Limit Exceeded (TLE)**.
2. **Tính chất bất biến hoặc đơn điệu**:
   - Nếu mảng đã được sắp xếp (hoặc có thể sắp xếp), hãy cân nhắc kỹ thuật **Hai con trỏ (Two Pointers)** hoặc **Tìm kiếm nhị phân (Binary Search)**.
   - Nếu bài toán yêu cầu tìm giá trị lớn nhất/nhỏ nhất thỏa mãn điều kiện, thử kiểm tra xem hàm kiểm tra $P(x)$ có tính chất đơn điệu để "Chặt nhị phân kết quả" hay không.
3. **Mô hình Quy hoạch động**:
   - Nếu bài toán tìm đường đi tối ưu hoặc bài toán cái túi, hãy xác định trạng thái $DP[i]$ là kết quả tốt nhất khi xét tới phần tử thứ $i$.`;
  } else if (mode === 'DIAGNOSE') {
    const issues: string[] = [];
    if (language === 'cpp' && !codeLower.includes('long long') && (codeLower.includes('sum') || codeLower.includes('ans') || codeLower.includes('*'))) {
      issues.push('⚠️ **Tràn số nguyên (Integer Overflow)**: Trong C++, kiểu `int` chỉ chứa tối đa xấp xỉ $2 \\times 10^9$. Nếu tổng mảng hoặc phép nhân vượt quá giới hạn này, hãy đổi biến tổng và mảng sang `long long`.');
    }
    if ((codeLower.includes('for ') && (codeLower.match(/for /g) || []).length >= 2) || (codeLower.includes('while ') && codeLower.includes('for '))) {
      issues.push('⚠️ **Độ phức tạp $\\mathcal{O}(N^2)$**: Phát hiện 2 vòng lặp lồng nhau. Nếu bài toán có $N > 2000$, code của bạn sẽ bị vượt quá thời gian 1.0 giây.');
    }
    if (language === 'cpp' && !codeLower.includes('ios_base::sync_with_stdio')) {
      issues.push('⚡ **Tối ưu nhập xuất C++**: Hãy bổ sung `ios_base::sync_with_stdio(false); cin.tie(NULL);` ở đầu hàm `main()` để tăng tốc độ đọc dữ liệu lớn.');
    }
    if (language === 'python' && codeLower.includes('input()') && !codeLower.includes('sys.stdin')) {
      issues.push('⚡ **Tối ưu nhập xuất Python**: Hàm `input()` chạy chậm trên bộ test $10^5$ dòng. Nên dùng `sys.stdin.read().split()` để đọc toàn bộ dữ liệu trong 1 lần.');
    }

    if (issues.length === 0) {
      issues.push('🔍 Hãy kiểm tra kỹ các trường hợp biên: $N = 1$, tất cả phần tử bằng nhau, hoặc mảng không có cặp nào thỏa mãn.');
    }

    heuristicReply = `### 🐛 Phân tích lỗi tiềm ẩn từ Huấn Luyện Viên:
${issues.join('\n\n')}

**Khuyến nghị thực hiện**:
- Thử kiểm tra biến với bộ test mẫu nhỏ nhất $N=1$ hoặc $N=2$.
- Dùng công cụ **Stress Test** ở tab bên cạnh để chạy đối chiếu với thuật toán trâu.`;
  } else if (mode === 'COUNTER_TEST') {
    heuristicReply = `### 🧪 Bộ Test Case Phản Ví Dụ (Counter-Test Cases):
Dưới đây là các trường hợp biên học sinh thường bỏ sót:

**Test 1: Giá trị phần tử âm hoặc 0**
\`\`\`text
3 0
-5 2 3
\`\`\`
*Mục đích*: Kiểm tra xem thuật toán có xử lý đúng khi tổng có số âm không.

**Test 2: Các phần tử trùng lặp nhau**
\`\`\`text
4 6
3 3 3 3
\`\`\`
*Mục đích*: Kiểm tra việc tránh đếm lặp một cặp hai lần hoặc bỏ sót các cặp bằng nhau.

**Test 3: Trực tiếp tràn số 32-bit (Test lớn)**
\`\`\`text
2 2000000000
1000000000 1000000000
\`\`\`
*Mục đích*: Phát hiện lỗi tràn biến \`int\` trong C++.`;
  } else if (mode === 'CONVERT') {
    heuristicReply = `### 🔄 Hướng dẫn chuyển đổi C++20 ⟷ Python 3:
1. **Đọc dữ liệu nhanh**:
   - Trong C++:
     \`\`\`cpp
     ios_base::sync_with_stdio(false);
     cin.tie(NULL);
     \`\`\`
   - Trong Python:
     \`\`\`python
     import sys
     input_data = sys.stdin.read().split()
     \`\`\`
2. **Cấu trúc dữ liệu tương đương**:
   - C++ \`vector<int>\` ↔ Python \`list\`
   - C++ \`map<int, int>\` (cây đỏ đen) ↔ Python \`dict\` (bảng băm)
   - C++ \`priority_queue<int>\` ↔ Python \`heapq\`
   - C++ \`lower_bound / upper_bound\` ↔ Python \`bisect.bisect_left / bisect_right\``;
  } else {
    heuristicReply = `Chào em! Huấn luyện viên sẵn sàng đồng hành cùng em. Em đang gặp khó khăn ở bước tư duy thuật toán, tối ưu độ phức tạp hay cần gợi ý giải quyết lỗi Wrong Answer? Hãy nhấn vào các nút gợi ý nhanh ở trên nhé!`;
  }

  return res.json({
    success: true,
    reply: heuristicReply,
    source: 'heuristic_coach',
  });
});

// Setup Vite middleware in dev or static server in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AlgoArena Vietnam Server running on port ${PORT}`);
  });
}

startServer();
