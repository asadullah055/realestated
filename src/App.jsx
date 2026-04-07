import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import VoiceAIFeatures from './pages/VoiceAIFeatures';
import Analytics from './pages/Analytics';
import useMediaQuery from './hooks/useMediaQuery';

const PAGE_TO_ROUTE = {
  dashboard: '/dashboard',
  history: '/history',
  voice: '/voice',
  analytics: '/analytics',
};

const ROUTE_TO_PAGE = {
  '/dashboard': 'dashboard',
  '/history': 'history',
  '/voice': 'voice',
  '/analytics': 'analytics',
};

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window === 'undefined') return 252;
    return window.matchMedia('(max-width: 900px)').matches ? 72 : 252;
  });
  const isCompact = useMediaQuery('(max-width: 900px)');
  const activePage = ROUTE_TO_PAGE[pathname] || 'dashboard';

  function handleNavigate(pageId) {
    const targetPath = PAGE_TO_ROUTE[pageId] || '/dashboard';
    navigate(targetPath);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#04080f', color: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>

      {/* ── Decorative nebula orbs ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-8%', left: '15%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)', filter: 'blur(32px)' }} />
        <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)', filter: 'blur(32px)' }} />
        <div style={{ position: 'absolute', top: '45%', left: '45%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,121,249,0.05) 0%, transparent 65%)', filter: 'blur(48px)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '25%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)', filter: 'blur(24px)' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        onWidthChange={setSidebarWidth}
        forceCollapsed={isCompact}
      />

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: `${sidebarWidth}px`, transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', position: 'relative', zIndex: 1 }}>
        <Header activePage={activePage} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/voice" element={<VoiceAIFeatures />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
