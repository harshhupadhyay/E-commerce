# HAUTE ÉDIT — Editorial Luxury E-Commerce Platform

A production-grade, full-stack luxury fashion e-commerce application crafted with an editorial runway aesthetic inspired by Milanese and Parisian fashion houses. Built with a **React 19 + Vite + Tailwind CSS v4** frontend and a robust **Node.js + Express + MongoDB** REST API.

---

## 🌐 Live Deployments

* **Live Storefront (Vercel):** [https://e-commerce-lake-gamma-59.vercel.app/](https://e-commerce-lake-gamma-59.vercel.app/)
* **Production API (Render):** [https://e-commerce-mynu.onrender.com](https://e-commerce-mynu.onrender.com)
* **GitHub Repository:** [https://github.com/harshhupadhyay/E-commerce](https://github.com/harshhupadhyay/E-commerce)

---

## Highlights & Features

### 🎬 Runway Hero & Cinematic Storytelling
* **Dual-Video Runway Carousel:** Seamless background video carousel featuring Autumn/Winter editorial campaigns with gesture-driven navigation (mobile touch swipe, laptop touchpad drag, and mouse wheel).
* **GSAP Typography Choreography:** Smooth split-text and fade-in animations on slide transitions.
* **Ambient Sound Toggle:** Floating, non-intrusive sound controls with persistent mute state.

### 🏛️ Luxury Editorial Design System
* **Curated Color Palette:** High-fashion cream background (`#FAF6F2`), deep charcoal typography (`#121110`), and rich burgundy accents (`#72252e`).
* **Fluid Smooth Scrolling:** Integrated with **Lenis 60fps** physics-based smooth scrolling.
* **100% Responsive:** Pixel-perfect optimization across all devices — from 320px Mobile S through modern smartphones, tablets, and ultrawide displays.
* **Accessible Modals & Notifications:** Built with **Radix UI Dialog** primitives and **Sonner** luxury toasts, completely eliminating unstyled native browser alerts.

### 🛍️ Client Experience & Catalog
* **Universal Category-Aware Product Guide Modal:** Dynamic specification guide that automatically adapts based on product type:
  * *Perfumes & Fragrances:* Olfactory Pyramid (Top, Heart, Base notes), flacon volumes (30ml, 50ml, 100ml), and application rituals.
  * *Footwear & Shoes:* International EU/UK/US conversion standards and insole length matrix.
  * *Bags & Leather Goods:* Structural dimensions (W × H × D), adjustable strap drop, and interior device capacity.
  * *Garments & Tailoring:* Metric (CM) and Imperial (IN) tailoring matrix with runway model proportions.
* **500 Authentic High-Resolution Products:** Curated multi-angle catalog across Women's Suits, Men's Outerwear, Cashmere, Leather, Footwear, and Eveningwear.
* **Curated Department Avatars:** Interactive circular category shortcuts for instant department filtering.
* **Slide-Over Filter & Sort Drawer:** Deep filtering by Department (All / Women / Men), Category, Price Range, and Sort orders (Newest, Price Low-to-High, Price High-to-Low).
* **Intelligent Search:** Real-time search with popular search pills (`Blazer`, `Coat`, `Loafers`, `Cashmere`, `Denim`) and instant keyboard shortcut (`ESC` to close).
* **Shopping Bag Drawer:** Slide-over cart with live subtotal calculation, quantity adjustments, size selectors, and an interactive complimentary courier threshold tracker.
* **Wishlist Dossier:** Client-side persistent favorites with instant "Move to Bag" capability.

### 🔐 Enterprise Authentication & Security
* **Dual-Token JWT Architecture:** Short-lived in-memory Access Tokens paired with secure `HttpOnly`, `SameSite`, and `Secure` Refresh Token cookies.
* **Silent Token Refresh Interceptor:** Axios response interceptor that automatically catches 401s, calls `/api/auth/refresh`, updates the in-memory token, and replays failed requests seamlessly without user interruption.
* **Brute-Force Rate Limiting:** `express-rate-limit` protecting authentication routes against credential stuffing (max 10 attempts per 15 minutes per IP).
* **Password Hashing:** `bcryptjs` with 10 salt rounds.
* **Role-Based Access Control:** Separation between Client accounts and Administrator (`admin`) privileges.

### ⚡ Smart Media & Image Proxy
* **Built-in Image Proxy (`/api/proxy-image`):** Bypasses external CDN 403 Forbidden hotlink blocks by attaching appropriate Referer headers and caching images for 24 hours (`Cache-Control: public, max-age=86400`).
* **ImageKit CDN Integration:** Secure multi-file image uploads for admin product creations and updates.

### 👑 Haute Direction (Admin Console)
* **Comprehensive Product Management:** View full product catalog with responsive mobile cards and desktop table views.
* **Full CRUD Operations:** Create new products with multiple image uploads, edit live price and stock counts, and delete obsolete silhouettes.
* **Role-Guarded Navigation:** Protected admin routes preventing unauthorized client access.

---

## Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI library utilizing hooks and state primitives |
| **Vite 8** | High-performance build tool and instant HMR dev server |
| **Tailwind CSS v4** | Next-generation utility-first styling with custom editorial theme |
| **GSAP (GreenSock)** | High-performance animation engine for luxury transitions |
| **Lenis** | Smooth momentum scrolling |
| **Lucide React** | Clean, minimalist luxury iconography |
| **Radix UI Dialog** | Unstyled, accessible modal primitives for custom luxury dialogs |
| **Sonner** | Modern stacked luxury toast notification engine |
| **Axios** | HTTP client with automatic JWT token refresh interceptors |
| **React Router v8** | Declarative client-side routing with protected layouts |

### Backend
| Technology | Description |
| :--- | :--- |
| **Node.js & Express 5** | RESTful API server with modular route-controller-service pattern |
| **MongoDB & Mongoose 9** | NoSQL database with schema validation and indexing |
| **JSON Web Tokens (JWT)** | Stateless authentication with cryptographic signature |
| **ImageKit SDK** | Cloud media storage and image optimization |
| **Express Validator** | Request payload validation and sanitization |
| **Cookie-Parser** | Secure cookie extraction for refresh tokens |
| **CORS** | Cross-Origin Resource Sharing with credential support |
| **Multer** | Multipart/form-data handler for image uploads |

---

## Project Structure

```
E-commerce/
├── backend/
│   ├── src/
│   │   ├── app/
│   │   │   └── app.js                 # Express application configuration & middlewares
│   │   ├── configs/
│   │   │   ├── config.js              # Environment variable loader
│   │   │   └── db.js                  # MongoDB Mongoose connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # Auth logic (register, login, refresh, logout, me)
│   │   │   └── product.controller.js  # Product CRUD & image upload handlers
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     # JWT verification & admin guard
│   │   │   └── multer.middleware.js   # File upload handling & error traps
│   │   ├── models/
│   │   │   ├── product.model.js       # Product schema (name, price, stock, sizes, images)
│   │   │   └── user.model.js          # User schema (name, email, role, passwordHash)
│   │   ├── routes/
│   │   │   ├── auth.routes.js         # Authentication endpoints
│   │   │   └── products.route.js      # Product catalog endpoints
│   │   ├── scripts/
│   │   │   └── seed500ZaraProducts.js # Automated 500-product authentic catalog seeder
│   │   ├── services/
│   │   │   └── imagekit.service.js    # ImageKit upload integration
│   │   ├── utils/
│   │   │   └── auth.utils.js          # JWT generator & decoder utilities
│   │   ├── validators/
│   │   │   ├── auth.validator.js      # Register & login validation rules
│   │   │   ├── pagination.validator.js# Query param validation
│   │   │   ├── product.validator.js   # Product creation/update rules
│   │   │   └── validate.js            # Validation error response middleware
│   │   └── server.js                  # HTTP server entry point
│   ├── .env                           # Backend environment variables
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── videos/                    # Campaign runway MP4 videos
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── DeleteConfirmModal.jsx # Luxury Radix admin archive deletion modal
    │   │   ├── FilterDrawer.jsx       # Sliding filter & sort sidebar
    │   │   ├── ForgotPasswordModal.jsx# Client credential recovery modal
    │   │   ├── HeroVideoCarousel.jsx  # Dual-video editorial runway banner
    │   │   ├── LookbookModal.jsx      # Editorial runway lookbook story modal
    │   │   ├── Navbar.jsx             # Luxury header with mobile cluster & search
    │   │   ├── Pagination.jsx         # Elegant catalog pagination
    │   │   ├── ProductCard.jsx        # 3:4 high-fashion product card
    │   │   ├── ProductGuideModal.jsx  # Universal category-aware specifications modal
    │   │   └── ProductSkeleton.jsx    # Pulsing shimmer loading state
    │   ├── context/
    │   │   ├── AuthContext.jsx        # User state & session manager
    │   │   ├── CartContext.jsx        # Shopping bag & quantity state
    │   │   ├── FilterContext.jsx      # Global catalog filter state
    │   │   └── WishlistContext.jsx    # Client wishlist & persistence
    │   ├── hooks/                     # Custom React hooks (useAuth, useCart, etc.)
    │   ├── layouts/
    │   │   └── Layout.jsx             # Shell layout with Navbar, Footer, & Drawers
    │   ├── pages/
    │   │   ├── AdminCreateProduct.jsx # Admin silhouette creator with uploads
    │   │   ├── AdminEditProduct.jsx   # Admin silhouette editor
    │   │   ├── AdminProducts.jsx      # Responsive admin catalog inventory
    │   │   ├── Cart.jsx               # Dedicated shopping bag page
    │   │   ├── Login.jsx              # Client sign-in portal
    │   │   ├── ProductDetails.jsx     # Deep silhouette view with size picker
    │   │   ├── Products.jsx           # Main catalog archive view
    │   │   ├── Profile.jsx            # Client dossier & order history
    │   │   ├── Register.jsx           # Client registration portal
    │   │   └── Wishlist.jsx           # Saved silhouettes gallery
    │   ├── routes/
    │   │   ├── AdminRoute.jsx         # Admin-only route guard
    │   │   ├── AppRouter.jsx          # Route definitions
    │   │   └── ProtectedRoute.jsx     # Authenticated user route guard
    │   ├── services/
    │   │   └── api.jsx                # Axios instance with silent refresh interceptors
    │   ├── App.jsx
    │   ├── index.css                  # Tailwind CSS v4 & luxury typography classes
    │   └── main.jsx
    └── package.json
```

---

## API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new client account |
| `POST` | `/login` | Public | Authenticate credentials; sets HttpOnly refresh cookie |
| `POST` | `/refresh` | Public | Rotates & issues a fresh access token from cookie |
| `POST` | `/logout` | Authenticated | Clears refresh cookie and user session |
| `GET` | `/me` | Authenticated | Returns current authenticated user profile |

### Products (`/api/products`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | List products with pagination, search, category, gender & sorting |
| `GET` | `/categories` | Public | Retrieve list of all unique catalog categories |
| `GET` | `/:id` | Public | Retrieve a single product by MongoDB ID |
| `POST` | `/` | Admin | Create a new product with up to 5 ImageKit uploads |
| `PUT` | `/:id` | Admin | Update product details, pricing, stock, and images |
| `DELETE`| `/:id` | Admin | Remove a product from catalog |

### Media Utility (`/api`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/proxy-image?url=...` | Public | Proxies external CDN images with caching to prevent 403 hotlink blocks |

---

## Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **MongoDB** (Local instance or MongoDB Atlas cluster URI)
* **ImageKit Account** (For product image uploads)

---

### 1. Clone the Repository
```bash
git clone https://github.com/harshhupadhyay/E-commerce.git
cd E-commerce
```

---

### 2. Backend Setup

1. **Navigate to backend and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/E-commerce
   ACCESS_TOKEN_SECRET=your_super_secret_access_jwt_key
   REFRESH_TOKEN_SECRET=your_super_secret_refresh_jwt_key
   IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   ```

3. **Seed the 500 Luxury Products Catalog:**
   Populate your database with the authentic 500 Zara products dataset:
   ```bash
   node src/scripts/seed500ZaraProducts.js
   ```

4. **Start the Backend Server:**
   ```bash
   npm run dev
   ```
   *Backend will run on `http://localhost:3000`.*

---

### 3. Frontend Setup

1. **Open a new terminal, navigate to frontend, and install dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   *Frontend will launch on `http://localhost:5173` with instant Vite HMR.*

---

## Production Build

To test or build the frontend for production:
```bash
cd frontend
npm run build
```
The optimized, tree-shaken static assets will be output to `frontend/dist/`.

---

## License
Distributed under the ISC License. See `LICENSE` for more information.
