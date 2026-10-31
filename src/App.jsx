import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './Context/ThemeContext';
import { AuthProvider } from './Context/AuthContext';
import Home from './pages/Home/Home';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import Challenging from './pages/Challenging/Challenging';
import Pricing from './pages/Pricing/Pricing';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CookieBar from './components/CookieBar/CookieBar';
import {
  GuestRoute,
  NonAdminRoute,
  ProtectedRoute,
} from './components/AuthRoute/AuthRoute';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogdetails"
              element={
                <ProtectedRoute>
                  <BlogDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenging"
              element={
                <ProtectedRoute>
                  <Challenging />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <NonAdminRoute>
                  <Pricing />
                </NonAdminRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <h1>404</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <CookieBar />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
