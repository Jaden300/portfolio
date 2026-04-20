import { useEffect, useRef } from "react"
import * as THREE from "three"

function smoothstep(t) {
  t = Math.max(0, Math.min(1, t))
  return t * t * (3 - 2 * t)
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3)
}

const CHARS  = ["黃", "德", "治"]
const COLORS = [
  { core: 0xf5e040, halo: 0xfffce0, hex: "#f5e040" },
  { core: 0xfbbf24, halo: 0xfde68a, hex: "#fbbf24" },
  { core: 0xfef3c7, halo: 0xffffff, hex: "#fef3c7" },
]
const LABELS = [
  { pinyin: "huáng", en: "surname · yellow" },
  { pinyin: "dé",    en: "virtue · morality" },
  { pinyin: "zhì",   en: "governance · mastery" },
]

function getPhase(lp) {
  if (lp < 0.08) {
    return { assembleT: easeOutCubic(lp / 0.08) * 0.25, dissolveT: 0, opacity: smoothstep(lp / 0.08) }
  } else if (lp < 0.22) {
    return { assembleT: 0.25 + easeOutCubic((lp - 0.08) / 0.14) * 0.75, dissolveT: 0, opacity: 1 }
  } else if (lp < 0.72) {
    return { assembleT: 1, dissolveT: 0, opacity: 1 }
  } else if (lp < 0.90) {
    const t = (lp - 0.72) / 0.18
    return { assembleT: 1, dissolveT: easeOutCubic(t), opacity: 1 - smoothstep(t) }
  }
  return { assembleT: 1, dissolveT: 1, opacity: 0 }
}

