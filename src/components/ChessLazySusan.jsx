import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// ── Narrative slides — each maps to a chess piece ──────────────────────────
const SLIDES = [
  {
    piece: "king",
    label: "THE KING",
    title: "myojam",
    body: "Flagship open-source project. 84.85% cross-subject EMG gesture accuracy on Ninapro DB5 — built from scratch with public data alone.",
    tags: ["Python", "React", "FastAPI", "scikit-learn", "Three.js"],
  },
  {
    piece: "queen",
    label: "THE QUEEN",
    title: "Researcher",
    body: "11 published articles and a full technical report spanning neuroscience, signal processing, ML, hardware, and the ethics of biometric interfaces.",
    tags: ["11 articles", "Technical report", "Open access"],
  },
  {
    piece: "rook",
    label: "THE ROOK",
    title: "Fairly AI",
    body: "AI QA Intern. Designed 1,000+ test cases, reduced evaluation workflow by 60%, and led benchmarking across 12+ scenarios over 15 refinement cycles.",
    tags: ["AI QA", "Benchmarking", "Co-op · 2025–2026"],
  },
  {
    piece: "bishop",
    label: "THE BISHOP",
    title: "Full Stack",
    body: "From raw EMG signal to interactive web demo — React frontend, FastAPI backend, Three.js visualisations, deployed on Vercel and Render.",
    tags: ["React", "FastAPI", "Three.js", "Canvas API", "PyQt6"],
  },
  {
    piece: "knight",
    label: "THE KNIGHT",
    title: "16 & Building",
    body: "Bur Oak Secondary School, Markham. Designing Python curriculum for elementary students. Moving in directions others don't expect.",
    tags: ["16 years old", "Toronto", "ELEVATE competition"],
  },
  {
    piece: "pawn",
    label: "THE PAWN",
    title: "The Origin",
    body: "September 2024 — no hardware, no lab, no funding. Just public data, curiosity, and a relentless need to build something that mattered.",
    tags: ["Sept 2024", "Self-taught", "From scratch"],
  },
]

const N = SLIDES.length

// ── Chess piece builder (lathe + primitives) ────────────────────────────────
function buildPiece(type, mat) {
  const g = new THREE.Group()
  const mesh = (geo, y = 0, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.y = y
    m.rotation.x = rx
    m.rotation.z = rz
    m.castShadow = true
    g.add(m)
    return m
  }

  // Shared base — wide disc + small step
  mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.07, 32), 0.035)
  mesh(new THREE.CylinderGeometry(0.37, 0.42, 0.045, 32), 0.09)

  switch (type) {
    case "pawn":
      mesh(new THREE.CylinderGeometry(0.10, 0.24, 0.46, 22), 0.355)
      mesh(new THREE.CylinderGeometry(0.075, 0.10, 0.08, 16), 0.635)
      mesh(new THREE.SphereGeometry(0.195, 20, 16), 0.775)
      break

    case "rook":
      mesh(new THREE.CylinderGeometry(0.21, 0.26, 0.60, 22), 0.415)
      mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.07, 28), 0.75)
      // battlements
      for (let i = 0; i < 4; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.145, 0.105), mat)
        b.position.set(Math.cos(i * Math.PI / 2) * 0.175, 0.86, Math.sin(i * Math.PI / 2) * 0.175)
        b.castShadow = true
        g.add(b)
      }
      break

    case "bishop":
      mesh(new THREE.CylinderGeometry(0.09, 0.23, 0.52, 22), 0.375)
      mesh(new THREE.CylinderGeometry(0.135, 0.10, 0.10, 20), 0.695)   // collar
      mesh(new THREE.SphereGeometry(0.135, 18, 14), 0.775)              // cap
      mesh(new THREE.ConeGeometry(0.045, 0.16, 12), 0.875, -Math.PI, 0) // mitre spike
      mesh(new THREE.SphereGeometry(0.04, 10, 8), 0.965)                // orb tip
      break

    case "knight": {
      mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.38, 22), 0.285)
      // abstract horse head
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.40, 0.28), mat)
      head.position.set(0.045, 0.70, 0)
      head.rotation.z = -0.20
      head.castShadow = true
      g.add(head)
      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.13, 0.21), mat)
      snout.position.set(0.185, 0.595, 0)
      snout.castShadow = true
      g.add(snout)
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.10, 8), mat)
      ear.position.set(0.00, 0.915, 0.05)
      ear.castShadow = true
      g.add(ear)
      break
    }

    case "queen":
      mesh(new THREE.CylinderGeometry(0.09, 0.23, 0.54, 22), 0.385)
      mesh(new THREE.CylinderGeometry(0.145, 0.095, 0.095, 20), 0.725) // waist
      mesh(new THREE.CylinderGeometry(0.19, 0.145, 0.07, 28), 0.825)   // crown base
      // 5 crown orbs
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.058, 12, 10), mat)
        orb.position.set(Math.cos(a) * 0.135, 0.925, Math.sin(a) * 0.135)
        orb.castShadow = true
        g.add(orb)
      }
      mesh(new THREE.SphereGeometry(0.09, 16, 12), 0.925) // center orb
      break

    case "king":
      mesh(new THREE.CylinderGeometry(0.09, 0.23, 0.54, 22), 0.385)
      mesh(new THREE.CylinderGeometry(0.145, 0.095, 0.095, 20), 0.725)
      mesh(new THREE.CylinderGeometry(0.19, 0.145, 0.07, 28), 0.825)
      mesh(new THREE.BoxGeometry(0.065, 0.30, 0.065), 0.99)  // cross vertical
      mesh(new THREE.BoxGeometry(0.205, 0.065, 0.065), 0.99) // cross horizontal
      break

    default: break
  }

  return g
}

