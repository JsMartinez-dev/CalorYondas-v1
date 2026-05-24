import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../components/Modal';
import PagePlaceholder from "../components/PagePlaceholder";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MathJax } from "better-react-mathjax";
import './Laboratorio.css';

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v6l-5 9a2 2 0 001.8 3h12.4A2 2 0 0020 18l-5-9V3"/>
  </svg>
);

const sections = [
  { id: "resorte", title: "Simulador de resorte", desc: "Ajusta masa y constante K. Observa M.A.S. en tiempo real." },
  { id: "pendulo", title: "Péndulo interactivo", desc: "Varía longitud y gravedad. Mide el período automáticamente." },
  { id: "resortes-combinados", title: "Resortes en serie / paralelo", desc: "Combina resortes y calcula la constante equivalente." },
  { id: "fase", title: "Gráfica de fase", desc: "Visualiza posición, velocidad y aceleración simultáneamente." },
];

/**
 * ChartWrapper — soluciona el problema de ResponsiveContainer dentro de Modals.
 *
 * El problema: ResponsiveContainer con width="100%" mide el ancho del contenedor padre
 * en el momento del primer render. Dentro de un Modal con animación de apertura, el
 * contenedor puede tener ancho 0 en ese instante, dejando la gráfica invisible.
 *
 * La solución: medimos el ancho real del div wrapper con ResizeObserver y pasamos
 * ese valor explícito a ResponsiveContainer, forzando un re-render cuando cambia.
 */
const ChartWrapper = ({ height = 300, children }) => {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setWidth(Math.floor(w));
      }
    });

    observer.observe(wrapperRef.current);

    // Medición inicial inmediata
    const initialWidth = wrapperRef.current.getBoundingClientRect().width;
    if (initialWidth > 0) setWidth(Math.floor(initialWidth));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height }}>
      {width > 0 && (
        <ResponsiveContainer width={width} height={height}>
          {children}
        </ResponsiveContainer>
      )}
    </div>
  );
};

