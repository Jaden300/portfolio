import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HeroCanvas3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer (transparent background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // ── Scene + Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.z = 5.2

    // ── Primary shape: Torus Knot (2,3) – trefoil
    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.3, 140, 20, 2, 3)

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xe8b84b,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
    const solidMat = new THREE.MeshPhongMaterial({
      color: 0xc9922a,
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
    })
    const wireKnot  = new THREE.Mesh(knotGeo, wireMat)
    const solidKnot = new THREE.Mesh(knotGeo, solidMat)

    const knotGroup = new THREE.Group()
    knotGroup.add(solidKnot, wireKnot)
    knotGroup.rotation.x = 0.45
    knotGroup.rotation.z = 0.2
    scene.add(knotGroup)

    // ── Inner counter-rotating torus knot (3,2) – star knot
    const innerGeo = new THREE.TorusKnotGeometry(0.58, 0.14, 90, 14, 3, 2)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xc9922a,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const innerKnot = new THREE.Mesh(innerGeo, innerMat)
    innerKnot.rotation.y = Math.PI / 4
    scene.add(innerKnot)

    // ── Orbiting particles
    const N = 75
    const pArr  = new Float32Array(N * 3)
    const pData = []
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2.3 + Math.random() * 1.4
      const dir   = Math.random() > 0.5 ? 1 : -1
      pData.push({ theta, phi, r, dT: (0.0025 + Math.random() * 0.004) * dir })
      pArr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pArr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pArr[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xe8b84b,
      size: 0.04,
      transparent: true,
      opacity: 0.72,
    })
    const pts = new THREE.Points(pGeo, pMat)
    scene.add(pts)

    // ── Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const pl = new THREE.PointLight(0xe8b84b, 2.5, 12)
    pl.position.set(2, 2, 4)
    scene.add(pl)

    // ── State
    let t = 0, scroll = 0, mx = 0, my = 0
    let rX = 0, rY = 0, rafId

    const onScroll = () => {
      scroll = Math.min(window.scrollY / window.innerHeight, 1)
    }
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

    window.addEventListener("scroll",    onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("resize",    onResize)

    // ── Render loop
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      t += 0.005

      const speed = 1 + scroll * 4
      const fade  = Math.max(0, 1 - scroll * 1.15)

      // Smooth rotation towards target (auto-spin + mouse parallax)
      const tX = Math.sin(t * 0.38) * 0.32 - my * 0.2 + 0.45
      const tY = t * 0.18 * speed + mx * 0.3
      rX += (tX - rX) * 0.04
      rY += (tY - rY) * 0.04

      knotGroup.rotation.x = rX
      knotGroup.rotation.y = rY

      // Inner knot counter-rotates independently
      innerKnot.rotation.y  =  t * 0.22 * speed
      innerKnot.rotation.x  = -t * 0.14 * speed

      // On scroll: outer wireframe "expands" outward
      const ws = 1 + scroll * 0.38
      wireKnot.scale.setScalar(ws)
      wireMat.opacity  = 0.55 * fade
      solidMat.opacity = 0.055 * fade
      innerMat.opacity = 0.28 * fade

      // Particles: drift outward + speed up on scroll
      const arr = pGeo.attributes.position.array
      for (let i = 0; i < N; i++) {
        const d = pData[i]
        d.theta += d.dT * speed
        const r = d.r + Math.sin(t + i * 0.42) * 0.12 + scroll * 1.8
        arr[i * 3]     = r * Math.sin(d.phi) * Math.cos(d.theta)
        arr[i * 3 + 1] = r * Math.sin(d.phi) * Math.sin(d.theta)
        arr[i * 3 + 2] = r * Math.cos(d.phi)
      }
      pGeo.attributes.position.needsUpdate = true
      pMat.opacity = 0.72 * fade

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("resize",    onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "50%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}
