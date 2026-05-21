import PagePlaceholder from "../components/PagePlaceholder";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
);

const sections = [
  { title: "Movimiento oscilatorio", desc: "Definición, posición de equilibrio y vaivén." },
  { title: "Movimiento Armónico Simple (M.A.S.)", desc: "Período, frecuencia, amplitud y elongación." },
  { title: "Péndulo simple", desc: "Leyes del péndulo y período de oscilación." },
];

export default function MarcoConceptual() {
  return (
    <PagePlaceholder
      icon={icon}
      title="Marco Conceptual"
      subtitle="Fundamentos teóricos de oscilaciones y ondas mecánicas con fórmulas interactivas."
      sections={sections}
    />
  );
}