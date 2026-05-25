import React, { useState } from 'react';
import Modal from '../components/Modal';
import { MathJax } from 'better-react-mathjax';
import bocetoMAS from '../../img/boceto1.png';
import boceto2 from '../../img/boceto2.png';
import boceto3 from '../../img/boceto3.png';
import boceto4 from '../../img/boceto4.png';
import boceto5 from '../../img/boceto5.png';
import './Ejercicios.css';

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

// ─── Datos de ejercicios ──────────────────────────────────────────────────
const ejercicios = [
  {
    id: 1,
    titulo: "Movimiento Armónico Simple (M.A.S.)",
    icono: "∿",
    boceto: bocetoMAS,
    contexto: "Un objeto oscila sujeto a un resorte horizontal. Queremos analizar su movimiento armónico simple y calcular sus parámetros fundamentales.",
    problema: "Una masa de 0.5 kg se encuentra en el extremo de un resorte con constante k = 200 N/m. La amplitud de oscilación es de 0.1 m. Calcula el período, la frecuencia y la velocidad máxima de la masa.",
    formulas: [
      {
        nombre: "Frecuencia angular",
        formula: "\\omega = \\sqrt{\\frac{k}{m}}",
        variables: [
          { symbol: "ω", desc: "Frecuencia angular (rad/s)" },
          { symbol: "k", desc: "Constante del resorte (N/m)" },
          { symbol: "m", desc: "Masa (kg)" },
        ]
      },
      {
        nombre: "Período",
        formula: "T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{m}{k}}",
        variables: [
          { symbol: "T", desc: "Período (s)" },
          { symbol: "π", desc: "Pi ≈ 3.14159" },
        ]
      },
      {
        nombre: "Frecuencia",
        formula: "f = \\frac{1}{T}",
        variables: [
          { symbol: "f", desc: "Frecuencia (Hz)" },
        ]
      },
      {
        nombre: "Velocidad máxima",
        formula: "v_{max} = A \\cdot \\omega",
        variables: [
          { symbol: "v_max", desc: "Velocidad máxima (m/s)" },
          { symbol: "A", desc: "Amplitud (m)" },
        ]
      },
    ],
    procedimiento: [
      "1. Identificamos los datos: m = 0.5 kg, k = 200 N/m, A = 0.1 m",
      "2. Calculamos la frecuencia angular: ω = √(200/0.5) = √400 = 20 rad/s",
      "3. Calculamos el período: T = 2π/20 = 0.314 s",
      "4. Calculamos la frecuencia: f = 1/0.314 = 3.18 Hz",
      "5. Calculamos la velocidad máxima: v_max = 0.1 × 20 = 2 m/s",
    ],
    resultados: {
      omega: "20 rad/s",
      periodo: "0.314 s",
      frecuencia: "3.18 Hz",
      velocidad: "2 m/s"
    },
    interpretacion: "La masa realiza 3.18 oscilaciones completas cada segundo, con un período de 0.314 segundos. La velocidad máxima alcanzada es de 2 m/s, que ocurre cuando la masa pasa por la posición de equilibrio."
  },
  {
    id: 2,
    titulo: "Ley de Hooke",
    icono: "⚙",
    boceto: boceto2,
    contexto: "Un resorte se deforma bajo la aplicación de una fuerza. Usamos la Ley de Hooke para relacionar la deformación con la fuerza aplicada.",
    problema: "Un resorte se estira 0.15 m cuando se cuelga de él una masa de 2 kg. ¿Cuál es la constante de elasticidad del resorte? ¿Cuánto se estiraría si se cuelga una masa de 5 kg?",
    formulas: [
      {
        nombre: "Ley de Hooke",
        formula: "F = k \\cdot x",
        variables: [
          { symbol: "F", desc: "Fuerza elástica (N)" },
          { symbol: "k", desc: "Constante de elasticidad (N/m)" },
          { symbol: "x", desc: "Deformación (m)" },
        ]
      },
      {
        nombre: "Equilibrio vertical",
        formula: "mg = kx \\Rightarrow k = \\frac{mg}{x}",
        variables: [
          { symbol: "m", desc: "Masa (kg)" },
          { symbol: "g", desc: "Aceleración gravitatoria (9.8 m/s²)" },
        ]
      },
    ],
    procedimiento: [
      "1. Datos iniciales: m₁ = 2 kg, x₁ = 0.15 m, g = 9.8 m/s²",
      "2. En equilibrio, la fuerza del peso iguala la fuerza elástica: mg = kx",
      "3. Despejamos k: k = mg/x = (2 × 9.8)/0.15 = 19.6/0.15 = 130.67 N/m",
      "4. Para la segunda masa (m₂ = 5 kg): x₂ = m₂g/k = (5 × 9.8)/130.67 = 49/130.67 = 0.375 m",
    ],
    resultados: {
      constanteK: "130.67 N/m",
      estiramiento5kg: "0.375 m",
    },
    interpretacion: "La constante del resorte es de 130.67 N/m, lo que significa que se requiere una fuerza de 130.67 N para estirarlo 1 metro. Con una masa de 5 kg, el resorte se estiraría 37.5 cm, el doble que con 2 kg, debido a la proporcionalidad directa."
  },
  {
    id: 3,
    titulo: "Período del Sistema Masa-Resorte",
    icono: "⏱",
    boceto: boceto3,
    contexto: "Determinamos el período de oscilación de una masa acoplada a un resorte, un parámetro crucial para entender el movimiento oscilatorio.",
    problema: "Un sistema masa-resorte tiene una masa de 0.8 kg acoplada a un resorte con constante k = 320 N/m. ¿Cuál es el período de oscilación? ¿Cuántas oscilaciones completa en 10 segundos?",
    formulas: [
      {
        nombre: "Período del sistema masa-resorte",
        formula: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
        variables: [
          { symbol: "T", desc: "Período (s)" },
          { symbol: "m", desc: "Masa (kg)" },
          { symbol: "k", desc: "Constante del resorte (N/m)" },
          { symbol: "π", desc: "Pi ≈ 3.14159" },
        ]
      },
      {
        nombre: "Número de oscilaciones",
        formula: "N = \\frac{t_{total}}{T}",
        variables: [
          { symbol: "N", desc: "Número de oscilaciones" },
          { symbol: "t_total", desc: "Tiempo total (s)" },
        ]
      },
    ],
    procedimiento: [
      "1. Datos: m = 0.8 kg, k = 320 N/m, t_total = 10 s",
      "2. Calculamos el período: T = 2π√(m/k) = 2π√(0.8/320)",
      "3. T = 2π√(0.0025) = 2π × 0.05 = 0.314 s",
      "4. Número de oscilaciones en 10 s: N = 10/0.314 = 31.83 oscilaciones",
    ],
    resultados: {
      periodo: "0.314 s",
      oscilacionesEn10s: "31.83 oscilaciones"
    },
    interpretacion: "El sistema completa 31.83 oscilaciones en 10 segundos. Esto significa que cada segundo el sistema oscila alrededor de 3.18 veces, con un período individual de 0.314 segundos."
  },
  {
    id: 4,
    titulo: "Péndulo Simple",
    icono: "⛓",
    boceto: boceto4,
    contexto: "Analizamos el movimiento de un péndulo simple, donde una masa oscila bajo la influencia de la gravedad, suspendida de un hilo inextensible.",
    problema: "Un péndulo simple tiene una cuerda de 1 metro de largo y oscila en un lugar donde g = 9.8 m/s². Calcula el período de oscilación. ¿Cuánto tiempo tarda en realizar 20 oscilaciones completas?",
    formulas: [
      {
        nombre: "Período del péndulo simple",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
        variables: [
          { symbol: "T", desc: "Período (s)" },
          { symbol: "L", desc: "Longitud de la cuerda (m)" },
          { symbol: "g", desc: "Aceleración gravitatoria (9.8 m/s²)" },
        ]
      },
      {
        nombre: "Tiempo para N oscilaciones",
        formula: "t = N \\cdot T",
        variables: [
          { symbol: "t", desc: "Tiempo total (s)" },
          { symbol: "N", desc: "Número de oscilaciones" },
        ]
      },
    ],
    procedimiento: [
      "1. Datos: L = 1 m, g = 9.8 m/s², N = 20 oscilaciones",
      "2. Calculamos el período: T = 2π√(L/g) = 2π√(1/9.8)",
      "3. T = 2π√(0.102) = 2π × 0.319 = 2.006 s ≈ 2 s",
      "4. Tiempo para 20 oscilaciones: t = 20 × 2 = 40 segundos",
    ],
    resultados: {
      periodo: "2 s",
      tiempoOscilaciones: "40 s"
    },
    interpretacion: "El péndulo realiza una oscilación completa cada 2 segundos, por lo que 20 oscilaciones toman 40 segundos. Este resultado es independiente de la masa del péndulo y solo depende de su longitud y la gravedad local."
  },
  {
    id: 5,
    titulo: "Análisis de Resonancia",
    icono: "📡",   
    boceto: boceto5,   
    contexto: "La resonancia ocurre cuando un sistema oscilante es excitado con una frecuencia igual a su frecuencia natural, resultando en una amplificación máxima.",
    problema: "Un sistema masa-resorte tiene una frecuencia natural de 2 Hz. Si es excitado por una fuerza externa con frecuencias de 1 Hz, 2 Hz y 3 Hz, ¿en cuál caso se produce resonancia? ¿Cómo se comporta la amplitud en cada caso?",
    formulas: [
      {
        nombre: "Frecuencia natural",
        formula: "f_0 = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
        variables: [
          { symbol: "f₀", desc: "Frecuencia natural (Hz)" },
          { symbol: "k", desc: "Constante del resorte (N/m)" },
          { symbol: "m", desc: "Masa (kg)" },
        ]
      },
      {
        nombre: "Condición de resonancia",
        formula: "f_{ext} = f_0 \\Rightarrow A_{max}",
        variables: [
          { symbol: "f_ext", desc: "Frecuencia de excitación (Hz)" },
          { symbol: "A_max", desc: "Amplitud máxima" },
        ]
      },
    ],
    procedimiento: [
      "1. La frecuencia natural del sistema es f₀ = 2 Hz",
      "2. Cuando f_ext = 1 Hz (menor que f₀): Amplitud moderada",
      "3. Cuando f_ext = 2 Hz (igual a f₀): RESONANCIA → Amplitud máxima (amplificación máxima)",
      "4. Cuando f_ext = 3 Hz (mayor que f₀): Amplitud disminuye nuevamente",
      "5. La amplitud es máxima precisamente cuando la frecuencia externa coincide con la frecuencia natural.",
    ],
    resultados: {
      frecuenciaNatural: "2 Hz",
      resonancia: "A frecuencia de 2 Hz",
      comportamiento: "Amplitud máxima cuando f_ext = f₀"
    },
    interpretacion: "La resonancia se produce a 2 Hz, donde la amplitud es máxima. A frecuencias alejadas de la natural (1 Hz o 3 Hz), la amplitud es menor. Este es un fenómeno importante en ingeniería, ya que la resonancia puede fortalecer o dañar estructuras dependiendo de la aplicación."
  },
];

