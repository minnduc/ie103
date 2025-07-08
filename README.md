# 🚀 IE103 – Modern AI-Powered Web App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-TypeSafe-green)](https://orm.drizzle.team/)

> ✨ A modern Next.js application using AI, beautiful UI with Tailwind CSS, Drizzle ORM, and interactive features.

---

## 📚 Table of Contents

- [📌 Overview](#-overview)
- [🎯 Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🛢️ Database & ORM](#️-database--orm)
- [📜 Scripts](#-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 📌 Overview

IE103 is a feature-rich web application built with modern technologies. It integrates OpenAI services for dynamic AI interactions, supports drag & drop UI, theme switching, charts, secure authentication, and type-safe ORM.

---

## 🎯 Features

- 🤖 **OpenAI Integration** – Chat, content generation, and autocomplete
- 🧩 **Drag & Drop** – Powered by `@dnd-kit`
- 💡 **Dark / Light Mode** – via `next-themes`
- 📊 **Data Visualization** – with Recharts
- 🧪 **Form Validation** – Schema-safe using Zod
- 🔔 **Toast Notifications** – Using Sonner
- 🎨 **Modern UI** – Powered by Radix UI & TailwindCSS

---

## 🧰 Tech Stack

| Type              | Tools                                                                 |
|-------------------|------------------------------------------------------------------------|
| 🔧 Framework      | [Next.js](https://nextjs.org/) + App Router                           |
| 🖋️ Language       | TypeScript                                                             |
| 🎨 UI Toolkit     | TailwindCSS, Radix UI, Lucide Icons, Tabler Icons                      |
| 🎭 Theming        | `next-themes`, `vaul`                                                  |
| 📦 Drag & Drop    | `@dnd-kit`                                                             |
| 📊 Charts         | Recharts                                                               |
| ✅ Validation     | Zod                                                                    |
| 🛢️ ORM            | Drizzle ORM + PostgreSQL                                               |
| 🔐 Auth/Security  | bcrypt, jose                                                           |
| 🤖 AI SDK         | `@ai-sdk/openai`, `@ai-sdk/react`, `openai`                            |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js `>=18`
- PostgreSQL installed
- Bun, Yarn, or npm

### 📥 Installation

```bash
git clone https://github.com/minnduc/ie103.git
cd ie103
npm install    # or yarn install / bun install
