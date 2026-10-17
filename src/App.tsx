
import React, { Suspense, useEffect, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/sections/Footer';
import { ThemeProvider } from './lib/theme';
import { NewHeroPage } from './pages/NewHeroPage';

// Code-split secondary routes for faster initial load
const AvenueDetailPage = lazy(() => import('./pages/AvenueDetailPage').then((m) => ({ default: m.AvenueDetailPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const AvenuesPage = lazy(() => import('./pages/AvenuesPage').then((m) => ({ default: m.AvenuesPage })));
const BoardPage = lazy(() => import('./pages/BoardPage').then((m) => ({ default: m.BoardPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#0c0f17]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
    </div>
  );
}

/* AppInner is a child of BrowserRouter so useLocation() works here */
function AppInner() {
  const { pathname } = useLocation();
  // The new cinematic hero lives at / — it ships its own nav so we hide the global one
  const isHome = pathname === '/';

  // Instant scrolling on the cinematic hero so scroll-linked zoom isn't eased by CSS
  useEffect(() => {
    const root = document.documentElement;
    if (isHome) {
      root.style.scrollBehavior = 'auto';
    } else {
      root.style.scrollBehavior = '';
    }
    return () => {
      root.style.scrollBehavior = '';
    };
  }, [isHome]);

  return (
    <div className="w-full overflow-x-clip bg-white font-body text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <ScrollToTop />
      <Loader />
      {!isHome && <Navbar />}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<NewHeroPage />} />
          <Route path="/avenues" element={<AvenuesPage />} />
          <Route path="/avenues/:slug" element={<AvenueDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
