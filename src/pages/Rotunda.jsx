import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as THREE from "three"

// ── Design data ───────────────────────────────────────────────────────────────
const STAGES = [
  { numeral: "I",   word: "Form",    mat: "stone",    verse: "Before light, before colour — the edge. Twenty faces, thirty edges, the first promise a polyhedron makes." },
  { numeral: "II",  word: "Weight",  mat: "obsidian", verse: "Obsidian. Cut from the quiet part of the earth; heavier in the hand than the eye expects." },
  { numeral: "III", word: "Lustre",  mat: "gold",     verse: "Brushed gold — not the colour of wealth, the colour of attention. It does not glow; it listens." },
  { numeral: "IV",  word: "Clarity", mat: "glass",    verse: "Glass, ground to a thousandth. Every facet becomes a small honest window onto everything behind it." },
  { numeral: "V",   word: "Truth",   mat: "wire",     verse: "All ornament removed. What remains is the drawing — the original thought, held in the air." },
]
const BG_COLORS = ["#0b0d1f","#0f0a1a","#140e14","#0a1420","#09090d"]
const ACCENTS   = [
  { hex: "#c9a24a", name: "Old Gold"  },
  { hex: "#e8c66b", name: "Champagne" },
  { hex: "#b68d3c", name: "Antique"   },
  { hex: "#a45b3c", name: "Copper"    },
  { hex: "#7a6ad9", name: "Amethyst"  },
  { hex: "#4a7f9c", name: "Lapis"     },
  { hex: "#d4d2cc", name: "Silver"    },
]
const TWEAK_DEFAULTS = { accent: "#c9a24a", shape: "icosahedron", sensitivity: 1, showCopy: true, bgShifts: true }

