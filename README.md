# 🌊 CALOR Y ONDAS: Onda Expansiva

Plataforma educativa interactiva para el aprendizaje de oscilaciones y ondas mecánicas, desarrollada como proyecto académico en la asignatura de Física.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Secciones Disponibles](#secciones-disponibles)
- [Integrantes](#integrantes)
- [Profesor](#profesor)
- [Desarrollador](#desarrollador)
- [Licencia](#licencia)

##  Descripción General

**CALOR Y ONDAS: Onda Expansiva** es una aplicación web educativa interactiva diseñada para facilitar el aprendizaje de conceptos fundamentales sobre oscilaciones y ondas mecánicas. La plataforma combina teoría, aplicaciones prácticas, simulaciones interactivas y ejercicios resueltos para proporcionar una experiencia educativa integral.

##  Características

- **Interfaz Moderna y Responsiva**: Diseño limpio y adaptable a cualquier dispositivo
- **Tema Oscuro**: Interfaz agradable a la vista para largas sesiones de estudio
- **Contenido Educativo Estructurado**: Organización clara de conceptos y temas
- **Simulaciones Interactivas**: Visualización dinámica de fenómenos físicos
- **Ejercicios Prácticos**: Problemas resueltos paso a paso con fórmulas matemáticas
- **Test Interactivo**: Evaluación de conocimientos adquiridos
- **Componentes Reutilizables**: Modales y tarjetas consistentes en toda la aplicación
- **Animaciones Suaves**: Transiciones visuales agradables

## 🛠 Tecnologías Utilizadas

### Frontend
- **React 18**: Librería para construcción de interfaces
- **Vite**: Herramienta de construcción rápida
- **CSS3**: Estilos personalizados con variables CSS
- **MathJax**: Renderizado de fórmulas matemáticas
- **better-react-mathjax**: Integración de MathJax en React

### Desarrollo
- **Node.js**: Entorno de ejecución
- **npm**: Gestor de paquetes

## 📁 Estructura del Proyecto

```
ondas-project/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── FormulaCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Modal.css
│   │   ├── Navbar.jsx
│   │   ├── PagePlaceholder.jsx
│   │   ├── SimuladorPendulo.jsx
│   │   └── SimuladorResorte.jsx
│   ├── pages/               # Páginas principales
│   │   ├── Inicio.jsx
│   │   ├── Inicio.css
│   │   ├── MarcoConceptual.jsx
│   │   ├── EjemplosIngenieria.jsx
│   │   ├── Laboratorio.jsx
│   │   ├── Laboratorio.css
│   │   ├── Ejercicios.jsx
│   │   ├── Ejercicios.css
│   │   ├── TestInteractivo.jsx
│   │   ├── TestInteractivo.css
│   │   └── (archivos .css adicionales)
│   ├── hooks/               # Hooks personalizados (si aplica)
│   ├── utils/               # Funciones utilitarias
│   ├── App.jsx              # Componente raíz
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── img/                     # Imágenes y bocetos
│   └── boceto1.png
├── public/                  # Archivos estáticos
├── package.json             # Dependencias del proyecto
├── vite.config.js           # Configuración de Vite
├── index.html               # HTML base
└── README.md                # Este archivo

```

##  Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio o descargar el proyecto**
   ```bash
   cd ondas-project
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar dependencias específicas (si es necesario)**
   ```bash
   npm install react
   npm install vite
   npm install better-react-mathjax
   npm install mathjax
   ```

##  Uso

### Desarrollo
Para ejecutar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación se abrirá automáticamente en `http://localhost:5173`

### Construcción
Para crear una versión optimizada para producción:
```bash
npm run build
```

### Previsualización
Para ver la versión de producción localmente:
```bash
npm run preview
```

##  Secciones Disponibles

### 1. **Inicio (Portada)**
Página de presentación del proyecto que incluye:
- Título y descripción del proyecto
- Integrantes del equipo académico
- Profesor a cargo
- Logo de la universidad
- Créditos del desarrollador con enlace a GitHub

### 2. **Marco Conceptual**
Sección teórica que cubre:
- Fundamentos de oscilaciones
- Conceptos de ondas mecánicas
- Movimiento armónico simple
- Propiedades de las ondas
- Ecuaciones y leyes fundamentales

### 3. **Aplicaciones en Ingeniería**
Ejemplos prácticos de aplicación:
- Sistemas de amortiguamiento
- Construcción sismorresistente
- Transmisión de energía por ondas
- Acústica en ingeniería
- Aplicaciones en telecomunicaciones

### 4. **Laboratorio**
Simulaciones interactivas:
- **Simulador de Péndulo Simple**: Experimenta con longitud, amplitud y gravedad
- **Simulador de Resorte**: Ajusta masa, constante elástica y amplitud
- Observa en tiempo real los cambios en período, frecuencia y energía

### 5. **Ejercicios Prácticos**
Problemas resueltos paso a paso:
- **Movimiento Armónico Simple (M.A.S.)**: Cálculo de parámetros fundamentales
- **Ley de Hooke**: Deformación elástica
- **Período del Sistema Masa-Resorte**: Determinación de ciclos
- **Péndulo Simple**: Análisis del movimiento pendular
- **Análisis de Resonancia**: Amplificación de amplitudes

Cada ejercicio incluye:
- Boceto visual del problema
- Contexto y descripción
- Fórmulas necesarias con notación matemática
- Procedimiento paso a paso
- Resultado final e interpretación

### 6. **Test Interactivo**
Evaluación de conocimientos:
- Preguntas sobre conceptos fundamentales
- Problemas para resolver
- Retroalimentación inmediata
- Cálculo de puntuación final

##  Integrantes

- Juan Sebastian Martinez Uribe
- Bibiana Arteaga Castellanos
- Esteban Andrés Arévalo
- Ali David Valle Mancilla
- Yulia Cabana Olivella
- Omar Andres Rojas Arango

##  Profesor

**Jean Linero Cueto**

Asignatura: Calor y Ondas

## 💻 Desarrollador

**Juan Sebastian Martinez**

- GitHub: [@JsMartinez-dev](https://github.com/JsMartinez-dev)
- Desarrollo de la plataforma educativa interactiva

##  Diseño y Características Visuales

### Tema de Color
- **Color Primario**: `#6366f1` (Indigo)
- **Color Secundario**: `#8b5cf6` (Purple)
- **Color de Acento**: `#ec4899` (Pink)
- **Fondo Principal**: Tema oscuro para comodidad visual

### Componentes Reutilizables
- **Modal**: Para presentar contenido en capas superpuestas
- **Tarjetas**: Para agrupar información relacionada
- **Navbar**: Navegación principal con iconos descriptivos
- **FormulaCard**: Presentación de ecuaciones matemáticas

### Animaciones
- Entrada suave de elementos
- Transiciones en interacciones
- Efectos hover en botones y enlaces
- Decoraciones ondulantes

##  Responsividad

La plataforma está optimizada para:
- **Desktop**: Experiencia completa (1200px+)
- **Tablet**: Adaptación de grid y espaciado (768px - 1199px)
- **Móvil**: Interfaz simplificada y táctil (< 768px)

##  Configuración Personalizada

### Variables CSS Globales
El proyecto utiliza variables CSS para mantener consistencia:
```css
--primary-color: #6366f1
--secondary-color: #8b5cf6
--accent-color: #ec4899
--bg-primary: #0f0f0f
--bg-secondary: #1a1a1a
--text-primary: #ffffff
--text-secondary: #a0a0a0
--success-color: #10b981
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--shadow-md: 0 10px 25px rgba(0, 0, 0, 0.2)
--shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.1)
```

##  Recursos Educativos

### Conceptos Cubiertos
- Oscilaciones armónicas simples
- Energía en sistemas oscilantes
- Ondas mecánicas y propagación
- Fenómenos de resonancia
- Interferencia y difracción
- Aplicaciones prácticas en ingeniería

### Herramientas de Aprendizaje
- Visualizaciones interactivas
- Fórmulas matemáticas precisas
- Ejercicios con soluciones detalladas
- Simulaciones personalizables
- Pruebas autoevaluables

##  Solución de Problemas

### La aplicación no inicia
```bash
# Limpiar dependencias
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Iniciar
npm run dev
```

### Las fórmulas no se renderizan correctamente
- Verificar que MathJax esté cargado correctamente
- Revisar la consola del navegador para errores
- Asegurar que `better-react-mathjax` esté instalado

### Problemas de rendimiento
- Verificar que los simuladores no estén corriendo múltiples instancias
- Limpiar caché del navegador
- Usar la versión optimizada: `npm run build`

##  Notas de Desarrollo

- El proyecto utiliza React Hooks para estado local
- Los estilos están organizados por componente/página
- La navegación es manejada mediante estado local en App.jsx
- Las fórmulas matemáticas se renderizan con MathJax

##  Licencia

Este proyecto es un trabajo académico desarrollado para propósitos educativos en la Universidad del Magdalena.

---

**Última actualización**: Mayo 2026

**Versión**: 1.0

Para más información o sugerencias, contactar al desarrollador a través de [GitHub](https://github.com/JsMartinez-dev).
