# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```



# KABA Meridian - One-Stop Industrial Procurement Partner

![KABA Meridian Logo](./public/KABA.svg)

## Overview

KABA Meridian is a professional website for an industrial procurement company based in Ghana. The website showcases the company's products, services, and industries served, providing a modern and responsive user experience.

## Features

- 🎥 **Dynamic Hero Section** - Video background with animated elements
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean design with smooth animations
- 📄 **Comprehensive Pages** - Home, About, Products, Industries, Contact
- 🎯 **Interactive Elements** - Hover effects, animations, and transitions
- 🎬 **Video Backgrounds** - Engaging video backgrounds in hero and CTA sections

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Vite 8** - Build Tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Icons** - Additional Icons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/kaba-meridian.git
cd kaba-meridian
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Build for production:

bash
npm run build
Project Structure
text
kaba-meridian/
├── public/
│   ├── KABA.svg          # Logo
│   ├── KB-About.jpg      # About background image
│   ├── herovid.mp4       # Hero video background
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layouts/      # Layout components
│   │   ├── routes/       # Page components
│   │   └── App.tsx       # Main app component
│   ├── components/
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── styles/
│   │   └── globals.css   # Global styles
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── types/            # TypeScript types
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
Color Palette
Primary: #05383f (Dark Teal/Green)

Secondary: #0f172a (Dark Blue)

Accent: #0ea5e9 (Sky Blue)

Pages
Home - Hero section, about preview, products, industries, why choose us, mission/vision, CTA

About - Company information, values

Products - Product categories and details

Industries - Industries served

Contact - Contact form and information

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

License
This project is proprietary and confidential.

Contact
Email: kabameridian@gmail.com

Phone: +233 20 123 4567

Location: Accra, Ghana

Built with ❤️ by the KABA Meridian Team

text

## Step 4: Push to GitHub

### Option A: Push to a New Repository

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: KABA Meridian website"

# Add remote repository (replace with your actual repo URL)
git remote add origin https://github.com/your-username/kaba-meridian.git

# Push to GitHub
git push -u origin main
Option B: If you have an existing repository
bash
# Add all files
git add .

# Commit changes
git commit -m "Update: KABA Meridian website with video backgrounds"

# Push to GitHub
git push origin main
Option C: If you need to use a different branch
bash
# Create and switch to a new branch
git checkout -b main

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: KABA Meridian website"

# Add remote repository
git remote add origin https://github.com/your-username/kaba-meridian.git

# Push to GitHub
git push -u origin main
Step 5: Create GitHub Repository via Command Line
If you haven't created the repository on GitHub yet, you can use the GitHub CLI:

bash
# Install GitHub CLI (if not installed)
brew install gh  # macOS
# or
winget install --id GitHub.cli  # Windows

# Authenticate
gh auth login

# Create repository
gh repo create kaba-meridian --public --source=. --remote=origin --push
Step 6: Verify Your Push
Go to https://github.com/your-username/kaba-meridian

Check that all files are uploaded

Verify the README renders correctly

Check the project structure

Step 7: Add a License (Optional)
Create a LICENSE file if you want to open-source your project:

bash
# MIT License
echo "MIT License" > LICENSE
Common Git Commands Cheat Sheet
bash
# Check status
git status

# View changes
git diff

# Add specific files
git add src/components/home/Hero.tsx

# Add all files
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# View branches
git branch

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout branch-name

# Merge branch
git merge feature-name
# KABA-Meridian
