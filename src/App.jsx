import { useState } from "react";
import Navbar from "./components/Navbar";
import MarcoConceptual from "./pages/MarcoConceptual";
import EjemplosIngenieria from "./pages/EjemplosIngenieria";
import Laboratorio from "./pages/Laboratorio";
import Ejercicios from "./pages/Ejercicios";

const PAGES = {
  marco: MarcoConceptual,
  ejemplos: EjemplosIngenieria,
  laboratorio: Laboratorio,
  ejercicios: Ejercicios,
};

export default function App() {
  const [activePage, setActivePage] = useState("marco");
  const PageComponent = PAGES[activePage];

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="page-content">
        <PageComponent />
      </main>
      <footer className="site-footer">
        <span>Calor y Ondas — Proyecto Académico</span>
        <span className="footer-sep">·</span>
        <span>Oscilaciones y Ondas Mecánicas</span>
      </footer>
    </div>
  );
}