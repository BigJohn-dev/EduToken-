module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        stellar: {
          50: "#f0f9ff",
          500: "#001a7f",
          900: "#000d2b",
        },
        vault: {
          indigo: "#6366f1",
          purple: "#a855f7",
          cyan: "#22d3ee",
          gold: "#f59e0b",
          pink: "#ec4899",
          green: "#22c55e",
          blue: "#3b82f6",
        },
        dark: {
          900: "#030712",
          800: "#0a0f1e",
          700: "#0f172a",
          600: "#1e293b",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-indigo': 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'border-beam': 'border-beam 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'border-beam': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'glow-indigo': '0 0 40px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.4)',
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.4)',
        'glow-gold': '0 0 40px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
