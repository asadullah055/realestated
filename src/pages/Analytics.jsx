import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts';
import {
  weeklyPerformance, conversionFunnel, intentDistribution,
  rentalData, interestRateData, constructionData,
} from '../data/mockData';
import useMediaQuery from '../hooks/useMediaQuery';

const card = {
  background: 'rgba(255,255,255,0.025)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
  padding: '24px',
};

function Tip({ active, payload, label, prefix = '', suffix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(10,14,30,0.95)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '14px', padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{p.name}:</span>
          <span style={{ fontSize: '12px', color: '#f1f5f9', fontWeight: 700 }}>{prefix}{typeof p.value === 'number' ? p.value.toLocaleString('en-US') : p.value}{suffix}</span>
        </div>
      ))}
    </div>
  );
}

function FunnelViz() {
  const max = conversionFunnel[0].count;
  const colors = ['#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {conversionFunnel.map((s, i) => {
        const w = (s.count / max) * 100;
        const next = conversionFunnel[i + 1];
        return (
          <div key={s.stage}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{s.stage}</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{s.count.toLocaleString('en-US')}</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: colors[i], minWidth: '36px', textAlign: 'right' }}>{s.pct}%</span>
              </div>
            </div>
            <div style={{ height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${w}%`, borderRadius: '8px', background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}88)`, display: 'flex', alignItems: 'center', padding: '0 12px', boxShadow: `0 0 12px ${colors[i]}40` }}>
                {w > 22 && <span style={{ fontSize: '11px', color: 'white', fontWeight: 600 }}>{s.count.toLocaleString('en-US')}</span>}
              </div>
            </div>
            {next && (
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '3px', paddingLeft: '4px' }}>
                → {((next.count / s.count) * 100).toFixed(0)}% pass-through
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const radarData = [
  { subject: 'STT Accuracy',    A: 95 },
  { subject: 'TTS Quality',     A: 88 },
  { subject: 'Intent Detect.',  A: 91 },
  { subject: 'Lead Quality',    A: 78 },
  { subject: 'Conversion',      A: 72 },
  { subject: 'Satisfaction',    A: 88 },
];

export default function Analytics() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(max-width: 1280px)');

  const kpis = [
    { label: 'STT Accuracy',    value: '95.2%',   change: '+1.8pp', pos: true,  color: '#a855f7' },
    { label: 'Satisfaction',    value: '4.4 / 5', change: '+0.3',   pos: true,  color: '#34d399' },
    { label: 'Conversion Rate', value: '4.0%',    change: '+0.8pp', pos: true,  color: '#fbbf24' },
    { label: 'Avg. Handle Time', value: '4:12 min', change: '-0:28', pos: true, color: '#22d3ee' },
  ];

  return (
    <div style={{ padding: isMobile ? '16px' : '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── KPI row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: '16px' }}>
        {kpis.map(k => (
          <div key={k.label} style={{ ...card, padding: '20px', position: 'relative', overflow: 'hidden', borderTop: `2px solid ${k.color}` }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${k.color}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>{k.label}</p>
            <p style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.4px', background: `linear-gradient(135deg, #f8fafc, ${k.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' }}>{k.value}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', color: k.pos ? '#34d399' : '#f87171', background: k.pos ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)' }}>{k.change}</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>vs. last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Funnel + Radar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: '20px' }}>
        <div style={card}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Conversion Funnel</h2>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Voice AI → Closed deal · 12,480 queries / month</p>
          </div>
          <FunnelViz />
        </div>

        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>AI System Performance</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Multi-dimensional scoring</p>
          <ResponsiveContainer width="100%" height={270}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Inter' }} />
              <Radar name="Score" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.18} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Weekly performance + Intent ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>Weekly Performance</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '20px' }}>Accuracy & query volume</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyPerformance} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barGap={4}>
              <defs>
                <linearGradient id="wkG1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#a855f720" /></linearGradient>
                <linearGradient id="wkG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#22d3ee20" /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="l" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[85,100]} />
              <YAxis yAxisId="r" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ paddingTop: '16px' }} />
              <Bar yAxisId="l" dataKey="accuracy" name="Accuracy %"  fill="url(#wkG1)" radius={[5,5,0,0]} />
              <Bar yAxisId="r" dataKey="queries"  name="Queries"     fill="url(#wkG2)" radius={[5,5,0,0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>Intent Distribution</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>Voice queries by intent</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={intentDistribution} cx="50%" cy="50%" innerRadius={46} outerRadius={72} dataKey="value" strokeWidth={0} paddingAngle={2}>
                {intentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'rgba(10,14,30,0.95)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {intentDistribution.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 6px ${item.color}` }} />
                <span style={{ fontSize: '11px', color: '#94a3b8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: item.color }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Market charts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1fr 1fr 1fr'), gap: '20px' }}>

        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '2px' }}>Interest Rate Trend</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '18px' }}>Mortgage financing & global benchmark</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={interestRateData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="rate"    name="Mortgage"  stroke="#a855f7" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke="#22d3ee" strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '2px' }}>Building Permits</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '18px' }}>Approved vs. Completed (thousands)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={constructionData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barGap={3}>
              <defs>
                <linearGradient id="cG1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#a855f720" /></linearGradient>
                <linearGradient id="cG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#6366f120" /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="approved"  name="Approved"  fill="url(#cG1)" radius={[4,4,0,0]} />
              <Bar dataKey="completed" name="Completed" fill="url(#cG2)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '2px' }}>Rental Prices</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>$ / sqm rent & gross yield</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {rentalData.map((r, i) => (
              <div key={r.city} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: '#64748b', width: '14px', textAlign: 'right', flexShrink: 0 }}>{i+1}</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', width: '72px', fontWeight: 500, flexShrink: 0 }}>{r.city}</span>
                <div style={{ flex: 1, height: '18px', borderRadius: '99px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(r.rent / 22) * 100}%`, borderRadius: '99px', background: 'linear-gradient(90deg, #a855f7, #6366f1)', boxShadow: '0 0 6px rgba(168,85,247,0.3)' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#e2e8f0', width: '46px', textAlign: 'right', flexShrink: 0 }}>${r.rent}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, width: '32px', textAlign: 'right', flexShrink: 0, color: r.yield > 4.5 ? '#34d399' : r.yield > 4.0 ? '#fbbf24' : '#64748b' }}>{r.yield}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
