import { useState } from "react";
import "../pages/TestInteractivo.css";

const QUESTIONS = [
  {
    id: 1,
    question: "¿Qué es un movimiento oscilatorio?",
    options: {
      A: "Movimiento en línea recta constante",
      B: "Movimiento alrededor de una posición de equilibrio",
      C: "Movimiento circular uniforme",
      D: "Movimiento acelerado hacia arriba",
    },
    correctAnswer: "B",
    feedback: "Debes repasar el movimiento oscilatorio, que es el movimiento de ida y vuelta alrededor de una posición de equilibrio, como ocurre en un columpio o un péndulo.",
    topic: "Movimiento Oscilatorio",
  },
  {
    id: 2,
    question: "El Movimiento Armónico Simple (M.A.S.) se caracteriza porque",
    options: {
      A: "Nunca se repite",
      B: "Tiene velocidad constante",
      C: "Se repite en intervalos iguales de tiempo",
      D: "Ocurre solo en círculos",
    },
    correctAnswer: "C",
    feedback: "Debes repasar el tema de movimiento periódico y Movimiento Armónico Simple, ya que el M.A.S. se repite constantemente en tiempos iguales.",
    topic: "Movimiento Periódico",
  },
  {
    id: 3,
    question: "En el M.A.S., la posición donde el cuerpo permanece en reposo si no actúa ninguna fuerza se llama:",
    options: {
      A: "Posición extrema",
      B: "Posición inicial",
      C: "Posición de equilibrio",
      D: "Punto final",
    },
    correctAnswer: "C",
    feedback: "Debes repasar la posición de equilibrio, que es el punto central donde las fuerzas se compensan y el cuerpo estaría quieto.",
    topic: "Posición de Equilibrio",
  },
  {
    id: 4,
    question: "Un ejemplo de Movimiento Armónico Simple es:",
    options: {
      A: "Un automóvil avanzando",
      B: "Un resorte con una masa oscilando",
      C: "Un avión despegando",
      D: "Una pelota cayendo libremente",
    },
    correctAnswer: "B",
    feedback: "Debes repasar los ejemplos de Movimiento Armónico Simple, especialmente el sistema masa-resorte, donde el objeto oscila repetidamente.",
    topic: "Ejemplos de M.A.S.",
  },
  {
    id: 5,
    question: "¿Qué ocurre en las posiciones extremas del movimiento?",
    options: {
      A: "La velocidad es máxima",
      B: "El cuerpo cambia de dirección",
      C: "El cuerpo queda detenido permanentemente",
      D: "No existe fuerza restauradora",
    },
    correctAnswer: "B",
    feedback: "Debes repasar las posiciones extremas en el M.A.S., ya que en esos puntos el cuerpo se detiene un instante y cambia el sentido del movimiento.",
    topic: "Posiciones Extremas",
  },
  {
    id: 6,
    question: "La fuerza que hace regresar el cuerpo hacia la posición de equilibrio se llama:",
    options: {
      A: "Fuerza gravitacional",
      B: "Fuerza eléctrica",
      C: "Fuerza restauradora",
      D: "Fuerza nuclear",
    },
    correctAnswer: "C",
    feedback: "Debes repasar la fuerza restauradora y la Ley de Hooke, porque esta fuerza siempre intenta devolver el cuerpo a la posición de equilibrio.",
    topic: "Fuerza Restauradora",
  },
  {
    id: 7,
    question: "El movimiento de vaivén corresponde a:",
    options: {
      A: "Movimiento uniforme",
      B: "Movimiento oscilatorio",
      C: "Movimiento parabólico",
      D: "Movimiento circular",
    },
    correctAnswer: "B",
    feedback: "Debes repasar el movimiento oscilatorio, que consiste en un movimiento repetitivo de ida y vuelta.",
    topic: "Movimiento Oscilatorio",
  },
  {
    id: 8,
    question: "¿Cuál de las siguientes características pertenece al M.A.S.?",
    options: {
      A: "Trayectoria curva irregular",
      B: "Trayectoria con tendencia a línea recta",
      C: "Movimiento aleatorio",
      D: "Velocidad infinita",
    },
    correctAnswer: "B",
    feedback: "Debes repasar las características del Movimiento Armónico Simple, ya que normalmente ocurre en trayectoria rectilínea.",
    topic: "Características del M.A.S.",
  },
  {
    id: 9,
    question: "En un resorte, cuando la masa se aleja de la posición de equilibrio:",
    options: {
      A: "Desaparece la fuerza restauradora",
      B: "El movimiento termina",
      C: "Aparece una fuerza que intenta regresarla",
      D: "La masa queda inmóvil",
    },
    correctAnswer: "C",
    feedback: "Debes repasar la Ley de Hooke, porque mientras más se aleja la masa, mayor es la fuerza que la devuelve al equilibrio.",
    topic: "Ley de Hooke",
  },
  {
    id: 10,
    question: "Las oscilaciones mecánicas necesitan:",
    options: {
      A: "Un medio material o sistema físico",
      B: "Vacío absoluto",
      C: "Solo energía eléctrica",
      D: "Luz solar",
    },
    correctAnswer: "A",
    feedback: "Debes repasar las oscilaciones mecánicas, que ocurren únicamente en sistemas materiales como resortes, péndulos o cuerdas.",
    topic: "Oscilaciones Mecánicas",
  },
];

