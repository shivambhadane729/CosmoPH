import { Link } from 'react-router-dom';
import { Database, Activity, Layers, ArrowRight, BookOpen, Atom } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col selection:bg-accent/30 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-outline">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Atom className="text-accent" size={24} />
            CosmoPH
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-sm font-medium text-on-surface-variant">
              <a href="#docs" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#research" className="hover:text-primary transition-colors">Research</a>
              <a href="#github" className="hover:text-primary transition-colors">GitHub</a>
            </div>
            <Link to="/dashboard" className="bg-primary text-on-primary px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm font-semibold shadow-[0_0_15px_rgba(248,250,252,0.3)]">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col pt-20">
        
        {/* Hero Section */}
        <section className="relative px-6 py-32 md:py-48 flex-1 flex flex-col items-center justify-center text-center overflow-hidden cosmic-gradient border-b border-outline">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Platform v2.0 Live
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-primary mb-8 max-w-5xl leading-[1.1]">
            Mapping the Topology of the <span className="text-primary">Early Universe.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12">
            A high-performance computing environment that applies persistent homology to Cosmic Microwave Background maps, detecting primordial non-Gaussian signatures that standard statistics miss.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard" className="bg-primary text-on-primary px-8 py-4 rounded-full hover:scale-105 transition-transform font-semibold flex items-center gap-2 shadow-[0_0_30px_rgba(248,250,252,0.1)]">
              Enter Workspace <ArrowRight size={18} />
            </Link>
            <a href="#research" className="bg-surface text-primary border border-outline px-8 py-4 rounded-full hover:bg-outline/50 transition-colors font-semibold">
              Read the Science
            </a>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="px-6 py-32 max-w-6xl mx-auto w-full border-b border-outline">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4">The Science</div>
              <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Detecting the invisible with Algebraic Topology.</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                Standard cosmological analysis relies heavily on power spectra and bispectra. However, models of cosmic inflation predict subtle, complex spatial patterns—primordial non-Gaussianities—that these two-point and three-point statistics fail to fully capture.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                CosmoPH uses <strong>Topological Data Analysis (TDA)</strong> to compute the Betti numbers and persistence diagrams of CMB temperature fluctuations. By analyzing the "shape" of the data (connected components and loops), we train ML models to identify specific inflationary scenarios with unprecedented sensitivity.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Lower-Star Filtration', desc: 'Sweeping through temperature thresholds to track topological birth and death.' },
                { title: 'Persistence Diagrams', desc: 'Plotting H0 and H1 features to visualize the lifespan of cosmic structures.' },
                { title: 'Betti Curves', desc: 'Condensing complex persistence data into functional forms for ML ingestion.' },
                { title: 'Neural Inference', desc: 'Classifying models via Random Forests and SVMs trained on topological vectors.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-surface border border-outline rounded-2xl hover:border-accent/50 transition-colors">
                  <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs" className="bg-surface/50 py-32 border-b border-outline">
          <div className="px-6 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4 tracking-tight">Quick Start Guide</h2>
              <p className="text-on-surface-variant text-lg">Running your first topological analysis is simple.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload FITS Map', desc: 'Provide a HEALPix format CMB temperature map, or select our pre-configured Planck PR4 sample dataset.', icon: Database },
                { step: '02', title: 'Run Compute', desc: 'The Python backend executes the Scikit-TDA pipeline in an isolated container, extracting topological features.', icon: Activity },
                { step: '03', title: 'Analyze Results', desc: 'Interact with the generated Persistence Diagrams and review the neural network’s inflation classification.', icon: Layers }
              ].map((step, i) => (
                <div key={i} className="relative p-8 bg-background border border-outline rounded-3xl">
                  <div className="text-5xl font-bold text-outline-variant absolute top-6 right-6 opacity-20">{step.step}</div>
                  <step.icon size={32} className="text-accent mb-6" />
                  <h3 className="font-bold text-xl text-primary mb-3">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub / Open Source Section */}
        <section id="github" className="px-6 py-32 max-w-4xl mx-auto w-full text-center">
          <div className="w-20 h-20 bg-surface border border-outline rounded-3xl flex items-center justify-center mx-auto mb-8">
            <GithubIcon size={40} className="text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Built for Open Science.</h2>
          <p className="text-on-surface-variant text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            CosmoPH is entirely open-source. We believe that advancing cosmology requires transparent, reproducible pipelines that anyone can run without needing an HPC cluster.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/shivambhadane729/CosmoPH" target="_blank" rel="noreferrer" className="bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-gray-200 transition-colors font-semibold flex items-center gap-3">
              <GithubIcon size={20} /> View on GitHub
            </a>
            <a href="#docs" className="bg-surface text-primary border border-outline px-8 py-4 rounded-full hover:bg-outline/50 transition-colors font-semibold flex items-center gap-2">
              <BookOpen size={20} /> Read Docs
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
            <Atom size={16} /> © 2026 CosmoPH Research Platform
          </div>
          <div className="flex gap-8 text-sm font-medium text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
