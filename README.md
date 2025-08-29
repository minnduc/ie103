# ♻️ EcoWaste - Intelligent Waste Management System

<p align="center">
  <img src="https://img.shields.io/badge/EcoWaste-Next.js%2015%20%7C%20TypeScript-00B894?style=for-the-badge&logo=recycling&logoColor=white" alt="EcoWaste Banner">
</p>

<p align="center">
  <em>🌱 Building a sustainable future through smart waste management</em><br>
  <strong>Next.js 15 • TypeScript • PostgreSQL • AI Computer Vision</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/minnduc/ie103?style=flat-square&color=00B894" alt="License">
  <img src="https://img.shields.io/github/stars/minnduc/ie103?style=flat-square&color=FFD93D" alt="Stars">
  <img src="https://img.shields.io/github/forks/minnduc/ie103?style=flat-square&color=6BCF7F" alt="Forks">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
</p>

---

## 🚀 Overview

**EcoWaste** is a comprehensive waste management platform that leverages artificial intelligence to revolutionize how we handle waste disposal. Our mission is to create a cleaner, more sustainable world by making waste sorting intelligent, pickup scheduling seamless, and environmental impact tracking transparent.

### 🎯 Mission Statement
*"Empowering communities to reduce their environmental footprint through intelligent waste management and data-driven insights."*

---

## ✨ Key Features

### 🤖 **AI-Powered Waste Classification**
- **Smart Recognition**: Instantly identify 8+ waste categories using computer vision
- **Real-time Analysis**: Upload photos for immediate waste type classification
- **Accuracy Optimization**: Continuously improving AI models for better sorting

### 📅 **Intelligent Pickup Scheduling**
- **Dynamic Scheduling**: Book waste collection with flexible time slots
- **Route Optimization**: Efficient pickup routes for reduced carbon footprint  
- **Real-time Tracking**: Monitor pickup status from request to completion
- **Location Management**: GPS-integrated address system

### 👥 **Role-Based Dashboards**
- **Admin Portal**: Complete system oversight and analytics
- **Staff Interface**: Pickup management and route optimization
- **User Dashboard**: Personal waste tracking and scheduling

---

## 🏗️ Technology Stack

| **Layer** | **Technology** | **Purpose** |
|-----------|----------------|-------------|
| **Frontend** | Next.js 15, React 18 | Server-side rendering, optimal performance |
| **Styling** | Tailwind CSS, Shadcn/ui | Utility-first CSS, beautiful components |
| **Backend** | Next.js API Routes | Full-stack TypeScript development |
| **Database** | PostgreSQL + Drizzle ORM | Type-safe queries, seamless migrations |
| **Authentication** | JWT + RBAC | Secure user management & role permissions |
| **AI/ML** | Computer Vision API | Intelligent waste classification |
| **UI Components** | Radix UI, Lucide Icons | Accessible, modern interface elements |
| **Development** | TypeScript, ESLint, Prettier | Type safety, code quality, consistency |

---

## 🗂️ Project Structure

```
ie103/
├── 📁 public/                    # Static assets & images
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── 📁 ai/               # AI classification pages
│   │   ├── 📁 dashboard/        # Role-based dashboards
│   │   │   ├── 📁 admin/        # Administrator interface
│   │   │   ├── 📁 staff/        # Staff management portal
│   │   │   └── 📁 user/         # User dashboard
│   │   ├── 📁 home/             # Landing pages
│   │   ├── 📁 pickup/           # Scheduling system
│   │   └── 📁 waste-types/      # Waste information
│   ├── 📁 components/           # Reusable UI components
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utilities & configurations
│   │   └── 📁 db/               # Database schemas & migrations
│   └── 📁 styles/               # Global styles & themes
├── 🔧 .env.example              # Environment variables template
├── ⚙️ next.config.js            # Next.js configuration
├── 📦 package.json              # Dependencies & scripts
└── 📚 README.md                 # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18.0+ 
- **npm** / **yarn** / **pnpm**
- **PostgreSQL** 14+

### 1️⃣ Clone Repository
```bash
git clone https://github.com/minnduc/ie103.git
cd ie103
```

### 2️⃣ Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3️⃣ Environment Setup
```bash
# Copy environment template
cp .env.example .env.local
```

Configure your `.env.local`:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ecowaste

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# AI Service (Optional)
AI_API_KEY=your-computer-vision-api-key
AI_API_URL=https://your-ai-service.com/api

# Email Service (Optional)
SMTP_HOST=your-smtp-host
SMTP_USER=your-email
SMTP_PASS=your-password
```

### 4️⃣ Database Setup
```bash
# Run database migrations
pnpm db:migrate

# Seed initial data (optional)
pnpm db:seed
```

### 5️⃣ Start Development Server
```bash
pnpm dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000) in your browser!**

---

## 📦 Production Deployment

### Build for Production
```bash
pnpm build
pnpm start
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Docker Deployment
```bash
docker build -t ecowaste .
docker run -p 3000:3000 ecowaste
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Computer Vision APIs** for intelligent waste classification
- **Open Source Community** for amazing tools and libraries
- **Environmental Organizations** for inspiration and guidance

---

<p align="center">
  <strong>🌍 "Together, let's build a greener planet, one smart decision at a time!" 🌱</strong>
</p>

<p align="center">
  <a href="https://github.com/minnduc/ie103">⭐ Star this repo</a> •
  <a href="https://github.com/minnduc/ie103/issues">🐛 Report Bug</a> •
  <a href="https://github.com/minnduc/ie103/issues">💡 Request Feature</a>
</p>

---

*Made with ❤️ for a sustainable future*
