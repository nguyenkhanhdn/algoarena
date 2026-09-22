# AlgoArena Vietnam 🚀
**Hệ thống Luyện thi Học sinh Giỏi Tin học & Tin học Trẻ Bảng B cho học sinh THCS/THPT Việt Nam**

Chào mừng bạn đến với **AlgoArena Vietnam**! Ứng dụng được thiết kế chuyên biệt theo chuẩn kỳ thi HSG Tin học cấp Huyện/Tỉnh/Quốc Gia và Tin học Trẻ (Bảng B), kết hợp giữa học tập trực quan (Algorithm Visualizer), giải bài tập thực chiến (Code Editor & Online Judge), và thi đấu xếp hạng (Contest & Leaderboard).

---

## ⚡ Tính năng nổi bật trong Phase 1 (MVP)

1. **Dashboard Huấn luyện viên cá nhân ("Hôm nay em nên học gì?")**:
   - Tự động phân tích điểm yếu (Weak Topics) và đề xuất bài học/bài tập phù hợp.
   - Thống kê chuỗi ngày học tập (Learning Streak), tỉ lệ hoàn thành và huy hiệu đạt được.

2. **Lộ trình học tập chuẩn 7 bước (7 Learning Paths)**:
   - Từ Nền tảng lập trình → Thuật toán cơ bản → Cấu trúc dữ liệu → Đồ thị → Quy hoạch động → Thuật toán nâng cao → Luyện đề thi HSG & Tin học trẻ.
   - Bài học theo cấu trúc sư phạm 5 bước: *Hiểu trực quan → Cài đặt → Áp dụng → Kết hợp → Chinh phục kỳ thi*.
   - Kèm theo phân tích độ phức tạp thời gian/không gian, **lỗi tràn số/TLE thường gặp** và **tips thi đấu thực chiến**.

3. **Phòng thí nghiệm Trực quan hóa Thuật toán (Algorithm Visualizer Lab)**:
   - Mô phỏng tương tác: Tìm kiếm nhị phân (Binary Search), Hai con trỏ (Two Pointers), Sắp xếp (Bubble/Merge/Quick Sort), BFS trên lưới/đồ thị, Mảng cộng dồn (Prefix Sum), Ngăn xếp (Stack).
   - Đầy đủ nút: Play, Pause, Step Forward, Step Backward, Speed Control, giải thích từng bước và highlight pseudocode.

4. **Hệ thống Bài tập & Online Judge (Problem & Judge System)**:
   - Hơn 40 bài tập chuẩn phân loại theo rating (800 đến 2000) và độ khó (Beginner, Easy, Medium, Hard).
   - Giao diện giải bài chuyên nghiệp (Split View): Đề bài format LaTeX, Code Editor với highlight cú pháp Python và C++, phím tắt, tải code mẫu, chạy thử test ví dụ.
   - Judge Sandbox giả lập chấm từng test case (Subtask scoring), phát hiện AC, WA, TLE, MLE, hiển thị chi tiết thời gian chạy và bộ nhớ.

5. **Kỳ thi thử trực tuyến (Contest & Live Scoreboard)**:
   - Thi thử đề HSG Tỉnh và Tin học trẻ có đếm ngược thời gian, nộp bài tính điểm và bảng xếp hạng (Penalty theo phút).

6. **Quản lý Dấu trang & Ghi chú cá nhân (Bookmarks & Notes)**:
   - Lưu lại bài học khó, bài tập hay hoặc trick thuật toán cần nhớ trước ngày thi.

7. **Bảng điều khiển Giáo viên & CMS (Teacher Dashboard)**:
   - Theo dõi tiến độ giải bài của học sinh trong đội tuyển, phát hiện học sinh yếu chủ đề nào để bồi dưỡng.
   - Thêm bài tập, quản lý contest và ngân hàng đề thi.

8. **Bộ chuyển đổi vai trò (Role Switcher)**:
   - Chuyển đổi nhanh 1-click giữa Học sinh (Student), Giáo viên (Teacher) và Quản trị viên (Admin) để trải nghiệm trọn vẹn mọi phân quyền.

---

## 🛠️ Hướng dẫn cài đặt & Chạy ứng dụng (Setup Instructions)

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Development):
```bash
npm run dev
```
Ứng dụng sẽ chạy tại cổng `http://localhost:3000`.

### 3. Kiểm tra mã nguồn (Type-check & Lint):
```bash
npm run lint
```

### 4. Build sản phẩm (Production Build):
```bash
npm run build
```

---

## 🗄️ Cấu trúc thư mục

```
/
├── docs/
│   └── ARCHITECTURE.md       # Tài liệu phân tích yêu cầu & database schema
├── src/
│   ├── types/                # Định nghĩa kiểu dữ liệu TypeScript
│   ├── data/                 # Dữ liệu mẫu (Topics, Lessons, Problems, Contests)
│   ├── services/
│   │   ├── storageService.ts # Mock database & local persistence layer
│   │   └── judgeService.ts   # Online Judge abstraction & execution sandbox
│   ├── components/
│   │   ├── layout/           # Header, Sidebar, Role Switcher
│   │   ├── dashboard/        # "Hôm nay em nên học gì?", Stats, Streaks
│   │   ├── learning/         # Learning paths & lesson viewer
│   │   ├── visualizer/       # Interactive Algorithm Visualizer Lab
│   │   ├── problems/         # Problem bank & Split-view code workspace
│   │   ├── contests/         # Contest arena & Live scoreboard
│   │   ├── bookmarks/        # Bookmark manager with personal notes
│   │   ├── profile/          # Student profile, statistics & badges
│   │   └── teacher/          # Teacher CMS & student monitoring
│   ├── App.tsx               # Main routing & application state provider
│   ├── main.tsx
│   └── index.css             # Tailwind CSS & theme tokens
```