export default function TestInteractivo() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const handleSelectAnswer = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
    }
  };

  const handleVerify = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === QUESTIONS[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      setTestFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setTestFinished(false);
  };

  if (testFinished) {
    return (
      <div className="test-container">
        <div className="test-results">
          <h2>¡Test Completado!</h2>
          <div className="results-card">
            <p className="score-text">Tu puntuación:</p>
            <p className="score-number">
              {score}/{QUESTIONS.length}
            </p>
            <p className="score-percentage">
              {Math.round((score / QUESTIONS.length) * 100)}%
            </p>
          </div>

          <div className="results-message">
            {score === QUESTIONS.length && (
              <p className="perfect">¡Excelente! Has dominado completamente el tema.</p>
            )}
            {score >= 8 && score < QUESTIONS.length && (
              <p className="good">¡Muy bien! Tienes un excelente desempeño.</p>
            )}
            {score >= 6 && score < 8 && (
              <p className="fair">Buen trabajo, pero hay algunos temas por repasar.</p>
            )}
            {score < 6 && (
              <p className="needs-improvement">Necesitas estudiar más estos temas.</p>
            )}
          </div>

          <button className="btn-restart" onClick={handleRestart}>
            Reintentar Test
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="test-container">
      <div className="test-header">
        <h1 color="black">Test Interactivo: Oscilaciones y Movimiento Armónico Simple</h1>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="progress-text">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      <div className="question-card">
        <h2 className="question-title">{question.question}</h2>

        <div className="options-container">
          {optionLetters.map((letter) => (
            <label
              key={letter}
              className={`option ${selectedAnswer === letter ? "selected" : ""} ${
                isAnswered && letter === question.correctAnswer ? "correct" : ""
              } ${
                isAnswered && selectedAnswer === letter && !isCorrect ? "incorrect" : ""
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={letter}
                checked={selectedAnswer === letter}
                onChange={() => handleSelectAnswer(letter)}
                disabled={isAnswered}
              />
              <span className="option-letter">{letter}</span>
              <span className="option-text">{question.options[letter]}</span>
            </label>
          ))}
        </div>

        {!isAnswered ? (
          <button
            className="btn-verify"
            onClick={handleVerify}
            disabled={selectedAnswer === null}
          >
            Verificar Respuesta
          </button>
        ) : (
          <div className={`feedback ${isCorrect ? "success" : "error"}`}>
            {isCorrect ? (
              <div className="feedback-correct">
                <p className="feedback-icon">✓</p>
                <p className="feedback-title">¡Correcto!</p>
                <p className="feedback-text">¡Felicidades! Has respondido correctamente.</p>
              </div>
            ) : (
              <div className="feedback-incorrect">
                <p className="feedback-icon">✗</p>
                <p className="feedback-title">Respuesta Incorrecta</p>
                <p className="feedback-topic">Tema a estudiar: {question.topic}</p>
                <p className="feedback-text">{question.feedback}</p>
              </div>
            )}
          </div>
        )}

        {isAnswered && (
          <button className="btn-next" onClick={handleNextQuestion}>
            {currentQuestion === QUESTIONS.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
          </button>
        )}
      </div>
    </div>
  );
}
