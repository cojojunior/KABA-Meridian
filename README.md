# KABA Meridian - One-Stop Industrial Procurement Partner

![KABA Meridian Logo](public/KABA.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/kbmeridian/deploys)
[![React Version](https://img.shields.io/badge/React-19.2.8-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646cff.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ecf8e.svg)](https://supabase.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00c7b7.svg)](https://netlify.com/)

## 📋 Overview

KABA Meridian is a modern, responsive web application for an industrial procurement company based in Ghana. The platform serves as a comprehensive digital storefront showcasing the company's products, services, and industries served, establishing them as a trusted one-stop industrial procurement partner.

**Live Demo**: [https://kbmeridian.netlify.app](https://kbmeridian.netlify.app)

## ✨ Features

### 🏠 Public Website
- **Dynamic Hero Section**: Video background with cinematic effects and animations
- **About Preview**: Company introduction with feature cards
- **Products Showcase**: 6 product categories with images and descriptions
- **Industries Served**: 6 industry sectors with visual cards
- **Why Choose Us**: 6 key benefits with icons
- **Mission & Vision**: Company mission, vision, and commitment
- **CTA Section**: Call-to-action with video background
- **Contact Page**: Form with Supabase integration and email forwarding

### 🔐 Admin Panel
- **Secure Authentication**: Email/password login with Supabase Auth
- **Dashboard**: Message statistics and recent messages preview
- **Message Management**: View, search, filter, and delete messages
- **Status Tracking**: Unread, Read, Replied status indicators
- **Reply via Email**: Quick reply to messages
- **Protected Routes**: Admin-only access

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.8 | UI Framework |
| TypeScript | 6.0.3 | Type Safety |
| Tailwind CSS | 4.3.3 | Styling |
| Vite | 8.2.0 | Build Tool |
| Framer Motion | Latest | Animations |
| Lucide React | Latest | Icons |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| Supabase | Database & Authentication |
| Supabase Auth | Admin Authentication |
| Supabase RLS | Row Level Security |

### Hosting & Deployment
| Service | Purpose |
|---------|---------|
| Netlify | Hosting & CI/CD |
| Netlify Functions | Serverless Functions |

## 📁 Project Structure
kaba-meridian/
├── public/
│ ├── _redirects # Netlify redirects
│ ├── KABA.svg # Company logo
│ ├── KB-About.jpg # About section background
│ ├── herovid.mp4 # Hero video background
│ └── *.jpg # Product and industry images
├── src/
│ ├── app/
│ │ ├── layouts/
│ │ │ └── MainLayout.tsx
│ │ ├── routes/
│ │ │ ├── public/
│ │ │ │ ├── Home.tsx
│ │ │ │ ├── About.tsx
│ │ │ │ ├── Products.tsx
│ │ │ │ ├── Industries.tsx
│ │ │ │ ├── Contact.tsx
│ │ │ │ └── NotFound.tsx
│ │ │ └── admin/
│ │ │ ├── AdminLogin.tsx
│ │ │ ├── AdminDashboard.tsx
│ │ │ └── AdminMessages.tsx
│ │ └── App.tsx
│ ├── components/
│ │ ├── admin/
│ │ │ └── ProtectedRoute.tsx
│ │ ├── home/
│ │ │ ├── Hero.tsx
│ │ │ ├── AboutPreview.tsx
│ │ │ ├── ProductsSection.tsx
│ │ │ ├── IndustriesSection.tsx
│ │ │ ├── WhyChooseUs.tsx
│ │ │ ├── MissionVision.tsx
│ │ │ └── CTASection.tsx
│ │ ├── layout/
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── ScrollToTop.tsx
│ │ └── ui/
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ ├── Container.tsx
│ │ └── Section.tsx
│ ├── lib/
│ │ ├── supabase.ts
│ │ └── utils.ts
│ ├── styles/
│ │ └── globals.css
│ ├── types/
│ │ └── index.ts
│ ├── main.tsx
│ └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── .env.example

text

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account (for database)
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kaba-meridian.git
   cd kaba-meridian
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env
Edit .env and add your Supabase credentials:


## env
-  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  VITE_APP_NAME=KABA Meridian
  VITE_APP_EMAIL=kabameridian@gmail.com
  VITE_APP_PHONE=+233 20 123 4567
  VITE_APP_ADDRESS=Accra, Ghana
  Set up Supabase

-  Create a Supabase project
  Create the messages table using the SQL in supabase/schema.sql
  Enable Email authentication
  Configure RLS policies

Start development server

bash
npm run dev
The app will be available at http://localhost:5173

Build for production

bash
npm run build
🗄️ Database Schema
Messages Table
## sql {
- CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
}


-  RLS Policies
  sql
  -- Allow public to insert messages
  CREATE POLICY "Allow public to insert messages" ON messages
    FOR INSERT TO public WITH CHECK (true);

  -- Allow authenticated users to view messages
  CREATE POLICY "Allow authenticated users to view messages" ON messages
    FOR SELECT TO authenticated USING (true);
    



-  -- Allow authenticated users to update messages
  CREATE POLICY "Allow authenticated users to update messages" ON messages
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  🎨 Design System
  Color Palette
  Name	Hex Code	Usage
  Brand Primary	#05383f	Buttons, headings, accents
  Brand Dark	#062c32	Hover states, dark backgrounds
  Brand Light	#0a4a52	Gradients, secondary elements
  Secondary	#0f172a	Dark backgrounds, footer
  White	#ffffff	Text, cards, backgrounds
  Typography
  Primary Font: Inter (Google Fonts)

Special Font: Monotype Corsiva Italic (for "Meridian" and "Ghana")

-  `📱 Responsive Breakpoints
  Breakpoint	Width	Layout
  Mobile	< 640px	Single column
  Tablet	640px - 1024px	2-column grid
  Desktop	> 1024px	Full 3-column grid
  🚢 Deployment
  Netlify Deployment
  Connect to Netlify

  Log in to Netlify

  Click "Add new site" → "Import an existing project"

  Connect your GitHub repository

  Configure build settings

  Build command: npm run build

  Publish directory: dist

  Set environment variables

  Add all variables from .env

  Deploy`

Netlify will automatically deploy on push to main branch

Manual Deployment
bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
🔧 Available Scripts
Script	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint
npm run deploy	Deploy to Netlify
🧪 Testing
bash
# Run tests (coming soon)
npm run test

# Run tests with coverage
npm run test:coverage
🤝 Contributing
Fork the repository

Create your feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

📄 License
This project is proprietary and confidential. All rights reserved.

🙏 Acknowledgments
React - UI Framework

Tailwind CSS - Styling

Supabase - Database & Authentication

Netlify - Hosting

Framer Motion - Animations

Lucide - Icons

📞 Contact
Email: kabameridian@gmail.com

Phone: +233 20 123 4567

Website: https://kbmeridian.netlify.app

Location: Accra, Ghana

```````