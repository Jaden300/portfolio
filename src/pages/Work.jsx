import Reveal from "../components/Reveal"

const PROJECTS = [
  {
    name:"myojam",
    year:"2024–present",
    status:"Active",
    statusColor:"#10B981",
    url:"https://myojam.com",
    github:"https://github.com/Jaden300/myojam",
    tags:["Python","React","FastAPI","scikit-learn","PyQt6","Three.js","Vite"],
    summary:"Open-source surface EMG gesture classification system achieving 84.85% cross-subject accuracy on Ninapro DB5. Full-stack platform including education hub, interactive demos, block coding environment, and ELEVATE international competition.",
    highlights:[
      "84.85% cross-subject accuracy — tested on subjects never seen during training",
      "Full-stack: FastAPI on Render, React/Vite on Vercel, native macOS PyQt6 desktop app",
      "11 published educational articles, 3 full lesson plans, educators hub",
      "myocode — Scratch-like block coding environment with EMG gesture events",
      "5 interactive browser demos including frequency analyzer and confusion matrix explorer",
      "ELEVATE — international competition with 4 tracks, open globally, free to enter",
    ],
    metrics:[["84.85%","Accuracy"],["<5ms","Inference"],["16ch","EMG input"],["MIT","License"]],
    dark:true,
  },
  {
    name:"Unsupervised Learning",
    year:"2026",
    status:"Complete",
    statusColor:"#F59E0B",
    url:"https://github.com/Jaden300/Unsupervised-Learning",
    github:"https://github.com/Jaden300/Unsupervised-Learning",
    tags:["Python","scikit-learn","PCA","t-SNE","KMeans","DBSCAN"],
    summary:"Exploration of unsupervised and supervised learning on Spotify Tracks and Sign Language MNIST datasets. Full dimensionality reduction, clustering, and predictive modelling workflow with visual interpretability.",
    highlights:[
      "PCA, KernelPCA, t-SNE for dimensionality reduction and 2D/3D visualisation",
      "KMeans, DBSCAN, Gaussian Mixture, MeanShift, Agglomerative Clustering",
      "Cluster-based feature engineering to enhance LogisticRegression performance",
      "Comprehensive evaluation: ROC-AUC, Accuracy, confusion matrices, dendrograms",
    ],
    metrics:[["5+","Algorithms"],["2","Datasets"],["3D","t-SNE viz"],["Full","Pipeline"]],
    dark:false,
  },
  {
    name:"Mobile Price Classification",
    year:"2026",
    status:"Complete",
    statusColor:"#F59E0B",
    url:"https://github.com/Jaden300/Mobile-Price-Classification",
    github:"https://github.com/Jaden300/Mobile-Price-Classification",
    tags:["Python","XGBoost","Random Forest","SVM","LIME","GridSearchCV"],
    summary:"Complete ML workflow on the Mobile Price Classification dataset. Comprehensive model comparison with explainability — from Logistic Regression and KNN through ensemble methods and XGBoost, with LIME local explanations.",
    highlights:[
      "10+ algorithms compared: Logistic Regression, KNN, SVM, Decision Trees, Random Forest, XGBoost",
      "Hyperparameter tuning via GridSearchCV and cross-validation",
      "LIME for local model explainability and global surrogate models",
      "RAM, battery power, and pixel dimensions identified as most predictive features",
    ],
    metrics:[["10+","Algorithms"],["95%+","Best accuracy"],["LIME","Explainability"],["Full","Workflow"]],
    dark:false,
  },
  {
    name:"Student Performance Regression",
    year:"2026",
    status:"Complete",
    statusColor:"#F59E0B",
    url:"https://github.com/Jaden300/Student-Performance-Regression",
    github:"https://github.com/Jaden300/Student-Performance-Regression",
    tags:["Python","Regression","scikit-learn","Feature engineering"],
    summary:"Regression analysis on the Student Test Performance Dataset evaluating multiple regression methods for predicting academic outcomes. Focus on method comparison and predictive optimisation.",
    highlights:[
      "Multiple regression methods evaluated and compared systematically",
      "Feature engineering and selection for improved predictive performance",
      "Model interpretability and actionable insights from feature importance",
    ],
    metrics:[["Multiple","Regression methods"],["Kaggle","Dataset"],["2026","Published"]],
    dark:false,
  },
]

