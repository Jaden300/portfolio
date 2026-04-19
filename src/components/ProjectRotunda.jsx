import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// ── Project data — one stage per project ─────────────────────────────────────
const PROJECTS = [
  {
    numeral: "I",
    name: "myojam",
    tagline: "Gesture. Decoded.",
    verse: "Open-source surface EMG gesture classification. 84.85% cross-subject accuracy on Ninapro DB5 — built from scratch, no hardware required.",
    tags: ["Python", "React", "FastAPI", "Three.js", "PyQt6", "scikit-learn"],
    metrics: [["84.85%","Accuracy"],["<5ms","Inference"],["16ch","EMG input"],["MIT","License"]],
    mat: "gold",
    url: "https://myojam.com",
    github: "https://github.com/Jaden300/myojam",
    year: "2024–present",
    bg: "#0d0a00",
  },
  {
    numeral: "II",
    name: "Unsupervised Learning",
    tagline: "Structure. Discovered.",
    verse: "PCA, t-SNE, KMeans, DBSCAN — the full unsupervised toolkit on Spotify and Sign Language MNIST. Dimensionality reduction to its essence.",
    tags: ["Python", "scikit-learn", "PCA", "t-SNE", "KMeans", "DBSCAN"],
    metrics: [["5+","Algorithms"],["2","Datasets"],["3D","t-SNE viz"],["Full","Pipeline"]],
    mat: "obsidian",
    url: "https://github.com/Jaden300/Unsupervised-Learning",
    github: "https://github.com/Jaden300/Unsupervised-Learning",
    year: "2026",
    bg: "#080712",
  },
  {
    numeral: "III",
    name: "Mobile Price",
    tagline: "Predict. Explain.",
    verse: "Ten algorithms, one dataset, full explainability. From Logistic Regression to XGBoost — every prediction traced back to its cause via LIME.",
    tags: ["Python", "XGBoost", "Random Forest", "SVM", "LIME", "GridSearchCV"],
    metrics: [["10+","Algorithms"],["95%+","Accuracy"],["LIME","Explainability"],["Full","Workflow"]],
    mat: "stone",
    url: "https://github.com/Jaden300/Mobile-Price-Classification",
    github: "https://github.com/Jaden300/Mobile-Price-Classification",
    year: "2026",
    bg: "#0e0c08",
  },
  {
    numeral: "IV",
    name: "Student Performance",
    tagline: "Regress. Refine.",
    verse: "Regression analysis on academic outcomes. Multiple methods compared, features engineered — predictions distilled to their essential geometry.",
    tags: ["Python", "Regression", "scikit-learn", "Feature engineering"],
    metrics: [["Multiple","Methods"],["Kaggle","Dataset"],["2026","Published"]],
    mat: "wire",
    url: "https://github.com/Jaden300/Student-Performance-Regression",
    github: "https://github.com/Jaden300/Student-Performance-Regression",
    year: "2026",
    bg: "#060608",
  },
]

const N = PROJECTS.length

// ── Shared inline styles ──────────────────────────────────────────────────────
const INK      = "rgba(239,230,209,1)"
const INK_DIM  = "rgba(239,230,209,.55)"
const INK_FAINT= "rgba(239,230,209,.18)"
const ACCENT   = "#c9a24a"

const CSS = `
  .pr-word  { font-family:'Fraunces',Georgia,serif; font-weight:300; font-style:italic;
              font-size:clamp(48px,8vw,124px); line-height:.9; letter-spacing:-.025em;
              margin:0 0 18px; color:${INK}; }
  .pr-roman { font-family:'Fraunces',Georgia,serif; font-weight:300; font-size:13px;
              letter-spacing:.4em; color:${ACCENT}; margin-bottom:16px;
              display:inline-flex; align-items:center; gap:14px; }
  .pr-roman::before { content:""; width:28px; height:1px; background:${ACCENT}; opacity:.7; }
  .pr-verse { font-family:'Fraunces',Georgia,serif; font-weight:300;
              font-size:clamp(13px,1.15vw,16px); line-height:1.65;
              color:${INK_DIM}; max-width:400px; margin:0 0 22px; }
  .pr-tag   { font-family:'Inter',sans-serif; font-size:10px; letter-spacing:.08em;
              color:${INK_DIM}; border:1px solid ${INK_FAINT}; border-radius:100px;
              padding:4px 11px; }
  .pr-btn   { font-family:'Inter',sans-serif; font-size:11px; letter-spacing:.25em;
              text-transform:uppercase; color:${INK_DIM}; padding:10px 20px;
              border:1px solid ${INK_FAINT}; border-radius:999px; background:transparent;
              cursor:pointer; transition:background .25s,color .25s,border-color .25s;
              text-decoration:none; display:inline-block; }
  .pr-btn:hover { background:${ACCENT}; color:#111; border-color:${ACCENT}; }
  .pr-btn-gold  { color:rgba(245,158,11,.9); border-color:rgba(245,158,11,.35);
                  background:rgba(245,158,11,.08); }
  .pr-btn-gold:hover { background:${ACCENT}; color:#111; border-color:${ACCENT}; }
  .pr-enter { animation: prReveal .5s cubic-bezier(.22,1,.36,1) both; }
  @keyframes prReveal { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
`

