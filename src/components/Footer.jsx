import { useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "40px",
      background: "var(--bg)"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #F59E0B, #FF375F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff" }}>J</div>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>Jaden Wong · Toronto, Canada</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["GitHub","https://github.com/Jaden300"],["myojam","https://myojam.com"],["Email","mailto:hello@jadenwong.dev"]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#F59E0B"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
            >{label}</a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>© 2026 Jaden Wong</div>
      </div>
    </footer>
  )
}