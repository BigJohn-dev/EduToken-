import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'vault-gold',
    colorHex: '#f59e0b',
    shadowClass: 'shadow-glow-gold',
    title: 'Scholarship Pools',
    subtitle: 'Conditional & Trustless',
    description:
      'Donors lock funds on-chain into EduVault escrow. Funds release automatically only when a verified Proof of Enrollment is submitted — zero manual intervention, full traceability.',
    tags: ['Escrow', 'Conditional Release', 'On-chain Proof'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round"/>
        <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
      </svg>
    ),
    color: 'vault-cyan',
    colorHex: '#06b6d4',
    shadowClass: 'shadow-glow-cyan',
    title: 'Smart Invoicing',
    subtitle: 'Automated Fee Management',
    description:
      'Schools generate on-chain invoices directly to parent wallets. Parents pay in stablecoins (USDC/PYUSD), protecting value from currency volatility — no banks, no delays.',
    tags: ['USDC Stablecoins', 'Auto-billing', 'Wallet-to-Wallet'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round"/>
      </svg>
    ),
    color: 'vault-purple',
    colorHex: '#a855f7',
    shadowClass: 'shadow-glow-purple',
    title: 'Proof of Enrollment',
    subtitle: 'Non-transferable Credential',
    description:
      'Schools issue soulbound on-chain enrollment credentials (NFT-like, non-transferable). These serve as tamper-proof receipts that unlock scholarship disbursements automatically.',
    tags: ['Soulbound Token', 'Non-transferable', 'Stellar Native'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="relative section-transparent py-28 lg:py-36">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-vault-indigo/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-vault-purple/5 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-vault-purple/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-vault-purple" />
            <span className="text-xs font-medium text-vault-purple uppercase tracking-widest">Core Protocol</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Three pillars of{' '}
            <span className="text-gradient">transparent</span>
            <br />education funding
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            EduToken's smart contract architecture connects donors, schools, and parents in a trustless, automated financial ecosystem built on Stellar.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="group relative rounded-3xl glass border border-white/8 p-8 card-hover overflow-hidden"
            >
              {/* Top glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.colorHex}, transparent)` }}
              />

              {/* Background shimmer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: `radial-gradient(ellipse at top, ${feat.colorHex}12 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feat.shadowClass}`}
                style={{ background: `linear-gradient(135deg, ${feat.colorHex}20, ${feat.colorHex}10)`, border: `1px solid ${feat.colorHex}30`, color: feat.colorHex }}
              >
                {feat.icon}
              </div>

              {/* Content */}
              <div className="mb-2 text-xs font-medium uppercase tracking-widest" style={{ color: feat.colorHex }}>
                {feat.subtitle}
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">{feat.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {feat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: `${feat.colorHex}15`,
                      color: feat.colorHex,
                      border: `1px solid ${feat.colorHex}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.colorHex}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500">
            All logic runs on{' '}
            <span className="text-vault-indigo font-medium">EduVault</span>
            {' '}— a Soroban smart contract deployed on Stellar Testnet &amp; Mainnet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
