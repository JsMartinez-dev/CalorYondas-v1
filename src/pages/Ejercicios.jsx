import PagePlaceholder from "../components/PagePlaceholder";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const sections = [
  { title: "Ejercicios de M.A.S.", desc: "Cálculo de período, frecuencia y amplitud con retroalimentación inmediata." },
  { title: "Ley de Hooke", desc: "Problemas de deformación y constante de resorte." },
  { title: "Péndulo simple", desc: "Aplicación de las leyes del péndulo a casos prácticos." },
  { title: "Reto de ingeniería", desc: "Problema integrador con todos los conceptos del capítulo." },
  { title: "Análisis de Resonancia", desc: "Identificación de frecuencias naturales y amplificación de amplitud." },
];

export default function Ejercicios() {
  return (
    <PagePlaceholder
      icon={icon}
      title="Ejercicios Prácticos"
      subtitle="Problemas paso a paso con verificación automática y pistas progresivas."
      sections={sections}
    />
  );
}