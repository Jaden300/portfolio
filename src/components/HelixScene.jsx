import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HelixScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth, H = mount.clientHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100)
    camera.position.set(3.5, 0, 11)
    camera.lookAt(0, 0, 0)

    // Soft circular sprite
    const sc = document.createElement("canvas"); sc.width = sc.height = 64
    const sctx = sc.getContext("2d")
    const sg = sctx.createRadialGradient(32,32,0,32,32,32)
    sg.addColorStop(0,   "rgba(255,255,255,1)")
    sg.addColorStop(0.45,"rgba(255,255,255,0.6)")
    sg.addColorStop(1,   "rgba(255,255,255,0)")
    sctx.fillStyle = sg; sctx.fillRect(0,0,64,64)
    const sprite = new THREE.CanvasTexture(sc)

    // ── Helix geometry
    const TURNS    = 5
    const PTS      = TURNS * 24        // points per strand
    const RADIUS   = 1.9
    const RISE     = 9.0               // total Y height
    const RUNG_INT = 12               // every N points, draw a connecting rung

    const buildStrand = (phaseOffset) => {
      const pos = new Float32Array(PTS * 3)
      for (let i = 0; i < PTS; i++) {
        const theta = (i / PTS) * TURNS * Math.PI * 2 + phaseOffset
        const y     = (i / PTS) * RISE - RISE / 2
        pos[i*3]   = Math.sin(theta) * RADIUS
        pos[i*3+1] = y
        pos[i*3+2] = Math.cos(theta) * RADIUS
      }
      return pos
    }

    const pos1 = buildStrand(0)
    const pos2 = buildStrand(Math.PI)

    // Main strand particles
    const mkStrand = (pos, color, size) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3))
      const mat = new THREE.PointsMaterial({
        color, size, transparent: true, opacity: 0.92,
        blending: THREE.AdditiveBlending, depthWrite: false,
        sizeAttenuation: true, map: sprite, alphaTest: 0.001,
      })
      return new THREE.Points(geo, mat)
    }

    // Halo (larger, dimmer) for each strand
    const mkHalo = (pos, color, size) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3))
      const mat = new THREE.PointsMaterial({
        color, size, transparent: true, opacity: 0.18,
        blending: THREE.AdditiveBlending, depthWrite: false,
        sizeAttenuation: true, map: sprite, alphaTest: 0.001,
      })
      return new THREE.Points(geo, mat)
    }

    const strand1 = mkStrand(pos1, 0xf5e040, 0.17)
    const strand2 = mkStrand(pos2, 0xfbbf24, 0.17)
    const halo1   = mkHalo(pos1, 0xf5e040, 0.44)
    const halo2   = mkHalo(pos2, 0xfde68a, 0.44)

    // Connecting rungs as LineSegments
    const rungVerts = []
    for (let i = 0; i < PTS; i += RUNG_INT) {
      rungVerts.push(pos1[i*3], pos1[i*3+1], pos1[i*3+2])
      rungVerts.push(pos2[i*3], pos2[i*3+1], pos2[i*3+2])
    }
    const rungGeo = new THREE.BufferGeometry()
    rungGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(rungVerts), 3))
    const rungs = new THREE.LineSegments(rungGeo, new THREE.LineBasicMaterial({
      color: 0xf5e040, transparent: true, opacity: 0.22,
    }))

    // Rung midpoint glow dots
    const midVerts = []
    for (let i = 0; i < PTS; i += RUNG_INT) {
      midVerts.push(
        (pos1[i*3] + pos2[i*3]) / 2,
        (pos1[i*3+1] + pos2[i*3+1]) / 2,
        (pos1[i*3+2] + pos2[i*3+2]) / 2,
      )
    }
    const midGeo = new THREE.BufferGeometry()
    midGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(midVerts), 3))
    const midDots = new THREE.Points(midGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.10, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
      map: sprite, alphaTest: 0.001,
    }))

    // Group everything
    const helix = new THREE.Group()
    helix.add(strand1, strand2, halo1, halo2, rungs, midDots)
    scene.add(helix)

    // Ambient floating dust
    const DUST = 120
    const dustArr = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      dustArr[i*3]   = (Math.random()-0.5)*16
      dustArr[i*3+1] = (Math.random()-0.5)*12
      dustArr[i*3+2] = (Math.random()-0.5)*8
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3))
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0xf5e040, size: 0.04, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
      map: sprite, alphaTest: 0.001,
    })))

    // Scroll + mouse
    let scrollY = 0, mx = 0, my = 0
    const onScroll = () => { scrollY = window.scrollY }
    const onMouse  = (e) => { mx = (e.clientX/window.innerWidth-0.5)*2; my = (e.clientY/window.innerHeight-0.5)*2 }
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h)
    }
    window.addEventListener("scroll",    onScroll, { passive:true })
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("resize",    onResize)

    let raf, t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t  += 0.007

      helix.rotation.y = t * 0.28 + scrollY * 0.0006
      helix.rotation.x = Math.sin(t * 0.18) * 0.06 + my * 0.04
      helix.rotation.z = mx * 0.025

      // Gentle camera drift
      camera.position.x = 3.5 + Math.sin(t * 0.11) * 0.4 + mx * 0.25
      camera.position.y =       Math.sin(t * 0.07) * 0.5 - my * 0.15
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("resize",    onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ position:"relative", width:"100%", height:"72vh", minHeight:480, overflow:"hidden" }}>
      <div ref={mountRef} style={{ width:"100%", height:"100%" }} />
      {/* Label */}
      <div style={{
        position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
        textAlign:"center", pointerEvents:"none",
      }}>
        <div style={{ fontSize:10, letterSpacing:"0.38em", textTransform:"uppercase", color:"rgba(245,224,64,0.35)", fontFamily:"var(--font)" }}>
          signal · structure · sequence
        </div>
      </div>
    </div>
  )
}