// ── Geometry builder ──────────────────────────────────────────────────────────
function buildGeometry(kind) {
  switch (kind) {
    case "dodecahedron": return new THREE.DodecahedronGeometry(1.5, 0)
    case "octahedron":   return new THREE.OctahedronGeometry(1.7, 0)
    case "torusKnot":    return new THREE.TorusKnotGeometry(1.1, 0.36, 180, 24, 2, 3)
    default:             return new THREE.IcosahedronGeometry(1.6, 0)
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Rotunda() {
  const navigate    = useNavigate()
  const canvasRef   = useRef(null)
  const sceneRef    = useRef(null)   // exposes rebuildShape
  const tweaksRef   = useRef({ ...TWEAK_DEFAULTS })

  // React state only for the slow/UI parts
  const [tweaks,    setTweaks]    = useState({ ...TWEAK_DEFAULTS })
  const [showPanel, setShowPanel] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [showCTA,   setShowCTA]   = useState(false)
  const [progress,  setProgress]  = useState(0)

  // Keep tweaksRef in sync so the RAF loop can read it without stale closure
  useEffect(() => { tweaksRef.current = tweaks }, [tweaks])

  // ── Three.js + render loop ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0b0d1f, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    // ── Procedural env map (gradient canvas → PMREM)
    function makeEnv() {
      const size = 256
      const c    = document.createElement("canvas")
      c.width = c.height = size
      const ctx = c.getContext("2d")
      const g   = ctx.createLinearGradient(0, 0, 0, size)
      g.addColorStop(0.00, "#1a1333")
      g.addColorStop(0.35, "#3b2a1c")
      g.addColorStop(0.55, "#e6c98a")
      g.addColorStop(0.75, "#231a2e")
      g.addColorStop(1.00, "#07070d")
      ctx.fillStyle = g;   ctx.fillRect(0, 0, size, size)
      const rg = ctx.createRadialGradient(size*.7, size*.45, 10, size*.7, size*.45, size*.5)
      rg.addColorStop(0, "rgba(255,210,140,.6)")
      rg.addColorStop(1, "rgba(255,210,140,0)")
      ctx.fillStyle = rg;  ctx.fillRect(0, 0, size, size)
      const rg2 = ctx.createRadialGradient(size*.25, size*.65, 10, size*.25, size*.65, size*.45)
      rg2.addColorStop(0, "rgba(150,180,255,.5)")
      rg2.addColorStop(1, "rgba(150,180,255,0)")
      ctx.fillStyle = rg2; ctx.fillRect(0, 0, size, size)
      const tex = new THREE.CanvasTexture(c)
      tex.mapping     = THREE.EquirectangularReflectionMapping
      tex.colorSpace  = THREE.SRGBColorSpace
      const pmrem  = new THREE.PMREMGenerator(renderer)
      const envMap = pmrem.fromEquirectangular(tex).texture
      tex.dispose(); pmrem.dispose()
      return envMap
    }
    const envMap = makeEnv()
    scene.environment = envMap

    // ── Lights
    const key = new THREE.DirectionalLight(0xfff1c8, 1.8)
    key.position.set(4, 5, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x7a9bff, 0.9)
    rim.position.set(-5, -2, -3)
    scene.add(rim)
    scene.add(new THREE.AmbientLight(0xffffff, 0.15))

    // ── Materials
    const mats = {
      stone:    new THREE.MeshStandardMaterial({ color: 0xbab2a3, roughness: 0.85, metalness: 0.0, flatShading: true,  envMapIntensity: 0.6 }),
      obsidian: new THREE.MeshStandardMaterial({ color: 0x1a1520, roughness: 0.25, metalness: 0.1, flatShading: true,  envMapIntensity: 0.9 }),
      gold:     new THREE.MeshStandardMaterial({ color: 0xd9b870, roughness: 0.28, metalness: 1.0, flatShading: true,  envMapIntensity: 1.1 }),
      glass:    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.0, transmission: 0.95, thickness: 1.2, ior: 1.5, flatShading: false, envMapIntensity: 1.2, transparent: true, opacity: 0.6 }),
      wire:     new THREE.MeshBasicMaterial({    color: 0xefe6d1, wireframe: true, transparent: true, opacity: 0.85 }),
      wireGhost:new THREE.MeshBasicMaterial({    color: 0x000000, transparent: true, opacity: 0.25 }),
    }

    let mesh, wireMesh, ghostMesh

    function buildMesh(kind) {
      if (mesh)      { scene.remove(mesh);      mesh.geometry.dispose()      }
      if (wireMesh)  { scene.remove(wireMesh);  wireMesh.geometry.dispose()  }
      if (ghostMesh) { scene.remove(ghostMesh); ghostMesh.geometry.dispose() }

      const geo  = buildGeometry(kind)
      mesh       = new THREE.Mesh(geo, mats.stone)
      wireMesh   = new THREE.Mesh(geo.clone(), mats.wire.clone())
      ghostMesh  = new THREE.Mesh(geo.clone(), mats.wireGhost.clone())
      wireMesh.material.opacity  = 0
      ghostMesh.material.opacity = 0
      wireMesh.scale.setScalar(1.001)
      ghostMesh.scale.setScalar(0.999)
      scene.add(mesh, wireMesh, ghostMesh)
    }
    buildMesh(tweaksRef.current.shape)

    // ── Scroll progress
    let rawProgress = 0
    const updateProgress = () => {
      const sc  = document.documentElement
      const max = sc.scrollHeight - window.innerHeight
      rawProgress = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()

    // ── Stage helpers
    function stageInfo(p) {
      const N = STAGES.length
      const f = Math.min(0.9999, Math.max(0, p)) * N
      const idx = Math.floor(f)
      return { idx, t: f - idx }
    }

    const expoByMat = { stone: 1.05, obsidian: 0.9, gold: 1.2, glass: 1.35, wire: 1.0 }

    function applyStageVisuals(idx, t) {
      const tw = tweaksRef.current
      const stage     = STAGES[idx]     || STAGES[STAGES.length - 1]
      const nextStage = STAGES[Math.min(idx + 1, STAGES.length - 1)]
      const useMat    = t < 0.5 ? stage.mat : nextStage.mat

      if (mesh.material !== mats[useMat]) {
        mesh.material = mats[useMat]
        mesh.material.needsUpdate = true
      }

      const wireOn     = useMat === "wire"
      wireMesh.material.opacity  += ((wireOn ? 1.0 : 0) - wireMesh.material.opacity)  * 0.15
      ghostMesh.material.opacity += ((wireOn ? 0.55 : 0) - ghostMesh.material.opacity) * 0.15

      const pulse = 1 + 0.03 * Math.sin(Math.PI * t)
      mesh.scale.setScalar(pulse)
      wireMesh.scale.setScalar(pulse * 1.001)
      ghostMesh.scale.setScalar(pulse * 0.999)

      renderer.toneMappingExposure += ((expoByMat[useMat] ?? 1.1) - renderer.toneMappingExposure) * 0.08

      if (tw.bgShifts) {
        const c1 = new THREE.Color(BG_COLORS[idx])
        const c2 = new THREE.Color(BG_COLORS[Math.min(idx + 1, BG_COLORS.length - 1)])
        const mix = c1.clone().lerp(c2, t)
        renderer.setClearColor(mix, 1)
        document.documentElement.style.setProperty("--rot-bg", "#" + mix.getHexString())
      } else {
        renderer.setClearColor(new THREE.Color(BG_COLORS[0]), 1)
        document.documentElement.style.setProperty("--rot-bg", BG_COLORS[0])
      }
    }

    // ── Render loop
    let smoothed = 0
    let last     = performance.now()
    let rafId

    const tick = (now) => {
      rafId = requestAnimationFrame(tick)
      last  = now

      smoothed += (rawProgress - smoothed) * 0.09
      const sens = tweaksRef.current.sensitivity
      const p    = smoothed * sens

      if (mesh) {
        mesh.rotation.y = p * Math.PI * 2.2
        mesh.rotation.x = Math.sin(p * Math.PI * 1.4) * 0.35 + p * 0.4
        mesh.rotation.z = Math.cos(p * Math.PI * 1.1) * 0.18
        const idle = now * 0.00012
        mesh.rotation.y     += idle
        wireMesh.rotation.copy(mesh.rotation)
        ghostMesh.rotation.copy(mesh.rotation)
      }

      const { idx, t } = stageInfo(smoothed)
      applyStageVisuals(idx, t)

      // Update React state at low frequency
      setActiveIdx(idx)
      setProgress(smoothed)
      setShowCTA(smoothed > 0.97)

      renderer.render(scene, camera)
    }

    // ── Resize
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 760 ? 8.5 : 7.2
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", resize)
    resize()

    // ── Expose for tweaks
    sceneRef.current = {
      rebuildShape(kind) { buildMesh(kind) }
    }

    requestAnimationFrame((t) => { last = t; tick(t) })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", resize)
      renderer.dispose()
      sceneRef.current = null
      // reset CSS var
      document.documentElement.style.removeProperty("--rot-bg")
    }
  }, []) // run once

  // Rebuild mesh when shape changes
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.rebuildShape(tweaks.shape)
  }, [tweaks.shape])

  // Accent → CSS var
  useEffect(() => {
    document.documentElement.style.setProperty("--rot-accent", tweaks.accent)
    return () => document.documentElement.style.removeProperty("--rot-accent")
  }, [tweaks.accent])

  // ── Keyboard shortcut: T = toggle tweaks
  useEffect(() => {
    const fn = (e) => { if (e.key === "t" || e.key === "T") setShowPanel(p => !p) }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  const s = STAGES[activeIdx] || STAGES[0]

  // ── Inline styles (scoped to this page so they don't bleed)
  const css = `
    :root { --rot-accent: ${tweaks.accent}; --rot-bg: #0b0d1f; }
    .rot-body { background: var(--rot-bg); }
    .rot-brand { font-family: 'Fraunces', serif; font-weight: 400; font-size: 18px; letter-spacing: .18em; text-transform: uppercase; }
    .rot-word  { font-family: 'Fraunces', serif; font-weight: 300; font-style: italic; font-size: clamp(72px,11vw,168px); line-height: .92; letter-spacing: -.02em; margin: 0 0 22px; color: rgba(239,230,209,1); }
    .rot-roman { font-family: 'Fraunces', serif; font-weight: 300; font-size: 13px; letter-spacing: .4em; color: var(--rot-accent); margin-bottom: 18px; display: inline-flex; align-items: center; gap: 14px; }
    .rot-roman::before { content: ""; width: 28px; height: 1px; background: var(--rot-accent); opacity: .7; }
    .rot-verse { font-family: 'Fraunces', serif; font-weight: 300; font-size: clamp(16px,1.35vw,20px); line-height: 1.55; letter-spacing: .005em; color: rgba(239,230,209,.55); max-width: 420px; margin: 0; }
    .rot-copy-enter { animation: rotReveal .55s cubic-bezier(.22,1,.36,1) both; }
    @keyframes rotReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    .rot-pill { font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: rgba(239,230,209,1); padding: 14px 28px; border: 1px solid rgba(239,230,209,.18); border-radius: 999px; background: transparent; cursor: pointer; transition: background .3s, color .3s, border-color .3s; }
    .rot-pill:hover { background: var(--rot-accent); color: #111; border-color: var(--rot-accent); }
    .rot-swatch { width: 26px; height: 26px; border-radius: 50%; cursor: pointer; border: 1.5px solid rgba(239,230,209,.18); transition: transform .2s, border-color .2s; flex-shrink: 0; }
    .rot-swatch.active { border-color: rgba(239,230,209,.9); transform: scale(1.15); }
    .rot-sel, .rot-range { width: 100%; background: transparent; border: 1px solid rgba(239,230,209,.14); color: rgba(239,230,209,1); padding: 6px 8px; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 12px; }
    .rot-range { padding: 0; border: none; accent-color: var(--rot-accent); }
  `

  const ink     = "rgba(239,230,209,1)"
  const inkDim  = "rgba(239,230,209,.55)"
  const inkFaint= "rgba(239,230,209,.18)"

  return (
    <>
      <style>{css}</style>

      {/* ── Tall scroller — drives progress */}
      <div style={{ height: "600vh", background: "var(--rot-bg, #0b0d1f)" }}>

        {/* ── Sticky viewport */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Canvas fills the sticky area */}
          <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0 }} />

          {/* ── Chrome overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>

            {/* Corner flourishes */}
            {[
              { top: 20, left: 20,  borderRight: "none", borderBottom: "none" },
              { top: 20, right: 20, borderLeft:  "none", borderBottom: "none" },
              { bottom: 20, left: 20,  borderRight: "none", borderTop: "none" },
              { bottom: 20, right: 20, borderLeft:  "none", borderTop: "none" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 52, height: 52, border: `1px solid ${inkFaint}`, ...s }} />
            ))}

            {/* Brand */}
            <div className="rot-brand" style={{ position: "absolute", top: 28, left: 40, color: ink }}>
              Rotunda<span style={{ color: "var(--rot-accent)" }}> · </span>MMXXVI
            </div>

            {/* Nav */}
            <div style={{ position: "absolute", top: 28, right: 40, display: "flex", gap: 28, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim, fontFamily: "'Inter', sans-serif" }}>
              <span>Study</span>
              <span>Artefact</span>
              <span style={{ cursor: "pointer", pointerEvents: "auto" }} onClick={() => navigate("/contact")}>Contact</span>
            </div>

            {/* Meta */}
            <div style={{ position: "absolute", bottom: 28, left: 40, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim, fontFamily: "'Inter', sans-serif" }}>
              Nº 001 / Icosahedral Study
            </div>

            {/* Scroll hint */}
            <div style={{ position: "absolute", bottom: 28, right: 40, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: inkDim, fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 1, background: `linear-gradient(to right, transparent, ${inkDim})` }} />
              Scroll to rotate
            </div>

            {/* Progress bar */}
            <div style={{ position: "absolute", left: "50%", bottom: 34, transform: "translateX(-50%)", width: 220, height: 1, background: inkFaint }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--rot-accent)", transition: "width .12s linear" }} />
            </div>

            {/* Right rail */}
            <div style={{ position: "absolute", top: "50%", right: 44, transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 18 }}>
              {STAGES.map((st, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: i === activeIdx ? ink : inkFaint, transition: "color .35s" }}>
                  <div style={{ width: i === activeIdx ? 64 : 36, height: 1, background: "currentColor", opacity: i === activeIdx ? 1 : 0.5, transition: "width .5s cubic-bezier(.7,0,.2,1)" }} />
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 13, width: 22, textAlign: "right" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>

            {/* Copy — keyed so it re-animates on stage change */}
            {tweaks.showCopy && (
              <div key={activeIdx} className="rot-copy-enter" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 clamp(40px,8vw,120px)" }}>
                <div style={{ maxWidth: 520 }}>
                  <div className="rot-roman">{s.numeral}&nbsp;·&nbsp;Stage {String(activeIdx + 1).padStart(2, "0")}</div>
                  <h1 className="rot-word">{s.word}.</h1>
                  <p className="rot-verse">{s.verse}</p>
                </div>
              </div>
            )}

            {/* Final CTA */}
            {showCTA && (
              <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 80, animation: "rotReveal .6s ease both" }}>
                <button className="rot-pill" style={{ pointerEvents: "auto" }} onClick={() => navigate("/work")}>
                  View my work →
                </button>
              </div>
            )}

            {/* Tweaks toggle — subtle T key hint bottom-left-ish */}
            <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%) translateX(-140px)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkFaint, fontFamily: "'Inter', sans-serif", cursor: "pointer", pointerEvents: "auto" }}
              onClick={() => setShowPanel(p => !p)}>
              ⌥ Tweaks
            </div>
          </div>

          {/* ── Tweaks panel */}
          {showPanel && (
            <div style={{
              position: "fixed", right: 20, bottom: 20, width: 280, padding: 18,
              background: "rgba(15,17,32,.94)", border: `1px solid ${inkFaint}`,
              borderRadius: 14, backdropFilter: "blur(14px)", color: ink,
              fontFamily: "'Inter', sans-serif", fontSize: 12, zIndex: 1000,
              boxShadow: "0 20px 60px rgba(0,0,0,.5)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 16, letterSpacing: "0.18em", textTransform: "uppercase" }}>Tweaks</span>
                <span style={{ cursor: "pointer", opacity: .5, fontSize: 16 }} onClick={() => setShowPanel(false)}>✕</span>
              </div>

              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim, margin: "12px 0 8px" }}>Accent</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ACCENTS.map(a => (
                  <div key={a.hex} className={`rot-swatch${tweaks.accent === a.hex ? " active" : ""}`}
                    title={a.name} style={{ background: a.hex }}
                    onClick={() => setTweaks(t => ({ ...t, accent: a.hex }))} />
                ))}
              </div>

              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim, margin: "14px 0 6px" }}>Form</div>
              <select className="rot-sel" value={tweaks.shape}
                onChange={e => setTweaks(t => ({ ...t, shape: e.target.value }))}>
                <option value="icosahedron">Icosahedron</option>
                <option value="dodecahedron">Dodecahedron</option>
                <option value="octahedron">Octahedron</option>
                <option value="torusKnot">Torus Knot</option>
              </select>

              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim, margin: "14px 0 6px", display: "flex", justifyContent: "space-between" }}>
                <span>Scroll sensitivity</span>
                <span style={{ color: ink }}>{tweaks.sensitivity.toFixed(2)}×</span>
              </div>
              <input className="rot-range" type="range" min="0.5" max="2" step="0.05" value={tweaks.sensitivity}
                onChange={e => setTweaks(t => ({ ...t, sensitivity: +e.target.value }))} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, cursor: "pointer" }}
                onClick={() => setTweaks(t => ({ ...t, showCopy: !t.showCopy }))}>
                <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim }}>Show copy</span>
                <input type="checkbox" checked={tweaks.showCopy} onChange={() => {}} style={{ accentColor: "var(--rot-accent)" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, cursor: "pointer" }}
                onClick={() => setTweaks(t => ({ ...t, bgShifts: !t.bgShifts }))}>
                <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: inkDim }}>Background shifts</span>
                <input type="checkbox" checked={tweaks.bgShifts} onChange={() => {}} style={{ accentColor: "var(--rot-accent)" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
