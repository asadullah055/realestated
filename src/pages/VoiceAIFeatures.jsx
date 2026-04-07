import { useState, useEffect } from 'react';
import { MdMic, MdVolumeUp, MdCheck, MdPlayArrow, MdPause, MdSpeed, MdLanguage, MdTune, MdBolt } from 'react-icons/md';
import { FaRobot, FaCog } from 'react-icons/fa';
import { ttsVoices, automationWorkflows } from '../data/mockData';
import useMediaQuery from '../hooks/useMediaQuery';

const card = {
  background: 'rgba(255,255,255,0.025)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
  padding: '24px',
};

const sttLangs = [
  { code: 'en-US', name: 'English (US)', acc: '98.1%', wer: '1.9%' },
  { code: 'en-GB', name: 'English (UK)', acc: '97.4%', wer: '2.6%' },
  { code: 'es-ES', name: 'Spanish', acc: '96.2%', wer: '3.8%' },
  { code: 'ar-AE', name: 'Arabic', acc: '95.7%', wer: '4.3%' },
];

const sttFeatures = [
  'Real-time transcription < 180 ms',
  'Real estate vocabulary optimised',
  'Dialect recognition · 16 regions',
  'Noise suppression SNR 40 dB',
  'Speaker diarisation (8 speakers)',
  'Sentiment & emotion detection',
  'Auto-punctuation & formatting',
  'Privacy-compliant · Enterprise-ready',
];

const demoSteps = [
  'Audio input detected ✓',
  'Noise filtering active …',
  'Speech recognition (en-US) …',
  '"What is the average price per sqm in this area?"',
  'Intent: Price Inquiry (96% confidence)',
  'Data lookup: global housing market …',
  'Response generated ✓',
];

const wfStatus = {
  active: { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)',  label: 'Active'  },
  paused: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)',  label: 'Paused'  },
};

function Waveform({ active }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { if (!active) return; const id = setInterval(() => setTick(t => t+1), 60); return () => clearInterval(id); }, [active]);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '48px' }}>
      {Array.from({ length: 40 }, (_, i) => {
        const base = 0.12;
        const h = active ? base + Math.abs(Math.sin((tick * 0.18) + i * 0.45)) * 0.88 : base + Math.sin(i * 0.4) * 0.1 + 0.12;
        return <div key={i} style={{ flex: 1, borderRadius: '2px', height: `${Math.max(8, h * 100)}%`, background: active ? `rgba(168,85,247,${0.3 + h * 0.7})` : 'rgba(255,255,255,0.07)', transition: active ? 'height 0.08s ease' : 'height 0.3s ease' }} />;
      })}
    </div>
  );
}

