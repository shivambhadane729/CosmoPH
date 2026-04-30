import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Plot from 'react-plotly.js'; 
import { 
  Database, 
  Settings, 
  BarChart3, 
  Play, 
  Loader2,
  RefreshCw,
  CheckCircle2,
  FileJson,
  Cpu,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors text-sm font-medium ${
      active 
        ? 'bg-accent/10 text-accent' 
        : 'text-on-surface-variant hover:bg-surface hover:text-primary'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const Card = ({ children, title, icon: Icon, className = '', footer }) => (
  <div className={`bg-white rounded-lg border border-outline flex flex-col shadow-sm ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-outline bg-surface flex items-center gap-3">
        {Icon && <Icon size={18} className="text-on-surface-variant" />}
        <h3 className="font-semibold text-primary text-sm">{title}</h3>
      </div>
    )}
    <div className="p-6 flex-1">
      {children}
    </div>
    {footer && (
      <div className="px-6 py-4 border-t border-outline bg-surface">
        {footer}
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [activeTab, setActiveTab] = useState('compute'); 
  const [jobStatus, setJobStatus] = useState('idle'); 
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
      setJobMessage('Extracting topological signatures...');
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
            marker: { color: '#2563eb', size: 8, opacity: 0.7 },
          },
          {
            x: h1.map(p => p.birth),
            y: h1.map(p => p.death),
            mode: 'markers',
            name: 'H₁',
            marker: { color: '#0f172a', size: 8, symbol: 'diamond' },
          },
          {
            x: [0, 2],
            y: [0, 2],
            mode: 'lines',
            showlegend: false,
            line: { color: '#e2e8f0', dash: 'dash' },
          }
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: { title: 'Birth', color: '#475569', gridcolor: '#f1f5f9', zeroline: false },
          yaxis: { title: 'Death', color: '#475569', gridcolor: '#f1f5f9', zeroline: false },
          legend: { font: { color: '#475569', size: 12 }, bgcolor: 'rgba(255,255,255,0.9)' },
          margin: { l: 60, r: 20, b: 60, t: 20 },
          autosize: true,
          hovermode: 'closest',
          font: { family: 'Inter, sans-serif' }
        }}
        useResizeHandler
        className="w-full h-full"
      />
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-outline bg-white flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b border-outline">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold text-lg">
            <ArrowLeft size={18} className="text-on-surface-variant" />
            CosmoPH
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3 px-4 mt-2">Analysis</div>
          <SidebarItem icon={Database} label="Data Selection" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
          <SidebarItem icon={Cpu} label="Computation" active={activeTab === 'compute'} onClick={() => setActiveTab('compute')} />
          <SidebarItem icon={BarChart3} label="Results Viewer" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
        </nav>

        <div className="p-4 border-t border-outline bg-surface">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <div className={`w-2 h-2 rounded-full ${jobStatus === 'idle' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
            {jobStatus === 'idle' ? 'System Idle' : 'Job Running'}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="px-8 py-6 border-b border-outline bg-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-primary capitalize">{activeTab} Environment</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Configure parameters and analyze cosmic microwave background topological structures.
            </p>
          </div>
          <button 
            onClick={fetchDatasets}
            className="p-2 rounded-md border border-outline hover:bg-surface transition-colors text-on-surface-variant"
            title="Refresh Datasets"
          >
            <RefreshCw size={18} className={loadingDatasets ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
          
          {/* Controls Column */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <Card title="Data Source" icon={Database}>
              <div className="space-y-3">
                {loadingDatasets ? (
                  <div className="flex justify-center py-8"><Loader2 className="animate-spin text-accent" /></div>
                ) : (
                  datasets.map((ds) => (
                    <button
                      key={ds.id}
                      onClick={() => setSelectedDataset(ds)}
                      className={`w-full text-left p-4 rounded-md border transition-colors ${
                        selectedDataset?.id === ds.id
                          ? 'bg-accent/5 border-accent'
                          : 'bg-white border-outline hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-semibold text-sm text-primary">{ds.name}</div>
                        {ds.category === 'sample' && <span className="text-[10px] bg-surface border border-outline text-on-surface-variant px-2 py-0.5 rounded font-medium">Sample</span>}
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        NSIDE {ds.nside || '1024'}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>

            <Card title="Execution Engine" icon={Cpu}>
              <div className="space-y-4">
                <div className="text-sm text-on-surface-variant">
                  Selected Dataset: <span className="font-semibold text-primary">{selectedDataset?.name || 'None'}</span>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {error}
                  </div>
                )}
                
                <button 
                  disabled={jobStatus !== 'idle' || !selectedDataset}
                  onClick={runAnalysis}
                  className={`w-full py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                    jobStatus !== 'idle' || !selectedDataset
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-accent text-white hover:bg-blue-700'
                  }`}
                >
                  {jobStatus === 'idle' ? (
                    <>
                      <Play size={16} /> Run Analysis
                    </>
                  ) : (
                    <>
                      <Loader2 size={16} className="animate-spin" /> {jobStatus === 'completed' ? 'Finalizing...' : 'Processing...'}
                    </>
                  )}
                </button>

                {jobStatus !== 'idle' && jobStatus !== 'completed' && jobStatus !== 'error' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                      <span>{jobMessage}</span>
                      <span>{jobProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-accent transition-all duration-300" style={{ width: `${jobProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Visualization Column */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Card className="flex-1 min-h-[500px]" title="Persistence Diagram" icon={BarChart3}>
              {results ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 min-h-[400px]">
                    {renderPersistenceDiagram()}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-outline pt-6">
                    {[
                      { label: 'Topological Features', val: results.persistence_diagram?.length || 0 },
                      { label: 'Classification', val: results.gaussian_comparison?.is_non_gaussian ? 'Non-Gaussian' : 'Gaussian' },
                      { label: 'Predicted Model', val: results.classification?.model_name?.split(' ')[0] || 'Standard' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-surface rounded-md p-4 border border-outline">
                        <div className="text-xs text-on-surface-variant mb-1">{stat.label}</div>
                        <div className="text-lg font-semibold text-primary">{stat.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                  <BarChart3 size={48} className="mb-4 text-gray-300" />
                  <h3 className="font-semibold text-lg text-primary">No Data to Display</h3>
                  <p className="text-sm">Run an analysis to generate topological visualizations.</p>
                </div>
              )}
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
