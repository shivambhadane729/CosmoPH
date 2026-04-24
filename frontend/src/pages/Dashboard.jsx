import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Plot from 'react-plotly.js'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Database, 
  Settings, 
  BarChart3, 
  Upload, 
  Play, 
  ChevronRight,
  Info,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileJson,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Monitor
} from 'lucide-react';
import { api } from '../services/api';

// --- Styled Components (Harmonized with Home) ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 5, backgroundColor: 'rgba(0, 122, 255, 0.05)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition-all duration-700 ${
      active 
        ? 'bg-primary text-on-primary shadow-2xl shadow-primary/20' 
        : 'text-on-surface-variant hover:text-primary'
    }`}
  >
    <Icon size={20} className={active ? 'animate-pulse' : ''} />
    <span className="font-bold text-[10px] tracking-[0.3em] uppercase">{label}</span>
  </motion.button>
);

const Card = ({ children, title, icon: Icon, className = '', footer, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-white/80 backdrop-blur-3xl rounded-[40px] border border-outline soft-shadow overflow-hidden flex flex-col group ${className}`}
  >
    {title && (
      <div className="px-10 py-8 border-b border-outline-variant flex items-center justify-between bg-white/20">
        <div className="flex items-center gap-5">
          <div className="p-3 rounded-2xl bg-accent/5">
            {Icon && <Icon size={20} className="text-accent" />}
          </div>
          <h3 className="font-headline font-bold text-primary text-[11px] uppercase tracking-[0.4em]">{title}</h3>
        </div>
      </div>
    )}
    <div className="p-12 flex-1">
      {children}
    </div>
    {footer && (
      <div className="px-10 py-6 border-t border-outline-variant bg-surface/10">
        {footer}
      </div>
    )}
  </motion.div>
);

// --- Main Dashboard ---

