import { useState } from 'react';
import { MdSearch, MdNotifications, MdClose } from 'react-icons/md';
import VoiceButton from './VoiceButton';
import useMediaQuery from '../hooks/useMediaQuery';

const pageMeta = {
  dashboard: { title: 'Dashboard',          sub: 'Market Overview & AI Insights',          dot: '#a855f7' },
  history:   { title: 'Call History',       sub: 'Voice AI Conversations & Transcripts',   dot: '#22d3ee' },
  voice:     { title: 'Voice AI Features',  sub: 'STT · TTS · Automation',                 dot: '#e879f9' },
  analytics: { title: 'Analytics',          sub: 'Performance · Conversions · Market',     dot: '#34d399' },
};

export default function Header({ activePage }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const meta = pageMeta[activePage] || pageMeta.dashboard;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 14px' : '0 28px', height: '64px',
      background: 'rgba(4,8,15,0.75)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      flexShrink: 0,
    }}>

      {/* ── Left: breadcrumb + title ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: meta.dot, boxShadow: `0 0 10px ${meta.dot}`, flexShrink: 0 }} />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
            {meta.title}
          </h1>
          {!isMobile && <p style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>{meta.sub}</p>}
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
          transition: 'width 0.3s ease, border-color 0.2s',
          width: searchOpen ? (isMobile ? '170px' : '240px') : '36px',
          borderColor: searchOpen ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.07)',
        }}>
          {searchOpen && (
            <input
              autoFocus
              aria-label="Search properties"
              placeholder="Search properties, cities..."
              style={{ flex: 1, background: 'transparent', padding: '0 12px', fontSize: '13px', color: '#f1f5f9', outline: 'none', border: 'none', height: '36px' }}
            />
          )}
          <button
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', flexShrink: 0, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            {searchOpen ? <MdClose size={17} /> : <MdSearch size={17} />}
          </button>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Open notifications"
          style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          <MdNotifications size={18} />
          <span style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: '#a855f7', border: '1.5px solid #04080f', boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />
        </button>

        {/* Divider */}
        {!isMobile && <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.06)' }} />}

        {/* Voice button */}
        <VoiceButton />

        {/* Date */}
        {!isMobile && (
          <div style={{ textAlign: 'right', paddingLeft: '4px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
