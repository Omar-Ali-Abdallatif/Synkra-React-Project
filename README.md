# Synkra — Enterprise Operations Intelligence Platform

![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 8](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router 8](https://img.shields.io/badge/React_Router-8.3-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/Styling-CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/Linting-ESLint_10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Formatting-Prettier_3-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

**Synkra** is a modern, high-performance web application designed as an **Operations Intelligence Engine** for enterprise SaaS and technical ops teams. Built with React 19, React Router 8, and Vite 8, the platform delivers automated playbook orchestration, real-time observability, role-based access management, dual-token JWT authentication, and interactive subscription billing.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Platform Architecture](#-platform-architecture)
- [Design System & UI/UX](#-design-system--uiux)
- [Security & Authentication](#-security--authentication)
- [Project Structure](#-project-structure)
- [Technologies & Dependencies](#-technologies--dependencies)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Available Scripts](#-available-scripts)
- [API & Integration Layer](#-api--integration-layer)
- [Screenshots & UI Showcase](#-screenshots--ui-showcase)
- [Code Quality & Standards](#-code-quality--standards)
- [Roadmap & Future Improvements](#-roadmap--future-improvements)
- [Author & Team](#-author--team)
- [License](#-license)

---

## 🔭 Overview

Modern SaaS and infrastructure workflows often struggle with fragmented tooling, silent script failures, and untracked manual handoffs. **Synkra** bridges this gap by acting as an **"Ops Brain"**: a unified web interface that monitors stack processes, automates recurring tasks, and provides observability across teams.

### Core Objectives

- **High-Velocity Routing & Architecture**: Leverage React Router v8's data routing model and lazy component architectures for seamless page transitions.
- **Enterprise-Grade Security**: Full JWT session lifecycle with automatic silent token refresh, sessionStorage sandboxing, and granular route-level guards (`ProtectedRoute`, `GuestRoute`, `AdminRoute`, `NonAdminRoute`).
- **Resilient State Management**: Centralized React Context providers for global authentication session synchronization and persistent theme states.
- **Financially Validated Checkout**: Client-side credit card verification enforcing the Luhn checksum algorithm, card format masking, and expiration validation before API dispatch.
- **Accessible & Responsive Design**: Dual-mode (Light / Dark) theme engine driven by CSS Custom Properties, semantic HTML5 tags, and scoped CSS Modules to eliminate global style collisions.

---

## ✨ Key Features

### 🌐 1. Multi-Page Enterprise Portal
- **Landing (Solutions) Page (`/`)**: Hero banner with high-impact value proposition, partner social proof (`VOLT`, `SPHERE`, `LUMINA`, `ORBIT`, `NEXUS`), live operations metrics (240+ team members, 1M+ workflows processed, 8.4 hrs saved/wk, 12ms latency), a tiered "Wall of Love" testimonial showcase, FAQ accordions, and newsletter capture.
- **Platform Features (`/features`)**: Deep-dive technical specifications, visual playbook builder preview, error recovery strategies, and template library catalog.
- **About Synkra (`/about`)**: Company vision, architectural principles, global growth stats, and a multidisciplinary leadership showcase.
- **Blog & Editorial Studio (`/blog`)**: Multi-category filterable resource hub (Ops Strategy, Scalability, Product Updates, Engineering, QA, Design) complete with read-time calculations and author badges.
- **Article Details View (`/blogdetails`)**: Full editorial layout with sticky section navigation, inline callout quotes, newsletter card, and suggested next reads.
- **Product Changelog (`/challenging`)**: Interactive timeline highlighting release history from v1.0 Foundation Era through v6.0 The Intelligence Update with categorization badges (Features, Improvements, Bug Fixes).
- **Interactive Pricing Matrix (`/pricing`)**: Monthly and annual billing toggles across Starter (Free), Pro ($49/mo), and Custom Enterprise tiers with instant feature comparison and one-click modal checkout.

### 🛡️ 2. Role-Based Access Control & Security
- **Multi-Level Route Guards**:
  - `ProtectedRoute`: Safeguards private views (`/`, `/features`, `/about`, `/blog`, `/profile`), automatically saving redirect intent.
  - `GuestRoute`: Prevents authenticated users from accessing redundant sign-in or sign-up forms.
  - `AdminRoute` & `NonAdminRoute`: Distinguishes regular platform customers from verified administrative operators using cryptographic domain validation (`@admin.sy`).
- **Silent JWT Auto-Refresh**: Background token interceptor detects expired access credentials (HTTP 401) and runs an atomic, single-flight refresh call (`/token/refresh/`) without disrupting active user interactions.
- **Broadcast Session Expiration**: Dispatches unified custom browser events (`auth-session-expired`) across open application instances to invalidate state immediately upon token revocation.

### 💳 3. Secure Subscription & Payment Engine
- **Luhn Algorithm Verification**: Client-side checksum validation confirms card integrity before any external network requests.
- **Expiry & Security Guardrails**: Dynamic MM/YY parsing, real-time month/year expiration constraints, and strict 3-to-4-digit CVV checks.
- **Direct Backend Provisioning**: Seamless connection to the subscription API to activate user service tiers upon successful transaction confirmation.

### 🌓 4. Dual Theme Engine & UX Utilities
- **Instant Light/Dark Mode Switching**: Seamless zero-flicker theme toggle backed by `localStorage` persistence and attribute switching on `document.body[data-theme]`.
- **GDPR Cookie Notification**: Floating banner informing visitors of cookie preferences with immediate acceptance actions.
- **Mobile Responsive Drawer**: Accessible slide-out navigation menu with active route indicators, nested dropdowns, and dynamic user avatar display.

---

## 🏛️ Platform Architecture

Synkra separates concerns into dedicated architectural layers:

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser / Client                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
     ┌───────────────────┐           ┌───────────────────┐
     │   ThemeProvider   │           │   AuthProvider    │
     │ (localStorage /   │           │ (sessionStorage / │
     │  data-theme DOM)  │           │  JWT State Store) │
     └─────────┬─────────┘           └─────────┬─────────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │         BrowserRouter         │
               │      (React Router v8)        │
               └───────────────┬───────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  GuestRoute  │       │ProtectedRoute│       │NonAdminRoute │
│ (/sign-in,   │       │ (/, /about,  │       │  (/pricing)  │
│  /sign-up)   │       │  /features)  │       │              │
└──────────────┘       └───────┬──────┘       └──────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │    Services / API Adapter     │
               │  - request()                  │
               │  - authenticatedRequest()     │
               │  - refreshOnce() (Mutex)      │
               └───────────────┬───────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │   External REST Backend API   │
               │     (Railway Cloud / Django)  │
               └───────────────────────────────┘
```

---

## 🎨 Design System & UI/UX

The visual aesthetic is inspired by high-end developer platforms and editorial journals, pairing clean data density with refined typography.

| Token Group | Value / Configuration | Purpose |
|:---|:---|:---|
| **Editorial Headings** | `'Newsreader', serif` | Premium editorial typography for heroes & titles |
| **Interface Body** | `'DM Sans', sans-serif` | High-legibility geometric sans-serif for UI elements |
| **Primary Brand** | `#1A56DB` (Cobalt Blue) | Core actions, active states, key focus highlights |
| **Accent Color** | `#F4A016` (Amber Gold) | Badges, operational warnings, status markers |
| **Success Color** | `#0D9488` (Teal Green) | Validations, positive ROI metrics, verified tags |
| **Background Light** | `#F5F7F9` (Surface White) | Clean, distraction-free daylight workspace |
| **Background Dark** | `#0D0E10` / `#131418` | Deep high-contrast dark room mode |
| **Styling Strategy** | CSS Modules (`*.module.css`) | Zero specificity leaks, scoped component styles |

---

## 🔒 Security & Authentication

### Authentication Workflow

1. **User Registration (`/register/`)**: Form data is validated for email format, password complexity, role selection, and international telephone format.
2. **User Login (`/login/`)**: The backend issues an `access` token and a `refresh` token, both securely preserved in `sessionStorage` (preventing CSRF persistence vulnerabilities).
3. **Authenticated Fetch Interceptor (`authenticatedRequest`)**:
   - Injects `Authorization: Bearer <token>` into outbound requests.
   - Catches `401 Unauthorized` responses automatically.
   - Triggers `refreshOnce()` to acquire a new access token via `/token/refresh/`.
   - Replays the initial pending network call with the updated credentials.
   - Clears session data and fires `auth-session-expired` if the refresh token has expired.
4. **Verified Admin Resolution**:
   - Identity verification evaluates if `user.email` terminates with the `@admin.sy` domain.
   - Protected actions and sensitive administrative routes are selectively unlocked based on this check.

---

## 📁 Project Structure

```text
front-end-react-dev/
├── public/
│   └── Logo.svg                  # Brand favicon & SVG symbols
├── src/
│   ├── assets/                   # Static illustrations, logos, and UI icons
│   │   ├── blog-images/          # Editorial cover graphics
│   │   ├── challenging/          # Changelog timeline icons & badges
│   │   ├── Home/                 # Landing page vectors & dashboard preview
│   │   ├── navbar-icons/         # Dropdown chevrons and navigation markers
│   │   └── synkra-logo/          # Dual-theme SVG brand marks
│   ├── components/               # Modular reusable UI widgets
│   │   ├── AuthRoute/            # Protected, Guest, and Admin route wrappers
│   │   ├── CallToAction/         # Reusable bottom conversion banners
│   │   ├── CookieBar/            # Global floating GDPR consent bar
│   │   ├── FeatureComponent/     # Highlighting cards for platform capability
│   │   ├── Footer/               # Site-wide navigation footer and social handles
│   │   ├── Navbar/               # Dynamic header with theme toggle & user badge
│   │   ├── PaymentForm/          # Luhn-validated credit card checkout modal
│   │   ├── questionsComponent/   # Collapsible accordion FAQ system
│   │   ├── SiteBars/             # Notification banners
│   │   └── ThemeToggle/          # Dark / Light theme switch control
│   ├── config/
│   │   └── api.js                # Centralized API endpoint configurations
│   ├── Context/
│   │   ├── AuthContext.jsx       # Authentication session & user state management
│   │   └── ThemeContext.jsx      # Theme state provider with localStorage sync
│   ├── pages/                    # Routed application page views
│   │   ├── About/                # Company story, leadership team & principles
│   │   ├── Authentication/       # Sign In & Sign Up pages with form validation
│   │   ├── Blog/                 # Categorized article feed with search/filters
│   │   ├── BlogDetails/          # Deep-dive article view with sticky sidebar
│   │   ├── Challenging/          # System changelog, release notes & timeline
│   │   ├── Features/             # Detailed runtime capabilities & engine specs
│   │   ├── Home/                 # Primary landing page, stats, and testimonials
│   │   ├── Pricing/              # Tier comparisons & plan selection
│   │   └── Profile/              # Account details, subscription status & admin view
│   ├── services/
│   │   └── authService.js        # REST client, token handling, refresh & HTTP methods
│   ├── utils/
│   │   └── role.js               # User role evaluation & admin domain checks
│   ├── App.jsx                   # Application layout, routes, and context root
│   ├── index.css                 # Global CSS variables, font rules & design tokens
│   └── main.jsx                  # React DOM entry point
├── .gitignore                    # Git tracking ignore rules
├── .prettierrc                   # Prettier code formatting rules
├── eslint.config.js              # Modern ESLint 10 flat configuration
├── index.html                    # Single Page Application HTML shell
├── package.json                  # Dependencies, metadata & script definitions
└── vite.config.js                # Vite build pipeline and SVGR plugin configuration
```

---

## 🛠️ Technologies & Dependencies

### Core Framework & Runtime
- **[React 19](https://react.dev/)** (`^19.2.8`) — Declarative UI component library utilizing modern hooks and concurrent features.
- **[React DOM](https://react.dev/)** (`^19.2.8`) — Document Object Model bindings for React.
- **[React Router 8](https://reactrouter.com/)** (`^8.3.1`) — Dynamic client-side routing, navigation state, and route guard logic.

### Build Tooling & Asset Pipelines
- **[Vite 8](https://vite.dev/)** (`^8.2.2`) — Lightning-fast development server with Hot Module Replacement (HMR) and optimized Rollup bundling.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** (`^6.1.0`) — Official Babel/Fast Refresh integration for Vite.
- **[vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)** (`^5.2.0`) — Direct import of SVG files as React components.

### Code Quality & Standards
- **[ESLint 10](https://eslint.org/)** (`^10.9.0`) — Next-generation flat configuration enforcing React hooks and code hygiene.
- **[Prettier 3](https://prettier.io/)** (`^3.9.6`) — Opinionated code formatter ensuring unified syntax rules across team members.
- **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** (`^10.1.8`) — Deactivates conflicting ESLint stylistic rules.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have a modern Node.js runtime installed. Vite 8 requires **Node.js `^20.19.0` or `>=22.12.0`**.

Check your Node.js and npm versions:

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omar-Ali-Abdallatif/front-end-react.git
   cd front-end-react
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

The application is pre-configured to connect to the production cloud backend API. To target a local backend or custom environment, create a `.env.local` file in the root directory:

```env
# Base URL for the Synkra Backend REST API
VITE_API_BASE_URL=https://gig-program-apis-production.up.railway.app/api
```

> **Note:** If no `.env.local` file is provided, `src/config/api.js` defaults to the Railway deployment automatically.

### Running the Application

Start the local development server with Vite:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📜 Available Scripts

The following npm commands are configured in `package.json`:

| Script | Command | Description |
|:---|:---|:---|
| `dev` | `vite` | Launches the local dev server at `localhost:5173` with instant HMR |
| `build` | `vite build` | Compiles and bundles production-ready assets into the `dist/` directory |
| `preview` | `vite preview` | Serves the generated production `dist/` build locally for verification |
| `lint` | `eslint .` | Analyzes `.js` and `.jsx` files for code issues and syntax rules |
| `format` | `prettier . --write` | Automatically formats all project files according to `.prettierrc` |
| `format:check`| `prettier . --check` | Validates formatting compliance without writing (ideal for CI pipelines) |

---

## 🔌 API & Integration Layer

The front-end communicates with a RESTful backend API. All calls pass through the centralized `src/services/authService.js` client.

### Endpoints Implemented

| Endpoint | Method | Auth Required | Purpose |
|:---|:---|:---:|:---|
| `/register/` | `POST` | No | Creates a new user profile with role & phone metadata |
| `/login/` | `POST` | No | Authenticates credentials and returns `access` & `refresh` JWTs |
| `/token/refresh/` | `POST` | No | Exchanges a valid refresh token for a fresh access token |
| `/api/me/` | `GET` | Yes | Retrieves the authenticated user's account details |
| `/profiles/:id/` | `GET` | Yes | Fetches extended profile metadata (phone, custom role) |
| `/subscriptions/` | `GET` | Yes | Retrieves existing subscription records for the user |
| `/subscriptions/` | `POST` | Yes | Activates a selected pricing tier (e.g. `free`, `pro`, `custom`) |
| `/subscriptions/:id/`| `GET` | Yes | Fetches specific details for an individual subscription |

---

## 📸 Screenshots & UI Showcase

<!-- Placeholder containers for application screenshots -->
| Landing & Wall of Love | Interactive Pricing Matrix |
|:---:|:---:|
| ![Landing Page Preview](https://via.placeholder.com/600x340/131418/1A56DB?text=Synkra+Landing+Page+Preview) | ![Pricing Table Preview](https://via.placeholder.com/600x340/131418/F4A016?text=Synkra+Pricing+Plans+Matrix) |

| Operations Changelog | Dual Theme Mode (Light / Dark) |
|:---:|:---:|
| ![Changelog Timeline](https://via.placeholder.com/600x340/131418/0D9488?text=Changelog+Timeline+v1.0-v6.0) | ![Theme Switch Preview](https://via.placeholder.com/600x340/131418/FFFFFF?text=Light+%26+Dark+Mode+Support) |

---

## 🛡️ Code Quality & Standards

This project adheres to strict formatting and linting conventions:

- **Flat ESLint 10 Configuration**: Enforces React 19 recommended rules and monitors hook dependency hygiene.
- **Prettier 3 Configuration**:
  ```json
  {
    "semi": true,
    "tabWidth": 2,
    "singleQuote": true,
    "trailingComma": "all",
    "endOfLine": "lf"
  }
  ```
- **Safe CSS Isolation**: Standard HTML class clashes are averted by relying entirely on CSS Modules (`*.module.css`).

Run code formatting checks:
```bash
npm run format:check
```

---

## 🗺️ Roadmap & Future Improvements

- [ ] **Admin Control Panel**: Implement complete user management tables once backend admin-list endpoints become available.
- [ ] **Live Webhook Simulator**: An interactive in-browser playground for testing webhook payloads against playbooks.
- [ ] **Automated Testing Suite**: Integrate Vitest and React Testing Library for unit testing route guards, form validation, and checkout logic.
- [ ] **Internationalization (i18n)**: Add multi-language support (English & Arabic) using `i18next`.
- [ ] **Enhanced Analytics Dashboard**: Visual chart reporting powered by Recharts or Chart.js for workflow throughput metrics.

---

## 👨‍💻 Author & Team

**Eng. Omar Ali Abdallatif Khalifa**
- **Role**: Lead Front-End Developer
- **Academic Context**: Front-End Web Development Graduation Project
- **GitHub**: [@Omar-Ali-Abdallatif](https://github.com/Omar-Ali-Abdallatif)

---

## 📄 License

This project was developed for educational, portfolio, and engineering demonstration purposes as part of the Front-End Graduation Program. All rights to third-party logos and trademarks remain with their respective owners.
