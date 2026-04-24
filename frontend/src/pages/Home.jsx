import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Layers, BarChart3, Database } from 'lucide-react';

export default function Home() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="min-h-screen bg-background text-on-surface relative overflow-hidden lunar-bg font-body">
      {/* Decorative Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-12 py-10 backdrop-blur-xl bg-white/60 border-b border-outline-variant/50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter text-primary font-headline uppercase flex items-center gap-2"
        >
          <Sparkles size={18} className="text-accent" />
          SERENE | <span className="text-accent">CosmoPH</span>
        </motion.div>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
            <a href="#about" className="hover:text-accent transition-colors">Philosophy</a>
            <a href="#tda" className="hover:text-accent transition-colors">Logic</a>
            <a href="#docs" className="hover:text-accent transition-colors">Manifesto</a>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/dashboard" className="bg-primary text-on-primary px-10 py-4 rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500 font-headline font-bold text-[10px] uppercase tracking-[0.3em] inline-block shadow-lg">
              Launch Platform
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-10 pt-48 pb-40 px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-11">
            <motion.div variants={itemVars} className="inline-block px-5 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-12">
              Lunar Edition // v2.0
            </motion.div>
            
            <motion.h1 variants={itemVars} className="text-8xl lg:text-[11rem] font-headline font-bold tracking-tighter mb-16 leading-[0.8] text-primary uppercase">
              Beyond the <br/>
              <span className="text-accent italic">Visible</span> Noise
            </motion.h1>
            
            <motion.p variants={itemVars} className="text-3xl text-on-surface-variant max-w-3xl font-light leading-relaxed mb-20 italic">
              A high-fidelity topological lens for the primordial universe. We extract <span className="text-primary font-medium border-b-2 border-accent/20 pb-1">persistent signatures</span> from the cosmic microwave background.
            </motion.p>
            
            <motion.div variants={itemVars} className="flex flex-wrap gap-10">
              <Link to="/dashboard" className="bg-primary text-on-primary px-16 py-8 rounded-3xl hover:bg-black transition-all duration-700 font-headline font-bold text-xs uppercase tracking-[0.4em] inline-block shadow-2xl shadow-primary/10 hover:translate-y-[-4px]">
                Enter Workspace
              </Link>
              <button className="group border border-outline text-on-surface px-16 py-8 rounded-3xl hover:bg-surface transition-all duration-700 font-headline font-bold text-xs uppercase tracking-[0.4em] flex items-center gap-3">
                Theory Guide <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* High-Contrast Features */}
      <section className="relative z-10 px-12 max-w-7xl mx-auto mb-60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Topological Logic', icon: Database, desc: 'Geometric persistence of cosmic filaments.' },
            { title: 'Neural Synthesis', icon: Zap, desc: 'Deep-learned model classification.' },
            { title: 'Interactive Viz', icon: Layers, desc: 'Real-time high-dimensional mapping.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="p-12 bg-white rounded-[40px] border border-outline soft-shadow-hover group"
            >
              <div className="w-16 h-16 rounded-3xl bg-accent/5 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                <feature.icon size={24} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-headline font-bold text-2xl mb-5 text-primary uppercase tracking-tight">{feature.title}</h3>
              <p className="text-on-surface-variant text-base font-light leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-outline-variant bg-surface/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-12 py-24 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-xs font-headline font-bold tracking-[0.4em] text-on-surface-variant uppercase">
            © 2026 COSMO<span className="text-accent">PH</span> // Lunar Edition
          </div>
          <div className="flex gap-16 text-[10px] uppercase tracking-[0.4em] font-bold text-on-surface-variant">
            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            <a href="#" className="hover:text-accent transition-colors">Archive</a>
            <a href="#" className="hover:text-accent transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
