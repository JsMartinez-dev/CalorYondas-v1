import { BlockMath } from 'react-katex';

export default function FormulaCard({ title, formula, variables }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      boxShadow: 'var(--shadow-md)',
      margin: '1rem 0'
    }}>
      {title && <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', marginTop: 0 }}>{title}</h4>}
      <div style={{ padding: '1rem 0', display: 'flex', justifyContent: 'center' }}>
        <BlockMath math={formula} />
      </div>
      {variables && variables.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {variables.map((v, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{v.symbol}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
