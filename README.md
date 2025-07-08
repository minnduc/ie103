<!-- Banner --> <p align="center"> <img src="https://img.shields.io/badge/EcoWaste-Next.js%2015%20%7C%20TypeScript-00B894?style=for-the-badge&logo=recycling&logoColor=white" alt="EcoWaste Banner"> </p> <h1 align="center">♻️ EcoWaste – Hệ Thống Quản Lý Chất Thải Thông Minh</h1> <p align="center"> <em>Next.js 15 - TypeScript - PostgreSQL - AI Computer Vision</em><br> <img src="https://img.shields.io/github/license/minnduc/ie103?style=flat-square" alt="License"> <img src="https://img.shields.io/github/stars/minnduc/ie103?style=flat-square" alt="Stars"> <img src="https://img.shields.io/github/forks/minnduc/ie103?style=flat-square" alt="Forks"> </p>
🚀 Giới Thiệu
EcoWaste là nền tảng quản lý chất thải toàn diện, sử dụng AI để phân loại, đặt lịch thu gom và theo dõi tác động môi trường. Hướng đến mục tiêu phát triển bền vững và nâng cao ý thức bảo vệ hành tinh.

✨ Tính Năng Nổi Bật
AI Phân Loại Thông Minh: Nhận diện 8 loại chất thải qua ảnh.

Đặt Lịch Thu Gom: Lên lịch, quản lý địa điểm và theo dõi trạng thái đơn hàng.

Dashboard Theo Vai Trò: Giao diện riêng cho Admin, Staff và User.

Thống Kê Tác Động: Hiển thị lượng chất thải tái chế và CO₂ tiết kiệm.

🏗️ Stack Công Nghệ  
| Layer       | Công Cụ                            | Ghi Chú                        |
|-------------|------------------------------------|--------------------------------|
| Frontend    | Next.js 15, Tailwind CSS           | SSR/SSG, utility-first CSS     |
| Backend     | Next.js API Routes, TypeScript     | Type-safe, developer friendly  |
| Database    | PostgreSQL + Drizzle ORM           | Type-safe queries, migrations  |
| Authentication | JWT, RBAC                       | Bảo mật & phân quyền           |
| UI Kit      | Shadcn/ui, Radix UI, Lucide        | Components & icons     

🗂️ Cấu Trúc Thư Mục
ie103/  
├── public/  
│ └── ...  
├── src/  
│ ├── app/  
│ │ ├── ai/  
│ │ ├── dashboard/  
│ │ │ ├── admin/  
│ │ │ ├── staff/  
│ │ │ └── user/  
│ │ ├── home/  
│ │ ├── pickup/  
│ │ └── waste-types/  
│ ├── components/  
│ ├── hooks/  
│ ├── lib/  
│ │ └── db/  
│ └── styles/  
├── .env.example  
├── next.config.js  
├── package.json  
└── README.md  

⚙️ Cài Đặt & Chạy
1. Clone repository  
git clone https://github.com/minnduc/ie103.git  
cd ie103  

3. Cài đặt dependencies  
pnpm install  
hoặc npm install  
hoặc yarn install  

5. Cấu hình biến môi trường  
   Sao chép file mẫu và chỉnh sửa:  
     cp .env.example .env.local  
   Trong .env.local, cập nhật:  
     DATABASE_URL=postgresql://<username>:<password>@localhost:5432/ecowaste  

7. Khởi động development   
   pnpm dev  
   hoặc npm run dev  
   hoặc yarn dev  
   Mở trình duyệt tại http://localhost:3000.  

📦 Build & Triển khai  
pnpm build  
pnpm start  
Hoặc sử dụng nền tảng hosting (Vercel, Netlify) với thiết lập tương tự.  

📜 Giấy Phép  
Dự án phục vụ mục đích học tập. Xem chi tiết trong LICENSE.  

<p align="center"><em>“Hãy cùng nhau hành động vì một hành tinh xanh hơn!”</em> 🌱</p>
