# Product Requirements Document (PRD)
## CosmoPH – Web Platform for Topological Analysis of CMB Data

### 1. Product Overview
#### 1.1 Product Name
CosmoPH – Cosmological Persistent Homology Platform

#### 1.2 Product Summary
CosmoPH is a web-based research platform that enables cosmologists and students to perform Topological Data Analysis (TDA) on Cosmic Microwave Background (CMB) radiation maps through an interactive browser interface.
The system applies persistent homology to detect subtle primordial non-Gaussian signatures in cosmological data — signals believed to encode information about early-universe inflation physics.
Traditional pipelines require:
- Local installation of scientific libraries
- HPC clusters
- Deep Python/TDA expertise

CosmoPH removes these barriers by providing:
- A browser-based analysis environment
- Automated topological feature extraction
- Interactive persistence diagram visualization
- ML-based inflation model classification

The platform integrates cosmological datasets (e.g., Planck PR4) with advanced TDA algorithms to democratize access to cutting-edge cosmology research tools.

### 2. Vision Statement
CosmoPH aims to democratize topological cosmology research by transforming complex command-line pipelines into an accessible, scalable, and interactive web platform.
By bridging algebraic topology, machine learning, and cosmology, CosmoPH enables researchers, educators, and students to detect early-universe signals that are orders of magnitude fainter than traditional statistical methods.
The long-term vision is to establish CosmoPH as a community platform for reproducible cosmology research, where users can:
- Upload datasets
- Explore topological structures
- Compare inflation models
- Share reproducible analyses

### 3. Product Goals
#### 3.1 MVP Goals
Deliver a functional public platform that enables:
1. Uploading or selecting CMB maps
2. Running persistent homology computations
3. Visualizing persistence diagrams interactively
4. Computing topological non-Gaussianity estimators
5. Classifying inflation models

**Success Metrics**
| Metric | Target |
|---|---|
| ML classification accuracy | ≥ 85% |
| Analysis runtime (patch) | < 5 minutes |
| Analysis runtime (demo full map) | < 30 minutes |
| Concurrent users | ≥ 50 |
| Upload success rate | ≥ 95% |

#### 3.2 Academic Impact Goals
CosmoPH should:
- Allow undergraduate students to run TDA experiments without HPC
- Support paper-ready exports
- Provide interactive visual explanations
- Encourage open-source cosmology research

### 4. Problem Statement
Understanding the physics of the early universe requires detecting subtle deviations from Gaussian statistics in the Cosmic Microwave Background (CMB).
Current cosmological observations show that CMB fluctuations are nearly Gaussian, but many theoretical inflation models predict small non-Gaussian signatures.

**Key Challenge**
These signals are extremely faint: f_NL < 5 
Traditional statistical methods include:
- Bispectrum analysis
- Minkowski functionals

However these approaches:
- Depend on specific templates
- Miss complex topological structures
- Require expert pipelines

#### 4.1 Limitations of Current Tools
| Problem | Impact |
|---|---|
| Command-line tools | Hard for students |
| HPC dependency | Limited accessibility |
| Complex setup | High entry barrier |
| Poor visualization | Hard to interpret results |

#### 4.2 Proposed Solution
CosmoPH converts the offline pipeline into a scalable web system where users can:
1. Upload CMB maps
2. Preprocess data
3. Run persistent homology
4. Visualize topological structures
5. Obtain ML-based model classifications

All through a browser interface.

### 5. Target Users

#### 5.1 Cosmology Students
**Persona**: MSc / PhD student studying inflation models.
**Pain Points**:
- Difficult library setup
- No visualization tools
- Lack of HPC access
**Needs**:
- Easy experimentation
- Interactive diagrams
- Exportable results
**Value**: Run full topology analysis in minutes without local setup.

#### 5.2 Academic Researchers
**Persona**: Postdoctoral researcher testing simulations against Planck data.
**Pain Points**:
- Pipeline reproducibility
- Collaboration challenges
- Visualization limitations
**Needs**:
- Secure uploads
- Batch processing
- Shareable results
**Value**: Fast topological feature extraction and collaboration tools.

#### 5.3 Educators
**Persona**: University lecturer teaching cosmology.
**Pain Points**:
- Difficult to demonstrate TDA concepts live
- Students lack compute resources
**Needs**:
- Public demo mode
- Guided tutorials
- Visualization tools
**Value**: Interactive demonstrations for teaching.

### 6. Functional Requirements

#### 6.1 Authentication System
**Features**
- Email login
- OAuth (Google)
- Session management
- User dashboard
**Dashboard displays**
- Saved projects
- Recent analyses
- Shared results

#### 6.2 Data Upload
Users can upload:
- HEALPix FITS maps
- Simulation datasets
Alternatively they can select from:
- Planck PR4 dataset
- Preloaded Gaussian simulations
File validation includes:
- Size limit (500MB)
- Format validation

#### 6.3 Preprocessing Interface
Users can configure preprocessing parameters via UI.
**Available controls:**
| Control | Purpose |
|---|---|
| Mask slider | Remove galactic plane |
| Needlet scale | Multi-scale analysis |
| Patch selection | Region cropping |

The UI provides a map preview before computation.

#### 6.4 Persistent Homology Engine
Backend computes:
- H0 persistence (connected components)
- H1 persistence (loops)
- Betti curves
- Persistence images
**Libraries used:**
- Ripser
- GUDHI
- Persim

