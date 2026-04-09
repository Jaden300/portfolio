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

  const links = [["Home","/"],["About","/about"],["Work","/work"],["Contact","/contact"]]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(250,249,246,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.4s ease"
    }}>
      {/* Wordmark */}
      <div onClick={() => navigate("/")} style={{ cursor: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="10" fill="none" stroke="var(--gold)" strokeWidth="1.5"/>
          <text x="11" y="15.5" textAnchor="middle" fill="var(--gold)" fontSize="11" fontWeight="700" fontFamily="Georgia">J</text>
        </svg>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.3px" }}>Jaden Wong</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {links.map(([label, path]) => (
          <span key={path} onClick={() => navigate(path)} className="ink-line" style={{
            fontSize: 13, cursor: "none", fontWeight: 400,
            color: pathname === path ? "var(--gold)" : "var(--text-secondary)",
            letterSpacing: "0.02em", transition: "color 0.2s"
          }}>{label}</span>
        ))}
        <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer" style={{
          background: "var(--text)", color: "var(--bg)",
          borderRadius: 100, padding: "8px 20px",
          fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
          transition: "background 0.2s, transform 0.2s", cursor: "none",
          display: "inline-block"
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "scale(1.04)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.transform = "scale(1)" }}
        >GitHub ↗</a>
      </div>
    </nav>
  )
}