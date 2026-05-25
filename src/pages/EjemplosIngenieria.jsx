import React, { useState } from 'react';
import Modal from '../components/Modal';
import PagePlaceholder from "../components/PagePlaceholder";
import { MathJax } from "better-react-mathjax";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);

const sections = [
  { id: "civil", title: "Ingeniería Civil", desc: "Análisis sísmico, puentes colgantes y vibraciones estructurales." },
  { id: "mecanica", title: "Ingeniería Mecánica", desc: "Sistemas de amortiguación, motores y resonancia mecánica." },
  { id: "electronica", title: "Ingeniería Electrónica", desc: "Circuitos LC, filtros y osciladores de cuarzo." },
  { id: "marino", title: "Ingeniería Marino Costera", desc: "Propagación de olas, tsunamis y acústica submarina." },
  { id: "industrial", title: "Ingeniería Industrial", desc: "Vibraciones en maquinaria, control de ruido y optimización de procesos." },
  { id: "sistemas", title: "Ingeniería de Sistemas", desc: "Procesamiento de señales, comunicaciones y transmisión de datos." },
];

const content = {
  "civil": (
    <>
      <h2>Ingeniería Civil: Análisis Sísmico de Edificios</h2>
      <h3>Aplicación: Diseño Antisísmico</h3>
      <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcG4l4a_2hfzAcblm9pBTGdrP9xLEh2GMbVUs14fMHJyPmxbQLzXxn8BmBpQgHCTKllyP4FkVMyD21NpbQx56S3VWdoojpHTWp2RHk7RPFWx5Ef7jqRhoEq9OwFD5JSjs2K9SEmWARu6xZEPtWAvmwandJH?key=_t-wAURFVKZIVZj__dE2-A" alt="Edificio con daño sísmico" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Los edificios están diseñados para resistir vibraciones sísmicas modelando su comportamiento como un sistema de masa-resorte con amortiguamiento. Durante un terremoto, el edificio oscila con una frecuencia característica que depende de su masa y rigidez.</p>
      <p><strong>Ejemplo práctico:</strong> Un edificio de oficinas con masa total de 50,000 kg tiene una rigidez lateral equivalente de 250,000 N/m. Su período natural de vibración se calcula para evitar resonancia con el terreno.</p>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{50000}{250000}} \\approx 2.81 \\text{ segundos}$$"}
      </MathJax>
      <p>Si la frecuencia del sismo coincide con el período natural del edificio, ocurre resonancia y amplificación de vibraciones, causando daños estructurales graves.</p>
      <h4>Frecuencia Natural del Edificio</h4>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{2.81} \\approx 0.36 \\text{ Hz}$$"}
      </MathJax>
    </>
  ),
  "mecanica": (
    <>
      <h2>Ingeniería Mecánica: Sistema de Amortiguación Vehicular</h2>
      <h3>Aplicación: Suspensión de Vehículos</h3>
      <img src="https://images.pexels.com/photos/10912797/pexels-photo-10912797.jpeg" alt="Sistema de suspensión" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Los sistemas de suspensión en automóviles utilizan amortiguadores y resortes que actúan como un sistema masa-resorte amortiguado. El objetivo es minimizar las vibraciones transmitidas al vehículo mientras mantiene el contacto con el terreno.</p>
      <p><strong>Ejemplo práctico:</strong> Un automóvil de 1,500 kg con constante de resorte de 50,000 N/m en cada rueda (4 ruedas en paralelo: 200,000 N/m total).</p>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{1500}{200000}} \\approx 0.54 \\text{ segundos}$$"}
      </MathJax>
      <p>La frecuencia de oscilación vertical es aproximadamente 1.85 Hz, lo que proporciona una conducción suave en caminos irregulares.</p>
      <h4>Velocidad Máxima del Vehículo</h4>
      <p>Cuando un automóvil atraviesa irregularidades del camino a cierta velocidad, puede alcanzar resonancia. La velocidad crítica depende de la longitud de la ondulación del terreno:</p>
      <MathJax>
        {"$$v_{critica} = f \\times \\lambda = 1.85 \\text{ Hz} \\times 5 \\text{ m} = 9.25 \\text{ m/s} \\approx 33 \\text{ km/h}$$"}
      </MathJax>
    </>
  ),
  "electronica": (
    <>
      <h2>Ingeniería Electrónica: Circuito LC Resonante</h2>
      <h3>Aplicación: Filtros y Sintonizadores de Frecuencia</h3>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Tuned_circuit_animation_3.gif" alt="Circuito LC" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Los circuitos LC (inductor-capacitor) son componentes fundamentales en radios, televisores y sistemas de comunicación. Oscilan a una frecuencia de resonancia específica que depende de los valores de inductancia y capacitancia.</p>
      <p><strong>Ejemplo práctico:</strong> Un circuito LC para sintonizar una estación de radio FM (100 MHz) requiere componentes específicos.</p>
      <h4>Frecuencia de Resonancia</h4>
      <MathJax>
        {"$$f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$$"}
      </MathJax>
      <p>Para sintonizar 100 MHz con L = 0.5 μH (microhenrios):</p>
      <MathJax>
        {"$$C = \\frac{1}{(2\\pi f_0)^2 L} = \\frac{1}{(2\\pi \\times 10^8)^2 \\times 0.5 \\times 10^{-6}} \\approx 50.3 \\text{ pF}$$"}
      </MathJax>
      <p>Este circuito permite que solo la frecuencia de 100 MHz pase sin atenuación, mientras filtra otras frecuencias.</p>
    </>
  ),
  "marino": (
    <>
      <h2>Ingeniería Marino Costera: Propagación de Olas Oceánicas</h2>
      <h3>Aplicación: Predicción de Tsunamis</h3>
      <img src="https://www.shutterstock.com/image-illustration/tsunamis-generated-by-submarine-earthquakes-600w-490135354.jpg" alt="Tsunami" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Las olas océanicas son oscilaciones de la superficie del agua causadas por el viento, mareas o terremotos submarinos. Su comportamiento se puede modelar como ondas sinusoidales con períodos y longitudes de onda característicos.</p>
      <p><strong>Ejemplo práctico:</strong> Un tsunami generado por un terremoto submarino tiene un período típico de 20 minutos y una longitud de onda de aproximadamente 200 km.</p>
      <h4>Velocidad de Propagación del Tsunami</h4>
      <MathJax>
        {"$$v = \\frac{\\lambda}{T} = \\frac{200 \\text{ km}}{20 \\text{ min}} = \\frac{200 \\text{ km}}{\\frac{1}{3} \\text{ hora}} = 600 \\text{ km/h}$$"}
      </MathJax>
      <p>Esta velocidad aproximadamente igual a la de un avión permite predecir el tiempo de llegada del tsunami a costas lejanas.</p>
      <h4>Frecuencia de la Onda</h4>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{1200 \\text{ s}} \\approx 8.33 \\times 10^{-4} \\text{ Hz}$$"}
      </MathJax>
    </>
  ),
  "industrial": (
    <>
      <h2>Ingeniería Industrial: Control de Vibraciones en Maquinaria</h2>
      <h3>Aplicación: Aisladores de Vibración</h3>
      <img src="https://www.aguamarket.com/sql/productos/fotos/n1244741894_30078622_6688.jpg" alt="Aislador de vibración" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Las máquinas rotatorias (bombas, motores, compresores) generan vibraciones que pueden dañar equipos y estructuras. Los aisladores de vibración utilizan principios de resonancia para proteger la maquinaria.</p>
      <p><strong>Ejemplo práctico:</strong> Un motor que gira a 1,800 RPM (30 Hz) tiene una masa de 100 kg. Se instala sobre 4 aisladores de elastómero con rigidez total de 50,000 N/m.</p>
      <h4>Frecuencia Natural del Sistema</h4>
      <MathJax>
        {"$$f_n = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}} = \\frac{1}{2\\pi}\\sqrt{\\frac{50000}{100}} \\approx 3.56 \\text{ Hz}$$"}
      </MathJax>
      <p>Como la frecuencia de operación (30 Hz) es mucho mayor que la frecuencia natural (3.56 Hz), el aislador proporciona amortiguamiento efectivo.</p>
      <h4>Transmisibilidad</h4>
      <MathJax>
        {"$$T_r = \\frac{1}{1 - (f/f_n)^2} = \\frac{1}{1 - (30/3.56)^2} \\approx 0.014$$"}
      </MathJax>
      <p>Solo el 1.4% de la vibración se transmite a la estructura, reduciendo significativamente el ruido y vibración.</p>
    </>
  ),
  "sistemas": (
    <>
      <h2>Ingeniería de Sistemas: Procesamiento de Señales de Audio</h2>
      <h3>Aplicación: Síntesis de Audio Digital</h3>
      <img src="https://cdn.svantek.com/wp-content/uploads/2024/03/vibration-frequency-1024x745.png.avif" alt="Armónicos de una onda" style={{maxWidth: "350px", display: "block", margin: "20px auto"}}/>
      <p>Los sistemas de procesamiento de audio utilizan oscilaciones armónicas para generar, filtrar y analizar señales de sonido. La síntesis de Fourier permite representar cualquier sonido como suma de ondas sinusoidales.</p>
      <p><strong>Ejemplo práctico:</strong> Una nota musical "La" tiene una frecuencia fundamental de 440 Hz. Al tocar una guitarra, se generan armónicos en múltiplos de esta frecuencia.</p>
      <h4>Frecuencia Fundamental y Armónicos</h4>
      <MathJax>
        {"$$f_n = n \\times f_1 = n \\times 440 \\text{ Hz}$$"}
      </MathJax>
      <ul>
        <li><strong>1er armónico (fundamental):</strong> 440 Hz</li>
        <li><strong>2do armónico:</strong> 880 Hz</li>
        <li><strong>3er armónico:</strong> 1,320 Hz</li>
        <li><strong>4to armónico:</strong> 1,760 Hz</li>
      </ul>
      <h4>Período de la Onda Fundamental</h4>
      <MathJax>
        {"$$T = \\frac{1}{f} = \\frac{1}{440} \\approx 2.27 \\text{ milisegundos}$$"}
      </MathJax>
      <p>La combinación de estos armónicos con diferentes amplitudes determina el timbre único de cada instrumento musical.</p>
    </>
  ),
};

export default function EjemplosIngenieria() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (contentId) => {
    setModalContent(content[contentId]);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const sectionsWithClick = sections.map(section => ({
    ...section,
    onClick: () => openModal(section.id),
  }));

  return (
    <>
      <PagePlaceholder
        icon={icon}
        title="Aplicaciones por Ingeniería"
        subtitle="Casos reales donde las oscilaciones y ondas mecánicas son fundamentales en cada disciplina."
        sections={sectionsWithClick}
      />
      <Modal show={!!modalContent} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}