#### 6.5 Visualization System
Interactive plots include:
- CMB heatmap
- Persistence diagrams
- Betti curves
- Persistence images
**Users can:**
- Zoom diagrams
- Hover points for birth/death explanation
- Compare datasets

#### 6.6 Topological Non-Gaussianity Estimation
CosmoPH computes custom statistics:
- tNG₁
- tNG₂
- tNG₃
These metrics quantify deviations from Gaussian topology.

#### 6.7 Machine Learning Classification
Pre-trained ML models classify inflation scenarios.
**Models include:**
- Random Forest
- Support Vector Machine
**Predicted outputs:**
| Output | Description |
|---|---|
| Inflation type | Single-field / multi-field |
| Probability score | Confidence |
| Estimated f_NL range | Non-Gaussian amplitude |

#### 6.8 Results Export
Users can export:
- Persistence diagrams
- Betti curves
- Feature vectors
- PDF reports
- LaTeX figure snippets
**Results formats:**
- CSV
- PKL
- PDF
- ZIP bundle

### 7. User Stories

- **Student**: "I want to upload a Planck map and see persistence diagrams so that I can understand topological deviations."
- **Researcher**: "I want to classify my simulations to estimate f_NL values."
- **Educator**: "I want a guided demo mode for teaching TDA concepts."
- **Collaborator**: "I want shareable analysis links so colleagues can view results."

### 8. Non-Functional Requirements

#### 8.1 Performance
| Task | Target |
|---|---|
| Patch analysis | < 5 minutes |
| Full demo map | < 30 minutes |

Backend uses job queues for long tasks.

#### 8.2 Security
Measures include:
- HTTPS
- File validation
- Upload limits
- Authentication tokens
- Rate limiting

Compute jobs run in sandboxed containers.

#### 8.3 Scalability
System supports:
- 50+ concurrent users
- asynchronous computation
- cloud scaling

Infrastructure includes:
- containerized workers
- distributed job queues

#### 8.4 Accessibility
The platform follows WCAG accessibility guidelines.
Features include:
- screen reader support
- keyboard navigation
- dark mode

### 9. User Workflows

#### 9.1 Research Workflow
1. **Login**: User accesses dashboard.
2. **Data Input**: Upload FITS file or choose dataset.
3. **Configure Analysis**: Select masks and scales.
4. **Run Topology Analysis**: Backend job is queued.
5. **Explore Results**: Interactive diagrams appear.
6. **Export**: Download reports or share link.

#### 9.2 Classroom Demo Workflow
1. Open demo mode
2. Select Gaussian vs non-Gaussian map
3. Run topology computation
4. Show persistence diagram differences

### 10. Technical Architecture

#### 10.1 System Architecture
- **Frontend**: Next.js + React + TailwindCSS (or Vite)
- **Backend**: FastAPI (Python)
- **Compute Workers**: Docker containers running TDA pipeline
- **Queue System**: Celery + Redis
- **Database**: PostgreSQL
- **Storage**: S3-compatible object storage

#### 10.2 Data Flow
```text
User Browser
      ↓
Next.js/Vite Frontend
      ↓
FastAPI Backend
      ↓
Job Queue (Redis/Celery)
      ↓
Compute Worker
  - Preprocessing
  - Persistent Homology
  - Feature Extraction
  - ML Classification
      ↓
Result Storage (S3 + PostgreSQL)
      ↓
WebSocket Notification
      ↓
Interactive Visualization
```

### 11. Technology Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js / Vite, React, Tailwind |
| Backend | FastAPI |
| Visualization | Plotly.js, D3.js |
| TDA | Scikit-TDA, Ripser, Persim |
| Cosmology Tools | Healpy, Astropy |
| ML | Scikit-learn |
| Queue | Celery |
| Cache | Redis |
| Database | PostgreSQL |
| Deployment | Docker + AWS/GCP |

### 12. UI/UX Design Guidelines
Theme inspired by astronomy interfaces.
Design elements:
- Dark cosmic background
- Nebula color accents
- Clean typography

**Dashboard layout**
```
Sidebar
 ├ Projects
 ├ Upload
 ├ Demo
 ├ Documentation

Main Panel
 ├ Map Viewer
 ├ Persistence Diagram
 ├ Betti Curves
 ├ Classification Panel
```
Tooltips explain:
- persistent homology
- birth/death points
- Betti numbers

### 13. Risks and Mitigation
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| High compute cost | High | High | Limit uploads to patches |
| Security issues | Medium | High | Sandbox compute |
| Team skill gap | High | High | Clear task division |
| Low adoption | Medium | Medium | Open-source community |
| Scope creep | High | Medium | MVP-first strategy |

### 14. MVP Scope
**MVP includes:**
- Patch-based analysis
- Preloaded datasets
- Persistent diagrams
- Basic ML classification
- Interactive visualization

**Excluded from MVP:**
- full-sky real-time analysis
- advanced cosmological simulations
- large-scale HPC integration

### 15. Future Roadmap
**Phase 2**
- full-sky analysis
- GPU acceleration
- advanced inflation models
- collaborative workspaces
- API access

**Phase 3**
- integration with cosmology observatories
- large dataset pipelines
- open cosmology benchmark datasets
