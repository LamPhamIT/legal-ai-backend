Legal AI Automation System (n8n + Backend)
Giới thiệu

Dự án Legal AI Automation System là một hệ thống tự động hóa nghiệp vụ pháp lý cho doanh nghiệp, sử dụng n8n làm engine tự động hóa, kết hợp với AI và Backend (Node.js + Prisma).

Hệ thống giúp:

Theo dõi luật mới

Soạn thảo hợp đồng có kiểm soát rủi ro

Nhắc nhở nghĩa vụ pháp lý sau khi ký hợp đồng
Kiến trúc tổng thể:
n8n: xử lý AI, workflow, tự động hóa
Backend: validate dữ liệu, lưu database, quản lý trạng thái
Database: lưu luật, hợp đồng, nhiệm vụ tuân thủ
Các Workflow chính
- Workflow 1: AI Regulatory Scout

Mục tiêu: Tự động thu thập và phân tích các văn bản pháp luật mới.

Luồng hoạt động:

n8n chạy định kỳ hoặc theo RSS

Crawl / lấy dữ liệu từ các trang công báo

AI tóm tắt nội dung luật:

Luật nói về gì?

Ai chịu ảnh hưởng?

Thay đổi quan trọng

n8n gọi API backend để lưu luật vào database

Giá trị:
Doanh nghiệp luôn được cập nhật luật mới nhất.

- Workflow 2: AI Contract Architect

Mục tiêu: Soạn thảo hợp đồng và đánh giá rủi ro dựa trên luật mới nhất.

Luồng hoạt động:

Người dùng click “Tạo hợp đồng” trên frontend

Frontend gọi Webhook của n8n

n8n:

Lấy luật mới nhất từ backend

Dùng AI soạn hợp đồng

Chấm điểm rủi ro pháp lý

n8n gửi hợp đồng đã xử lý về backend qua API

Backend:

Validate dữ liệu

Lưu hợp đồng (status = DRAFT)

Frontend hiển thị:

Nội dung hợp đồng

Điểm rủi ro để người dùng quyết định ký hay không

Lưu ý:
Backend không xử lý AI, toàn bộ AI nằm trong n8n.
- Workflow 3: AI Compliance Guardian

Mục tiêu: Nhắc nhở nghĩa vụ pháp lý sau khi hợp đồng được ký.

Luồng hoạt động:

Người dùng ký hợp đồng

Frontend gọi API cập nhật trạng thái hợp đồng

Backend cập nhật trạng thái SIGNED

Backend trigger Webhook n8n Workflow 3

n8n:

AI phân tích hợp đồng

Xác định nghĩa vụ pháp lý (thuế, báo cáo, kê khai…)

Tạo checklist công việc

Gửi thông báo (Telegram / Dashboard)
