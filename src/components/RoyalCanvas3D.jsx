import { useEffect, useRef } from "react"
import * as THREE from "three"

// Smooth step easing
const smoothstep = (t) => t * t * (3 - 2 * t)
const clamp01    = (t) => Math.max(0, Math.min(1, t))

export default function RoyalCanvas3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // ── Scene / Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100)
    camera.position.z = 7

    // ── Central sphere
    const sphGeo   = new THREE.SphereGeometry(1.25, 36, 36)
    const sphWire  = new THREE.MeshBasicMaterial({ color: 0xe8b84b, wireframe: true, transparent: true, opacity: 0.1 })
    const sphSolid = new THREE.MeshPhongMaterial({ color: 0xc9922a, emissive: 0x1a0d00, transparent: true, opacity: 0.07 })
    const sphereGroup = new THREE.Group()
    sphereGroup.add(new THREE.Mesh(sphGeo, sphSolid))
    sphereGroup.add(new THREE.Mesh(sphGeo, sphWire))

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.55, 20, 20)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xf0d070, transparent: true, opacity: 0.22 })
    sphereGroup.add(new THREE.Mesh(coreGeo, coreMat))
    scene.add(sphereGroup)

    // ── Orbital rings  — armillary sphere layout
    const RING_R = 2.3
    const ringDefs = [
      { rot: [0,           0,           0          ], color: 0xe8b84b, speed:  0.0030 }, // equatorial
      { rot: [Math.PI/2,   0,           0          ], color: 0xd4a032, speed: -0.0022 }, // meridian
      { rot: [0,           0,           Math.PI/2  ], color: 0xf0c050, speed:  0.0018 }, // polar
      { rot: [0.42,        Math.PI/4,   0          ], color: 0xc9922a, speed: -0.0028 }, // ecliptic
      { rot: [Math.PI/3,   0,           Math.PI/3  ], color: 0xe8b84b, speed:  0.0014 }, // diagonal A
      { rot: [-Math.PI/4,  Math.PI/3,   Math.PI/6  ], color: 0xd4a032, speed: -0.0020 }, // diagonal B
    ]

    const ringGeo  = new THREE.TorusGeometry(RING_R, 0.019, 8, 150)
    const ringMeshes = []
    const ringMats   = []

    ringDefs.forEach(({ rot, color, speed }) => {
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.52 })
      const mesh = new THREE.Mesh(ringGeo, mat)
      mesh.rotation.set(...rot)
      mesh.userData.speed = speed
      mesh.userData.baseRot = [...rot]
      scene.add(mesh)
      ringMeshes.push(mesh)
      ringMats.push(mat)
    })

    // ── Gem points — tiny octahedra at 6 cardinal positions
    const gemGeo = new THREE.OctahedronGeometry(0.1)
    const gemMat = new THREE.MeshBasicMaterial({ color: 0xffe090, transparent: true, opacity: 0.9 })
    const gemPositions = [
      [0, RING_R, 0], [0, -RING_R, 0],
      [RING_R, 0, 0], [-RING_R, 0, 0],
      [0, 0, RING_R], [0, 0, -RING_R],
    ]
    const gems = gemPositions.map(pos => {
      const g = new THREE.Mesh(gemGeo, gemMat)
      g.position.set(...pos)
      scene.add(g)
      return g
    })

    // ── Ring particles — 32 per ring, orbiting along each ring's plane
    const PARTS_PER_RING = 32
    const TOTAL_PARTS    = ringDefs.length * PARTS_PER_RING
    const pArr  = new Float32Array(TOTAL_PARTS * 3)
    const pGeo  = new THREE.BufferGeometry()
    pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xf5e090, size: 0.05, transparent: true, opacity: 0.88 })
    scene.add(new THREE.Points(pGeo, pMat))

    // Per-particle angular offset
    const pOffsets = Array.from({ length: TOTAL_PARTS }, (_, i) => ({
      base: (i % PARTS_PER_RING) / PARTS_PER_RING * Math.PI * 2,
    }))

    // Reusable temp vector
    const tmpV = new THREE.Vector3()

    // ── Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const pl1 = new THREE.PointLight(0xe8b84b, 3.5, 18)
    pl1.position.set(0, 0, 4)
    scene.add(pl1)
    const pl2 = new THREE.PointLight(0xc9922a, 1.8, 12)
    pl2.position.set(-4, 3, 2)
    scene.add(pl2)
    const pl3 = new THREE.PointLight(0xffd070, 1.2, 10)
    pl3.position.set(4, -2, 3)
    scene.add(pl3)

    // ── State
    let t = 0, mx = 0, my = 0, rafId

    const onMouse  = (e) => {
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

      // Section-relative scroll: 0 = entering, 0.5 = centered, 1 = exiting
      const rect   = mount.getBoundingClientRect()
      const scroll = clamp01((window.innerHeight - rect.top) / (window.innerHeight + rect.height))

      // --- Phase timings ---
      // Materialize:  scroll 0.00 → 0.28
      const matT   = smoothstep(clamp01(scroll / 0.28))
      // Expand rings: scroll 0.62 → 0.88
      const expT   = smoothstep(clamp01((scroll - 0.62) / 0.26))
      // Fade out:     scroll 0.80 → 1.00
      const fadeT  = 1 - smoothstep(clamp01((scroll - 0.80) / 0.20))
      // Speed ramp:   rings spin faster mid-scroll
      const speed  = 1 + smoothstep(clamp01((scroll - 0.2) / 0.5)) * 1.6

      // --- Global scale (materialize + fade) ---
      scene.scale.setScalar(matT * fadeT)

      // --- Sphere slow rotation + mouse tilt ---
      sphereGroup.rotation.y = t * 0.07 + mx * 0.18
      sphereGroup.rotation.x = Math.sin(t * 0.11) * 0.12 - my * 0.1
      sphWire.opacity  = 0.1  * fadeT
      sphSolid.opacity = 0.07 * fadeT
      coreMat.opacity  = (0.22 + expT * 0.25) * fadeT  // core brightens mid-scroll

      // --- Rings ---
      const ringExpand = 1 + expT * 0.55

      ringMeshes.forEach((ring, i) => {
        ring.rotation.y += ringDefs[i].speed * speed
        ring.scale.setScalar(ringExpand)
        ringMats[i].opacity = 0.52 * fadeT
      })

      // --- Gems follow equatorial ring's expansion ---
      const gScale = ringExpand
      const gPulse = 1 + Math.sin(t * 2.5) * 0.12
      gems.forEach((g, i) => {
        const base = gemPositions[i]
        g.position.set(base[0] * gScale, base[1] * gScale, base[2] * gScale)
        g.rotation.y += 0.03
        g.scale.setScalar(gPulse)
      })
      gemMat.opacity = (0.9 + Math.sin(t * 2.5) * 0.1) * fadeT

      // --- Particles orbit each ring ---
      const arr = pGeo.attributes.position.array
      for (let ri = 0; ri < ringDefs.length; ri++) {
        const ring = ringMeshes[ri]
        const r    = RING_R * ringExpand
        for (let pi = 0; pi < PARTS_PER_RING; pi++) {
          const idx   = ri * PARTS_PER_RING + pi
          const angle = pOffsets[idx].base + t * Math.abs(ringDefs[ri].speed) * 200 * Math.sign(ringDefs[ri].speed) * speed
          tmpV.set(r * Math.cos(angle), 0, r * Math.sin(angle))
          tmpV.applyQuaternion(ring.quaternion)
          arr[idx * 3]     = tmpV.x
          arr[idx * 3 + 1] = tmpV.y
          arr[idx * 3 + 2] = tmpV.z
        }
      }
      pGeo.attributes.position.needsUpdate = true
      pMat.opacity = (0.88 + expT * 0.12) * fadeT

      // Camera pulls back slightly as rings expand
      camera.position.z = 7 + expT * 2.0

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

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  )
}
