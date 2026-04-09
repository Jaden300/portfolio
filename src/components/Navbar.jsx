import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    ["Home",    "/"],
    ["About",   "/about"],
    ["Work",    "/work"],
    ["Contact", "/contact"],
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,0,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.3s ease"
    }}>
      {/* Logo */}
      <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #F59E0B, #FF375F)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#fff"
        }}>J</div>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.3px" }}>Jaden Wong</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map(([label, path]) => (
          <span key={path} onClick={() => navigate(path)} style={{
            fontSize: 13, fontWeight: 400, cursor: "pointer",
            color: pathname === path ? "#F59E0B" : "var(--text-secondary)",
            letterSpacing: "0.02em", transition: "color 0.15s"
          }}
            onMouseEnter={e => { if (pathname !== path) e.currentTarget.style.color = "var(--text)" }}
            onMouseLeave={e => { if (pathname !== path) e.currentTarget.style.color = "var(--text-secondary)" }}
          >{label}</span>
        ))}
        <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer" style={{
          background: "linear-gradient(135deg, #F59E0B, #92400e)",
          color: "#0a0000", borderRadius: 100, padding: "7px 18px",
          fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
          transition: "transform 0.15s, box-shadow 0.15s",
          boxShadow: "0 4px 16px rgba(245,158,11,0.3)"
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,158,11,0.5)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,158,11,0.3)" }}
        >GitHub ↗</a>
      </div>
    </nav>
  )
}