// ─── Componente de tarjeta de ejercicio ─────────────────────────────────────
const EjercicioCard = ({ ejercicio, onOpen }) => {
  return (
    <div className="ejercicio-card" onClick={() => onOpen(ejercicio)}>
      <div className="ejercicio-icon">{ejercicio.icono}</div>
      <h3 className="ejercicio-titulo">{ejercicio.titulo}</h3>
      <p className="ejercicio-desc">{ejercicio.contexto}</p>
      <button className="ejercicio-btn">Resolver ejercicio →</button>
    </div>
  );
};

// ─── Modal de ejercicio ───────────────────────────────────────────────────
const EjercicioModal = ({ ejercicio, onClose }) => {
  return (
    <div className="ejercicio-modal-content">
      <h2 className="modal-title">{ejercicio.titulo}</h2>

      {/* Boceto del Problema */}
      {ejercicio.boceto && (
        <section className="seccion-ejercicio">
          <h3 className="seccion-titulo">Boceto del Problema</h3>
          <div className="boceto-container">
            <img src={ejercicio.boceto} alt="Boceto del problema" className="boceto-imagen" />
          </div>
        </section>
      )}

      {/* Contexto */}
      <section className="seccion-ejercicio">
        <h3 className="seccion-titulo">Contexto del Ejercicio</h3>
        <p className="seccion-texto">{ejercicio.contexto}</p>
        <div className="problema-box">
          <strong>Problema:</strong> {ejercicio.problema}
        </div>
      </section>

      {/* Fórmulas */}
      <section className="seccion-ejercicio">
        <h3 className="seccion-titulo">Fórmulas a Utilizar</h3>
        <div className="formulas-container">
          {ejercicio.formulas.map((formula, idx) => (
            <div key={idx} className="formula-item">
              <h4 className="formula-nombre">{formula.nombre}</h4>
              <div className="formula-display">
                <MathJax>{`$$${formula.formula}$$`}</MathJax>
              </div>
              {formula.variables && (
                <div className="variables-grid">
                  {formula.variables.map((v, i) => (
                    <div key={i} className="variable-item">
                      <span className="variable-symbol">
                        <MathJax>{`$${v.symbol}$`}</MathJax>
                      </span>
                      <span className="variable-desc">{v.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Procedimiento */}
      <section className="seccion-ejercicio">
        <h3 className="seccion-titulo">Procedimiento Paso a Paso</h3>
        <div className="procedimiento-list">
          {ejercicio.procedimiento.map((paso, idx) => (
            <div key={idx} className="paso-item">
              <div className="paso-numero">{idx + 1}</div>
              <div className="paso-contenido">{paso}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Resultado */}
      <section className="seccion-ejercicio">
        <h3 className="seccion-titulo">Resultado Final</h3>
        <div className="resultados-container">
          {Object.entries(ejercicio.resultados).map(([key, value], idx) => (
            <div key={idx} className="resultado-item">
              <span className="resultado-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="resultado-valor">{value}</span>
            </div>
          ))}
        </div>
        <div className="interpretacion-box">
          <strong>Interpretación:</strong> {ejercicio.interpretacion}
        </div>
      </section>
    </div>
  );
};

// ─── Componente principal ────────────────────────────────────────────────────
export default function Ejercicios() {
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (ejercicio) => {
    setSelectedEjercicio(ejercicio);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEjercicio(null);
  };

  return (
    <div className="ejercicios-page">
      {/* Encabezado */}
      <div className="ejercicios-header">
        <div className="header-icon">{icon}</div>
        <h1 className="header-title">Ejercicios Prácticos</h1>
        <p className="header-subtitle">Problemas paso a paso con soluciones detalladas y explicaciones didácticas</p>
      </div>

      {/* Grid de ejercicios */}
      <div className="ejercicios-grid">
        {ejercicios.map((ejercicio) => (
          <EjercicioCard
            key={ejercicio.id}
            ejercicio={ejercicio}
            onOpen={handleOpenModal}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal show={modalOpen} onClose={handleCloseModal}>
        {selectedEjercicio && <EjercicioModal ejercicio={selectedEjercicio} onClose={handleCloseModal} />}
      </Modal>
    </div>
  );
}