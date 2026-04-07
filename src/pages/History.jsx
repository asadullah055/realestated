import { useState } from 'react';
import { MdSearch, MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdVolumeUp, MdPhone, MdSchedule, MdLocationOn, MdDownload } from 'react-icons/md';
import { FaRobot, FaUser } from 'react-icons/fa';
import { conversationHistory } from '../data/mockData';
import useMediaQuery from '../hooks/useMediaQuery';

const STATUS = {
  converted:   { color: '#34d399', bg: 'rgba(52,211,153,0.1)',   border: 'rgba(52,211,153,0.2)',   label: 'Converted'   },
  qualified:   { color: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.2)',   label: 'Qualified'   },
  'follow-up': { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.2)',   label: 'Follow-up'   },
  unqualified: { color: '#94a3b8', bg: 'rgba(71,85,105,0.1)',    border: 'rgba(71,85,105,0.2)',    label: 'Open'        },
};

const FILTERS = [
  { key: 'all',        label: 'All'        },
  { key: 'converted',  label: 'Converted'  },
  { key: 'qualified',  label: 'Qualified'  },
  { key: 'follow-up',  label: 'Follow-up'  },
];

function ScoreRing({ score }) {
  const r = 20, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 90 ? '#34d399' : score >= 75 ? '#a855f7' : '#fbbf24';
  return (
    <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
      <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}80)`, transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color }}>
        {score}
      </div>
    </div>
  );
}

function ConvCard({ conv, selected, onClick }) {
  const st = STATUS[conv.status] || STATUS.unqualified;
  const initials = conv.caller.split(' ').map(n => n[0]).join('');
  return (
    <button type="button" onClick={onClick} style={{ width: '100%', textAlign: 'left', padding: '14px', borderRadius: '14px', border: `1px solid ${selected ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.06)'}`, background: selected ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.15s', marginBottom: '8px', display: 'block' }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0, boxShadow: '0 0 10px rgba(168,85,247,0.3)' }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.caller}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>{conv.phone}</p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', color: st.color, background: st.bg, border: `1px solid ${st.border}`, flexShrink: 0 }}>{st.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MdLocationOn size={12} />{conv.city}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MdSchedule size={12} />{conv.duration}</span>
        <span style={{ marginLeft: 'auto' }}>{conv.timestamp.split(' ')[1]}</span>
      </div>
      <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '8px', borderLeft: '2px solid rgba(168,85,247,0.3)', paddingLeft: '8px' }}>{conv.intent}</p>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {conv.tags.slice(0,3).map(tag => (
          <span key={tag} style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '5px', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)' }}>{tag}</span>
        ))}
      </div>
    </button>
  );
}

function AudioPlayer({ conv }) {
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(22);
  return (
    <div style={{ padding: '18px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.06))', border: '1px solid rgba(168,85,247,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.4)' }}>
          <MdVolumeUp style={{ color: 'white' }} size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{conv.caller}</p>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>{conv.duration} · {conv.timestamp}</p>
        </div>
        <button type="button" aria-label="Download call recording" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
          <MdDownload size={18} />
        </button>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '36px', marginBottom: '10px' }}>
        {Array.from({ length: 64 }, (_, i) => {
          const h = (Math.sin(i * 0.45) * 0.35 + 0.65) * (0.3 + (i % 7) * 0.1);
          const filled = i < prog * 0.64;
          return <div key={i} style={{ flex: 1, borderRadius: '2px', height: `${Math.max(15, h * 100)}%`, background: filled ? `rgba(168,85,247,${0.5 + h * 0.5})` : 'rgba(255,255,255,0.07)' }} />;
        })}
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', cursor: 'pointer', marginBottom: '12px', position: 'relative' }}
        onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProg(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
        <div style={{ height: '100%', borderRadius: '99px', width: `${prog}%`, background: 'linear-gradient(90deg, #a855f7, #6366f1)', position: 'relative' }}>
          <div style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: 'white', boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>1:02</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button type="button" aria-label="Previous segment" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><MdSkipPrevious size={24} /></button>
          <button type="button" aria-label={playing ? 'Pause playback' : 'Play recording'} onClick={() => setPlaying(!playing)} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.4)', color: 'white' }}>
            {playing ? <MdPause size={18} /> : <MdPlayArrow size={18} />}
          </button>
          <button type="button" aria-label="Next segment" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><MdSkipNext size={24} /></button>
        </div>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{conv.duration}</span>
      </div>
    </div>
  );
}

