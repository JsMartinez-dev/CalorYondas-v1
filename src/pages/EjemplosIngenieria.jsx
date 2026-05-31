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
  { id: "electronica", title: "Ingeniería Electrónica: Fuente de Alimentación", desc: "Transformación de AC a DC, rectificación, filtrado y regulación de voltaje." },
  { id: "marino", title: "Ingeniería Marino Costera", desc: "Propagación de olas, tsunamis y acústica submarina." },
  { id: "industrial", title: "Ingeniería Industrial", desc: "Vibraciones en maquinaria, control de ruido y optimización de procesos." },
  { id: "sistemas", title: "Ingeniería de Sistemas", desc: "Procesamiento de señales, comunicaciones y transmisión de datos." },
  { id: "agronomica", title: "Ingeniería Agronómica", desc: "Cosecha y maquinaria, vibraciones de cribas y eficiencia de separación." },
  { id: "ambiental", title: "Ingeniería Ambiental y Sanitaria", desc: "Plantas de tratamiento de agua, vibraciones de bombas y sistemas de tuberías." },
];

const content = {
  "electronica": (
    <>
      <h2>Ingeniería Electrónica: Fuente de Alimentación de Voltaje</h2>
      <h3>Aplicación: Conversión de AC a DC</h3>
      <img src="/Ejemplos_ingenieria/img/electronica1.png" alt="Transformador - Etapa de Transformación" style={{width: "550px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <p>Una de las aplicaciones más usadas en la ingeniería electrónica es la de una fuente de alimentación de voltaje en la cual se toma una fuente AC para posteriormente pasarla a DC, siendo fundamental el uso de ondas en este proceso.</p>
      <p>Para hacer que una fuente AC se convierta en una fuente DC se hacen 4 procesos:</p>
      
      <h4>1. Transformador</h4>
      <p>Cuando la fuente de alimentación trabaja con corriente alterna (CA), se incorpora un transformador encargado de adecuar el voltaje de entrada al nivel requerido. Este componente puede disminuir o incrementar la tensión en función de la relación de espiras entre sus devanados y, adicionalmente, proporciona aislamiento eléctrico entre la red de suministro y el circuito, lo cual incrementa la seguridad del sistema.</p>
      
      <h4>2. Rectificador</h4>
      <p>En esta fase, la corriente alterna se convierte en corriente continua mediante un puente rectificador compuesto por diodos. Según la configuración utilizada, la rectificación puede realizarse a media onda o a onda completa, utilizando ambas mitades del ciclo de CA. Sin embargo, la señal obtenida presenta un carácter pulsante, lo que hace necesario un proceso de filtrado posterior.</p>
      
      <h4>3. Filtrado</h4>
      <p>Con el propósito de atenuar las variaciones en la señal rectificada, se emplean capacitores que cumplen la función de almacenar y liberar energía. Este procedimiento contribuye a obtener una corriente continua con mayor estabilidad. A mayor capacidad de almacenamiento del capacitor, menor será el nivel de rizado en la señal.</p>
      
      <h4>4. Regulador</h4>
      <p>Esta etapa se encarga de mantener constante el voltaje de salida, compensando posibles fluctuaciones tanto en la entrada como en la carga conectada. Su funcionamiento se basa en comparar el valor de salida con un nivel de referencia para ajustar la energía suministrada. El proceso de regulación puede llevarse a cabo mediante técnicas lineales o conmutadas.</p>
      
      <h3>Práctica: Diseño de una Fuente de 12V y 120mA</h3>
      
      <h4>Etapa de Transformación</h4>
      <p>El primer paso fue la selección del transformador encargado de reducir el voltaje de la red eléctrica (110 V AC) a un valor adecuado. Se empleó un transformador con secundarios de 9 V AC. Con el fin de obtener una salida final de 12 V en DC, se conectaron dos secundarios de 9 V en serie, logrando así una tensión de 18 V AC de entrada.</p>
      <p>Este valor fue elegido de manera que, tras las pérdidas producidas en el proceso de rectificación, filtrado y regulación, el sistema pudiera entregar los 12 V DC requeridos. Además, el transformador proporcionó aislamiento eléctrico entre la red y el circuito, incrementando la seguridad del sistema.</p>
      
      <img src="/Ejemplos_ingenieria/img/electronica2.png" alt="Transformador - Conexión de secundarios" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <h4>Etapa de Rectificación</h4>
      <p>Para convertir la señal alterna en continua se utilizó un puente rectificador de onda completa conformado por cuatro diodos de silicio 1N4001. Este tipo de configuración permite aprovechar ambos semiciclos de la señal alterna, incrementando la eficiencia y reduciendo el rizado respecto a la rectificación de media onda.</p>
      <p><strong>Voltaje pico rectificado:</strong></p>
      <MathJax>
        {"$$V_p(rect) = (V_{rms} - 1.4) \\cdot \\sqrt{2}$$"}
      </MathJax>
      <MathJax>
        {"$$V_p(rect) = (18\\text{ V} - 1.4\\text{ V}) \\cdot \\sqrt{2} \\approx 24\\text{ V}$$"}
      </MathJax>
      <p>A partir de este punto, la señal pasó a analizarse como voltaje en corriente continua, aunque todavía con un nivel considerable de rizado.</p>
      
      <h4>Etapa de Filtrado</h4>
      <p>El filtrado se llevó a cabo mediante un capacitor electrolítico de 1000 µF / 35 V, encargado de suavizar las variaciones de voltaje que permanecen tras la rectificación. Este componente almacena y libera carga eléctrica, reduciendo el rizado de la señal.</p>
      <p><strong>Cálculo del voltaje de rizado:</strong></p>
      <MathJax>
        {"$$V_r(pp) = \\frac{1}{f \\cdot R_L \\cdot C} \\cdot V_p(rect)$$"}
      </MathJax>
      <MathJax>
        {"$$V_r(pp) = \\frac{1}{120\\text{ Hz} \\cdot 100\\text{ Ω} \\cdot 1000\\text{ µF}} \\cdot 25.4\\text{ V} \\approx 2.1\\text{ V}$$"}
      </MathJax>
      <p><strong>Capacitancia mínima requerida:</strong></p>
      <MathJax>
        {"$$C = \\frac{I}{f \\cdot V_r(pp)} = \\frac{120\\text{ mA}}{120\\text{ Hz} \\cdot 2.1\\text{ V}} \\approx 454\\text{ µF}$$"}
      </MathJax>
      <p>El capacitor elegido (1000 µF) supera con holgura este valor mínimo, lo cual asegura una señal continua mucho más estable.</p>
      
      <img src="/Ejemplos_ingenieria/img/electronica3.png" alt="Capacitor de Filtrado" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <h4>Etapa de Regulación</h4>
      <p>Para obtener un voltaje constante de 12 V DC, se empleó un diodo Zener de 12 V en paralelo con la carga. Este componente mantiene estable el voltaje de salida incluso frente a pequeñas variaciones en el voltaje de entrada o en la carga.</p>
      <p><strong>Resistencia de carga (Ley de Ohm):</strong></p>
      <MathJax>
        {"$$R_L = \\frac{V}{I} = \\frac{12\\text{ V}}{0.12\\text{ A}} = 100\\text{ Ω}$$"}
      </MathJax>
      <p><strong>Resistencia en serie:</strong></p>
      <MathJax>
        {"$$R = \\left(\\frac{V_i \\cdot R_L}{V_L}\\right) - R_L$$"}
      </MathJax>
      <MathJax>
        {"$$R = \\left(\\frac{24\\text{ V} \\cdot 100\\text{ Ω}}{12\\text{ V}}\\right) - 100\\text{ Ω} = 100\\text{ Ω}$$"}
      </MathJax>
      <p>Las resistencias seleccionadas fueron de 5 W, con el fin de soportar la potencia disipada y evitar daños por sobrecalentamiento. En esta etapa, el osciloscopio mostró una línea recta en la señal de salida, confirmando la estabilidad del voltaje regulado.</p>
      <img src="/Ejemplos_ingenieria/img/electronica4.png" alt="Circuito con Capacitor de Filtrado" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
    </>
  ),
  "marino": (
    <>
      <h2>Ingeniería Marino Costera: Propagación de Olas Oceánicas</h2>
      <h3>Aplicación: Predicción de Tsunamis</h3>
      <img src="https://www.shutterstock.com/image-illustration/tsunamis-generated-by-submarine-earthquakes-600w-490135354.jpg" alt="Tsunami" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
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
      <img src="https://www.aguamarket.com/sql/productos/fotos/n1244741894_30078622_6688.jpg" alt="Aislador de vibración" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
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
      <img src="https://cdn.svantek.com/wp-content/uploads/2024/03/vibration-frequency-1024x745.png.avif" alt="Armónicos de una onda" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
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
  "agronomica": (
    <>
      <h2>Ingeniería Agronómica: Cosecha & Maquinaria</h2>
      <h3>Aplicación: Vibración de Cribas en Trilladoras</h3>
      <img src="https://www.deere.com.mx/assets/images/region-3/products/combines/Large1366x768.jpg" alt="Trilladora" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
      <p>Las cribas vibratorias de las trilladoras combinadas operan bajo el principio del M.A.S. La malla oscila para separar el grano de la paja. Si la masa de la criba es m y el sistema de resortes tiene constante K, el período de vibración óptimo determina la eficiencia de separación.</p>
      <MathJax>
        {"$$T = 2\\pi \\sqrt{\\frac{m}{K}}$$"}
      </MathJax>
      <p>Un ingeniero agrónomo debe seleccionar la combinación m-K adecuada para maximizar la separación sin dañar el grano.</p>
      <h4>Ejemplo Práctico</h4>
      <p><strong>Situación:</strong> Una criba de trilladora tiene masa m = 8 kg y constante del resorte K = 200 N/m. ¿Cuál es su período de vibración y cuántas oscilaciones hace por minuto?</p>
      <h4>PASO 1 — Período</h4>
      <MathJax>
        {"$$T = 2\\pi \\sqrt{\\frac{m}{K}}$$"}
      </MathJax>
      <MathJax>
        {"$$T = 2\\pi \\sqrt{\\frac{8}{200}}$$"}
      </MathJax>
      <MathJax>
        {"$$T = 2\\pi \\sqrt{0.04}$$"}
      </MathJax>
      <MathJax>
        {"$$T = 2\\pi \\times 0.2$$"}
      </MathJax>
      <MathJax>
        {"$$T \\approx 1.257 \\text{ s}$$"}
      </MathJax>
      <h4>PASO 2 — Frecuencia</h4>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{1.257}$$"}
      </MathJax>
      <MathJax>
        {"$$f \\approx 0.795 \\text{ Hz}$$"}
      </MathJax>
      <h4>PASO 3 — Oscilaciones por Minuto</h4>
      <MathJax>
        {"$$f_{\\min} = 0.795 \\times 60$$"}
      </MathJax>
      <MathJax>
        {"$$f_{\\min} \\approx 47.7 \\text{ oscilaciones/min}$$"}
      </MathJax>
      <h4>Interpretación</h4>
      <p>A ~48 ciclos por minuto, la criba separa el grano de la paja de forma eficiente. Si la frecuencia fuera demasiado alta, el impacto dañaría el grano; demasiado baja, la separación sería incompleta.</p>
    </>
  ),
  "ambiental": (
    <>
      <h2>Ingeniería Ambiental y Sanitaria: Plantas de Tratamiento de Agua</h2>
      <h3>Aplicación: Control de Vibraciones en Sistemas de Bombeo</h3>
      <img src="https://grupohidraulica.com/wp-content/uploads/2023/03/PTAR-aguas-residuales-1536x944-1.jpeg" alt="Planta de tratamiento de agua" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
      <p>Las plantas de tratamiento de agua utilizan sistemas de tuberías y bombas que generan vibraciones mecánicas. Para evitar daños estructurales y fallas en los equipos, estos sistemas se modelan como un sistema masa-resorte con amortiguamiento. Cuando una bomba funciona, produce oscilaciones con una frecuencia característica que depende de la masa del sistema y de la rigidez de los soportes.</p>
      <p><strong>Ejemplo práctico:</strong> Una bomba de agua de una planta de tratamiento tiene una masa total de 200 kg y está sostenida por un sistema con una rigidez equivalente de 80,000 N/m. Su período natural de vibración se calcula para evitar resonancia con las vibraciones del motor.</p>
      <h4>Período Natural del Sistema</h4>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{200}{80000}} \\approx 0.31 \\text{ s}$$"}
      </MathJax>
      <p>Si la frecuencia de operación de la bomba coincide con el período natural del sistema, ocurre resonancia y las vibraciones aumentan, causando desgaste acelerado, ruido excesivo y posibles daños en las tuberías.</p>
      <h4>Frecuencia Natural del Sistema</h4>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{0.31} \\approx 3.2 \\text{ Hz}$$"}
      </MathJax>
      <p>Por esta razón, en ingeniería ambiental y sanitaria se analizan las vibraciones para garantizar el correcto funcionamiento de las plantas de tratamiento y prolongar la vida útil de los equipos.</p>
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