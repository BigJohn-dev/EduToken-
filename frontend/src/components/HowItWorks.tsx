import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    actor: 'Donor',
    actorColor: '#f59e0b',
    title: 'Fund the Scholarship Pool',
    description:
      'A donor connects their Freighter wallet and deposits stablecoins (USDC/PYUSD) into EduVault. Funds are locked in the smart contract until conditions are met.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    actor: 'School',
    actorColor: '#06b6d4',
    title: 'Issue Smart Invoice',
    description:
      'The school authenticates and generates an on-chain invoice specifying fee amount, student ID, and parent wallet address. The invoice is immutably stored on Stellar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    actor: 'Parent',
    actorColor: '#a855f7',
    title: 'Pay in Stablecoins',
    description:
      'The parent receives the invoice in their wallet, reviews it, and pays directly in stablecoins — no currency conversion risk, no bank delays, settled in seconds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" strokeLinecap="round"/>
        <path d="M1 10h22" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    actor: 'Protocol',
    actorColor: '#22c55e',
    title: 'Proof Minted, Funds Released',
    description:
      'Upon payment, the school issues a soulbound Proof of Enrollment credential. EduVault verifies it on-chain and automatically releases the matching scholarship funds to the school.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" ref={ref} className="relative section-transparent py-28 lg:py-36">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-vault-cyan/5 blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-vault-indigo/5 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-vault-cyan/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-vault-cyan animate-pulse" />
            <span className="text-xs font-medium text-vault-cyan uppercase tracking-widest">Protocol Flow</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            How it{' '}
            <span className="text-gradient">works</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400">
            Four on-chain steps from donation to enrollment — fully automated, fully transparent.
          </p>
        </motion.div>

        {/* Steps — desktop: horizontal timeline, mobile: vertical */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector arrow (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px z-10 pointer-events-none" style={{ width: 'calc(100% - 2.5rem)', left: '2.5rem' }}>
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${step.actorColor}60, ${STEPS[i + 1].actorColor}40)` }} />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600">
                    <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2">
                      <path d="M1 4h6M4 1l3 3-3 3" stroke={STEPS[i + 1].actorColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}

              <div className="glass rounded-3xl border border-white/8 p-7 h-full card-hover group">
                {/* Step number + icon row */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${step.actorColor}20, ${step.actorColor}08)`,
                      border: `1px solid ${step.actorColor}30`,
                      color: step.actorColor,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-4xl font-display font-black text-white/8 leading-none">{step.number}</div>
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mt-0.5"
                      style={{ color: step.actorColor }}
                    >
                      {step.actor}
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.actorColor}50, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Protocol note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 mx-auto max-w-2xl glass rounded-2xl p-6 border border-white/8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-vault-green animate-pulse" />
            <span className="text-sm font-semibold text-vault-green">Zero Custodial Risk</span>
          </div>
          <p className="text-sm text-slate-400">
            At no point does EduToken hold your funds. All transactions flow directly between wallets through the{' '}
            <span className="text-white font-medium">EduVault</span> smart contract — immutable code, not human custody.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
