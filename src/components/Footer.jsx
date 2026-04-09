import { useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>
          © 2026 Jaden Wong · Toronto, Ontario
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            ["myojam", "https://myojam.com"],
            ["GitHub", "https://github.com/Jaden300"],
            ["LinkedIn", "https://www.linkedin.com/in/jaden-wong09/"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="ink-line" style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, cursor: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}