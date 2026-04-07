import { useEffect, useState } from 'react';
import { MdDashboard, MdHistory, MdMic, MdBarChart, MdSettings, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',   icon: MdDashboard },
  { id: 'history',   label: 'History',     icon: MdHistory   },
  { id: 'voice',     label: 'Voice AI',    icon: MdMic       },
  { id: 'analytics', label: 'Analytics',   icon: MdBarChart  },
];

const FULL_W = 252;
const MINI_W = 72;

export default function Sidebar({ activePage, onNavigate, onWidthChange, forceCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(false);
  const effectiveCollapsed = forceCollapsed || collapsed;

  useEffect(() => {
    onWidthChange?.(effectiveCollapsed ? MINI_W : FULL_W);
  }, [effectiveCollapsed, onWidthChange]);

  function toggle() {
    if (forceCollapsed) return;
    const next = !collapsed;
    setCollapsed(next);
  }

  const w = effectiveCollapsed ? MINI_W : FULL_W;

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 40,
      width: `${w}px`,
      display: 'flex', flexDirection: 'column',
      background: 'rgba(6,10,22,0.97)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRight: '1px solid rgba(168,85,247,0.12)',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>

      {/* ── Inner glow ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '300px', background: 'radial-gradient(circle at 0% 100%, rgba(168,85,247,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Logo ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: collapsed ? '20px 20px' : '20px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <div style={{ flexShrink: 0 }}>
          <img
            src="/favicon.webp"
            alt="Nebulanexus logo"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              objectFit: 'cover',
              objectPosition: 'center',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 14px rgba(99,102,241,0.28)',
            }}
          />
        </div>
        {!effectiveCollapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.3px', background: 'linear-gradient(135deg, #e879f9 0%, #a855f7 40%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Nebulanexus
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px' }}>
              ImmoVoice AI
            </div>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {NAV.map((item) => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
              aria-label={`Go to ${item.label}`}
              title={effectiveCollapsed ? item.label : undefined}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: effectiveCollapsed ? '11px 16px' : '11px 14px',
                justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                position: 'relative',
                background: active
                  ? 'linear-gradient(135deg, rgba(168,85,247,0.22) 0%, rgba(99,102,241,0.14) 100%)'
                  : 'transparent',
                boxShadow: active ? 'inset 0 0 0 1px rgba(168,85,247,0.35)' : 'none',
                color: active ? '#e2d9f3' : '#94a3b8',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#e2e8f0'; }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
            >
              {/* Active bar */}
              {active && <span style={{ position: 'absolute', left: 0, top: '20%', height: '60%', width: '3px', borderRadius: '0 3px 3px 0', background: 'linear-gradient(180deg, #e879f9, #a855f7)', boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />}

              <item.icon size={19} style={{ color: active ? '#c084fc' : 'inherit', flexShrink: 0, filter: active ? 'drop-shadow(0 0 6px rgba(192,132,252,0.6))' : 'none' }} />
              {!effectiveCollapsed && (
                <span style={{ fontSize: '13.5px', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap', color: active ? '#ede9fe' : 'inherit' }}>
                  {item.label}
                </span>
              )}
              {!effectiveCollapsed && active && (
                <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Live status chip ── */}
      {!effectiveCollapsed && (
        <div style={{ margin: '0 10px 12px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.8)', animation: 'pulseGlow 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#34d399' }}>Market Live</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Voice AI · 48,291 Queries</div>
        </div>
      )}

      {/* ── Bottom ── */}
      <div style={{ padding: '10px 10px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button
          type="button"
          aria-label="Open settings"
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: effectiveCollapsed ? '10px 16px' : '10px 14px', justifyContent: effectiveCollapsed ? 'center' : 'flex-start', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#94a3b8', transition: 'all 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          <MdSettings size={18} style={{ flexShrink: 0 }} />
          {!effectiveCollapsed && <span style={{ fontSize: '13px', fontWeight: 400 }}>Settings</span>}
        </button>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: effectiveCollapsed ? '8px 0' : '8px 6px', marginTop: '4px', justifyContent: effectiveCollapsed ? 'center' : 'flex-start' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #a855f7, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', boxShadow: '0 0 12px rgba(168,85,247,0.4)' }}>
            JM
          </div>
          {!effectiveCollapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1', whiteSpace: 'nowrap' }}>Jana Meyer</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Administrator</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Collapse toggle ── */}
      {!forceCollapsed && (
        <button
          type="button"
          aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={toggle}
          style={{
            position: 'absolute', top: '22px', right: '-12px',
            width: '24px', height: '24px', borderRadius: '50%',
            background: '#0d1225', border: '1px solid rgba(168,85,247,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#7c3aed', zIndex: 50,
            transition: 'all 0.2s',
            boxShadow: '0 0 12px rgba(168,85,247,0.25)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1a1040'; e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#0d1225'; e.currentTarget.style.boxShadow = '0 0 12px rgba(168,85,247,0.25)'; }}
        >
          {effectiveCollapsed ? <MdKeyboardArrowRight size={15} /> : <MdKeyboardArrowLeft size={15} />}
        </button>
      )}
    </aside>
  );
}
