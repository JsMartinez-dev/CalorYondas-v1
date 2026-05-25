import React, { useState } from 'react';
import Modal from '../components/Modal';
import PagePlaceholder from "../components/PagePlaceholder";
import { MathJax } from "better-react-mathjax";

const icon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
);

const sections = [
  { id: "movimiento-oscilatorio", title: "Movimiento oscilatorio", desc: "Definición, posición de equilibrio y vaivén." },
  { id: "mas", title: "Movimiento Armónico Simple (M.A.S.)", desc: "Período, frecuencia, amplitud y elongación." },
  { id: "conceptos-fundamentales", title: "Conceptos Fundamentales", desc: "Oscilación, período, frecuencia, etc." },
  { id: "ley-hooke", title: "Ley de Hooke y Fuerza Elástica", desc: "Fuerza restauradora en resortes." },
  { id: "periodo-masa-resorte", title: "Período del Sistema Masa-Resorte", desc: "El período de oscilación de un sistema masa-resorte." },
  { id: "velocidad-aceleracion-mas", title: "Velocidad y Aceleración en el M.A.S.", desc: "Cómo varían la velocidad y la aceleración." },
  { id: "asociacion-resortes", title: "Asociación de Resortes", desc: "Combinaciones en serie y paralelo." },
  { id: "pendulo-simple", title: "Péndulo simple", desc: "Leyes del péndulo y período de oscilación." },
];