export default function ProjectRotunda() {
  const containerRef   = useRef(null)
  const canvasRef      = useRef(null)
  const stickyRef      = useRef(null)
  const progressFillRef= useRef(null)
  const railRefs       = useRef([])  // per-stage bar elements
  const lastIdxRef     = useRef(0)

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0d0a00, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping      = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    // Offset slightly left so icosahedron sits right-of-center, leaving room for copy
    camera.position.set(-1.1, 0, 7.2)
    camera.lookAt(0, 0, 0)

    // ── Procedural env map (warm indigo → candle → cool highlight)
    ;(() => {
      const sz  = 256
      const c   = document.createElement("canvas")
      c.width   = c.height = sz
      const ctx = c.getContext("2d")
      const g   = ctx.createLinearGradient(0, 0, 0, sz)
      g.addColorStop(0.00, "#1a1333"); g.addColorStop(0.35, "#3b2a1c")
      g.addColorStop(0.55, "#e6c98a"); g.addColorStop(0.75, "#231a2e"); g.addColorStop(1, "#07070d")
      ctx.fillStyle = g; ctx.fillRect(0, 0, sz, sz)
      const r1 = ctx.createRadialGradient(sz*.7,sz*.45,10,sz*.7,sz*.45,sz*.5)
      r1.addColorStop(0,"rgba(255,210,140,.6)"); r1.addColorStop(1,"rgba(255,210,140,0)")
      ctx.fillStyle = r1; ctx.fillRect(0,0,sz,sz)
      const r2 = ctx.createRadialGradient(sz*.25,sz*.65,10,sz*.25,sz*.65,sz*.45)
      r2.addColorStop(0,"rgba(150,180,255,.5)"); r2.addColorStop(1,"rgba(150,180,255,0)")
      ctx.fillStyle = r2; ctx.fillRect(0,0,sz,sz)
      const tex = new THREE.CanvasTexture(c)
      tex.mapping    = THREE.EquirectangularReflectionMapping
      tex.colorSpace = THREE.SRGBColorSpace
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromEquirectangular(tex).texture
      tex.dispose(); pmrem.dispose()
    })()

    // ── Lights
    const key = new THREE.DirectionalLight(0xfff1c8, 1.8); key.position.set(4,5,4);  scene.add(key)
    const rim = new THREE.DirectionalLight(0x7a9bff,  0.9); rim.position.set(-5,-2,-3); scene.add(rim)
    scene.add(new THREE.AmbientLight(0xffffff, 0.15))

    // ── Materials
    const mats = {
      stone:    new THREE.MeshStandardMaterial({ color:0xbab2a3, roughness:.85, metalness:.0, flatShading:true,  envMapIntensity:.6 }),
      obsidian: new THREE.MeshStandardMaterial({ color:0x1a1520, roughness:.25, metalness:.1, flatShading:true,  envMapIntensity:.9 }),
      gold:     new THREE.MeshStandardMaterial({ color:0xd9b870, roughness:.28, metalness:1., flatShading:true,  envMapIntensity:1.1}),
      wire:     new THREE.MeshBasicMaterial({    color:0xefe6d1, wireframe:true, transparent:true, opacity:.85 }),
      wireGhost:new THREE.MeshBasicMaterial({    color:0x000000, transparent:true, opacity:.25 }),
    }
    const expoMap = { stone:1.05, obsidian:.9, gold:1.2, wire:1.0 }

    const geo      = new THREE.IcosahedronGeometry(1.6, 0)
    let mesh       = new THREE.Mesh(geo, mats.gold)
    let wireMesh   = new THREE.Mesh(geo.clone(), mats.wire.clone())
    let ghostMesh  = new THREE.Mesh(geo.clone(), mats.wireGhost.clone())
    wireMesh.material.opacity  = 0
    ghostMesh.material.opacity = 0
    wireMesh.scale.setScalar(1.001); ghostMesh.scale.setScalar(0.999)
    scene.add(mesh, wireMesh, ghostMesh)

    // ── Stage logic
    const stageInfo = (p) => {
      const f   = Math.min(0.9999, Math.max(0, p)) * N
      const idx = Math.floor(f)
      return { idx, t: f - idx }
    }

    const tmpC1 = new THREE.Color(), tmpC2 = new THREE.Color()

    const applyStage = (idx, t) => {
      const curr    = PROJECTS[idx]         || PROJECTS[N-1]
      const next    = PROJECTS[Math.min(idx+1, N-1)]
      const useMat  = t < 0.5 ? curr.mat   : next.mat

      if (mesh.material !== mats[useMat]) {
        mesh.material = mats[useMat]
        mesh.material.needsUpdate = true
      }
      const wireOn = useMat === "wire"
      wireMesh.material.opacity  += ((wireOn ? 1.0 : 0) - wireMesh.material.opacity)  * 0.15
      ghostMesh.material.opacity += ((wireOn ? 0.55: 0) - ghostMesh.material.opacity) * 0.15

      const pulse = 1 + 0.03 * Math.sin(Math.PI * t)
      mesh.scale.setScalar(pulse)
      wireMesh.scale.setScalar(pulse*1.001); ghostMesh.scale.setScalar(pulse*.999)

      renderer.toneMappingExposure += ((expoMap[useMat]??1.1) - renderer.toneMappingExposure) * 0.08

      // Background colour (lerp per stage)
      tmpC1.set(curr.bg); tmpC2.set(next.bg)
      const bg = tmpC1.clone().lerp(tmpC2, t)
      renderer.setClearColor(bg, 1)
      if (stickyRef.current) stickyRef.current.style.background = "#" + bg.getHexString()
    }

    // ── Render loop
    let smoothed = 0, rafId

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      // Scroll relative to container
      const box = containerRef.current?.getBoundingClientRect()
      if (box) {
        const total = box.height - window.innerHeight
        const raw   = total > 0 ? Math.max(0, Math.min(1, -box.top / total)) : 0
        smoothed   += (raw - smoothed) * 0.09
      }

      const p = smoothed
      if (mesh) {
        mesh.rotation.y = p * Math.PI * 2.2
        mesh.rotation.x = Math.sin(p * Math.PI * 1.4) * 0.35 + p * 0.4
        mesh.rotation.z = Math.cos(p * Math.PI * 1.1) * 0.18
        const idle = performance.now() * 0.00012
        mesh.rotation.y      += idle
        wireMesh.rotation.copy(mesh.rotation)
        ghostMesh.rotation.copy(mesh.rotation)
      }

      const { idx, t } = stageInfo(smoothed)
      applyStage(idx, t)

      // Direct DOM — no React re-render
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${smoothed * 100}%`
      }
      railRefs.current.forEach((el, i) => {
        if (!el) return
        const active = i === idx
        el.style.color  = active ? INK : INK_FAINT
        el.children[0].style.width = active ? "56px" : "28px"
        el.children[0].style.opacity = active ? "1" : "0.45"
      })

      // React state — only when stage actually changes
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx
        setActiveIdx(idx)
      }

      renderer.render(scene, camera)
    }

    const resize = () => {
      const w = stickyRef.current?.clientWidth  || window.innerWidth
      const h = stickyRef.current?.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 760 ? 8.5 : 7.2
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", resize)
    resize()
    requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      renderer.dispose()
    }
  }, [])

  const proj = PROJECTS[activeIdx]

  return (
    <>
      <style>{CSS}</style>

      {/* Tall scroll driver */}
      <div ref={containerRef} style={{ height: `${100 * N}vh` }}>

        {/* Sticky viewport */}
        <div ref={stickyRef} style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", background: "#0d0a00",
        }}>
          {/* Three.js canvas */}
          <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />

          {/* Chrome */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:5 }}>

            {/* Corner flourishes (top pair offset below navbar) */}
            {[
              { top:76, left:20,  borderRight:"none", borderBottom:"none" },
              { top:76, right:20, borderLeft:"none",  borderBottom:"none" },
              { bottom:20, left:20,  borderRight:"none", borderTop:"none" },
              { bottom:20, right:20, borderLeft:"none",  borderTop:"none" },
            ].map((s, i) => (
              <div key={i} style={{ position:"absolute", width:44, height:44, border:`1px solid ${INK_FAINT}`, ...s }} />
            ))}

            {/* Top-left label */}
            <div style={{ position:"absolute", top:84, left:44, fontFamily:"'Fraunces',Georgia,serif", fontWeight:400, fontSize:13, letterSpacing:".22em", textTransform:"uppercase", color:INK_DIM }}>
              Selected Work
            </div>

            {/* Top-right counter */}
            <div style={{ position:"absolute", top:84, right:44, fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:INK_DIM }}>
              {String(activeIdx+1).padStart(2,"0")} / {String(N).padStart(2,"0")}
            </div>

            {/* Right rail */}
            <div style={{ position:"absolute", top:"50%", right:44, transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:20 }}>
              {PROJECTS.map((p, i) => (
                <div key={i} ref={el => railRefs.current[i] = el}
                  style={{ display:"flex", alignItems:"center", gap:12, fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:INK_FAINT, transition:"color .35s" }}>
                  <div style={{ width:"28px", height:"1px", background:"currentColor", opacity:.45, transition:"width .5s cubic-bezier(.7,0,.2,1), opacity .35s" }} />
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:300, fontSize:12, width:18, textAlign:"right" }}>{p.numeral}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ position:"absolute", left:"50%", bottom:32, transform:"translateX(-50%)", width:200, height:1, background:INK_FAINT }}>
              <div ref={progressFillRef} style={{ height:"100%", width:"0%", background:ACCENT, transition:"width .12s linear" }} />
            </div>

            {/* Scroll hint (only at top) */}
            {activeIdx === 0 && (
              <div style={{ position:"absolute", bottom:32, right:44, fontSize:10, letterSpacing:".24em", textTransform:"uppercase", color:INK_FAINT, fontFamily:"'Inter',sans-serif", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:1, background:`linear-gradient(to right,transparent,${INK_FAINT})` }} />
                Scroll
              </div>
            )}

            {/* Copy — re-mounts on stage change for entrance animation */}
            <div key={activeIdx} className="pr-enter" style={{
              position:"absolute", inset:0,
              display:"flex", flexDirection:"column",
              justifyContent:"center", alignItems:"flex-start",
              padding:"0 clamp(40px,7vw,110px)",
              paddingTop:60,     // clear navbar
              pointerEvents:"none",
            }}>
              <div style={{ maxWidth:480 }}>
                {/* Numeral + year */}
                <div className="pr-roman">
                  {proj.numeral}&nbsp;·&nbsp;{proj.year}
                </div>

                {/* Big project name */}
                <h2 className="pr-word">{proj.name}.</h2>

                {/* Tagline */}
                <p style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:300, fontSize:"clamp(13px,1.1vw,16px)", letterSpacing:".05em", color:`rgba(245,158,11,.7)`, marginBottom:10 }}>
                  {proj.tagline}
                </p>

                {/* Verse */}
                <p className="pr-verse">{proj.verse}</p>

                {/* Metrics row */}
                <div style={{ display:"flex", gap:28, marginBottom:20, flexWrap:"wrap" }}>
                  {proj.metrics.map(([val, label]) => (
                    <div key={label}>
                      <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:300, fontSize:22, color:ACCENT, letterSpacing:"-.5px", marginBottom:3 }}>{val}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:INK_DIM }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                  {proj.tags.map(tag => <span key={tag} className="pr-tag">{tag}</span>)}
                </div>

                {/* Action buttons — re-enable pointer events */}
                <div style={{ display:"flex", gap:10, pointerEvents:"auto" }}>
                  <a href={proj.url}    target="_blank" rel="noreferrer" className="pr-btn pr-btn-gold">Visit ↗</a>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="pr-btn">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
