import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Stats', href: '#stats' },
  { label: 'Docs', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vault-indigo to-vault-purple flex items-center justify-center shadow-glow-indigo group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="text-gradient">Edu</span>
            <span className="text-white">Token</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-vault-indigo to-vault-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="relative text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-vault-indigo to-vault-purple hover:opacity-90 active:scale-95 transition-all duration-200 shadow-glow-indigo">
            Launch App
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                <button className="flex-1 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-white/5 rounded-xl transition-all">
                  Sign In
                </button>
                <button className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-vault-indigo to-vault-purple rounded-xl">
                  Launch App
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
