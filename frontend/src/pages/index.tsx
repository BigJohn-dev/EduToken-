import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Footer from '../components/Footer';

// Dynamic import: Three.js must not run on SSR
const Scene3D = dynamic(() => import('../components/Scene3D'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>EduToken — Transparent Education Funding on Stellar</title>
        <meta
          name="description"
          content="EduToken is an open-source protocol on the Stellar Network that brings transparency, stability, and automation to school fees and scholarship disbursement."
        />
        <meta property="og:title" content="EduToken — Education Funding on Stellar" />
        <meta property="og:description" content="Transparent, trustless, and instant school fee payments and scholarship disbursement powered by Soroban smart contracts." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      {/*
        ┌─────────────────────────────────────────────┐
        │  Fixed 3D canvas — persists through scroll  │
        │  z-index: 0, position: fixed                │
        └─────────────────────────────────────────────┘
      */}
      <Scene3D />

      {/*
        ┌─────────────────────────────────────────────┐
        │  HTML content — scrolls over the 3D canvas  │
        │  z-index: 10, position: relative            │
        └─────────────────────────────────────────────┘
      */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main>
          {/* Hero — transparent bg so 3D shines through */}
          <Hero />

          {/* Features — dark semi-transparent glass band */}
          <div style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.55) 10%, rgba(3,7,18,0.55) 90%, transparent 100%)' }}>
            <Features />
          </div>

          {/* How It Works */}
          <div style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.60) 8%, rgba(3,7,18,0.60) 92%, transparent 100%)' }}>
            <HowItWorks />
          </div>

          {/* Stats */}
          <div style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.65) 8%, rgba(3,7,18,0.65) 92%, transparent 100%)' }}>
            <Stats />
          </div>
        </main>

        {/* Footer — full dark background to close the page */}
        <div style={{ background: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(20px)' }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
