import { motion } from 'framer-motion';

const LINKS = {
  Protocol: ['Scholarship Pools', 'Smart Invoicing', 'Proof of Enrollment', 'EduVault Contract'],
  Developers: ['Documentation', 'GitHub', 'Smart Contracts', 'Testnet'],
  Community: ['Discord', 'Twitter / X', 'Contributing', 'Roadmap'],
};

export default function Footer() {
  return (
    <footer className="relative section-transparent border-t border-white/8">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-vault-indigo/60 to-transparent" />

      {/* Newsletter CTA */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 border border-vault-indigo/20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 70%)'
            }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vault-indigo/15 border border-vault-indigo/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-vault-indigo animate-pulse" />
                <span className="text-xs text-vault-indigo font-medium">Early Access</span>
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                Be first to the <span className="text-gradient">EduVault</span>
              </h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
                Join the waitlist for early access to EduToken. Get notified when we go live on Stellar Mainnet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-xl glass border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-vault-indigo/50 transition-colors"
                />
                <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-vault-indigo to-vault-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vault-indigo to-vault-purple flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-gradient">Edu</span>
                <span className="text-white">Token</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
              An open-source protocol on the Stellar Network bringing transparency, stability, and automation to education funding worldwide.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/BigJohn-dev/EduToken-',
                  icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                },
                { label: 'Twitter', href: '#',
                  icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-5">{section}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} EduToken. Distributed under the MIT License.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-600">Built by</span>
            <a
              href="https://github.com/BigJohn-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-vault-indigo transition-colors ml-1 font-medium"
            >
              John Imeobong
            </a>
            <span className="text-xs text-slate-600 mx-2">&bull;</span>
            <span className="text-xs text-slate-600">Powered by</span>
            <span className="text-xs text-vault-indigo font-medium ml-1">Stellar Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
