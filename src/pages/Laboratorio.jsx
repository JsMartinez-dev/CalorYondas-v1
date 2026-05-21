import PagePlaceholder from "../components/Pageplaceholder";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v6l-5 9a2 2 0 001.8 3h12.4A2 2 0 0020 18l-5-9V3"/>
  </svg>
);

const sections = [
  { title: "Simulador de resorte", desc: "Ajusta masa y constante K. Observa M.A.S. en tiempo real." },
  { title: "Péndulo interactivo", desc: "Varía longitud y gravedad. Mide el período automáticamente." },
  { title: "Resortes en serie / paralelo", desc: "Combina resortes y calcula la constante equivalente." },
  { title: "Gráfica de fase", desc: "Visualiza posición, velocidad y aceleración simultáneamente." },
];

export default function Laboratorio() {
  return (
    <PagePlaceholder
      icon={icon}
      title="Laboratorio Interactivo"
      subtitle="Experimenta con simulaciones físicas en tiempo real. Modifica parámetros y observa el comportamiento del sistema."
      sections={sections}
    />
  );
}