export default function Work() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:60 }}>
      {/* Header */}
      <section style={{ padding:"100px 48px 80px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:20, fontFamily:"var(--serif)" }}>Selected work</div>
          <h1 style={{ fontSize:"clamp(48px,8vw,80px)", fontWeight:800, letterSpacing:"-3px", lineHeight:0.95, fontFamily:"var(--serif)", color:"var(--text)" }}>
            What I've<br/><span className="gold-text">built.</span>
          </h1>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding:"64px 48px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
          {PROJECTS.map((p,i)=>(
            <Reveal key={p.name} delay={i*0.08}>
              <div className="hover-lift" style={{ background: p.dark ? "var(--bg-dark)" : "var(--bg-2)", border:`1px solid ${p.dark?"rgba(255,255,255,0.06)":"var(--border)"}`, borderRadius:24, overflow:"hidden", cursor:"none" }}
                onClick={()=>window.open(p.url,"_blank")}
              >
                <div style={{ padding:"40px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:24, flexWrap:"wrap", marginBottom:24 }}>
                    <div>
                      <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                        <span style={{ fontSize:11, fontWeight:600, color:p.statusColor, background:`${p.statusColor}15`, border:`1px solid ${p.statusColor}30`, borderRadius:100, padding:"3px 10px" }}>{p.status}</span>
                        <span style={{ fontSize:11, color: p.dark?"rgba(255,255,255,0.3)":"var(--text-tertiary)", border:`1px solid ${p.dark?"rgba(255,255,255,0.1)":"var(--border)"}`, borderRadius:100, padding:"3px 10px", fontWeight:300 }}>{p.year}</span>
                      </div>
                      <h2 style={{ fontSize:30, fontWeight:800, color: p.dark?"white":"var(--text)", letterSpacing:"-1px", fontFamily:"var(--serif)" }}>{p.name}</h2>
                    </div>
                    <div style={{ display:"flex", gap:10 }}>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ background:"var(--gold)", color:"#0a0000", borderRadius:100, padding:"9px 20px", fontSize:12, fontWeight:700, cursor:"none", display:"inline-block" }}
                        onClick={e=>e.stopPropagation()}
                      >Visit ↗</a>
                      <a href={p.github} target="_blank" rel="noreferrer" style={{ background:"transparent", color: p.dark?"rgba(255,255,255,0.5)":"var(--text-secondary)", border:`1px solid ${p.dark?"rgba(255,255,255,0.1)":"var(--border)"}`, borderRadius:100, padding:"9px 16px", fontSize:12, fontWeight:300, cursor:"none", display:"inline-block" }}
                        onClick={e=>e.stopPropagation()}
                      >GitHub</a>
                    </div>
                  </div>

                  <p style={{ fontSize:15, color: p.dark?"rgba(255,255,255,0.5)":"var(--text-secondary)", fontWeight:300, lineHeight:1.8, marginBottom:24, maxWidth:680 }}>{p.summary}</p>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
                    {p.highlights.map(h=>(
                      <div key={h} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:13, color: p.dark?"rgba(255,255,255,0.4)":"var(--text-secondary)", fontWeight:300, lineHeight:1.6 }}>
                        <span style={{ color:"var(--gold)", flexShrink:0, marginTop:2 }}>—</span>{h}
                      </div>
                    ))}
                  </div>

                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {p.tags.map(tag=>(
                      <span key={tag} style={{ fontSize:12, color: p.dark?"rgba(255,255,255,0.3)":"var(--text-tertiary)", border:`1px solid ${p.dark?"rgba(255,255,255,0.08)":"var(--border)"}`, borderRadius:100, padding:"4px 12px", fontWeight:300 }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {p.metrics && (
                  <div style={{ display:"grid", gridTemplateColumns:`repeat(${p.metrics.length},1fr)`, borderTop:`1px solid ${p.dark?"rgba(255,255,255,0.06)":"var(--border)"}` }}>
                    {p.metrics.map(([val,label],i)=>(
                      <div key={label} style={{ padding:"20px", textAlign:"center", borderRight: i<p.metrics.length-1?`1px solid ${p.dark?"rgba(255,255,255,0.06)":"var(--border)"}`:""  }}>
                        <div style={{ fontSize:18, fontWeight:800, color: p.dark?"var(--gold-light)":"var(--gold)", letterSpacing:"-0.5px", fontFamily:"var(--serif)", marginBottom:4 }}>{val}</div>
                        <div style={{ fontSize:10, color: p.dark?"rgba(255,255,255,0.25)":"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:300 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}