const content = {
  "movimiento-oscilatorio": (
    <>
      <h2>Movimiento Oscilatorio</h2>
      <p>El movimiento oscilatorio es un movimiento periódico en el que un cuerpo se mueve de un lado a otro en torno a una posición de equilibrio. Es un fenómeno fundamental en la física, presente en sistemas que van desde el péndulo de un reloj hasta las vibraciones de los átomos en un sólido.</p>
      <h3>Condición de restauración</h3>
      <p>Para que ocurra un movimiento oscilatorio, debe existir una <strong>fuerza restauradora</strong> que siempre apunte hacia la posición de equilibrio. Esta fuerza es la responsable de que el cuerpo regrese a su posición central después de haber sido desplazado.</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Federpendel.gif" alt="Fuerza restauradora en un sistema masa-resorte" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
    </>
  ),
  "mas": (
    <>
      <h2>Movimiento Armónico Simple (M.A.S.)</h2>
      <p>El Movimiento Armónico Simple es el tipo más sencillo de movimiento oscilatorio. Ocurre cuando la fuerza restauradora es directamente proporcional al desplazamiento respecto a la posición de equilibrio.</p>
      <MathJax>
        {"$$x(t) = A \\cos(\\omega t + \\phi_0)$$"}
      </MathJax>
      <ul>
        <li><strong>x(t)</strong>: Posición en función del tiempo.</li>
        <li><strong>A</strong>: Amplitud (máximo desplazamiento).</li>
        <li><strong>&omega;</strong>: Frecuencia angular.</li>
        <li><strong>t</strong>: Tiempo.</li>
        <li><strong>&phi;<sub>0</sub></strong>: Fase inicial.</li>
      </ul>
      <img src="https://i.pinimg.com/originals/ec/f5/ba/ecf5ba982ff3de01fb074a8dc58d6715.gif" alt="Gráfica sinusoidal del M.A.S." style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
    </>
  ),
  "conceptos-fundamentales": (
    <>
      <h2>Conceptos Fundamentales</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Oscilación simple</h4>
          <p>Movimiento completo de ida y vuelta.</p>
          <MathJax>
            {"$$x(t) = A \\cos(\\omega t + \\phi_0)$$"}
          </MathJax>
          <img src="https://examtimeassets.s3.amazonaws.com/uploads/node/image/45919027/desktop_437bebd6-96c7-4afd-bf70-4894099a46b1.gif" alt="Ocillator" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Posición de equilibrio</h4>
          <p>Punto donde la fuerza neta es cero.</p>
          <MathJax>
            {"$$x = 0, \\quad F_{neta} = 0$$"}
          </MathJax>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Simple_Harmonic_Motion_Orbit.gif" alt="Ocillator" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Elongación (x)</h4>
          <p>Distancia desde la posición de equilibrio.</p>
          <MathJax>
            {"$$x = A \\sin(\\omega t + \\phi_0)$$"}
          </MathJax>
          <img src="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/756b4d40-a6f8-40b6-98cd-fc9c692aa73b" alt="Ocillator" style={{width: "550px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Amplitud (A)</h4>
          <p>Máxima elongación.</p>
          <MathJax>
            {"$$|x|_{max} = A$$"}
          </MathJax>
          <img src="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/50a9f677-34e1-4b25-8077-42117f7c443c" alt="Ocillator" style={{width: "550px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Período (T)</h4>
          <p>Tiempo de una oscilación completa.</p>
          <MathJax>
            {"$$T = \\frac{1}{f} = \\frac{2\\pi}{\\omega}$$"}
          </MathJax>
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Wave_period.gif" alt="Peridodo" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <h4>Frecuencia (f)</h4>
          <p>Número de oscilaciones por segundo (f=1/T).</p>
          <MathJax>
            {"$$f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}$$"}
          </MathJax>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/CambioFrec.gif" alt="Ocillator" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
        </div>
      </div>
    </>
  ),
  "ley-hooke": (
    <>
      <h2>Ley de Hooke y Fuerza Elástica</h2>
      <p>La Ley de Hooke describe la fuerza ejercida por un resorte. Esta fuerza es proporcional al desplazamiento 'x' desde su posición de equilibrio.</p>
      <MathJax>
        {"$$F = -kx$$"}
      </MathJax>
      <ul>
        <li><strong>F</strong>: Fuerza elástica.</li>
        <li><strong>k</strong>: Constante elástica del resorte.</li>
        <li><strong>x</strong>: Desplazamiento desde la posición de equilibrio.</li>
      </ul>
      <p>El signo negativo indica que la fuerza siempre se opone al desplazamiento, es decir, es una fuerza restauradora.</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Mass_Spring_System_Undamped_case_Simple_harmonic_motion.gif" alt="Sistema masa-resorte" style={{width: "550px", height: "300px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
    </>
  ),
  "periodo-masa-resorte": (
    <>
      <h2>Período del Sistema Masa-Resorte</h2>
      <p>El período de oscilación de un sistema masa-resorte ideal depende de la masa y de la constante del resorte.</p>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$"}
      </MathJax>
      <ul>
        <li><strong>T</strong>: Período.</li>
        <li><strong>m</strong>: Masa del cuerpo.</li>
        <li><strong>k</strong>: Constante elástica del resorte.</li>
      </ul>
      <p><strong>Isocronismo:</strong> El período no depende de la amplitud de la oscilación (para oscilaciones pequeñas).</p>
    </>
  ),
  "velocidad-aceleracion-mas": (
    <>
      <h2>Velocidad y Aceleración en el M.A.S.</h2>
      <h4>Velocidad</h4>
      <MathJax>
        {"$$v = \\frac{2\\pi}{T}\\sqrt{A^2 - x^2}$$"}
      </MathJax>
      <p>La velocidad es máxima en la posición de equilibrio (x=0) y nula en los extremos (x=A).</p>
      <h4>Aceleración</h4>
      <MathJax>
        {"$$a = -\\frac{4\\pi^2}{T^2}x$$"}
      </MathJax>
      <p>La aceleración es máxima en los extremos y nula en la posición de equilibrio. Siempre apunta en dirección opuesta a la elongación.</p>
      <img src="https://www.fisicalab.com/sites/all/files/contenidos/mas/ej1188_mas.png" alt="Sistema masa-resorte" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
    </>
  ),
  "asociacion-resortes": (
    <>
      <h2>Asociación de Resortes</h2>
      <h4>Serie</h4>
      <p>Un sistema de resortes está en serie cuando la deformación del resorte equivalente es igual a la suma de las deformaciones de cada resorte. En este caso, la 
        fuerza en cada resorte será la misma.</p>
      <MathJax>
        {"$$\\frac{1}{K_{eq}} = \\frac{1}{k_1} + \\frac{1}{k_2} + \\frac{1}{k_3} + ...$$"}
      </MathJax>
      <h4>Paralelo</h4>
      <p>Un sistema de resortes está en paralelo cuando ellos tienen la
misma deformación.</p>
      <MathJax>
        {"$$K_{eq} = k_1 + k_2 + k_3 + ...$$"}
      </MathJax>
      <img src="http://tesla.us.es/wiki/images/2/21/Asociacionesmuelles.png" alt="Resortes en paralelo" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
    </>
  ),
  "pendulo-simple": (
    <>
      <h2>Péndulo Simple</h2>
      <p>Un péndulo simple es un modelo idealizado que consiste en una masa puntual suspendida de un hilo de longitud fija e inextensible.</p>
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkK3dynLLd4QhrXGILUM23Rzt_6fvSCvzDkjQCMiP2oMzp4bqTiR6e9I8XbkMuLCa6b59lPZXpqBxBBxtkLaJ3GaAtYUVDEagMojRQxc5sCTkT62LZjdqpfxT9PpzBb1X73ngYd8rukz5cpCoH3Oi49igRVlyNZRt2tTRB9Xw92B4b1YY2GMTktsFzGA/s537/fig7.gif" alt="Péndulo simple" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto"}}/>
      <h3>Período del Péndulo Simple</h3>
      <p>Para oscilaciones pequeñas, el período de un péndulo simple es:</p>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{L}{g}}$$"}
      </MathJax>
      <ul>
        <li><strong>T</strong>: Período.</li>
        <li><strong>L</strong>: Longitud del hilo.</li>
        <li><strong>g</strong>: Aceleración de la gravedad.</li>
      </ul>
      <h3>Leyes del Péndulo</h3>
      <ol>
        <li><strong>Independencia de la masa:</strong> El período no depende de la masa del péndulo.</li>
        <li><strong>Dependencia de la longitud:</strong> El período es directamente proporcional a la raíz cuadrada de la longitud.</li>
        <li><strong>Dependencia de la gravedad:</strong> El período es inversamente proporcional a la raíz cuadrada de la gravedad.</li>
      </ol>
    </>
  ),
};

export default function MarcoConceptual() {
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
        title="Marco Conceptual"
        subtitle="Fundamentos teóricos de oscilaciones y ondas mecánicas con fórmulas interactivas."
        sections={sectionsWithClick}
      />
      <Modal show={!!modalContent} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}