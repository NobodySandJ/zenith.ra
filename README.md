# 🌟 Zenith.ra - Premium Streetwear E-Commerce

A modern, futuristic e-commerce website for the **Zenith.ra** t-shirt brand, featuring a Dr. Doom collaboration theme with neon green accents.

![Zenith.ra](https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200)

## ✨ Features

### 🛍️ E-Commerce
- Product catalog with filtering and sorting
- Product detail pages with size/color selection
- Shopping cart with quantity management
- Featured products showcase
- Category-based navigation

### 🎨 Design
- Dark theme with neon green (#39ff14) accents
- Modern, futuristic, elegant design
- Three.js animated hero section with particles
- AOS.js scroll animations
- Framer Motion page transitions
- Fully responsive design (mobile-stable)
- Custom hover effects and interactions

### 🌐 Internationalization
- Bilingual support: English & Indonesian
- Easy language switcher in navbar
- All content translatable via CMS

### 🔐 Admin Panel
- Secure admin authentication
- Dashboard with sales statistics
- Chart.js visualizations (weekly/monthly/yearly)
- Products management (CRUD)
- Categories management
- Banners/Hero images management
- CMS pages editor
- Site settings (theme, contact, social, SEO)

### 📊 Analytics
- Sales overview charts
- Orders statistics
- Top products tracking
- Category distribution
- Recent activity feed

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom theme
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Animations**: Framer Motion + AOS.js
- **Charts**: Chart.js + react-chartjs-2
- **State Management**: React Context API
- **Routing**: React Router v6
- **i18n**: i18next + react-i18next
- **Icons**: React Icons (Heroicons + Font Awesome)
- **Notifications**: React Hot Toast
- **Backend**: Supabase (PostgreSQL)

## 📁 Project Structure

```
zenith.ra/
├── database/
│   └── schema.sql         # Supabase database schema
├── public/
├── src/
│   ├── components/
│   │   ├── auth/          # Protected route component
│   │   ├── cart/          # Cart sidebar
│   │   ├── common/        # Navbar, Footer, Loading
│   │   ├── products/      # Product cards
│   │   └── three/         # Three.js scenes
│   ├── context/
│   │   ├── AuthContext    # Authentication state
│   │   ├── CartContext    # Shopping cart state
│   │   └── ThemeContext   # Site settings/theme
│   ├── layouts/
│   │   ├── AdminLayout    # Admin panel layout
│   │   └── PublicLayout   # Public site layout
│   ├── locales/
│   │   ├── en.json        # English translations
│   │   ├── id.json        # Indonesian translations
│   │   └── i18n.js        # i18n configuration
│   ├── pages/
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── Dashboard  # Stats & charts
│   │   │   ├── Products   # Product management
│   │   │   ├── Categories # Category management
│   │   │   ├── Banners    # Banner management
│   │   │   ├── Pages      # CMS pages
│   │   │   └── Settings   # Site settings
│   │   └── public/        # Public pages
│   │       ├── Home       # Landing page
│   │       ├── Products   # Product listing
│   │       ├── ProductDetail
│   │       ├── About
│   │       ├── Contact
│   │       ├── FAQ
│   │       └── Cart
│   ├── services/
│   │   ├── api.js         # API service functions
│   │   └── supabase.js    # Supabase client
│   ├── styles/
│   │   └── index.css      # Global styles
│   ├── App.jsx            # Main app with routes
│   └── main.jsx           # Entry point
├── .env.example           # Environment template
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zenith.ra.git
   cd zenith.ra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the contents of `database/schema.sql`
   - Get your project URL and anon key from Settings > API

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

### Admin Access

Default admin credentials:
- **Email**: zenith@ra.com
- **Password**: jayajayajaya

Access the admin panel at `/admin/login`

## 📜 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` or use the Admin Settings panel to customize:

```javascript
colors: {
  primary: {
    500: '#39ff14',  // Neon green
    // ...
  },
  dark: {
    950: '#0a0a0a',  // Background
    // ...
  }
}
```

### Translations

Add/edit translations in `src/locales/en.json` and `src/locales/id.json`

### Three.js Scene

Customize the hero animation in `src/components/three/HeroScene.jsx`:
- Particle count and colors
- Floating shapes
- Animation speeds

## 📦 Database Schema

The Supabase schema includes:

- **admin_users** - Admin authentication
- **products** - Product catalog
- **categories** - Product categories
- **product_images** - Product galleries
- **product_sizes** - Available sizes
- **product_colors** - Available colors
- **banners** - Hero/promo banners
- **pages** - CMS content pages
- **faqs** - FAQ entries
- **testimonials** - Customer reviews
- **site_settings** - Global settings
- **contact_messages** - Contact form submissions
- **sales_statistics** - Daily sales data

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin-only write access to CMS tables
- Public read access for product catalog
- Secure authentication via Supabase Auth

## 📱 Responsive Design

- Mobile-first approach
- Animations disabled on mobile for performance
- Touch-friendly navigation
- Optimized Three.js for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with 💚 for Zenith.ra

**Unleash Your Inner Doom** 🦹‍♂️