export default function VoiceAIFeatures() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(max-width: 1280px)');
  const [sttActive, setSttActive] = useState(false);
  const [step, setStep] = useState(0);
  const [selVoice, setSelVoice] = useState('v1');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsText, setTtsText] = useState('Welcome. Average prices in major global cities rose by 3.2% year-over-year. Demand remains strong for well-located properties with efficient financing options.');

  useEffect(() => {
    if (!sttActive) { setStep(0); return; }
    let s = 0;
    const id = setInterval(() => { if (s < demoSteps.length) { setStep(++s); } else clearInterval(id); }, 550);
    return () => clearInterval(id);
  }, [sttActive]);

  return (
    <div style={{ padding: isMobile ? '16px' : '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Hero banner ── */}
      <div style={{ padding: '24px 28px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.08) 40%, rgba(34,211,238,0.07) 100%)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(168,85,247,0.5)', flexShrink: 0 }}>
          <FaRobot size={22} style={{ color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.4px', background: 'linear-gradient(135deg, #f8fafc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Nebulanexus Voice AI Engine
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '3px' }}>Built for global real estate teams · Privacy-compliant · Enterprise-ready</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexShrink: 0, flexWrap: 'wrap' }}>
          {[{ v: '99.9%', l: 'Uptime' }, { v: '< 180 ms', l: 'Latency' }, { v: '16', l: 'Languages' }].map(m => (
            <div key={m.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#a855f7' }}>{m.v}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STT + TTS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: '20px' }}>

        {/* STT */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.4)' }}>
              <MdMic size={18} style={{ color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Speech-to-Text (STT)</h3>
              <p style={{ fontSize: '11px', color: '#94a3b8' }}>Real-time speech recognition</p>
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Demo</span>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', color: sttActive ? '#f87171' : '#94a3b8', background: sttActive ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.04)' }}>
                {sttActive ? '● REC' : '○ Inactive'}
              </span>
            </div>
            <Waveform active={sttActive} />
            <div style={{ minHeight: '100px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {demoSteps.slice(0, step).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', animation: 'fadeInUp 0.3s ease both' }}>
                  <MdCheck size={13} style={{ color: '#34d399', flexShrink: 0 }} />
                  <span style={{ color: i === 3 ? '#c084fc' : '#94a3b8', fontWeight: i === 3 ? 600 : 400 }}>{s}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setSttActive(!sttActive)} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'white', background: sttActive ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #a855f7, #6366f1)', boxShadow: sttActive ? '0 0 20px rgba(239,68,68,0.3)' : '0 0 20px rgba(168,85,247,0.3)', transition: 'all 0.2s' }}>
              {sttActive ? 'Stop Demo' : 'Start STT Demo'}
            </button>
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Supported Languages</p>
            {sttLangs.map(l => (
              <div key={l.code} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '12px' }}>
                <MdLanguage size={14} style={{ color: '#a855f7', flexShrink: 0 }} />
                <span style={{ flex: 1, color: '#94a3b8' }}>{l.name}</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>{l.acc}</span>
                <span style={{ color: '#64748b' }}>WER {l.wer}</span>
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Features</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px' }}>
              {sttFeatures.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#a855f7', marginTop: '4px', flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TTS */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'linear-gradient(135deg, #22d3ee, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(34,211,238,0.4)' }}>
              <MdVolumeUp size={18} style={{ color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Text-to-Speech (TTS)</h3>
              <p style={{ fontSize: '11px', color: '#94a3b8' }}>Natural speech synthesis</p>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Select Voice</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
              {ttsVoices.map(v => (
                <button type="button" key={v.id} onClick={() => setSelVoice(v.id)} style={{ padding: '12px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', border: `1px solid ${selVoice === v.id ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.06)'}`, background: selVoice === v.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.025)', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: selVoice === v.id ? 'linear-gradient(135deg, #22d3ee, #0891b2)' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'white' }}>{v.name[0]}</div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{v.name}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{v.accent}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '11px' }}>★</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{v.rating}</span>
                    <span style={{ fontSize: '10px', color: '#64748b', marginLeft: 'auto' }}>{v.usecase}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Speed', icon: MdSpeed, val: speed, setVal: setSpeed, min: 0.5, max: 2.0, step: 0.1, unit: 'x', color: '#22d3ee' },
              { label: 'Pitch', icon: MdTune,  val: pitch, setVal: setPitch, min: 0.5, max: 1.5, step: 0.1, unit: '',  color: '#a855f7' },
            ].map(control => (
              <div key={control.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><control.icon size={12} />{control.label}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: control.color }}>{control.val.toFixed(1)}{control.unit}</span>
                </div>
                <input type="range" min={control.min} max={control.max} step={control.step} value={control.val} onChange={e => control.setVal(+e.target.value)} style={{ width: '100%', accentColor: control.color }} />
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Sample Text</p>
            <textarea value={ttsText} onChange={e => setTtsText(e.target.value)} rows={3} style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#94a3b8', fontSize: '13px', lineHeight: 1.6, outline: 'none', resize: 'none' }} />
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.2)' }}>
            {ttsPlaying && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '28px', marginBottom: '12px' }}>
                {Array.from({ length: 32 }, (_, i) => {
                  const h = 0.2 + Math.abs(Math.sin(i * 0.6)) * 0.8;
                  return <div key={i} style={{ flex: 1, borderRadius: '2px', height: `${h * 100}%`, background: `rgba(34,211,238,${0.3 + h * 0.7})`, animation: `pulseGlow ${0.4 + (i % 3) * 0.15}s ease-in-out infinite alternate` }} />;
                })}
              </div>
            )}
            <button type="button" onClick={() => setTtsPlaying(!ttsPlaying)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'white', background: 'linear-gradient(135deg, #22d3ee, #0891b2)', boxShadow: '0 0 20px rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {ttsPlaying ? <><MdPause size={17} />Stop</> : <><MdPlayArrow size={17} />Play</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Automation Workflows ── */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'linear-gradient(135deg, #34d399, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(52,211,153,0.4)' }}>
            <MdBolt size={18} style={{ color: 'white' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Automation Workflows</h3>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>AI-driven process automation</p>
          </div>
          <button type="button" style={{ marginLeft: 'auto', fontSize: '12px', padding: '7px 14px', borderRadius: '10px', border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.08)', color: '#34d399', cursor: 'pointer', fontWeight: 600 }}>
            + New Workflow
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: '14px' }}>
          {automationWorkflows.map(wf => {
            const st = wfStatus[wf.status];
            return (
              <div key={wf.id} style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: st.color, boxShadow: `0 0 6px ${st.color}`, flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>{wf.name}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', marginLeft: '14px' }}>Trigger: {wf.trigger}</p>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', color: st.color, background: st.bg, border: `1px solid ${st.border}`, flexShrink: 0 }}>{st.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {wf.steps.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: '#64748b', fontWeight: 500 }}>{s}</span>
                      {i < wf.steps.length - 1 && <span style={{ fontSize: '10px', color: '#64748b' }}>→</span>}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px' }}>
                  <span style={{ color: '#64748b' }}>{wf.runs.toLocaleString('en-US')} runs</span>
                  <span style={{ fontWeight: 700, color: wf.successRate > 90 ? '#34d399' : '#fbbf24' }}>{wf.successRate}% success</span>
                  <button type="button" aria-label={`Configure ${wf.name}`} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <FaCog size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
