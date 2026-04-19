import Reveal from "../components/Reveal"
import PageBanner from "../components/PageBanner"
import ProjectRotunda from "../components/ProjectRotunda"

const _PROJECTS_UNUSED = [
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
      "84.85% cross-subject accuracy  -  tested on subjects never seen during training",
      "Full-stack: FastAPI on Render, React/Vite on Vercel, native macOS PyQt6 desktop app",
      "11 published educational articles, 3 full lesson plans, educators hub",
      "myocode  -  Scratch-like block coding environment with EMG gesture events",
      "5 interactive browser demos including frequency analyzer and confusion matrix explorer",
      "ELEVATE  -  international competition with 4 tracks, open globally, free to enter",
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
    summary:"Complete ML workflow on the Mobile Price Classification dataset. Comprehensive model comparison with explainability  -  from Logistic Regression and KNN through ensemble methods and XGBoost, with LIME local explanations.",
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
      <PageBanner
        label="Selected work"
        title="What I've"
        accent="built."
        sub="One flagship project, multiple ML experiments. All open source, all documented."
      />
      
      {/* ── Project Rotunda — scroll-driven 3D showcase */}
      <ProjectRotunda />

    {/* Publications & Writing */}
    <section style={{ padding:"0 48px 100px", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", paddingTop:64 }}>
        <Reveal>
          <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Publications & Writing</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:12, fontFamily:"var(--serif)" }}>Research & articles.</h2>
          <p style={{ fontSize:16, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.7, maxWidth:560, marginBottom:48 }}>
            Technical writing published on myojam.com  -  spanning neuroscience, signal processing, machine learning, and the ethics of biometric interfaces.
          </p>
        </Reveal>

        {/* Research paper */}
        <Reveal delay={0.05}>
          <a href="https://myojam.com/research" target="_blank" rel="noreferrer" className="hover-lift" style={{ display:"block", background:"var(--bg-dark)", borderRadius:20, overflow:"hidden", marginBottom:16, cursor:"pointer" }}>
            <div style={{ padding:"36px 40px", display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center" }}>
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"var(--gold-light)", background:"rgba(245,224,64,0.12)", border:"1px solid rgba(245,224,64,0.25)", borderRadius:100, padding:"3px 12px" }}>Technical Report</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:100, padding:"3px 12px", fontWeight:300 }}>April 2026</span>
                  <span style={{ fontSize:11, color:"#10B981", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:100, padding:"3px 12px", fontWeight:500 }}>Open Access</span>
                </div>
                <h3 style={{ fontSize:20, fontWeight:700, color:"white", letterSpacing:"-0.4px", fontFamily:"var(--serif)", marginBottom:10, lineHeight:1.3 }}>
                  myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction
                </h3>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", fontWeight:300, lineHeight:1.75, maxWidth:560, marginBottom:16 }}>
                  Full technical report on the myojam classification pipeline  -  methodology, cross-subject evaluation protocol, confusion matrix analysis, and system integration. Includes interactive figures and BibTeX citation.
                </p>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)", fontWeight:300, fontFamily:"var(--serif)", fontStyle:"italic" }}>
                  Wong, J. (2026). myojam Technical Report. myojam Project.
                </div>
              </div>
              <span style={{ fontSize:24, color:"var(--gold-light)", flexShrink:0 }}>↗</span>
            </div>
          </a>
        </Reveal>

        {/* Articles grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { title:"The science of muscle-computer interfaces",       tag:"Foundations",      url:"https://myojam.com/education/emg-explainer",       date:"April 2026" },
            { title:"Why Random Forest? The classifier behind myojam", tag:"Machine Learning", url:"https://myojam.com/education/random-forest-emg",    date:"March 2026" },
            { title:"From lab to laptop: democratising EMG",           tag:"Accessibility",    url:"https://myojam.com/education/open-source-emg",     date:"March 2026" },
            { title:"Inside Ninapro DB5: the dataset that trains myojam", tag:"Dataset",      url:"https://myojam.com/education/ninapro-db5",         date:"Feb 2026" },
            { title:"Muscle memory is real  -  it's just not in your muscles", tag:"Neuroscience", url:"https://myojam.com/education/muscle-memory",    date:"Jan 2026" },
            { title:"Why EMG is harder than it looks",                 tag:"Signal Processing",url:"https://myojam.com/education/why-emg-is-hard",     date:"Nov 2025" },
            { title:"Build your own EMG sensor for under $60",         tag:"Hardware",         url:"https://myojam.com/education/build-your-own",      date:"Oct 2025" },
            { title:"Who owns your muscle data? Ethics of EMG",        tag:"Ethics",           url:"https://myojam.com/education/ethics-of-emg",       date:"Aug 2025" },
            { title:"The art of cutting a signal into pieces",         tag:"Signal Processing",url:"https://myojam.com/education/windowing-explained",  date:"Jul 2025" },
            { title:"The ghost in the electrode: phantom limb EMG",    tag:"Neuroscience",     url:"https://myojam.com/education/phantom-limb",        date:"Dec 2025" },
            { title:"After EMG: what comes next",                      tag:"Future",           url:"https://myojam.com/education/future-of-bci",       date:"Sept 2025" },
          ].map((article, i) => (
            <Reveal key={article.title} delay={i * 0.04}>
              <a href={article.url} target="_blank" rel="noreferrer" className="hover-lift" style={{ display:"block", background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:14, padding:"20px 24px", cursor:"pointer", height:"100%" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, fontWeight:600, color:"var(--gold)", background:"var(--gold-soft)", border:"1px solid rgba(245,224,64,0.2)", borderRadius:100, padding:"2px 10px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{article.tag}</span>
                      <span style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300 }}>{article.date}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:600, color:"var(--text)", lineHeight:1.4 }}>{article.title}</div>
                  </div>
                  <span style={{ fontSize:14, color:"var(--text-tertiary)", flexShrink:0, marginTop:2 }}>↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop:24, textAlign:"center" }}>
            <a href="https://myojam.com/education" target="_blank" rel="noreferrer" style={{ fontSize:14, color:"var(--gold)", fontWeight:500, borderBottom:"1px solid var(--gold)", paddingBottom:2 }}>
              View all 11 articles on myojam.com →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
    </div>
  )
}