export default function ResearchCanvas3D() {
  const containerRef = useRef(null)
  const mountRef     = useRef(null)
  const label0Ref    = useRef(null)
  const label1Ref    = useRef(null)
  const label2Ref    = useRef(null)
  const panel0Ref    = useRef(null)
  const panel1Ref    = useRef(null)
  const panel2Ref    = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const mount     = mountRef.current
    if (!container || !mount) return

    let raf, renderer, cleanup
    const labelRefs = [label0Ref, label1Ref, label2Ref]
    const panelRefs = [panel0Ref, panel1Ref, panel2Ref]

    document.fonts.ready.then(() => {
      const W = mount.clientWidth, H = mount.clientHeight
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.01, 200)
      camera.position.set(0, 0, 9)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x080a0f, 1)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.1
      mount.appendChild(renderer.domElement)

      // Circular sprite texture — eliminates square-box artefact on points
      const spriteCanvas = document.createElement("canvas")
      spriteCanvas.width = spriteCanvas.height = 64
      const sctx = spriteCanvas.getContext("2d")
      const sg = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      sg.addColorStop(0,   "rgba(255,255,255,1)")
      sg.addColorStop(0.45,"rgba(255,255,255,0.6)")
      sg.addColorStop(1,   "rgba(255,255,255,0)")
      sctx.fillStyle = sg
      sctx.fillRect(0, 0, 64, 64)
      const sprite = new THREE.CanvasTexture(spriteCanvas)

      const SZ = 512, STEP = 5
      const rng = (lo, hi) => lo + Math.random() * (hi - lo)

      function sampleChar(ch) {
        const cc = document.createElement("canvas")
        cc.width = cc.height = SZ
        const ctx = cc.getContext("2d")
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, SZ, SZ)
        ctx.fillStyle = "#fff"
        ctx.font = `bold 390px "Noto Serif CJK SC","Hiragino Mincho ProN","SimSun","MS Mincho",serif`
        ctx.textAlign = "center"; ctx.textBaseline = "middle"
        ctx.fillText(ch, SZ / 2, SZ / 2 + 24)
        const d = ctx.getImageData(0, 0, SZ, SZ).data
        const pts = []
        for (let y = 0; y < SZ; y += STEP)
          for (let x = 0; x < SZ; x += STEP)
            if (d[(y * SZ + x) * 4] > 60)
              pts.push([(x - SZ/2) / SZ * 9.5, -(y - SZ/2) / SZ * 9.5, 0])
        if (pts.length < 120) {
          for (let i = 0; i < 1400; i++) {
            const a = i * 0.22, r = 0.3 + i * 0.0025
            pts.push([Math.cos(a)*r, Math.sin(a)*r, 0])
          }
        }
        return pts
      }

      const systems = CHARS.map((ch, ci) => {
        const pts = sampleChar(ch)
        const N   = pts.length
        const targetPos  = new Float32Array(N * 3)
        const scatterPos = new Float32Array(N * 3)
        const curPos     = new Float32Array(N * 3)
        const dissolveDir= new Float32Array(N * 3)

        for (let i = 0; i < N; i++) {
          targetPos[i*3]   = pts[i][0]
          targetPos[i*3+1] = pts[i][1]
          targetPos[i*3+2] = pts[i][2]

          const theta = Math.random() * Math.PI * 2
          const phi   = Math.acos(Math.random() * 2 - 1)
          const r     = rng(10, 22)
          scatterPos[i*3]   = Math.sin(phi) * Math.cos(theta) * r
          scatterPos[i*3+1] = Math.sin(phi) * Math.sin(theta) * r - rng(4, 10)
          scatterPos[i*3+2] = Math.cos(phi) * r * 0.35

          const da = Math.random() * Math.PI * 2, dr = rng(6, 18)
          dissolveDir[i*3]   = Math.cos(da) * dr
          dissolveDir[i*3+1] = rng(4, 14)
          dissolveDir[i*3+2] = Math.sin(da) * dr * 0.3

          curPos[i*3]   = scatterPos[i*3]
          curPos[i*3+1] = scatterPos[i*3+1]
          curPos[i*3+2] = scatterPos[i*3+2]
        }

        const geo     = new THREE.BufferGeometry()
        const posAttr = new THREE.BufferAttribute(curPos, 3)
        geo.setAttribute("position", posAttr)

        const coreMat = new THREE.PointsMaterial({
          color: COLORS[ci].core, size: 0.20, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
          map: sprite, alphaTest: 0.001,
        })
        const haloMat = new THREE.PointsMaterial({
          color: COLORS[ci].halo, size: 0.44, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
          map: sprite, alphaTest: 0.001,
        })
        const dustPos = new Float32Array(300 * 3)
        for (let i = 0; i < 300; i++) {
          dustPos[i*3] = rng(-14,14); dustPos[i*3+1] = rng(-14,14); dustPos[i*3+2] = rng(-5,5)
        }
        const dustGeo = new THREE.BufferGeometry()
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
        const dustMat = new THREE.PointsMaterial({
          color: COLORS[ci].core, size: 0.018, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false,
          map: sprite, alphaTest: 0.001,
        })

        const coreP = new THREE.Points(geo, coreMat)
        const haloP = new THREE.Points(geo, haloMat)
        const dustP = new THREE.Points(dustGeo, dustMat)
        scene.add(coreP, haloP, dustP)

        return { N, targetPos, scatterPos, curPos, dissolveDir, posAttr, coreMat, haloMat, dustMat, coreP, haloP }
      })

      const pRef = { raw: 0, smooth: 0 }
      const onScroll = () => {
        const rect  = container.getBoundingClientRect()
        const total = container.offsetHeight - window.innerHeight
        pRef.raw = Math.max(0, Math.min(1, -rect.top / total))
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()

      const onResize = () => {
        const W = mount.clientWidth, H = mount.clientHeight
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        renderer.setSize(W, H)
      }
      window.addEventListener("resize", onResize)

      let time = 0

      function tick() {
        raf = requestAnimationFrame(tick)
        time += 0.012
        pRef.smooth += (pRef.raw - pRef.smooth) * 0.055
        const p = pRef.smooth

        systems.forEach((sys, ci) => {
          const lp = Math.max(0, Math.min(1, (p - ci / 3) * 3))
          const { assembleT, dissolveT, opacity } = getPhase(lp)

          if (opacity < 0.001 && sys.coreMat.opacity < 0.001) {
            sys.coreMat.opacity = 0; sys.haloMat.opacity = 0; sys.dustMat.opacity = 0
            if (labelRefs[ci].current) labelRefs[ci].current.style.opacity = "0"
            if (panelRefs[ci].current) panelRefs[ci].current.style.opacity = "0"
            return
          }

          const wobble = assembleT > 0.95 ? assembleT : 0
          const { N, targetPos, scatterPos, curPos, dissolveDir, posAttr, coreMat, haloMat, dustMat, coreP, haloP } = sys

          for (let i = 0; i < N; i++) {
            const bx = scatterPos[i*3]   + (targetPos[i*3]   - scatterPos[i*3])   * assembleT
            const by = scatterPos[i*3+1] + (targetPos[i*3+1] - scatterPos[i*3+1]) * assembleT
            const bz = scatterPos[i*3+2] + (targetPos[i*3+2] - scatterPos[i*3+2]) * assembleT
            curPos[i*3]   = bx + dissolveDir[i*3]   * dissolveT
            curPos[i*3+1] = by + dissolveDir[i*3+1] * dissolveT
            curPos[i*3+2] = bz + dissolveDir[i*3+2] * dissolveT
            curPos[i*3+2] += Math.sin(time * 0.7 + i * 0.13) * 0.035 * wobble
          }
          posAttr.needsUpdate = true

          const rot = Math.sin(time * 0.28) * 0.14
          coreP.rotation.y = rot; haloP.rotation.y = rot

          coreMat.opacity = opacity * 0.95
          haloMat.opacity = opacity * 0.20
          dustMat.opacity = opacity * 0.28

          const labelO = smoothstep(Math.max(0, Math.min(1, (assembleT - 0.9) / 0.1))) * (1 - dissolveT * 1.5)
          if (labelRefs[ci].current) labelRefs[ci].current.style.opacity = String(Math.max(0, labelO))

          const panelO = smoothstep(Math.max(0, Math.min(1, (assembleT - 0.85) / 0.15))) * Math.max(0, 1 - dissolveT * 2)
          if (panelRefs[ci].current) panelRefs[ci].current.style.opacity = String(Math.max(0, panelO))
        })

        renderer.render(scene, camera)
      }
      requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("resize", onResize)
        window.removeEventListener("scroll", onScroll)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    })

    return () => { if (cleanup) cleanup() }
  }, [])

  const panelStyle = {
    position: "absolute", inset: 0, opacity: 0,
    display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "0 52px 0 36px", pointerEvents: "none",
  }

  const accentBar = (color) => ({
    width: 2, height: 48, background: color,
    borderRadius: 2, marginBottom: 28, flexShrink: 0,
  })

  return (
    <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", zIndex: 1 }}>

        {/* Left: Three.js canvas */}
        <div ref={mountRef} style={{ width: "50%", height: "100%", position: "relative", flexShrink: 0 }}>
          {/* Per-character labels */}
          {CHARS.map((ch, ci) => {
            const refs = [label0Ref, label1Ref, label2Ref]
            return (
              <div key={ch} ref={refs[ci]} style={{
                position: "absolute", bottom: "14%", left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center", zIndex: 2, pointerEvents: "none", opacity: 0,
              }}>
                <div style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: `${COLORS[ci].hex}70`, fontFamily: "var(--font)" }}>
                  {LABELS[ci].pinyin}&nbsp;·&nbsp;{ch}&nbsp;·&nbsp;{LABELS[ci].en}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: content panels */}
        <div style={{ width: "50%", height: "100%", position: "relative", borderLeft: "1px solid rgba(237,234,226,0.06)" }}>

          {/* Panel 0 — 黃 — Technical Report */}
          <div ref={panel0Ref} style={panelStyle}>
            <div style={accentBar(COLORS[0].hex)} />
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: `${COLORS[0].hex}90`, marginBottom: 14, fontFamily: "var(--font)" }}>Technical report</div>
            <h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", fontFamily: "var(--serif)", lineHeight: 1.35, marginBottom: 20, maxWidth: 460 }}>
              myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction
            </h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: `${COLORS[0].hex}`, background: `${COLORS[0].hex}15`, border: `1px solid ${COLORS[0].hex}30`, borderRadius: 100, padding: "3px 11px" }}>April 2026</span>
              <span style={{ fontSize: 11, color: "#10B981", background: "rgba(16,185,129,0.08)", borderRadius: 100, padding: "3px 11px" }}>Open Access</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28, maxWidth: 380 }}>
              {[["84.85%","cross-subject accuracy"],["6","gesture classes"],["16,269","labelled windows"],["10","training subjects"]].map(([v,l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: COLORS[0].hex, fontFamily: "var(--serif)", letterSpacing: "-0.5px" }}>{v}</div>
                  <div style={{ fontSize: 10, color: "rgba(237,234,226,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
            <a href="https://myojam.com/research" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS[0].hex, borderBottom: `1px solid ${COLORS[0].hex}50`, paddingBottom: 2, pointerEvents: "auto", display: "inline-block" }}>
              Read paper ↗
            </a>
          </div>

          {/* Panel 1 — 德 — Articles */}
          <div ref={panel1Ref} style={panelStyle}>
            <div style={accentBar(COLORS[1].hex)} />
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: `${COLORS[1].hex}90`, marginBottom: 14, fontFamily: "var(--font)" }}>Articles</div>
            <h3 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", fontFamily: "var(--serif)", marginBottom: 28 }}>
              11 published articles.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 480 }}>
              {[
                { title: "Build your own EMG sensor for under $60", tag: "Hardware", likes: 89 },
                { title: "After EMG: what comes next", tag: "Future", likes: 73 },
                { title: "The ghost in the electrode: phantom limb EMG", tag: "Neuroscience", likes: 61 },
                { title: "Muscle memory is real — it's just not in your muscles", tag: "Neuroscience", likes: 52 },
              ].map(({ title, tag, likes }) => (
                <div key={title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
                  <span style={{ fontSize: 13, color: `${COLORS[1].hex}60`, fontWeight: 400, minWidth: 36, textAlign: "right" }}>♥ {likes}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontSize: 10, color: `${COLORS[1].hex}80`, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{tag}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://myojam.com/education" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS[1].hex, borderBottom: `1px solid ${COLORS[1].hex}50`, paddingBottom: 2, pointerEvents: "auto", display: "inline-block", marginTop: 22 }}>
              All articles on myojam.com ↗
            </a>
          </div>

          {/* Panel 2 — 治 — Resources */}
          <div ref={panel2Ref} style={panelStyle}>
            <div style={accentBar(COLORS[2].hex)} />
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: `${COLORS[2].hex}80`, marginBottom: 14, fontFamily: "var(--font)" }}>Educational resources</div>
            <h3 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", fontFamily: "var(--serif)", marginBottom: 28 }}>
              3 lesson plans.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
              {[
                { title: "EMG Basics — full lesson plan", audience: "Grades 9–12 · Biology / Physics", duration: "75 min" },
                { title: "Teaching a machine to read gestures", audience: "Grades 10–12 / Intro university · CS", duration: "90 min" },
                { title: "myocode: code with your muscles", audience: "Grades 6–10 · CS / STEM", duration: "60 min" },
              ].map(({ title, audience, duration }) => (
                <div key={title} style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: 6, fontFamily: "var(--serif)" }}>{title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: `${COLORS[2].hex}70`, fontWeight: 300 }}>{audience}</span>
                    <span style={{ fontSize: 10, color: "rgba(237,234,226,0.25)", borderRadius: 100, padding: "1px 8px" }}>{duration}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://myojam.com/educators" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS[2].hex, borderBottom: `1px solid ${COLORS[2].hex}50`, paddingBottom: 2, pointerEvents: "auto", display: "inline-block", marginTop: 22 }}>
              View all lesson plans ↗
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
