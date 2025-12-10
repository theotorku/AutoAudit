# AutoAudit

**Tax-Smart Expense Tracking for Self-Employed Professionals**

AutoAudit is a mobile-first expense tracking application that helps freelancers, contractors, and small business owners maximize their tax deductions by automatically categorizing expenses and calculating deductible amounts.

## ✨ Features

### 🔐 Authentication & Security
- Secure email/password authentication via Supabase
- Row-level security ensuring users only see their own data
- Protected routes and session management

### 📊 Expense Management
- Real-time expense tracking with cloud sync
- Automatic deductible amount calculation
- Category-based organization (Office Supplies, Meals & Entertainment, Travel, etc.)
- Live updates across devices

### 📸 Receipt Scanning
- Camera integration via Capacitor
- OCR text extraction (coming soon with Tesseract.js)
- Receipt image storage in Supabase Storage

### 📈 Tax Insights
- Deductible vs. non-deductible expense breakdown
- Real-time tax savings overview
- IRS-compliant categorization
- Tax rule updates and alerts

### 📱 Mobile-Ready
- Built with Capacitor for iOS and Android
- Responsive design optimized for mobile
- Offline-capable (coming soon)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast builds
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- Lucide React for icons

**Backend:**
- Supabase (PostgreSQL database)
- Supabase Auth for authentication
- Supabase Storage for receipt images
- Row Level Security (RLS) policies

**Mobile:**
- Capacitor for iOS/Android deployment
- Camera API for receipt scanning

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AutoAudit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   Follow the detailed [Supabase Setup Guide](./supabase_setup_guide.md) to:
   - Create a Supabase project
   - Run the database schema
   - Configure environment variables

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 📱 Mobile Development

### Build for Android/iOS

```bash
npm run build
npx cap sync
npx cap open android  # or ios
```

## 🗂️ Project Structure

```
AutoAudit/
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.tsx
│   │   ├── ReceiptScanner.tsx
│   │   ├── TaxAlerts.tsx
│   │   └── ui/           # shadcn/ui components
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── services/         # Business logic
│   │   └── database.service.ts
│   ├── lib/             # Utilities
│   │   └── supabase.ts  # Supabase client
│   ├── pages/           # Route pages
│   │   ├── index.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   └── App.tsx          # Root component
├── supabase-schema.sql  # Database schema
└── .env.example         # Environment template
```

## 🔒 Security

- All data is protected by Supabase Row Level Security (RLS)
- Users can only access their own expenses
- Authentication tokens stored securely
- Receipt images stored in private buckets

## 🚧 Roadmap

- [x] Supabase authentication
- [x] Real-time expense tracking
- [x] Database integration with RLS
- [ ] Real OCR with Tesseract.js
- [ ] CSV/PDF export functionality
- [ ] Settings page (category management)
- [ ] Reports page (date filtering, charts)
- [ ] Offline support
- [ ] Multi-currency support

## 📄 License

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
