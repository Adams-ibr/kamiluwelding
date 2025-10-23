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

const AppRoutes = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500); // Simulate loading time
        return () => clearTimeout(timer);
    }, []);

    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            <AnimatePresence>
                {loading && <Preloader />}
            </AnimatePresence>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <ScrollToTop />
                
                <Routes location={location} key={location.pathname}>
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
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <HomePage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/about" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <AboutPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/products" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <ProductsPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/products/:slug" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <ProductDetailPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/services" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <ServicesPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/blog" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <BlogPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/blog/:slug" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <BlogPostPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <Header />
                            <main>
                                <AnimatePresence mode="wait">
                                    <ContactPage />
                                </AnimatePresence>
                            </main>
                            <WhatsAppWidget />
                            <Footer />
                        </div>
                    } />
                </Routes>
            </motion.div>
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