// ── Component ───────────────────────────────────────────────────────────────
export default function ChessLazySusan() {
  const mountRef     = useRef(null)
  const containerRef = useRef(null)
  const progressRef  = useRef(0)   // float 0 → N-1, read in RAF
  const [activeIdx, setActiveIdx] = useState(0)

  // ── Scroll tracker (writes progressRef + activeIdx)
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect    = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total    = rect.height - window.innerHeight
      const norm     = Math.max(0, Math.min(1, scrolled / total))
      const prog     = norm * (N - 1)
      progressRef.current = prog
      setActiveIdx(Math.round(prog))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Three.js
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(44, W / H, 0.1, 100)
    camera.position.set(0, 2.8, 8.2)
    camera.lookAt(0, 0.4, 0)

    const RADIUS = 2.85

    // ── Per-piece materials (allows per-piece emissive)
    const pieceMats = SLIDES.map(() =>
      new THREE.MeshStandardMaterial({
        color:             0xc9922a,
        metalness:         0.82,
        roughness:         0.22,
        emissive:          new THREE.Color(0x3a1800),
        emissiveIntensity: 0.25,
      })
    )

    // ── Build pieces on the carousel
    const carousel = new THREE.Group()
    scene.add(carousel)

    const pieceMeshes = SLIDES.map(({ piece }, i) => {
      const group = buildPiece(piece, pieceMats[i])
      const a = (i / N) * Math.PI * 2
      group.position.set(Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS)
      carousel.add(group)
      return group
    })

    // ── Lazy susan disc (dark base platform)
    const discMat = new THREE.MeshStandardMaterial({
      color:     0x100a02,
      metalness: 0.7,
      roughness: 0.35,
    })
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(RADIUS + 0.5, RADIUS + 0.5, 0.06, 72), discMat)
    disc.position.y = -0.04
    disc.receiveShadow = true
    carousel.add(disc)

    // Outer gold rim
    const rimMat  = new THREE.MeshBasicMaterial({ color: 0xe8b84b, transparent: true, opacity: 0.55 })
    const outerRim = new THREE.Mesh(new THREE.TorusGeometry(RADIUS + 0.5, 0.022, 8, 90), rimMat)
    outerRim.rotation.x = Math.PI / 2
    carousel.add(outerRim)

    // Inner gold rim
    const innerRim = new THREE.Mesh(new THREE.TorusGeometry(RADIUS - 0.5, 0.014, 6, 72), rimMat)
    innerRim.rotation.x = Math.PI / 2
    carousel.add(innerRim)

    // Spokes
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      const pts = [
        new THREE.Vector3(0, 0.01, 0),
        new THREE.Vector3(Math.sin(a) * (RADIUS + 0.48), 0.01, Math.cos(a) * (RADIUS + 0.48)),
      ]
      const spoke = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xe8b84b, transparent: true, opacity: 0.18 })
      )
      carousel.add(spoke)
    }

    // ── Static front indicator ring (world space — doesn't rotate)
    const indicatorMat = new THREE.MeshBasicMaterial({ color: 0xe8b84b, transparent: true, opacity: 0.0 })
    const indicator = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.018, 8, 56), indicatorMat)
    indicator.rotation.x = Math.PI / 2
    indicator.position.set(0, 0.08, RADIUS)
    scene.add(indicator)

    // ── Floor plane (receives shadows)
    const floorMat = new THREE.MeshStandardMaterial({
      color:     0x0a0700,
      metalness: 0.4,
      roughness: 0.7,
      transparent: true,
      opacity: 0.0,  // invisible but receives shadows
    })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y  = -0.08
    floor.receiveShadow = true
    scene.add(floor)

    // ── Lights
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.45))

    // Key spotlight — illuminates the front piece
    const keySpot = new THREE.SpotLight(0xffd060, 5.5, 20, Math.PI / 7, 0.35)
    keySpot.position.set(0, 7, 4)
    keySpot.target.position.set(0, 0, RADIUS)
    keySpot.castShadow = true
    keySpot.shadow.mapSize.width  = 1024
    keySpot.shadow.mapSize.height = 1024
    scene.add(keySpot)
    scene.add(keySpot.target)

    // Rim light (behind, gives depth)
    const rimLight = new THREE.PointLight(0xc9922a, 2.2, 18)
    rimLight.position.set(0, 3, -6)
    scene.add(rimLight)

    // Fill light
    const fillLight = new THREE.PointLight(0xfff0c0, 1.0, 16)
    fillLight.position.set(-5, 4, 2)
    scene.add(fillLight)

    // ── Floating gold dust
    const DUST = 140
    const dustArr = new Float32Array(DUST * 3)
    const dustVels = new Float32Array(DUST)
    for (let i = 0; i < DUST; i++) {
      dustArr[i*3]   = (Math.random() - 0.5) * 9
      dustArr[i*3+1] = Math.random() * 5
      dustArr[i*3+2] = (Math.random() - 0.5) * 9
      dustVels[i]    = 0.004 + Math.random() * 0.006
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3))
    const dustMat = new THREE.PointsMaterial({ color: 0xf0d060, size: 0.032, transparent: true, opacity: 0.38 })
    scene.add(new THREE.Points(dustGeo, dustMat))

    // ── State
    let t = 0, rafId
    let currentRotY = 0
    let mx = 0, my = 0

    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("resize",    onResize)

    // ── Render loop
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      t += 0.005

      const prog    = progressRef.current                    // 0 → N-1 float
      const targetY = -prog * (Math.PI * 2 / N)             // carousel rotation
      currentRotY  += (targetY - currentRotY) * 0.065       // smooth follow

      carousel.rotation.y = currentRotY

      // Per-piece: highlight active, dim others
      pieceMeshes.forEach((piece, i) => {
        // World angle of piece i (0 = directly in front of camera)
        const worldAngle = (i / N) * Math.PI * 2 + currentRotY
        const norm       = ((worldAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const dist       = Math.min(norm, Math.PI * 2 - norm)
        const activity   = Math.max(0, 1 - dist / (Math.PI / (N * 0.55)))

        // Scale
        const tScale = 0.55 + activity * 0.60
        piece.scale.setScalar(piece.scale.x + (tScale - piece.scale.x) * 0.09)

        // Hover bob
        piece.position.y = activity * Math.sin(t * 1.8 + i) * 0.055

        // Emissive glow
        pieceMats[i].emissiveIntensity = 0.18 + activity * 0.85
      })

      // Indicator ring pulse
      indicatorMat.opacity = 0.35 + Math.sin(t * 3.2) * 0.20

      // Subtle camera drift with mouse
      camera.position.x = Math.sin(t * 0.12) * 0.25 + mx * 0.18
      camera.position.y = 2.8 - my * 0.12
      camera.lookAt(0, 0.4, 0)

      // Dust rises
      const dArr = dustGeo.attributes.position.array
      for (let i = 0; i < DUST; i++) {
        dArr[i*3+1] += dustVels[i]
        if (dArr[i*3+1] > 5) {
          dArr[i*3+1] = 0
          dArr[i*3]   = (Math.random() - 0.5) * 9
          dArr[i*3+2] = (Math.random() - 0.5) * 9
        }
      }
      dustGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("resize",    onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  const slide = SLIDES[activeIdx]

  return (
    // Tall container — each piece owns 100vh of scroll
    <div ref={containerRef} style={{ height: `${100 * N}vh` }}>

      {/* Sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: "var(--bg-dark)",
        display: "flex", alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>

        {/* ── 3D canvas (left) */}
        <div
          ref={mountRef}
          style={{ flex: "0 0 58%", height: "100%", position: "relative" }}
        />

        {/* ── Info panel (right) */}
        <div style={{ flex: "0 0 42%", padding: "0 56px 0 0" }}>

          {/* Piece label */}
          <div style={{
            fontSize: 10, color: "rgba(201,146,42,0.45)",
            textTransform: "uppercase", letterSpacing: "0.32em",
            marginBottom: 18, fontFamily: "var(--serif)",
          }}>
            {slide.label}
          </div>

          {/* Title — keyed so it re-animates on change */}
          <div
            key={activeIdx}
            style={{ animation: "chessReveal 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <h2 style={{
              fontSize: "clamp(38px,4.5vw,58px)", fontWeight: 800,
              color: "white", letterSpacing: "-2.5px", lineHeight: 1.0,
              fontFamily: "var(--serif)", marginBottom: 22,
            }}>
              {slide.title}
            </h2>

            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.48)", fontWeight: 300,
              lineHeight: 1.85, marginBottom: 30, maxWidth: 380,
            }}>
              {slide.body}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}>
              {slide.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, color: "rgba(201,146,42,0.85)",
                  border: "1px solid rgba(201,146,42,0.28)",
                  borderRadius: 100, padding: "5px 14px",
                  letterSpacing: "0.05em", fontWeight: 400,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Progress indicator — pill dots */}
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <div key={i} style={{
                height: 6, borderRadius: 3,
                width: i === activeIdx ? 28 : 6,
                background: i === activeIdx
                  ? "var(--gold)"
                  : "rgba(255,255,255,0.12)",
                transition: "width 0.35s ease, background 0.35s ease",
              }} />
            ))}
          </div>

          {/* Scroll hint (only on first slide) */}
          {activeIdx === 0 && (
            <div style={{
              marginTop: 36, display: "flex", alignItems: "center", gap: 10,
              opacity: 0.35,
            }}>
              <div style={{ width: 1, height: 28, background: "var(--gold)" }} />
              <span style={{
                fontSize: 10, color: "var(--gold)",
                textTransform: "uppercase", letterSpacing: "0.2em",
              }}>
                Scroll to advance
              </span>
            </div>
          )}
        </div>

        {/* CSS keyframe inline */}
        <style>{`
          @keyframes chessReveal {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>
      </div>
    </div>
  )
}
