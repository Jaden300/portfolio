import { useEffect, useRef } from "react"
import * as THREE from "three"

function V(arr) { return arr.map(([r, y]) => new THREE.Vector2(r, y)) }

const P = {
  pawn:   V([[.26,0],[.30,.04],[.26,.08],[.16,.12],[.07,.14],[.065,.38],[.075,.39],[.18,.46],[.20,.54],[.16,.62],[.10,.66]]),
  rook:   V([[.27,0],[.33,.05],[.27,.10],[.19,.13],[.10,.15],[.12,.74],[.20,.76],[.20,.94],[.10,.95]]),
  bishop: V([[.27,0],[.32,.05],[.26,.10],[.17,.13],[.07,.15],[.085,.46],[.14,.53],[.085,.60],[.045,.78],[.028,.90],[.015,.96]]),
  queen:  V([[.28,0],[.34,.05],[.28,.10],[.18,.13],[.075,.15],[.10,.50],[.16,.58],[.10,.66],[.055,.70],[.11,.77],[.145,.85],[.095,.93],[.045,1.02]]),
  king:   V([[.28,0],[.34,.05],[.28,.10],[.18,.13],[.075,.15],[.10,.50],[.16,.58],[.10,.66],[.055,.70],[.12,.76],[.12,.90],[.045,.92],[.045,1.12]]),
}

const SC = { P: .68, R: .84, N: .84, B: .90, Q: .98, K: 1.04 }

function lathe(pts, mat, sy = 1) {
  const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 28), mat)
  m.scale.y = sy
  return m
}

function makeKnight(mat, sy = 1) {
  const g = new THREE.Group()
  g.add(new THREE.Mesh(new THREE.LatheGeometry(V([[.27,0],[.33,.05],[.27,.10],[.19,.13],[.10,.15],[.11,.38],[.17,.42]]), 28), mat))
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.07, .10, .24, 12), mat)
  neck.position.set(.09, .55, .05); neck.rotation.z = -0.38; g.add(neck)
  const head = new THREE.Mesh(new THREE.SphereGeometry(.15, 14, 10), mat)
  head.scale.set(.76, 1.0, 1.1); head.position.set(.14, .73, .06); g.add(head)
  const eG = new THREE.BoxGeometry(.055, .13, .05)
  const eL = new THREE.Mesh(eG, mat); eL.position.set(.04, .87, .05); eL.rotation.z = -.14
  const eR = eL.clone(); eR.position.x = .22; eR.rotation.z = .14; g.add(eL, eR)
  const sn = new THREE.Mesh(new THREE.BoxGeometry(.11, .085, .12), mat)
  sn.position.set(.145, .67, .17); g.add(sn)
  g.scale.y = sy; return g
}

function makeKingPiece(mat, sy = 1) {
  const g = new THREE.Group(); g.add(lathe(P.king, mat, 1))
  const c1 = new THREE.Mesh(new THREE.BoxGeometry(.24, .055, .055), mat); c1.position.y = 1.15
  const c2 = new THREE.Mesh(new THREE.BoxGeometry(.055, .22, .055), mat); c2.position.y = 1.15
  g.add(c1, c2); g.scale.y = sy; return g
}

function makePiece(t, mat) {
  const s = SC[t.toUpperCase()] || 0.85
  switch (t.toUpperCase()) {
    case 'P': return lathe(P.pawn,   mat, s)
    case 'R': return lathe(P.rook,   mat, s)
    case 'B': return lathe(P.bishop, mat, s)
    case 'N': return makeKnight(mat, s)
    case 'Q': return lathe(P.queen,  mat, s)
    case 'K': return makeKingPiece(mat, s)
  }
}

function glassMat(color) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.06,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    iridescence: 0.55,
    iridescenceIOR: 1.45,
    transparent: true,
    opacity: 0.85,
    envMapIntensity: 2.0,
  })
}

