import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const BADGE_ITEMS = ['Soroban Smart Contracts', 'USDC Stablecoin', 'Freighter Wallet'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orb backgrounds (HTML-side depth) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-vault-indigo/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-vault-cyan/8 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-16">
        {/* Stellar badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-vault-indigo/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse-glow" />
          <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
            Built on Stellar &bull; Powered by Soroban
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Education</span>
          <br />
          <span className="text-gradient">Funding</span>
          <span className="text-white">, Reimagined.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-10"
        >
          EduToken is an open-source protocol on the Stellar Network that brings{' '}
          <span className="text-slate-200 font-medium">transparency, stability, and automation</span>{' '}
          to school fees and scholarship disbursement — on-chain, trustless, and instant.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-vault-indigo via-vault-purple to-vault-cyan text-white font-semibold text-base shadow-glow-indigo hover:scale-105 active:scale-95 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Launch App
            <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-slate-300 hover:text-white font-medium text-base hover:border-white/20 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3" strokeLinecap="round"/>
            </svg>
            See How It Works
          </a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {BADGE_ITEMS.map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-lg glass text-xs font-medium text-slate-400 border border-white/6"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-vault-indigo" />
          </motion.div>
        </motion.div>

        {/* Floating stats strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg"
        >
          <div className="glass rounded-2xl p-4 border border-white/8 flex items-center justify-around">
            {[
              { label: 'Transaction Fees', value: '$0' },
              { label: 'Settlement', value: 'Instant' },
              { label: 'Transparency', value: '100%' },
              { label: 'Open Source', value: 'MIT' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-gradient font-display">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
