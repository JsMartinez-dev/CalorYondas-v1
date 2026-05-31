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
  { id: "electronica", title: "Ingeniería Electrónica", desc: "Transformación de AC a DC, rectificación, filtrado y regulación de voltaje." },
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
      <h2>Ingeniería Marino Costera: Teoría de Ondas de Airy</h2>
      <h3>Fundamentos de la Teoría de Ondas (Airy)</h3>
      <img src="/Ejemplos_ingenieria/img/img_marino_costera.png" alt="Circuito con Capacitor de Filtrado" style={{width: "350px", height: "250px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <figcaption style={{textAlign: "center", fontSize: "0.9em", color: "#666", marginTop: "10px"}}>
        Ilustración: tren de ondas incidente sobre dique rompeolas con escollera y faro de señalización.
      </figcaption>
      <p>En ingeniería marino-costera las olas del mar son el principal agente de carga sobre puertos, diques, muelles y plataformas. La teoría lineal de Airy (pequeña amplitud) describe una ola regular mediante tres parámetros independientes: la altura de ola H (distancia cresta-seno), el período T (tiempo entre dos crestas) y la profundidad del agua d. A partir de ellos se derivan todos los demás parámetros cinemáticos y dinámicos necesarios para el diseño.</p>
      
      <h4>1.1 Ecuación de Dispersión</h4>
      <p>La relación fundamental entre la longitud de onda L, el período T y la profundidad d es:</p>
      <MathJax>
        {"$$L = \\frac{gT^2}{2\\pi} \\tanh\\left(\\frac{2\\pi d}{L}\\right)$$"}
      </MathJax>
      <p>Esta ecuación implícita requiere solución iterativa. Para los casos límite se usan las siguientes simplificaciones:</p>
      <table style={{width: "100%", borderCollapse: "collapse", margin: "15px 0"}}>
        <thead>
          <tr style={{backgroundColor: "#f0f0f0"}}>
            <th style={{border: "1px solid #ddd", padding: "8px", color: "#6366f1"}}>Régimen</th>
            <th style={{border: "1px solid #ddd", padding: "8px", color: "#6366f1"}}>Condición</th>
            <th style={{border: "1px solid #ddd", padding: "8px", color: "#6366f1"}}>Fórmula Simplificada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>Aguas profundas</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>d/L &gt; 0.50</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}><MathJax inline>{"$L_0 = \\frac{gT^2}{2\\pi} \\approx 1.56 \\cdot T^2$"}</MathJax></td>
          </tr>
          <tr>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>Transición</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>0.05 ≤ d/L ≤ 0.50</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>Iteración numérica</td>
          </tr>
          <tr>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>Aguas someras</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}>d/L &lt; 0.05</td>
            <td style={{border: "1px solid #ddd", padding: "8px"}}><MathJax inline>{"$C = \\sqrt{gd}$"}</MathJax> | <MathJax inline>{"$L = T\\sqrt{gd}$"}</MathJax></td>
          </tr>
        </tbody>
      </table>
      
      <h4>1.2 Velocidad de Grupo y Transporte de Energía</h4>
      <p>La energía de la ola se propaga a la velocidad de grupo Cg = nC, no a la celeridad de fase C. El factor n relaciona ambas velocidades:</p>
      <MathJax>
        {"$$n = \\frac{1}{2}\\left[1 + \\frac{2kd}{\\sinh(2kd)}\\right] \\rightarrow C_g = nC$$"}
      </MathJax>
      <p>En aguas profundas n = 0.5 → Cg = C/2. En aguas someras n = 1 → Cg = C.</p>
      
      <h4>1.3 Transformación del Oleaje: Shoaling y Refracción</h4>
      <p>Al propagarse desde mar abierto hacia la costa, la ola conserva el período T pero modifica su altura según:</p>
      <MathJax>
        {"$$H = H_0 K_s K_r$$"}
      </MathJax>
      <p>donde Ks es el coeficiente de shoaling (variación por profundidad) y Kr es el coeficiente de refracción (variación por convergencia de rayos).</p>
      
      <h4>1.4 Criterio de Rompimiento (McCowan)</h4>
      <p>Una ola rompe cuando su altura supera aproximadamente el 78 % de la profundidad local:</p>
      <MathJax>
        {"$$d_b = \\frac{H_b}{0.78}$$"}
      </MathJax>
      
      <h4>1.5 Fuerzas de Oleaje sobre Estructuras Cilíndricas (Morison)</h4>
      <p>Para pilotes y columnas, la fuerza hidrodinámica por unidad de longitud combina un término de arrastre y uno de inercia:</p>
      <MathJax>
        {"$$f = f_D + f_M = \\frac{1}{2}\\rho C_d D|u|u + \\rho C_m \\frac{\\pi D^2}{4}\\frac{du}{dt}$$"}
      </MathJax>
      <p>Coeficientes típicos para cilindros lisos: Cd = 1.2 | Cm = 2.0 | ρagua mar = 1025 kg/m³</p>
      
      <h4>1.6 Diseño del Manto de Dique Rompeolas (Hudson)</h4>
      <p>El peso mínimo W de las piezas del manto se determina con:</p>
      <MathJax>
        {"$$W = \\frac{\\rho_r g H_d^3}{K_D(S_r - 1)^3 \\cot(\\alpha)}$$"}
      </MathJax>
      <p>donde Hd = altura de diseño, Sr = ρr/ρw = densidad relativa, KD = coeficiente de estabilidad</p>
      
      <h3>Ejercicio 1: Parámetros de Onda y Transformación de Shoaling</h3>
      <p><strong>Datos del problema:</strong></p>
      <ul>
        <li>Altura en aguas profundas H₀ = 2.8 m</li>
        <li>Período T = 10 s</li>
        <li>Profundidad de análisis d = 8 m</li>
        <li>Coeficiente de refracción Kr = 0.92</li>
      </ul>
      
      <h4>Paso 1 — Longitud de Onda en Aguas Profundas</h4>
      <MathJax>
        {"$$L_0 = \\frac{gT^2}{2\\pi} = \\frac{(9.81 \\text{ m/s}^2)(10 \\text{ s})^2}{2\\pi} = \\frac{981}{6.283} = 156.1 \\text{ m}$$"}
      </MathJax>
      
      <h4>Paso 2 — Clasificación del Régimen de Profundidad</h4>
      <MathJax>
        {"$$\\frac{d}{L_0} = \\frac{8 \\text{ m}}{156.1 \\text{ m}} = 0.051 \\rightarrow \\text{zona de transición}$$"}
      </MathJax>
      <p>Se aplica iteración en la ecuación de dispersión: L = L₀ tanh(2πd/L)</p>
      <p><strong>Iteración 1:</strong> L = 156.1 × tanh(0.322) = 48.5 m</p>
      <p><strong>Iteración 2:</strong> L = 156.1 × tanh(1.036) = 121.0 m</p>
      <p><strong>Iteración 3:</strong> L = 156.1 × tanh(0.415) = 61.4 m</p>
      <p><strong>Iteración 4:</strong> L = 156.1 × tanh(0.818) = 105.2 m</p>
      <p><strong>Convergencia:</strong> L ≈ 83.0 m (d/L = 0.096 ✓)</p>
      
      <h4>Paso 3 — Celeridad de Fase y Velocidad de Grupo</h4>
      <MathJax>
        {"$$C = \\frac{L}{T} = \\frac{83.0 \\text{ m}}{10 \\text{ s}} = 8.30 \\text{ m/s}$$"}
      </MathJax>
      <MathJax>
        {"$$n = \\frac{1}{2}\\left[1 + \\frac{2(0.606)}{\\sinh(1.212)}\\right] = 0.840$$"}
      </MathJax>
      <MathJax>
        {"$$C_g = nC = (0.840)(8.30) = 6.97 \\text{ m/s}$$"}
      </MathJax>
      
      <h4>Paso 4 — Velocidad de Grupo en Aguas Profundas</h4>
      <MathJax>
        {"$$C_0 = \\frac{gT}{2\\pi} = \\frac{9.81 \\times 10}{6.283} = 15.61 \\text{ m/s}$$"}
      </MathJax>
      
      <h4>Paso 5 — Coeficiente de Shoaling y Altura Local</h4>
      <MathJax>
        {"$$K_s = \\sqrt{\\frac{C_{g0}}{C_g}} = \\sqrt{\\frac{7.80}{6.97}} = 1.058$$"}
      </MathJax>
      <MathJax>
        {"$$H = H_0 K_s K_r = (2.8 \\text{ m})(1.058)(0.92) = 2.73 \\text{ m}$$"}
      </MathJax>
      
      <h4>Paso 6 — Verificación de Rompimiento</h4>
      <MathJax>
        {"$$\\frac{H}{d} = \\frac{2.73}{8} = 0.341 < 0.78 \\rightarrow \\text{La ola NO rompe en d = 8 m}$$"}
      </MathJax>
      <MathJax>
        {"$$d_b = \\frac{H}{0.78} = \\frac{2.73}{0.78} = 3.5 \\text{ m} \\rightarrow \\text{la ola romperá a esa profundidad}$$"}
      </MathJax>
      
      <h3>Resultados Finales</h3>
      <ul>
        <li><strong>Longitud de onda:</strong> L = 83.0 m</li>
        <li><strong>Celeridad de fase:</strong> C = 8.30 m/s</li>
        <li><strong>Velocidad de grupo:</strong> Cg = 6.97 m/s</li>
        <li><strong>Coeficiente de shoaling:</strong> Ks = 1.058</li>
        <li><strong>Altura a d = 8 m:</strong> H = 2.73 m</li>
        <li><strong>Profundidad de rompimiento:</strong> db = 3.5 m</li>
      </ul>
      <p style={{marginTop: "30px", paddingTop: "15px", borderTop: "1px solid #ddd", fontSize: "0.9em", color: "#666"}}><strong>Nota:</strong> Las imágenes utilizadas en este ejercicio fueron elaboradas con apoyo de inteligencia artificial, con fines académicos y explicativos.</p>
    </>
  ),
  "industrial": (
    <>
      <h2>Ingeniería Industrial</h2>
      <h3>Caso de Estudio: Prensa de Estampado Automotriz</h3>
      <img src="/Ejemplos_ingenieria/img/image_industrial.png" alt="Circuito con Capacitor de Filtrado" style={{width: "350px", height: "370px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <figcaption style={{textAlign: "center", fontSize: "0.9em", color: "#666", marginTop: "10px"}}>
        Link Imagen: https://metalforming-ar.com/1-4-two-point-straight-side-press.html
      </figcaption>
      <p>En una planta automotriz, se instala una prensa de estampado cuya masa es de 1,200 kg. Para evitar que las vibraciones dañen la estructura del edificio, la prensa se monta sobre un sistema de 4 resortes idénticos colocados en paralelo. El sistema debe oscilar con un período (T) de 0.8 segundos. El uso de resortes en paralelo se justifica principalmente por la necesidad de aumentar la rigidez global del sistema y garantizar la estabilidad mecánica de cargas pesadas.</p>
      
      <h4>Planteamiento del Problema</h4>
      <ol>
        <li>Determinar la constante elástica equivalente (Ke)</li>
        <li>Calcular la constante de rigidez (k) de cada uno de los 4 resortes</li>
        <li>Calcular la frecuencia del sistema</li>
        <li>Calcular la velocidad máxima de la prensa para una amplitud de 0.05 m</li>
      </ol>
      
      <h3>Solución Paso a Paso</h3>
      
      <h4>1. Constante Elástica Equivalente (Ke)</h4>
      <p>La constante elástica equivalente Ke es un parámetro físico que representa la rigidez total de un sistema compuesto por varios resortes. Para encontrar la rigidez total se utiliza la ecuación del período del Movimiento Armónico Simple:</p>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{K_e}}$$"}
      </MathJax>
      <p>Elevamos ambos lados al cuadrado:</p>
      <MathJax>
        {"$$T^2 = 4\\pi^2\\left(\\frac{m}{K_e}\\right)$$"}
      </MathJax>
      <p>Despejamos Ke:</p>
      <MathJax>
        {"$$K_e = \\frac{4\\pi^2 m}{T^2}$$"}
      </MathJax>
      <p><strong>Sustituyendo valores:</strong></p>
      <MathJax>
        {"$$K_e = \\frac{4(3.1416)^2(1200)}{(0.8)^2}$$"}
      </MathJax>
      <p><strong>Resolviendo:</strong></p>
      <ul>
        <li>π² = 9.8696</li>
        <li>T² = 0.64</li>
        <li>Numerador: 4 × 9.8696 × 1200 = 47,374.08</li>
        <li>Ke = 47,374.08 / 0.64 = <strong>74,022 N/m</strong></li>
      </ul>
      
      <h4>2. Constante de cada Resorte (k)</h4>
      <p>La constante de rigidez de un resorte (k) es una propiedad física que mide la fuerza necesaria para estirarlo o comprimirlo una determinada distancia. A mayor valor de (k), más rígido es el resorte.</p>
      <p>Para resortes en paralelo:</p>
      <MathJax>
        {"$$K_e = k_1 + k_2 + k_3 + k_4$$"}
      </MathJax>
      <p>Como los 4 resortes son iguales: Ke = 4k</p>
      <p>Despejamos k:</p>
      <MathJax>
        {"$$k = \\frac{K_e}{4}$$"}
      </MathJax>
      <p><strong>Sustituyendo valores:</strong></p>
      <MathJax>
        {"$$k = \\frac{74,022}{4} = 18,505.5 \\text{ N/m}$$"}
      </MathJax>
      
      <h4>3. Cálculo de la Frecuencia</h4>
      <p>La frecuencia indica cuántas oscilaciones realiza el sistema cada segundo:</p>
      <MathJax>
        {"$$f = \\frac{1}{T}$$"}
      </MathJax>
      <p><strong>Sustituyendo valores:</strong></p>
      <MathJax>
        {"$$f = \\frac{1}{0.8} = 1.25 \\text{ Hz}$$"}
      </MathJax>
      <p>La prensa realizará aproximadamente <strong>1.25 oscilaciones por segundo</strong>.</p>
      
      <h4>4. Velocidad Máxima</h4>
      <p>La velocidad máxima ocurre cuando la prensa pasa por la posición de equilibrio (x = 0):</p>
      <MathJax>
        {"$$v_{max} = \\frac{2\\pi}{T}\\sqrt{A^2 - x^2}$$"}
      </MathJax>
      <p>Cuando x = 0:</p>
      <MathJax>
        {"$$v_{max} = \\frac{2\\pi}{T}A$$"}
      </MathJax>
      <p><strong>Sustituyendo valores:</strong></p>
      <MathJax>
        {"$$v_{max} = \\frac{2 \\times 3.1416}{0.8} \\times 0.05$$"}
      </MathJax>
      <p><strong>Resolviendo paso a paso:</strong></p>
      <ul>
        <li>2 × 3.1416 = 6.2832</li>
        <li>6.2832 / 0.8 = 7.854</li>
        <li>7.854 × 0.05 = <strong>0.393 m/s</strong></li>
      </ul>
      <p>Cuando la prensa atraviesa la posición de equilibrio alcanza una velocidad máxima de <strong>0.393 m/s</strong>.</p>
      
      <h3>Resumen de Resultados</h3>
      <ul>
        <li><strong>Constante elástica equivalente:</strong> Ke = 74,022 N/m</li>
        <li><strong>Constante de cada resorte:</strong> k = 18,505.5 N/m</li>
        <li><strong>Frecuencia:</strong> f = 1.25 Hz</li>
        <li><strong>Velocidad máxima:</strong> vmax = 0.393 m/s</li>
      </ul>
    </>
  ),
  "sistemas": (
    <>
      <h2>Ingeniería de Sistemas</h2>
      <h3>Aplicación:  Monitoreo Inteligente de Vibraciones en Servidores</h3>
      <img src="/Ejemplos_ingenieria/img/sis1.png" alt="Rack con sensores" style={{width: "650px", height: "370px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <figcaption style={{textAlign: "center", fontSize: "0.9em", color: "#c9bebe", marginTop: "10px"}}>
        Ilustracion: Sistema de monitoreo de vibraciones mediante sensores IoT integrados en el hardware del Rack 14.
      </figcaption>
      <p>En un centro de datos, un sistema de monitoreo predictivo utiliza sensores de vibración para detectar posibles fallas mecánicas en los servidores. Los sensores envían información en tiempo real a una aplicación desarrollada por ingenieros de sistemas, la cual analiza el comportamiento vibratorio y genera alertas cuando los valores superan los límites de seguridad.</p>
      <p>Durante una inspección, un sensor registró que una pieza interna de un servidor presenta un movimiento descrito por la ecuación:</p>
      <MathJax>
        {"$$x(t) = 0.005\\sin(40\\pi t)$$"}
      </MathJax>
      <p>donde x(t) es el desplazamiento en metros y t es el tiempo en segundos.</p>
      <p><strong>Parámetros de seguridad:</strong></p>
      <ul>
        <li>Velocidad máxima permitida: 0.55 m/s</li>
        <li>Aceleración máxima permitida: 80 m/s²</li>
      </ul>
      
      <h3>Ejercicio</h3>
      <p>A partir de la ecuación de movimiento, determinar:</p>
      <ol>
        <li>Amplitud</li>
        <li>Frecuencia angular</li>
        <li>Frecuencia</li>
        <li>Período</li>
        <li>Ecuación de velocidad</li>
        <li>Ecuación de aceleración</li>
        <li>Velocidad máxima</li>
        <li>Aceleración máxima</li>
        <li>Posición, velocidad y aceleración en t = 0.01 s</li>
        <li>Energía mecánica total (m = 0.3 kg)</li>
        <li>Determinar si debe generar alerta preventiva</li>
      </ol>
      
      <h3>Solución</h3>
      
      <h4>Paso 1. Identificación de Parámetros</h4>
      <p>Comparando con la forma general x(t) = A sin(ωt):</p>
      <MathJax>
        {"$$A = 0.005 \\text{ m}$$"}
      </MathJax>
      <MathJax>
        {"$$\\omega = 40\\pi \\text{ rad/s} = 125.66 \\text{ rad/s}$$"}
      </MathJax>
      
      <h4>Paso 2. Frecuencia</h4>
      <MathJax>
        {"$$f = \\frac{\\omega}{2\\pi} = \\frac{125.66}{6.283} = 20 \\text{ Hz}$$"}
      </MathJax>
      
      <h4>Paso 3. Período</h4>
      <MathJax>
        {"$$T = \\frac{1}{f} = \\frac{1}{20} = 0.05 \\text{ s}$$"}
      </MathJax>
      
      <h4>Paso 4. Ecuación de Velocidad</h4>
      <p>La velocidad es la derivada de la posición:</p>
      <MathJax>
        {"$$v(t) = \\frac{dx}{dt} = 0.005(40\\pi)\\cos(40\\pi t)$$"}
      </MathJax>
      <MathJax>
        {"$$v(t) = 0.6283\\cos(40\\pi t)$$"}
      </MathJax>
      
      <h4>Paso 5. Ecuación de Aceleración</h4>
      <p>La aceleración es la derivada de la velocidad:</p>
      <MathJax>
        {"$$a(t) = \\frac{dv}{dt} = -0.005(40\\pi)^2\\sin(40\\pi t)$$"}
      </MathJax>
      <MathJax>
        {"$$a(t) = -78.96\\sin(40\\pi t)$$"}
      </MathJax>
      
      <h4>Paso 6. Velocidad Máxima</h4>
      <p>La velocidad máxima ocurre cuando cos(ωt) = 1:</p>
      <MathJax>
        {"$$v_{max} = A\\omega = 0.005(125.66) = 0.628 \\text{ m/s}$$"}
      </MathJax>
      
      <h4>Paso 7. Aceleración Máxima</h4>
      <MathJax>
        {"$$a_{max} = A\\omega^2 = 0.005(125.66)^2 = 78.96 \\text{ m/s}^2$$"}
      </MathJax>
      
      <h4>Paso 8. Análisis en t = 0.01 s</h4>
      <p><strong>Posición:</strong></p>
      <MathJax>
        {"$$x(0.01) = 0.005\\sin(40\\pi \\times 0.01) = 0.005\\sin(1.2566) = 0.00476 \\text{ m}$$"}
      </MathJax>
      <p><strong>Velocidad:</strong></p>
      <MathJax>
        {"$$v(0.01) = 0.6283\\cos(1.2566) = 0.194 \\text{ m/s}$$"}
      </MathJax>
      <p><strong>Aceleración:</strong></p>
      <MathJax>
        {"$$a(0.01) = -78.96\\sin(1.2566) = -75.08 \\text{ m/s}^2$$"}
      </MathJax>
      
      <h4>Paso 9. Energía Mecánica Total</h4>
      <p>Primero obtenemos la constante del resorte:</p>
      <MathJax>
        {"$$\\omega = \\sqrt{\\frac{k}{m}} \\Rightarrow k = m\\omega^2$$"}
      </MathJax>
      <MathJax>
        {"$$k = 0.3(125.66)^2 = 4737.4 \\text{ N/m}$$"}
      </MathJax>
      <p>La energía mecánica total:</p>
      <MathJax>
        {"$$E = \\frac{1}{2}kA^2 = \\frac{1}{2}(4737.4)(0.005)^2 = 0.0592 \\text{ J}$$"}
      </MathJax>
      
      <h4>Paso 10. Evaluación del Sistema</h4>
      <p><strong>Comparación de velocidad:</strong></p>
      <ul>
        <li>Velocidad medida: 0.628 m/s</li>
        <li>Límite permitido: 0.55 m/s</li>
        <li>Resultado: 0.628 &gt; 0.55 → <strong>EXCEDE el límite</strong></li>
      </ul>
      <p><strong>Comparación de aceleración:</strong></p>
      <ul>
        <li>Aceleración medida: 78.96 m/s²</li>
        <li>Límite permitido: 80 m/s²</li>
        <li>Resultado: 78.96 &lt; 80 → <strong>Dentro del rango seguro</strong></li>
      </ul>
      
      <h3>Conclusión</h3>
      <p>A partir del análisis realizado por el sistema de monitoreo predictivo, se concluye que el servidor presenta una vibración con frecuencia de <strong>20 Hz</strong>, una velocidad máxima de <strong>0.628 m/s</strong> y una aceleración máxima de <strong>78.96 m/s²</strong>.</p>
      <p><strong>ALERTA GENERADA:</strong> La velocidad máxima supera el límite permitido de 0.55 m/s. Se recomienda realizar mantenimiento preventivo en el servidor para evitar daños futuros.</p>
      <p style={{marginTop: "30px", paddingTop: "15px", borderTop: "1px solid #ddd", fontSize: "0.9em", color: "#666"}}><strong>Nota:</strong> Las imágenes utilizadas en este ejercicio fueron elaboradas con apoyo de inteligencia artificial, con fines académicos y explicativos.</p>
    </>
  ),
  "agronomica": (
    <>
      <h2>Ingeniería Agronómica: Ondas Estacionarias en Maquinaria Agrícola</h2>
      <h3>Caso de Estudio: Zaranda Vibratoria para Limpieza de Semillas</h3>
      <img src="/Ejemplos_ingenieria/img/agro1.png" alt="Circuito con Capacitor de Filtrado" style={{width: "470px", height: "190px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <img src="/Ejemplos_ingenieria/img/agro2.png" alt="Circuito con Capacitor de Filtrado" style={{width: "470px", height: "190px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <figcaption style={{textAlign: "center", fontSize: "0.9em", color: "#666", marginTop: "10px"}}>
        Link Imagenes: https://metalforming-ar.com/1-4-two-point-straight-side-press.html
      </figcaption>
      <p>En una zaranda vibratoria usada para limpieza de semillas, un cable tensor horizontal de longitud L = 60.0 cm mantiene estable un panel liviano del sistema. El cable está sometido a una tensión de 5.00 N. Una lámpara estroboscópica produce 6000 destellos/min. El patrón observado presenta 3 vientres (tercer armónico). El punto P está ubicado en un vientre y su amplitud máxima es A_P = 8.0 mm.</p>
      
      <h3>Datos del Problema</h3>
      <ul>
        <li>Longitud del cable: L = 60.0 cm</li>
        <li>Tensión del cable: Ft = 5.00 N</li>
        <li>Frecuencia estroboscópica: Festrobo = 6000 destellos/min</li>
        <li>Número de vientres: n = 3 (tercer armónico)</li>
        <li>Amplitud del punto P: AP = 8.0 mm</li>
      </ul>
      
      <h3>Solución Paso a Paso</h3>
      
      <h4>Paso 1 — Conversión de la Frecuencia Estroboscópica</h4>
      <p>La lámpara produce 6000 destellos por minuto. Conversión al Sistema Internacional:</p>
      <MathJax>
        {"$$F_{estrobo} = 6000 \\text{ destellos/min} \\times \\frac{1 \\text{ min}}{60 \\text{ s}} = 100 \\text{ destellos/s}$$"}
      </MathJax>
      <p>El tiempo entre dos destellos consecutivos:</p>
      <MathJax>
        {"$$\\Delta t = \\frac{1}{F_{estrobo}} = \\frac{1}{100} = 0.010 \\text{ s}$$"}
      </MathJax>
      
      <h4>Paso 2 — Período y Frecuencia de Vibración del Cable</h4>
      <p>Entre el destello 1 y 5 hay 4 intervalos de tiempo:</p>
      <MathJax>
        {"$$\\Delta t_{total} = 4(0.010 \\text{ s}) = 0.040 \\text{ s}$$"}
      </MathJax>
      <p>Como los máximos de los destellos 1 y 5 son extremos opuestos, ese intervalo corresponde a medio período:</p>
      <MathJax>
        {"$$4\\Delta t = \\frac{T}{2}$$"}
      </MathJax>
      <MathJax>
        {"$$T = 2(4\\Delta t) = 2(0.040 \\text{ s}) = 0.080 \\text{ s}$$"}
      </MathJax>
      <p>La frecuencia de vibración:</p>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{0.080 \\text{ s}} = 12.5 \\text{ Hz}$$"}
      </MathJax>
      
      <h4>Paso 3 — Longitud de Onda y Modo Normal</h4>
      <p>Conversión de la longitud del cable:</p>
      <MathJax>
        {"$$L = 60.0 \\text{ cm} \\times \\frac{1 \\text{ m}}{100 \\text{ cm}} = 0.600 \\text{ m}$$"}
      </MathJax>
      <p>Para una cuerda fija en ambos extremos se cumple:</p>
      <MathJax>
        {"$$L = \\frac{n\\lambda}{2}$$"}
      </MathJax>
      <p>El patrón tiene 3 vientres, correspondiendo al tercer armónico (n = 3). Despejando la longitud de onda:</p>
      <MathJax>
        {"$$\\lambda = \\frac{2L}{n} = \\frac{2(0.600 \\text{ m})}{3} = 0.400 \\text{ m}$$"}
      </MathJax>
      
      <h4>Paso 4 — Rapidez de Propagación de la Onda</h4>
      <p>La rapidez de propagación se calcula con:</p>
      <MathJax>
        {"$$v = \\lambda f = (0.400 \\text{ m})(12.5 \\text{ s}^{-1}) = 5.00 \\text{ m/s}$$"}
      </MathJax>
      
      <h4>Paso 5 — Rapidez del Punto P en Diferentes Posiciones</h4>
      <p>Conversión de la amplitud:</p>
      <MathJax>
        {"$$A_P = 8.0 \\text{ mm} \\times \\frac{1 \\text{ m}}{1000 \\text{ mm}} = 0.0080 \\text{ m}$$"}
      </MathJax>
      <p>La frecuencia angular del movimiento:</p>
      <MathJax>
        {"$$\\omega = 2\\pi f = 2\\pi(12.5 \\text{ Hz}) = 78.54 \\text{ rad/s}$$"}
      </MathJax>
      <p><strong>En la posición 1 (extremo de movimiento):</strong></p>
      <p>En un extremo, la rapidez instantánea es cero:</p>
      <MathJax>
        {"$$V_P(1) = 0 \\text{ m/s}$$"}
      </MathJax>
      <p><strong>En la posición 3 (posición de equilibrio):</strong></p>
      <p>En la posición de equilibrio, la rapidez es máxima:</p>
      <MathJax>
        {"$$V_{P,max} = \\omega A_P = (78.54 \\text{ rad/s})(0.0080 \\text{ m}) = 0.628 \\text{ m/s}$$"}
      </MathJax>
      
      <h4>Paso 6 — Masa del Cable</h4>
      <p>Para una onda en una cuerda o cable tenso, la rapidez se relaciona con la tensión y la masa lineal:</p>
      <MathJax>
        {"$$v = \\sqrt{\\frac{F_t}{\\mu}}$$"}
      </MathJax>
      <p>Donde μ es la masa lineal del cable en kg/m. Despejando:</p>
      <MathJax>
        {"$$\\mu = \\frac{F_t}{v^2} = \\frac{5.00 \\text{ N}}{(5.00 \\text{ m/s})^2} = \\frac{5.00}{25.00} = 0.200 \\text{ kg/m}$$"}
      </MathJax>
      <p>La masa total del cable:</p>
      <MathJax>
        {"$$m = \\mu L = (0.200 \\text{ kg/m})(0.600 \\text{ m}) = 0.120 \\text{ kg} = 120 \\text{ g}$$"}
      </MathJax>
      
      <h3>Resumen de Resultados</h3>
      <ul>
        <li><strong>Longitud de onda:</strong> λ = 0.400 m</li>
        <li><strong>Período:</strong> T = 0.080 s</li>
        <li><strong>Frecuencia:</strong> f = 12.5 Hz</li>
        <li><strong>Modo normal:</strong> Tercer armónico (n = 3)</li>
        <li><strong>Rapidez de propagación:</strong> v = 5.00 m/s</li>
        <li><strong>Rapidez en posición 1:</strong> VP(1) = 0 m/s</li>
        <li><strong>Rapidez en posición 3:</strong> VP(3) = 0.628 m/s</li>
        <li><strong>Masa lineal del cable:</strong> μ = 0.200 kg/m</li>
        <li><strong>Masa total del cable:</strong> m = 0.120 kg (120 g)</li>
      </ul>
      
      <h3>Aplicación en Ingeniería Agrícola</h3>
      <p>El análisis de ondas estacionarias en cables tensados ayuda a diagnosticar vibraciones en sistemas agrícolas como zarandas, cribas, limpiadoras de semillas y elementos tensores. Conocer la frecuencia, la rapidez de propagación y la masa lineal permite ajustar el equipo para evitar fallas por resonancia, disminuir vibraciones indeseadas y mejorar la estabilidad del proceso de limpieza de semillas.</p>
    </>
  ),
  "ambiental": (
    <>
      <h2>Ingeniería Ambiental y Sanitaria: Oscilaciones y Vibraciones</h2>
      <h3>Aplicación: Control de Vibraciones en Sistemas de Bombeo</h3>
      <img src="/Ejemplos_ingenieria/img/ambiental1.png" alt="Circuito con Capacitor de Filtrado" style={{width: "470px", height: "190px", objectFit: "cover", display: "block", margin: "20px auto", border: "2px solid #ccc"}}/>
      <figcaption style={{textAlign: "center", fontSize: "0.9em", color: "#666", marginTop: "10px"}}>
        Link Imagen :https://telwesa.com/que-es-como-funciona-una-bomba-de-agua-industrial/
      </figcaption>
      <p>Las plantas de tratamiento de agua utilizan sistemas de tuberías y bombas que generan vibraciones mecánicas. Para evitar daños estructurales y fallas en los equipos, estos sistemas se modelan como un sistema masa-resorte con amortiguamiento.</p>
      <p>Cuando una bomba funciona, produce oscilaciones con una frecuencia característica que depende de la masa del sistema y de la rigidez de los soportes.</p>
      
      <h3>Ejemplo Práctico</h3>
      <p>Una bomba de agua de una planta de tratamiento tiene una masa total de 200 kg y está sostenida por un sistema con una rigidez equivalente de 80,000 N/m. Su período natural de vibración se calcula para evitar resonancia con las vibraciones del motor.</p>
      
      <h4>Período Natural del Sistema</h4>
      <MathJax>
        {"$$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{200}{80000}} \\approx 0.31 \\text{ s}$$"}
      </MathJax>
      
      <h4>Frecuencia Natural del Sistema</h4>
      <MathJax>
        {"$$f = \\frac{1}{T} = \\frac{1}{0.31} \\approx 3.2 \\text{ Hz}$$"}
      </MathJax>
      
      <h3>Análisis de Resonancia</h3>
      <p>Si la frecuencia de operación de la bomba coincide con el período natural del sistema, ocurre resonancia y las vibraciones aumentan, causando desgaste acelerado, ruido excesivo y posibles daños en las tuberías.</p>
      
      <h3>Importancia de la Ingeniería Ambiental y Sanitaria</h3>
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