// ─── Simulador de Resorte ────────────────────────────────────────────────────
const SimuladorResorte = () => {
  const [masa, setMasa] = useState(1);
  const [k, setK] = useState(100);
  const [amplitude, setAmplitude] = useState(0.5);
  const [data, setData] = useState([]);

  const generarDatos = useCallback(() => {
    const omega = Math.sqrt(k / masa);
    const T = (2 * Math.PI) / omega;
    const newData = [];
    const steps = 200;

    for (let i = 0; i <= steps; i++) {
      const t = (T * 2 * i) / steps;
      const x = amplitude * Math.cos(omega * t);
      newData.push({
        t: parseFloat(t.toFixed(3)),
        x: parseFloat(x.toFixed(4)),
      });
    }
    setData(newData);
  }, [masa, k, amplitude]);

  useEffect(() => {
    generarDatos();
  }, [generarDatos]);

  const omega = Math.sqrt(k / masa);
  const T = (2 * Math.PI) / omega;
  const f = 1 / T;

  return (
    <div className="simulador-container">
      <h2>Simulador de Resorte (M.A.S.)</h2>
      <p>Ajusta los parámetros y observa cómo cambia el movimiento armónico simple en tiempo real.</p>

      <div className="controles">
        <div className="control-grupo">
          <label>Masa (kg): <strong>{masa.toFixed(2)}</strong></label>
          <input
            type="range" min="0.1" max="5" step="0.1" value={masa}
            onChange={(e) => setMasa(parseFloat(e.target.value))}
          />
        </div>
        <div className="control-grupo">
          <label>Constante K (N/m): <strong>{k.toFixed(1)}</strong></label>
          <input
            type="range" min="10" max="500" step="10" value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
          />
        </div>
        <div className="control-grupo">
          <label>Amplitud (m): <strong>{amplitude.toFixed(2)}</strong></label>
          <input
            type="range" min="0.1" max="2" step="0.1" value={amplitude}
            onChange={(e) => setAmplitude(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="resultados">
        <h4>Resultados:</h4>
        <MathJax>{`$$\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{${k}}{${masa}}} = ${omega.toFixed(3)} \\text{ rad/s}$$`}</MathJax>
        <MathJax>{`$$T = \\frac{2\\pi}{\\omega} = ${T.toFixed(3)} \\text{ s}$$`}</MathJax>
        <MathJax>{`$$f = \\frac{1}{T} = ${f.toFixed(3)} \\text{ Hz}$$`}</MathJax>
      </div>

      <ChartWrapper height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Tiempo (s)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Posición (m)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} name="Posición x(t)" strokeWidth={2} />
        </LineChart>
      </ChartWrapper>
    </div>
  );
};

// ─── Simulador de Péndulo ────────────────────────────────────────────────────
const SimuladorPendulo = () => {
  const [longitud, setLongitud] = useState(1);
  const [gravedad, setGravedad] = useState(9.8);
  const [data, setData] = useState([]);

  const generarDatos = useCallback(() => {
    const T = 2 * Math.PI * Math.sqrt(longitud / gravedad);
    const omega = (2 * Math.PI) / T;
    const amplitudeRad = Math.PI / 6; // 30 grados
    const newData = [];
    const steps = 200;

    for (let i = 0; i <= steps; i++) {
      const t = (T * 2 * i) / steps;
      const theta = amplitudeRad * Math.cos(omega * t) * (180 / Math.PI);
      newData.push({
        t: parseFloat(t.toFixed(3)),
        theta: parseFloat(theta.toFixed(4)),
      });
    }
    setData(newData);
  }, [longitud, gravedad]);

  useEffect(() => {
    generarDatos();
  }, [generarDatos]);

  const T = 2 * Math.PI * Math.sqrt(longitud / gravedad);
  const f = 1 / T;

  return (
    <div className="simulador-container">
      <h2>Simulador de Péndulo Simple</h2>
      <p>Modifica la longitud y la gravedad para ver cómo afectan al período de oscilación.</p>

      <div className="controles">
        <div className="control-grupo">
          <label>Longitud (m): <strong>{longitud.toFixed(2)}</strong></label>
          <input
            type="range" min="0.1" max="3" step="0.1" value={longitud}
            onChange={(e) => setLongitud(parseFloat(e.target.value))}
          />
        </div>
        <div className="control-grupo">
          <label>Gravedad (m/s²): <strong>{gravedad.toFixed(2)}</strong></label>
          <input
            type="range" min="1" max="20" step="0.5" value={gravedad}
            onChange={(e) => setGravedad(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="resultados">
        <h4>Resultados:</h4>
        <MathJax>{`$$T = 2\\pi\\sqrt{\\frac{L}{g}} = 2\\pi\\sqrt{\\frac{${longitud}}{${gravedad}}} = ${T.toFixed(3)} \\text{ s}$$`}</MathJax>
        <MathJax>{`$$f = \\frac{1}{T} = ${f.toFixed(3)} \\text{ Hz}$$`}</MathJax>
      </div>

      <ChartWrapper height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Tiempo (s)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Ángulo (grados)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="theta" stroke="#82ca9d" dot={false} name="Ángulo θ(t)" strokeWidth={2} />
        </LineChart>
      </ChartWrapper>
    </div>
  );
};

// ─── Calculador de Resortes en Serie/Paralelo ────────────────────────────────
const CalculadorResortes = () => {
  const [tipo, setTipo] = useState('paralelo');
  const [k1, setK1] = useState(100);
  const [k2, setK2] = useState(100);
  const [k3, setK3] = useState(100);

  const calcularEquivalente = () =>
    tipo === 'paralelo'
      ? k1 + k2 + k3
      : 1 / (1 / k1 + 1 / k2 + 1 / k3);

  const kEq = calcularEquivalente();

  // Datos para la gráfica comparativa: extensión vs. fuerza aplicada
  const data = Array.from({ length: 21 }, (_, i) => {
    const F = i * 10; // 0..200 N
    return {
      F,
      x_eq: parseFloat((F / kEq).toFixed(4)),
      x_k1: parseFloat((F / k1).toFixed(4)),
    };
  });

  return (
    <div className="simulador-container">
      <h2>Resortes en Serie y Paralelo</h2>
      <p>Calcula la constante equivalente de resortes combinados.</p>

      <div className="controles">
        <div className="control-grupo">
          <label>Tipo de Conexión:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="paralelo">Paralelo</option>
            <option value="serie">Serie</option>
          </select>
        </div>
        <div className="control-grupo">
          <label>K₁ (N/m): <strong>{k1.toFixed(1)}</strong></label>
          <input type="range" min="10" max="300" step="10" value={k1}
            onChange={(e) => setK1(parseFloat(e.target.value))} />
        </div>
        <div className="control-grupo">
          <label>K₂ (N/m): <strong>{k2.toFixed(1)}</strong></label>
          <input type="range" min="10" max="300" step="10" value={k2}
            onChange={(e) => setK2(parseFloat(e.target.value))} />
        </div>
        <div className="control-grupo">
          <label>K₃ (N/m): <strong>{k3.toFixed(1)}</strong></label>
          <input type="range" min="10" max="300" step="10" value={k3}
            onChange={(e) => setK3(parseFloat(e.target.value))} />
        </div>
      </div>

      <div className="resultados">
        <h4>Fórmula y Resultado:</h4>
        {tipo === 'paralelo' ? (
          <MathJax>{`$$K_{eq} = K_1 + K_2 + K_3 = ${k1} + ${k2} + ${k3} = ${kEq.toFixed(2)} \\text{ N/m}$$`}</MathJax>
        ) : (
          <>
            <MathJax>{`$$\\frac{1}{K_{eq}} = \\frac{1}{K_1} + \\frac{1}{K_2} + \\frac{1}{K_3}$$`}</MathJax>
            <MathJax>{`$$K_{eq} = ${kEq.toFixed(2)} \\text{ N/m}$$`}</MathJax>
          </>
        )}
      </div>

      <div className="comparacion">
        <p><strong>Comparación:</strong></p>
        <p>K₁ = {k1} N/m | K₂ = {k2} N/m | K₃ = {k3} N/m</p>
        <p className="resultado-grande">K<sub>eq</sub> = <strong>{kEq.toFixed(2)} N/m</strong></p>
      </div>

      {/* Gráfica F vs. extensión: K₁ individual vs. K_eq */}
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
        Gráfica: extensión producida por cada fuerza F en el sistema equivalente vs. un solo resorte K₁
      </p>
      <ChartWrapper height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="F" label={{ value: 'Fuerza F (N)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Extensión (m)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x_eq" stroke="#ff7f50" dot={false} name={`K_eq = ${kEq.toFixed(1)} N/m`} strokeWidth={2} />
          <Line type="monotone" dataKey="x_k1" stroke="#8884d8" dot={false} name={`K₁ = ${k1} N/m`} strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ChartWrapper>
    </div>
  );
};

// ─── Gráfica de Fase (x, v, a) ───────────────────────────────────────────────
const GraficaFase = () => {
  const [masa, setMasa] = useState(1);
  const [k, setK] = useState(100);
  const [amplitude, setAmplitude] = useState(0.5);
  const [data, setData] = useState([]);

  const generarDatos = useCallback(() => {
    const omega = Math.sqrt(k / masa);
    const T = (2 * Math.PI) / omega;
    const newData = [];
    const steps = 200;

    for (let i = 0; i <= steps; i++) {
      const t = (T * i) / steps;
      const x = amplitude * Math.cos(omega * t);
      const v = -amplitude * omega * Math.sin(omega * t);
      const a = -amplitude * omega * omega * Math.cos(omega * t);
      newData.push({
        t: parseFloat(t.toFixed(3)),
        x: parseFloat(x.toFixed(4)),
        v: parseFloat((v / 5).toFixed(4)),
        a: parseFloat((a / 20).toFixed(4)),
      });
    }
    setData(newData);
  }, [masa, k, amplitude]);

  useEffect(() => {
    generarDatos();
  }, [generarDatos]);

  const omega = Math.sqrt(k / masa);
  const T = (2 * Math.PI) / omega;

  return (
    <div className="simulador-container">
      <h2>Gráfica de Fase: Posición, Velocidad y Aceleración</h2>
      <p>Observa cómo varían simultáneamente la posición, velocidad y aceleración en el M.A.S.</p>

      <div className="controles">
        <div className="control-grupo">
          <label>Masa (kg): <strong>{masa.toFixed(2)}</strong></label>
          <input type="range" min="0.1" max="3" step="0.1" value={masa}
            onChange={(e) => setMasa(parseFloat(e.target.value))} />
        </div>
        <div className="control-grupo">
          <label>Constante K (N/m): <strong>{k.toFixed(1)}</strong></label>
          <input type="range" min="10" max="300" step="10" value={k}
            onChange={(e) => setK(parseFloat(e.target.value))} />
        </div>
        <div className="control-grupo">
          <label>Amplitud (m): <strong>{amplitude.toFixed(2)}</strong></label>
          <input type="range" min="0.1" max="1.5" step="0.1" value={amplitude}
            onChange={(e) => setAmplitude(parseFloat(e.target.value))} />
        </div>
      </div>

      <div className="resultados">
        <h4>Parámetros del Sistema:</h4>
        <MathJax>{`$$\\omega = ${omega.toFixed(3)} \\text{ rad/s}, \\quad T = ${T.toFixed(3)} \\text{ s}, \\quad f = ${(1 / T).toFixed(3)} \\text{ Hz}$$`}</MathJax>
        <p><em>Nota: Velocidad y aceleración están escaladas para mejor visualización</em></p>
      </div>

      <ChartWrapper height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Tiempo (s)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Amplitud', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} name="Posición x(t)" strokeWidth={2} />
          <Line type="monotone" dataKey="v" stroke="#82ca9d" dot={false} name="Velocidad v(t)/5" strokeWidth={2} />
          <Line type="monotone" dataKey="a" stroke="#ffc658" dot={false} name="Aceleración a(t)/20" strokeWidth={2} />
        </LineChart>
      </ChartWrapper>
    </div>
  );
};

// ─── Mapa de contenido ───────────────────────────────────────────────────────
const content = {
  resorte: <SimuladorResorte />,
  pendulo: <SimuladorPendulo />,
  "resortes-combinados": <CalculadorResortes />,
  fase: <GraficaFase />,
};

export default function Laboratorio() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (contentId) => setModalContent(content[contentId]);
  const closeModal = () => setModalContent(null);

  const sectionsWithClick = sections.map((section) => ({
    ...section,
    onClick: () => openModal(section.id),
  }));

  return (
    <>
      <PagePlaceholder
        icon={icon}
        title="Laboratorio Interactivo"
        subtitle="Experimenta con simulaciones físicas en tiempo real. Modifica parámetros y observa el comportamiento del sistema."
        sections={sectionsWithClick}
      />
      <Modal show={!!modalContent} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}