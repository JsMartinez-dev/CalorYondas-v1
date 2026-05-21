import PagePlaceholder from "../components/PagePlaceholder";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);

const sections = [
  { title: "Ingeniería Civil", desc: "Análisis sísmico, puentes colgantes y vibraciones estructurales." },
  { title: "Ingeniería Mecánica", desc: "Sistemas de amortiguación, motores y resonancia mecánica." },
  { title: "Ingeniería Electrónica", desc: "Circuitos LC, filtros y osciladores de cuarzo." },
  { title: "Ingeniería Marino Costera", desc: "Propagación de olas, tsunamis y acústica submarina." },
  { title: "Ingeniería Industrial", desc: "Vibraciones en maquinaria, control de ruido y optimización de procesos." },
  { title: "Ingeniería de Sistemas", desc: "Procesamiento de señales, comunicaciones y transmisión de datos." },
];

export default function EjemplosIngenieria() {
  return (
    <PagePlaceholder
      icon={icon}
      title="Aplicaciones por Ingeniería"
      subtitle="Casos reales donde las oscilaciones y ondas mecánicas son fundamentales en cada disciplina."
      sections={sections}
    />
  );
}