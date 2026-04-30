import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, ArrowLeft, Calendar } from 'lucide-react';

export default function Timeline() {
  const events = [
    { year: '2023', title: 'Project Inception', desc: 'Initial research into applying persistent homology to CMB data.' },
    { year: '2024', title: 'Algorithm Development', desc: 'Optimized lower-star filtration techniques for high-resolution HEALPix maps.' },
    { year: '2025', title: 'Machine Learning Integration', desc: 'Deployed Random Forest and SVM models to classify Betti curves.' },
    { year: '2026', title: 'Platform Launch', desc: 'Release of CosmoPH v2.0 with a minimal, high-performance web dashboard.' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col selection:bg-surface-variant selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-outline">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tight text-primary flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Atom className="text-primary" size={24} />
            CosmoPH
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-24">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight flex items-center gap-4">
            <Calendar size={40} className="text-secondary" />
            Project Timeline
          </h1>
          <p className="text-lg text-on-surface-variant">The evolution of the CosmoPH research platform.</p>
        </div>

        <div className="relative border-l border-outline ml-4 md:ml-6 space-y-12">
          {events.map((event, i) => (
            <div key={i} className="relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-1.5" />
              
              <div className="text-sm font-bold text-secondary mb-1 tracking-widest">{event.year}</div>
              <h3 className="text-2xl font-bold text-primary mb-3">{event.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {event.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
