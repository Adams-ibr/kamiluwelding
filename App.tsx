// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Preloader from './components/Preloader';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminSubmissionsPage from './pages/admin/AdminSubmissionsPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Create a layout wrapper component
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
        <Header />
        <main>
            {children}
        </main>
        <WhatsAppWidget />
        <Footer />
    </div>
);

const AppRoutes = () => {
    const location = useLocation();

    return (
        <>
            <ScrollToTop />
            <Routes location={location}>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Navigate to="/admin/dashboard" replace />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AdminDashboardPage />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AdminProductsPage />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/blogs" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AdminBlogsPage />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/services" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AdminServicesPage />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/submissions" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AdminSubmissionsPage />
                        </AdminLayout>
                    </ProtectedRoute>
                } />
                
                {/* Public Routes */}
                <Route path="/" element={
                    <PublicLayout>
                        <div>
                            <h1>Test Homepage</h1>
                            <p>If you can see this, the routing works!</p>
                        </div>
                    </PublicLayout>
                } />
                <Route path="/about" element={
                    <PublicLayout>
                        <AboutPage />
                    </PublicLayout>
                } />
                <Route path="/products" element={
                    <PublicLayout>
                        <ProductsPage />
                    </PublicLayout>
                } />
                <Route path="/products/:slug" element={
                    <PublicLayout>
                        <ProductDetailPage />
                    </PublicLayout>
                } />
                <Route path="/services" element={
                    <PublicLayout>
                        <ServicesPage />
                    </PublicLayout>
                } />
                <Route path="/blog" element={
                    <PublicLayout>
                        <BlogPage />
                    </PublicLayout>
                } />
                <Route path="/blog/:slug" element={
                    <PublicLayout>
                        <BlogPostPage />
                    </PublicLayout>
                } />
                <Route path="/contact" element={
                    <PublicLayout>
                        <ContactPage />
                    </PublicLayout>
                } />
            </Routes>
        </>
    );
}


const Root = () => (
    <ThemeProvider>
        <AdminProvider>
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </AdminProvider>
    </ThemeProvider>
)

export default Root;