export default function ChessHero() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setClearColor(0x080a0f, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    el.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;"

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)

    // Lights — match template exactly
    const key = new THREE.DirectionalLight(0xfff060, 2.4); key.position.set(5, 10, 6); scene.add(key)
    const rim = new THREE.DirectionalLight(0xff8c30, 1.1); rim.position.set(-6, 4, -5); scene.add(rim)
    const fill = new THREE.DirectionalLight(0x4466ff, 0.5); fill.position.set(0, 6, -8); scene.add(fill)
    scene.add(new THREE.AmbientLight(0xffffff, 0.22))

    // Environment map — amber warm gradient
    ;(function () {
      const sz = 128, c = document.createElement("canvas")
      c.width = c.height = sz
      const ctx = c.getContext("2d")
      const g = ctx.createLinearGradient(0, 0, 0, sz)
      g.addColorStop(0, "#161208"); g.addColorStop(0.3, "#b8a800")
      g.addColorStop(0.55, "#f5ed50"); g.addColorStop(1, "#05070e")
      ctx.fillStyle = g; ctx.fillRect(0, 0, sz, sz)
      const rg = ctx.createRadialGradient(sz * .65, sz * .4, 4, sz * .65, sz * .4, sz * .45)
      rg.addColorStop(0, "rgba(245,240,80,0.7)"); rg.addColorStop(1, "rgba(245,240,80,0)")
      ctx.fillStyle = rg; ctx.fillRect(0, 0, sz, sz)
      const tex = new THREE.CanvasTexture(c)
      tex.mapping = THREE.EquirectangularReflectionMapping
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromEquirectangular(tex).texture
      tex.dispose(); pmrem.dispose()
    })()

    // Materials
    const wMat = glassMat(new THREE.Color("#f5e040"))
    const bMat = glassMat(new THREE.Color("#9dc8e4"))
    const lightSqMat = new THREE.MeshStandardMaterial({ color: 0xf2ddb2, roughness: 0.38, metalness: 0.08 })
    const darkSqMat  = new THREE.MeshStandardMaterial({ color: 0x130c04, roughness: 0.32, metalness: 0.4  })
    const frameMat   = new THREE.MeshStandardMaterial({ color: 0x1e0f04, roughness: 0.55, metalness: 0.3  })

    // Board
    const S = 0.85
    const board = new THREE.Group()
    board.add(new THREE.Mesh(new THREE.BoxGeometry(8 * S + 0.6, 0.14, 8 * S + 0.6), frameMat))
    const sqG = new THREE.BoxGeometry(S, 0.05, S)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const m = new THREE.Mesh(sqG, (r + c) % 2 === 0 ? lightSqMat : darkSqMat)
        m.position.set((c - 3.5) * S, 0.07, (r - 3.5) * S)
        board.add(m)
      }
    }
    scene.add(board)

    // Starting position
    const rows = [
      ['R','N','B','Q','K','B','N','R'],
      ['P','P','P','P','P','P','P','P'],
      null, null, null, null,
      ['p','p','p','p','p','p','p','p'],
      ['r','n','b','q','k','b','n','r'],
    ]
    rows.forEach((row, ri) => {
      if (!row) return
      row.forEach((t, ci) => {
        const isW = t === t.toUpperCase()
        const obj = makePiece(t, isW ? wMat : bMat)
        obj.position.set((ci - 3.5) * S, 0.09, (ri - 3.5) * S)
        scene.add(obj)
      })
    })

    // Scroll
    let scrollP = 0, smoothP = 0
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollP = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Resize
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", resize)
    resize()

    let raf
    function tick(now) {
      raf = requestAnimationFrame(tick)
      smoothP += (scrollP - smoothP) * 0.055
      const angle = smoothP * Math.PI * 1.8
      const pr = { r: 11, y: 7.5 }
      camera.position.set(
        Math.sin(angle) * pr.r,
        pr.y + Math.sin(now * 0.0004) * 0.35,
        Math.cos(angle) * pr.r
      )
      camera.lookAt(0, 0.6, 0)
      renderer.render(scene, camera)
    }
    requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", resize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} style={{
      position: "absolute", inset: 0,
      pointerEvents: "none", zIndex: 0,
    }} />
  )
}
