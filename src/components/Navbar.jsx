import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    ["Research", "/research"],
    ["Projects", "/work"],
    ["About",    "/about"],
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,10,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(237,234,226,0.06)" : "none",
      transition: "all 0.4s ease"
    }}>
      {/* Logo */}
      <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 0 }}>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 400,
          color: "var(--text)",
          letterSpacing: "-0.5px",
        }}>JW</span>
        <span style={{
          fontFamily: "serif",
          fontSize: 17,
          color: "var(--gold)",
          marginLeft: 1,
        }}>黃</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map(([label, path]) => (
          <span key={path} onClick={() => navigate(path)} className="ink-line" style={{
            fontSize: 13, cursor: "pointer", fontWeight: 400,
            color: pathname === path ? "var(--gold)" : "var(--text-tertiary)",
            letterSpacing: "0.04em", transition: "color 0.2s",
            fontFamily: "var(--font)"
          }}>{label}</span>
        ))}
        <a href="/contact" onClick={e => { e.preventDefault(); navigate("/contact") }} style={{
          fontSize: 13, fontWeight: 400,
          color: "var(--text)",
          border: "1px solid var(--border-dark)",
          borderRadius: 100,
          padding: "7px 18px",
          letterSpacing: "0.04em",
          transition: "border-color 0.2s, color 0.2s, background 0.2s",
          display: "inline-block",
          fontFamily: "var(--font)"
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)" }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.color = "var(--text)" }}
        >Get in touch</a>
      </div>
    </nav>
  )
}