export default function History() {
  const isMobile = useMediaQuery('(max-width: 1100px)');
  const [sel, setSel] = useState(conversationHistory[0]);
  const [search, setSearch] = useState('');
  const [fStatus, setFStatus] = useState('all');

  const filtered = conversationHistory.filter(c => {
    const ms = !search || [c.caller, c.city, c.intent].some(s => s.toLowerCase().includes(search.toLowerCase()));
    const mf = fStatus === 'all' || c.status === fStatus;
    return ms && mf;
  });
  const activeSel = filtered.find(c => c.id === sel?.id) || filtered[0] || null;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : 'calc(100vh - 64px)', overflow: 'hidden' }}>

      {/* ── Left: conversation list ── */}
      <div style={{ width: isMobile ? '100%' : '320px', maxHeight: isMobile ? '48vh' : 'none', flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '10px' }}>
            <MdSearch size={15} style={{ color: '#94a3b8', flexShrink: 0 }} />
            <input aria-label="Search conversations" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#f1f5f9' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button type="button" key={f.key} onClick={() => setFStatus(f.key)} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', border: `1px solid ${fStatus === f.key ? 'rgba(168,85,247,0.4)' : 'transparent'}`, background: fStatus === f.key ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.04)', color: fStatus === f.key ? '#c084fc' : '#94a3b8', transition: 'all 0.15s' }}>
                {f.label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>{filtered.length} conversations</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {filtered.map(c => <ConvCard key={c.id} conv={c} selected={activeSel?.id === c.id} onClick={() => setSel(c)} />)}
        </div>
      </div>

      {/* ── Right: conversation detail ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '28px' }}>
        {activeSel ? (
          <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'flex-start', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '14px' : '0' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.4px' }}>{activeSel.caller}</h2>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MdPhone size={13} />{activeSel.phone}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MdLocationOn size={13} />{activeSel.city}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MdSchedule size={13} />{activeSel.timestamp}</span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>Lead Score</div>
                <ScoreRing score={activeSel.score} />
              </div>
            </div>

            {/* Audio player */}
            <AudioPlayer conv={activeSel} />

            {/* AI Summary */}
            <div style={{ padding: '18px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(168,85,247,0.07), rgba(99,102,241,0.05))', border: '1px solid rgba(168,85,247,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(99,102,241,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaRobot size={11} style={{ color: '#c084fc' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#a855f7', letterSpacing: '0.04em' }}>AI SUMMARY</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>{activeSel.aiSummary}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                {activeSel.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', color: '#a855f7', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Call Transcript</h3>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Auto-transcribed · Accuracy 96.2%</p>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.01)' }}>
                {activeSel.transcript.map((line, i) => {
                  const isAI = line.speaker === 'AI';
                  return (
                    <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: isAI ? 'row' : 'row-reverse' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isAI ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 'rgba(255,255,255,0.07)', boxShadow: isAI ? '0 0 10px rgba(168,85,247,0.3)' : 'none', marginTop: '2px' }}>
                        {isAI ? <FaRobot size={11} style={{ color: 'white' }} /> : <FaUser size={11} style={{ color: '#94a3b8' }} />}
                      </div>
                      <div style={{ maxWidth: '78%' }}>
                        <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600, textAlign: isAI ? 'left' : 'right' }}>
                          {isAI ? 'Nebulanexus AI' : line.speaker}
                        </p>
                        <div style={{ padding: '10px 14px', borderRadius: isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px', fontSize: '13px', lineHeight: 1.6, background: isAI ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.05)', color: isAI ? '#c4b5fd' : '#e2e8f0', border: `1px solid ${isAI ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
                          {line.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b', fontSize: '14px' }}>
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
