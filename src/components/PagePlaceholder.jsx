export default function PagePlaceholder({ icon, title, subtitle, sections = [] }) {
  return (
    <div className="page-placeholder">
      <div className="placeholder-hero">
        <div className="placeholder-icon">{icon}</div>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-subtitle">{subtitle}</p>
      </div>

      {sections.length > 0 && (
        <div className="placeholder-sections">
          {sections.map((s, i) => (
            <div key={i} className="placeholder-section-card">
              <div className="psc-number">0{i + 1}</div>
              <div className="psc-body">
                <h3 className="psc-title">{s.title}</h3>
                <p className="psc-desc">{s.desc}</p>
              </div>
              <div className="psc-status">Próximamente</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}