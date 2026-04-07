export default function MetricCard({ title, value, change, positive, subtitle, icon: Icon, accent = '#a855f7' }) {
  const isPos = positive !== undefined ? positive : (change && change.startsWith('+'));
  const changeColor = isPos ? '#34d399' : '#f87171';
  const changeBg    = isPos ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)';

  return (
    <div
      className="group"
      style={{
        position: 'relative',
        borderRadius: '18px',
        padding: '22px',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: `2px solid ${accent}`,
        boxShadow: `0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.06)`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`; }}
    >
      {/* Corner glow */}
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${accent}18`, border: `1px solid ${accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={17} style={{ color: accent }} />
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '6px', background: `linear-gradient(135deg, #f8fafc 30%, ${accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {value}
      </div>

      {subtitle && (
        <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>{subtitle}</p>
      )}

      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: subtitle ? '0' : '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', color: changeColor, background: changeBg }}>
            {change}
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>vs. Vormonat</span>
        </div>
      )}
    </div>
  );
}
