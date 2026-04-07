import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { MdTrendingUp, MdHome, MdAttachMoney, MdPercent, MdMic, MdAutoAwesome } from 'react-icons/md';
import { FaLightbulb, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';
import MetricCard from '../components/MetricCard';
import useMediaQuery from '../hooks/useMediaQuery';
import {
  cityPriceData, salesVolumeData, intentDistribution,
  voiceQueryData, economicIndicators, aiInsights,
} from '../data/mockData';

const card = {
  background: 'rgba(255,255,255,0.025)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
  padding: '24px',
};

const sectionTitle = { fontSize: '14px', fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.2px' };
const sectionSub   = { fontSize: '11px', color: '#94a3b8', marginTop: '2px' };

const CITY_SERIES = [
  { key: 'NewYork', color: '#a78bfa' },
  { key: 'London', color: '#4f7cff' },
  { key: 'Singapore', color: '#22d3ee' },
  { key: 'Dubai', color: '#34d399' },
  { key: 'Sydney', color: '#fbbf24' },
  { key: 'Toronto', color: '#f472b6' },
];

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

function PriceTrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a, b) => b.value - a.value);

  return (
    <div style={{ minWidth: '210px', background: 'linear-gradient(155deg, rgba(10,16,32,0.97), rgba(8,20,40,0.95))', border: '1px solid rgba(96,165,250,0.28)', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 10px 30px rgba(2,6,23,0.55)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <p style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700 }}>{label}</p>
        <span style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700, padding: '2px 7px', borderRadius: '999px', background: 'rgba(59,130,246,0.14)' }}>/sqm</span>
      </div>
      {sorted.map((p) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0, boxShadow: `0 0 10px ${p.color}66` }} />
          <span style={{ fontSize: '12px', color: '#94a3b8', flex: 1 }}>{p.name}</span>
          <span style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 700 }}>${p.value.toLocaleString('en-US')}</span>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ insight }) {
  const cfg = {
    opportunity: { Icon: FaLightbulb,          color: '#34d399', border: 'rgba(52,211,153,0.2)',  label: 'Opportunity', bg: 'rgba(52,211,153,0.06)'  },
    warning:     { Icon: FaExclamationTriangle, color: '#fbbf24', border: 'rgba(251,191,36,0.2)',  label: 'Warning',     bg: 'rgba(251,191,36,0.06)'  },
    trend:       { Icon: FaChartLine,           color: '#a855f7', border: 'rgba(168,85,247,0.25)', label: 'Trend',       bg: 'rgba(168,85,247,0.06)'  },
  }[insight.type];
  const { Icon } = cfg;

  return (
    <div style={{ padding: '14px', borderRadius: '14px', background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', gap: '12px' }}>
      <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `${cfg.color}18`, border: `1px solid ${cfg.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
        <Icon size={12} style={{ color: cfg.color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', color: cfg.color, background: `${cfg.color}18`, letterSpacing: '0.04em' }}>{cfg.label}</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>{insight.city}</span>
          <span style={{ fontSize: '10px', color: cfg.color, marginLeft: 'auto', fontWeight: 600 }}>{insight.confidence}% AI</span>
        </div>
        <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px', lineHeight: 1.4 }}>{insight.title}</p>
        <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.6 }}>{insight.body}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(max-width: 1280px)');
  const latestCityPoint = cityPriceData[cityPriceData.length - 1];
  const priceTrendCard = {
    ...card,
    padding: isMobile ? '18px' : '24px',
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'linear-gradient(152deg, rgba(9,17,33,0.96) 0%, rgba(4,13,28,0.94) 56%, rgba(10,28,50,0.88) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 38px rgba(2,6,23,0.48)',
  };

  return (
    <div style={{ padding: isMobile ? '16px' : '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Welcome banner ── */}
      <div style={{ padding: '20px 24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(34,211,238,0.06) 100%)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.4px', background: 'linear-gradient(135deg, #f8fafc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Good Morning, Jana 👋
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Global Real Estate Market · Real-Time AI Analysis · April 2025</p>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[{ v: '↑ 3.2%', l: 'Price Index', c: '#34d399' }, { v: '48,291', l: 'Voice Queries', c: '#a855f7' }, { v: '4.0%', l: 'Conversion Rate', c: '#22d3ee' }].map(m => (
            <div key={m.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: m.c }}>{m.v}</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: '16px' }}>
        <MetricCard title="Avg. Purchase Price"       value="$6,240/sqm" change="+3.2%"   positive subtitle="Global tracked markets" icon={MdHome}        accent="#a855f7" />
        <MetricCard title="Sales Volume"              value="15,800"      change="+8.4%"   positive subtitle="Transactions / month"  icon={MdTrendingUp}  accent="#6366f1" />
        <MetricCard title="Avg. Rental Yield"         value="4.1%"        change="-0.2pp"  positive={false} subtitle="Major city average" icon={MdPercent}   accent="#22d3ee" />
        <MetricCard title="Mortgage Rate (10Y)"       value="3.42%"       change="-0.13pp" positive subtitle="Effective rate avg."   icon={MdAttachMoney} accent="#34d399" />
      </div>

      {/* ── Price trend + AI Insights ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={priceTrendCard}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ ...sectionTitle, fontSize: '22px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.4px' }}>Price Trends by City</h2>
              <p style={{ ...sectionSub, fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>$ / sqm purchase prices · Jan-Dec 2025</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '9px', color: '#93c5fd', background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(96,165,250,0.3)' }}>12 Months</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '9px', color: '#34d399', background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.3)' }}>YoY +3.2%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <LineChart data={cityPriceData} margin={{ top: 8, right: 10, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 5" stroke="rgba(148,163,184,0.14)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickMargin={8} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} tickMargin={8} />
              <Tooltip cursor={{ stroke: 'rgba(148,163,184,0.45)', strokeWidth: 1.2, strokeDasharray: '4 4' }} content={<PriceTrendTooltip />} />
              {CITY_SERIES.map(series => (
                <Line
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  stroke={series.color}
                  strokeWidth={series.key === 'NewYork' ? 3.2 : 2.3}
                  dot={false}
                  activeDot={{ r: series.key === 'NewYork' ? 6 : 5, fill: series.color, stroke: '#e2e8f0', strokeWidth: 2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={series.key === 'NewYork' ? 1 : 0.9}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, minmax(0, 1fr))', gap: '8px', marginTop: '12px' }}>
            {CITY_SERIES.map(series => (
              <div key={series.key} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', borderRadius: '9px', background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.15)' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: series.color, boxShadow: `0 0 10px ${series.color}66`, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#cbd5e1', flex: 1 }}>{series.key}</span>
                <span style={{ fontSize: '11px', color: '#f8fafc', fontWeight: 700 }}>${latestCityPoint[series.key].toLocaleString('en-US')}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(99,102,241,0.2))', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MdAutoAwesome size={15} style={{ color: '#c084fc' }} />
            </div>
            <div>
              <h2 style={sectionTitle}>AI Market Insights</h2>
              <p style={sectionSub}>Real-time analysis</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
            {aiInsights.map(i => <InsightCard key={i.id} insight={i} />)}
          </div>
        </div>
      </div>

      {/* ── Sales volume + Voice analytics ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={card}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={sectionTitle}>Sales Volume by Segment</h2>
            <p style={sectionSub}>Transactions 2025 · Existing / New Build / Commercial</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesVolumeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barGap={3}>
              <defs>
                <linearGradient id="barG1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#a855f720" /></linearGradient>
                <linearGradient id="barG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#6366f120" /></linearGradient>
                <linearGradient id="barG3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#22d3ee20" /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ paddingTop: '16px' }} />
              <Bar dataKey="Existing"   fill="url(#barG1)" radius={[4,4,0,0]} />
              <Bar dataKey="New Build"  fill="url(#barG2)" radius={[4,4,0,0]} />
              <Bar dataKey="Commercial" fill="url(#barG3)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(168,85,247,0.4)' }}>
              <MdMic size={16} style={{ color: 'white' }} />
            </div>
            <div>
              <h2 style={sectionTitle}>Voice Analytics</h2>
              <p style={sectionSub}>Today · Live</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Queries',     value: '48,291', color: '#a855f7' },
              { label: 'Accuracy',    value: '95.2%',  color: '#34d399' },
              { label: 'Conversion',  value: '4.0%',   color: '#fbbf24' },
              { label: 'Avg. Handle', value: '4:12',   color: '#22d3ee' },
            ].map(m => (
              <div key={m.label} style={{ padding: '12px', borderRadius: '12px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: m.color, letterSpacing: '-0.3px' }}>{m.value}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px', fontWeight: 500 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Intent Distribution</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ResponsiveContainer width="45%" height={90}>
                <PieChart>
                  <Pie data={intentDistribution} cx="50%" cy="50%" innerRadius={24} outerRadius={40} dataKey="value" strokeWidth={0}>
                    {intentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {intentDistribution.slice(0,4).map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '10px', color: '#94a3b8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Economic indicators + Voice timeline ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: '20px' }}>
        <div style={card}>
          <h2 style={{ ...sectionTitle, marginBottom: '4px' }}>Economic Indicators</h2>
          <p style={{ ...sectionSub, marginBottom: '16px' }}>Macroeconomic conditions · Global</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
            {economicIndicators.map(ind => (
              <div key={ind.name} style={{ padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ind.name}</p>
                <p style={{ fontSize: '17px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>{ind.value}</p>
                <span style={{ fontSize: '11px', fontWeight: 600, color: ind.positive ? '#34d399' : '#f87171' }}>{ind.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={sectionTitle}>Voice Queries per Hour</h2>
            <p style={sectionSub}>Today's traffic pattern</p>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={voiceQueryData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="vqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip suffix=" queries" />} />
              <Area type="monotone" dataKey="queries" name="Queries" stroke="#a855f7" strokeWidth={2.5} fill="url(#vqGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