export default function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [activeTab, setActiveTab] = useState('compute'); 
  const [jobStatus, setJobStatus] = useState('idle'); 
  const [jobId, setJobId] = useState(null);
  const [jobProgress, setJobProgress] = useState(0);
  const [jobMessage, setJobMessage] = useState('');
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      setLoadingDatasets(true);
      const data = await api.getDatasets();
      setDatasets(data.datasets || []);
      if (data.datasets?.length > 0 && !selectedDataset) {
        setSelectedDataset(data.datasets[0]);
      }
    } catch (err) {
      console.error('Failed to fetch datasets:', err);
    } finally {
      setLoadingDatasets(false);
    }
  };

  const runAnalysis = async () => {
    if (!selectedDataset) return;
    try {
      setError(null);
      setResults(null);
      setJobStatus('preprocessing');
      setJobMessage('Aligning cosmic signals...');
      setJobProgress(10);
      const preprocessResponse = await api.preprocess(selectedDataset.id);
      await pollJob(preprocessResponse.job_id, 'preprocessing');
      setJobProgress(50);
      setJobStatus('computing');
      setJobMessage('Extracting signatures...');
      const tdaResponse = await api.computeTDA(preprocessResponse.job_id);
      const tdaResult = await pollJob(tdaResponse.job_id, 'computing');
      setJobStatus('completed');
      setJobProgress(100);
      setResults(tdaResult.result);
      setActiveTab('results');
    } catch (err) {
      setJobStatus('error');
      setError(err.message);
    }
  };

  const pollJob = async (id, stage) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const job = await api.getResults(id);
          if (job.status === 'completed') {
            clearInterval(interval);
            resolve(job);
          } else if (job.status === 'failed') {
            clearInterval(interval);
            reject(new Error(job.message || 'Job failed'));
          } else {
            setJobMessage(job.message || `Processing ${stage}...`);
          }
        } catch (err) {
          clearInterval(interval);
          reject(err);
        }
      }, 1000);
    });
  };

  const renderPersistenceDiagram = () => {
    if (!results?.persistence_diagram) return null;

    const h0 = results.persistence_diagram.filter(p => p.dimension === 0);
    const h1 = results.persistence_diagram.filter(p => p.dimension === 1);

    return (
      <Plot
        data={[
          {
            x: h0.map(p => p.birth),
            y: h0.map(p => p.death),
            mode: 'markers',
            name: 'H₀',
            marker: { color: '#007AFF', size: 12, opacity: 0.5 },
          },
          {
            x: h1.map(p => p.birth),
            y: h1.map(p => p.death),
            mode: 'markers',
            name: 'H₁',
            marker: { color: '#101415', size: 14, symbol: 'diamond' },
          },
          {
            x: [0, 2],
            y: [0, 2],
            mode: 'lines',
            showlegend: false,
            line: { color: 'rgba(0,0,0,0.05)', dash: 'dash' },
          }
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: '#F9FAFB',
          xaxis: { title: 'Birth', color: '#6B7280', gridcolor: '#E5E7EB', zeroline: false },
          yaxis: { title: 'Death', color: '#6B7280', gridcolor: '#E5E7EB', zeroline: false },
          legend: { font: { color: '#6B7280', size: 10 }, bgcolor: 'rgba(255,255,255,0.8)' },
          margin: { l: 80, r: 40, b: 80, t: 40 },
          autosize: true,
          hovermode: 'closest',
          font: { family: 'Inter' }
        }}
        useResizeHandler
        className="w-full h-full rounded-3xl overflow-hidden"
      />
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex lunar-bg relative overflow-hidden font-body">
      
      {/* --- Decorative Background (Same as Home) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/3 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/3 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* --- Harmonized Sidebar --- */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-96 border-r border-outline-variant bg-white/80 backdrop-blur-3xl p-12 flex flex-col gap-16 fixed h-full z-20 shadow-2xl shadow-black/5"
      >
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-[24px] bg-accent/5 flex items-center justify-center border border-accent/10 group-hover:bg-accent transition-all duration-700">
            <Sparkles size={28} className="text-accent group-hover:text-white transition-colors" />
          </div>
          <div className="text-3xl font-bold tracking-tighter text-primary font-headline uppercase">
            COSMO<span className="text-accent">PH</span>
          </div>
        </Link>
        
        <nav className="flex flex-col gap-6">
          <SidebarItem icon={Database} label="Library" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
          <SidebarItem icon={Cpu} label="Processor" active={activeTab === 'compute'} onClick={() => setActiveTab('compute')} />
          <SidebarItem icon={BarChart3} label="Results" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
        </nav>

        <div className="mt-auto p-10 bg-surface rounded-[40px] border border-outline-variant relative overflow-hidden group">
          <div className="flex items-center gap-4 text-accent mb-6 relative z-10">
            <Zap size={20} className="animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Engine v2.0</span>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className={`w-2 h-2 rounded-full ${jobStatus === 'idle' ? 'bg-accent/40' : 'bg-accent animate-ping'}`} />
            <span className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">
              {jobStatus === 'idle' ? 'System Ready' : 'Processing'}
            </span>
          </div>
        </div>
      </motion.aside>

      {/* --- Main Content Area --- */}
      <main className="ml-96 flex-1 p-24 relative z-10 max-w-[1800px] mx-auto w-full">
        <header className="flex justify-between items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent text-[11px] font-bold tracking-[0.6em] uppercase">Workspace // Lunar</span>
            </div>
            <h1 className="font-headline text-8xl font-bold tracking-tighter mb-8 text-primary uppercase leading-[0.8]">
              {activeTab}
            </h1>
            <p className="text-on-surface-variant text-2xl font-light tracking-tight max-w-3xl leading-relaxed italic">
              {activeTab === 'explore' 
                ? 'Navigating the cosmic microwave background through high-fidelity topological lenses.' 
                : activeTab === 'compute' 
                ? 'Extracting persistent signatures from primordial signals using lower-star filtration.'
                : 'Advanced visualization and classification of topological non-Gaussianities.'}
            </p>
          </motion.div>
          
          <motion.button 
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={fetchDatasets}
            className="p-6 rounded-3xl bg-white border border-outline soft-shadow hover:text-accent transition-all duration-700"
          >
            <RefreshCw size={24} className={loadingDatasets ? 'animate-spin' : ''} />
          </motion.button>
        </header>

        <div className="grid grid-cols-12 gap-12">
          {/* Controls Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-12">
            <Card title="Datasets" icon={Database} delay={0.1}>
              <div className="flex flex-col gap-6">
                {loadingDatasets ? (
                  <div className="flex justify-center py-24"><Loader2 className="animate-spin text-accent/30" /></div>
                ) : (
                  datasets.map((ds, idx) => (
                    <motion.button
                      key={ds.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      onClick={() => setSelectedDataset(ds)}
                      className={`text-left p-8 rounded-[32px] border transition-all duration-700 relative group ${
                        selectedDataset?.id === ds.id
                          ? 'bg-accent/5 border-accent shadow-2xl shadow-accent/10'
                          : 'bg-white border-outline hover:border-accent/40'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-lg tracking-tight text-primary group-hover:text-accent transition-colors">{ds.name}</div>
                        {ds.category === 'sample' && <span className="text-[9px] bg-accent/10 text-accent px-4 py-1.5 rounded-full uppercase tracking-widest font-bold">Demo</span>}
                      </div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-bold flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                        NSIDE {ds.nside || '1024'} • {ds.category}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </Card>

            <Card title="Pipeline" icon={Cpu} delay={0.2}>
              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-[32px] bg-surface/50 border border-outline-variant">
                    <div className="text-[9px] text-accent font-bold uppercase tracking-[0.4em] mb-4">Core</div>
                    <div className="text-lg font-bold text-primary">Rips-TDA</div>
                  </div>
                  <div className="p-8 rounded-[32px] bg-surface/50 border border-outline-variant">
                    <div className="text-[9px] text-accent font-bold uppercase tracking-[0.4em] mb-4">Thread</div>
                    <div className="text-lg font-bold text-primary">Py-Engine</div>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={jobStatus !== 'idle' || !selectedDataset}
                  onClick={runAnalysis}
                  className={`w-full py-8 rounded-[32px] flex items-center justify-center gap-5 font-headline font-bold text-xs uppercase tracking-[0.5em] transition-all duration-700 relative overflow-hidden ${
                    jobStatus !== 'idle' || !selectedDataset
                      ? 'bg-surface text-on-surface-variant cursor-not-allowed opacity-50'
                      : 'bg-primary text-on-primary shadow-2xl shadow-primary/20 hover:bg-black'
                  }`}
                >
                   <AnimatePresence mode="wait">
                    {jobStatus === 'idle' ? (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-5">
                        <Play size={18} fill="currentColor" /> Run Synthesis
                      </motion.div>
                    ) : (
                      <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-5">
                        <Loader2 size={18} className="animate-spin" /> {jobStatus.toUpperCase()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </Card>
          </div>

          {/* Visualization Column */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
            <Card className="flex-1 min-h-[750px] relative" title="Topological Mapping" icon={BarChart3} delay={0.3}>
              <AnimatePresence mode="wait">
                {results ? (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col">
                    <div className="flex-1 min-h-[500px]">
                      {renderPersistenceDiagram()}
                    </div>
                    <div className="mt-16 grid grid-cols-3 gap-10">
                      {[
                        { label: 'Feature Density', val: results.persistence_diagram?.length || 0, icon: Layers },
                        { label: 'Signal Type', val: results.gaussian_comparison?.is_non_gaussian ? 'Non-Gauss' : 'Gaussian', icon: Sparkles },
                        { label: 'Inferred Model', val: results.classification?.model_name?.split(' ')[0] || 'N/A', icon: Zap }
                      ].map((stat, i) => (
                        <div key={i} className="p-10 bg-surface/40 rounded-[32px] border border-outline-variant hover:bg-white transition-all duration-700">
                          <div className="flex items-center gap-4 mb-4">
                            <stat.icon size={14} className="text-accent/60" />
                            <div className="text-[10px] text-accent font-bold uppercase tracking-[0.4em]">{stat.label}</div>
                          </div>
                          <div className="text-3xl font-headline font-bold text-primary">{stat.val}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-24 opacity-20">
                    <div className="w-32 h-32 rounded-[48px] bg-accent/5 flex items-center justify-center mb-12">
                      <BarChart3 size={48} className="text-accent" />
                    </div>
                    <h3 className="font-headline font-bold text-5xl mb-6 tracking-tighter uppercase">Canvas Void</h3>
                    <p className="text-on-surface-variant max-w-sm text-xl italic font-light">Waiting for topological data streams.</p>
                  </div>
                )}
              </AnimatePresence>
              {(jobStatus === 'preprocessing' || jobStatus === 'computing') && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center z-10">
                  <div className="scanning-ray-light" />
                  <div className="relative mb-16">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-64 h-64 rounded-full border-2 border-accent/10 border-t-accent shadow-2xl" />
                    <Activity className="absolute inset-0 m-auto text-accent animate-pulse" size={48} />
                  </div>
                  <div className="text-3xl font-headline font-bold uppercase tracking-[0.2em] text-primary mb-4">{jobStatus}</div>
                  <div className="text-accent text-sm font-bold uppercase tracking-[0.5em] italic">{jobMessage}</div>
                </div>
              )}
            </Card>

            <div className="grid grid-cols-2 gap-12">
              <Card title="Verification" icon={CheckCircle2} delay={0.4}>
                <div className="space-y-10">
                  <p className="text-lg text-on-surface-variant font-light italic leading-relaxed">
                    The topological signature has been cross-referenced with the neural classification engine.
                  </p>
                  {results?.classification && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-accent uppercase tracking-widest">Model Probability</span>
                        <span className="text-[11px] font-bold text-primary font-mono">{Math.round(results.classification.probability * 100)}%</span>
                      </div>
                      <div className="h-3 w-full bg-surface rounded-full overflow-hidden border border-outline-variant">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${results.classification.probability * 100}%` }} className="h-full bg-accent shadow-[0_0_20px_rgba(0,122,255,0.4)]" transition={{ duration: 2 }} />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              <Card title="Export Hub" icon={FileJson} delay={0.5}>
                <div className="flex flex-col gap-6">
                  <motion.button whileHover={{ x: 10 }} className="p-8 rounded-[32px] bg-surface/30 border border-outline-variant hover:border-accent flex justify-between items-center transition-all duration-500 group">
                    <span className="text-lg font-bold text-primary group-hover:text-accent">Persistence Vectors (JSON)</span>
                    <ChevronRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.button>
                  <motion.button whileHover={{ x: 10 }} className="p-8 rounded-[32px] bg-surface/30 border border-outline-variant hover:border-accent flex justify-between items-center transition-all duration-500 group">
                    <span className="text-lg font-bold text-primary group-hover:text-accent">Summary Report (PDF)</span>
                    <ChevronRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
