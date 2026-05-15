import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: string;
  numericEnd: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
  borderColor: string;
}

const STATS: StatItem[] = [
  {
    value: '$0',
    numericEnd: 0,
    prefix: '$',
    suffix: '',
    label: 'Transaction Fees',
    sublabel: 'Every cent goes to education',
    color: '#22c55e',
    borderColor: '#22c55e40',
  },
  {
    value: '5s',
    numericEnd: 5,
    prefix: '',
    suffix: 's',
    label: 'Settlement Time',
    sublabel: 'Stellar Consensus Protocol',
    color: '#22d3ee',
    borderColor: '#22d3ee40',
  },
  {
    value: '100%',
    numericEnd: 100,
    prefix: '',
    suffix: '%',
    label: 'On-chain Transparency',
    sublabel: 'Every transaction is public',
    color: '#6366f1',
    borderColor: '#6366f140',
  },
  {
    value: '3',
    numericEnd: 3,
    prefix: '',
    suffix: '',
    label: 'Core Actors',
    sublabel: 'Donors · Schools · Parents',
    color: '#a855f7',
    borderColor: '#a855f740',
  },
];

function CountUp({ end, prefix = '', suffix = '', duration = 1500 }: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) { setCount(0); return; }
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end, duration]);

  return <>{`${prefix}${count}${suffix}`}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" ref={ref} className="relative section-transparent py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-vault-gold/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-vault-gold" />
            <span className="text-xs font-medium text-vault-gold uppercase tracking-widest">Why EduToken</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Protocol{' '}
            <span className="text-gradient">metrics</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Designed from the ground up for maximum efficiency, accessibility, and trust.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative glass rounded-3xl border p-8 text-center overflow-hidden card-hover"
              style={{ borderColor: stat.borderColor }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${stat.color}15 0%, transparent 70%)` }}
              />

              {/* Value */}
              <div
                className="font-display font-black text-5xl lg:text-6xl mb-3 leading-none"
                style={{ color: stat.color }}
              >
                {inView ? (
                  <CountUp
                    end={stat.numericEnd}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1200 + i * 200}
                  />
                ) : (
                  `${stat.prefix}0${stat.suffix}`
                )}
              </div>

              <div className="text-base font-semibold text-white mb-1.5">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sublabel}</div>

              {/* Bottom bar */}
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: stat.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Ecosystem comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass rounded-3xl border border-white/8 overflow-hidden"
        >
          <div className="p-6 border-b border-white/8">
            <h3 className="font-display font-bold text-lg text-white">Why Stellar over traditional payment rails?</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-4 text-xs font-medium text-vault-indigo uppercase tracking-wider text-center">EduToken</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Bank Transfer</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Other Crypto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Settlement Time', edu: '~5 seconds', bank: '1-3 business days', other: 'Minutes–Hours' },
                  { feature: 'Transaction Fee', edu: '< $0.001', bank: '$10–$50', other: '$2–$50' },
                  { feature: 'Transparency', edu: 'Fully On-chain', bank: 'Opaque', other: 'Varies' },
                  { feature: 'Stablecoin Support', edu: 'USDC / PYUSD', bank: 'No', other: 'Varies' },
                  { feature: 'Smart Conditions', edu: 'Proof of Enrollment', bank: 'No', other: 'Limited' },
                ].map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-6 py-3.5 text-sm text-slate-300">{row.feature}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-center" style={{ color: '#22c55e' }}>{row.edu}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 text-center">{row.bank}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 text-center">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
