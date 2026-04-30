import { Link } from 'react-router-dom';
import { Database, Activity, Layers, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-outline-variant bg-white">
        <div className="text-xl font-bold tracking-tight text-primary">
          CosmoPH
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-sm font-medium text-on-surface-variant">
            <a href="#about" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#tda" className="hover:text-primary transition-colors">Research</a>
            <a href="#github" className="hover:text-primary transition-colors">GitHub</a>
          </div>
          <Link to="/dashboard" className="bg-primary text-on-primary px-5 py-2.5 rounded-md hover:bg-black transition-colors text-sm font-medium">
            Open Platform
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="px-8 py-24 md:py-32 max-w-5xl mx-auto w-full">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
            Research Preview
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 leading-tight">
            Topological Analysis for Cosmology.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            A specialized computing environment designed to detect non-Gaussian signatures in the cosmic microwave background using persistent homology.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-accent text-on-accent px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm">
              Launch Platform <ArrowRight size={18} />
            </Link>
            <a href="#docs" className="bg-surface text-primary border border-outline px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Read Documentation
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-surface border-t border-outline-variant py-24 flex-1">
          <div className="px-8 max-w-5xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-primary mb-12">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Data Processing', icon: Database, desc: 'Automated ingestion and preprocessing of high-resolution HEALPix cosmic microwave background maps.' },
                { title: 'Persistent Homology', icon: Layers, desc: 'Compute Betti numbers and generate persistence diagrams to extract robust topological features.' },
                { title: 'Neural Classification', icon: Activity, desc: 'Machine learning inference to distinguish standard models from non-Gaussian inflationary scenarios.' }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-lg border border-outline shadow-sm flex flex-col">
                  <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-6">
                    <feature.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">{feature.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-white py-8 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-on-surface-variant">
            © 2026 CosmoPH Research Project
          </div>
          <div className="flex gap-6 text-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
