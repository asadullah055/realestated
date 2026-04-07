import { useState } from 'react';
import { MdMic, MdStop } from 'react-icons/md';

export default function VoiceButton({ size = 'sm' }) {
  const [on, setOn] = useState(false);

  const isLg = size === 'lg';
  const dim = isLg ? 56 : 36;
  const iconSz = isLg ? 22 : 17;

  return (
    <div style={{ position: 'relative', width: `${dim}px`, height: `${dim}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {on && (
        <>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(168,85,247,0.3)', animation: 'ripple 1.2s ease-out infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(168,85,247,0.2)', animation: 'ripple 1.2s ease-out infinite', animationDelay: '0.4s' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(168,85,247,0.1)', animation: 'ripple 1.2s ease-out infinite', animationDelay: '0.8s' }} />
        </>
      )}

      <button
        type="button"
        aria-label={on ? 'Stop voice search' : 'Start voice search'}
        onClick={() => setOn(!on)}
        title={on ? 'Stop' : 'Start voice search'}
        style={{
          position: 'relative',
          width: `${dim}px`, height: `${dim}px`,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: on
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #a855f7, #6366f1)',
          boxShadow: on
            ? '0 0 24px rgba(239,68,68,0.5), 0 4px 12px rgba(0,0,0,0.3)'
            : '0 0 20px rgba(168,85,247,0.45), 0 4px 12px rgba(0,0,0,0.3)',
          color: 'white',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
          zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1.06)'}
      >
        {on ? <MdStop size={iconSz} /> : <MdMic size={iconSz} />}
      </button>

      {on && isLg && (
        <div style={{ position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '11px', color: '#f87171', fontWeight: 600, animation: 'pulseGlow 1.5s ease-in-out infinite' }}>
          Listening...
        </div>
      )}
    </div>
  );
}
