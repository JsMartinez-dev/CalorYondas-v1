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
];


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

// ─── Constante de colores globales ──────────────────────────────────────────
const C = {
  accent: "#6c63ff",
  text: "#ffffff",
  secondary: "#7a7f96"
};

const SimuladorResorte = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ A: 55, omega: 1.0, t: 0, running: true, raf: null, trail: [], graphData: null, graphPtr: 0 });
  const posValRef  = useRef(null);
  const velValRef  = useRef(null);
  const fuerValRef = useRef(null);
  const faseValRef = useRef(null);
 
  const [ampLabel,  setAmpLabel]  = useState("55 px");
  const [freqLabel, setFreqLabel] = useState("1.0×");
  const [playing,   setPlaying]   = useState(true);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 680, H = 320;
    canvas.width = W; canvas.height = H;
 
    const s = stateRef.current;
    s.graphData = new Array(290).fill(0);
    s.graphPtr  = 0;
    s.trail     = [];
 
    const cx = 220, cy_eq = 185;
    const graphX = 370, graphY = 50, graphW = 290, graphH = 220;
    const trailLen = 120;
 
    function getColors() {
      return {
        bg:       "#0d0f14",
        wall:     "#2a2d3a",
        spring:   "#7a7f96",
        eq:       "rgba(29,184,138,0.35)",
        trail:    "#f0a500",
        arrow:    "#e24b4a",
        textSec:  "#ffffff",
        grid:     "rgba(255,255,255,0.04)",
        graphBg:  "rgba(108,99,255,0.07)",
        graphLine:"#6c63ff",
        posLine:  "rgba(240,165,0,0.7)",
      };
    }
 
    function drawSpring(x0, y0, x1, y1, coils) {
      const C2 = getColors();
      const dx = x1-x0, dy = y1-y0;
      const len = Math.sqrt(dx*dx+dy*dy);
      const nx = -dy/len, ny = dx/len;
      const n = coils*2;
      ctx.beginPath(); ctx.moveTo(x0,y0);
      for (let i=1;i<=n;i++){
        const f=i/n, px=x0+dx*f, py=y0+dy*f;
        ctx.lineTo(px+nx*(i%2===0?1:-1)*12, py+ny*(i%2===0?1:-1)*12);
      }
      ctx.lineTo(x1,y1);
      ctx.strokeStyle=C2.spring; ctx.lineWidth=2; ctx.stroke();
    }
 
    function drawArrow(x,y,len,dir,label) {
      const C2=getColors();
      if (Math.abs(len)<3) return;
      const ay=y+len*dir;
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,ay);
      ctx.strokeStyle=C2.arrow; ctx.lineWidth=2; ctx.stroke();
      const hd=dir*Math.sign(len);
      ctx.beginPath();
      ctx.moveTo(x,ay); ctx.lineTo(x-7,ay-hd*12); ctx.lineTo(x+7,ay-hd*12);
      ctx.closePath(); ctx.fillStyle=C2.arrow; ctx.fill();
      ctx.fillStyle=C2.arrow; ctx.font="500 12px 'Space Mono', monospace";
      ctx.textAlign="center"; ctx.fillText(label,x,ay+hd*(-18));
    }
 
    function draw() {
      const C2 = getColors();
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle=C2.bg; ctx.fillRect(0,0,W,H);
 
      /* GRAPH AREA */
      ctx.fillStyle=C2.graphBg; ctx.fillRect(graphX,graphY,graphW,graphH);
      ctx.strokeStyle=C2.grid; ctx.lineWidth=0.5;
      for(let i=1;i<4;i++){
        ctx.beginPath(); ctx.moveTo(graphX,graphY+graphH*i/4);
        ctx.lineTo(graphX+graphW,graphY+graphH*i/4); ctx.stroke();
      }
      ctx.strokeStyle=C2.textSec; ctx.lineWidth=0.5; ctx.strokeRect(graphX,graphY,graphW,graphH);
      ctx.beginPath(); ctx.moveTo(graphX,graphY+graphH/2); ctx.lineTo(graphX+graphW,graphY+graphH/2);
      ctx.strokeStyle=C2.eq; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
 
      ctx.fillStyle=C2.textSec; ctx.font="11px 'Space Mono',monospace"; ctx.textAlign="left";
      ctx.fillText("x(t) = A·cos(ωt)",graphX+6,graphY+14);
      ctx.fillText("+A",graphX-28,graphY+14);
      ctx.fillText("0",graphX-14,graphY+graphH/2+4);
      ctx.fillText("−A",graphX-28,graphY+graphH-6);
      ctx.fillText("t →",graphX+graphW-30,graphY+graphH-6);
 
      const xNorm = Math.cos(s.t * s.omega);
      s.graphData[s.graphPtr] = xNorm;
      s.graphPtr = (s.graphPtr+1) % graphW;
 
      ctx.beginPath();
      for(let i=0;i<graphW;i++){
        const gi=(s.graphPtr+i)%graphW;
        const gx=graphX+i, gy=graphY+graphH/2-s.graphData[gi]*(graphH/2-8);
        i===0?ctx.moveTo(gx,gy):ctx.lineTo(gx,gy);
      }
      ctx.strokeStyle=C2.graphLine; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath();
      const curGy=graphY+graphH/2-xNorm*(graphH/2-8);
      ctx.arc(graphX+graphW-1,curGy,5,0,Math.PI*2);
      ctx.fillStyle=C2.graphLine; ctx.fill();
 
      /* WALL */
      const wallW=20,wallH=100,wx=40,wy=cy_eq-wallH/2;
      ctx.fillStyle=C2.wall; ctx.fillRect(wx,wy,wallW,wallH);
      for(let i=0;i<5;i++){
        ctx.beginPath(); ctx.moveTo(wx,wy+i*20); ctx.lineTo(wx-12,wy+i*20+14);
        ctx.strokeStyle=C2.wall; ctx.lineWidth=3; ctx.stroke();
      }
 
      const x_pos=Math.cos(s.t*s.omega)*s.A;
      const mass_y=cy_eq+x_pos;
      const massW=48,massH=44;
 
      /* equilibrium */
      ctx.beginPath(); ctx.moveTo(cx-60,cy_eq); ctx.lineTo(cx+massW/2+60,cy_eq);
      ctx.strokeStyle=C2.eq; ctx.lineWidth=1; ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle=C2.textSec; ctx.font="11px 'DM Sans',sans-serif"; ctx.textAlign="left";
      ctx.fillText("equilibrio",cx+massW/2+10,cy_eq+4);
 
      /* trail */
      s.trail.push({y:mass_y});
      if(s.trail.length>trailLen) s.trail.shift();
      for(let i=1;i<s.trail.length;i++){
        const alpha=i/s.trail.length*0.55;
        ctx.beginPath();
        ctx.arc(cx+massW/2-8,s.trail[i].y+massH/2,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(240,165,0,${alpha})`; ctx.fill();
      }
 
      /* spring */
      drawSpring(wx+wallW,cy_eq,cx,mass_y+massH/2-2,7);
 
      /* mass block */
      const grad=ctx.createLinearGradient(cx,mass_y,cx+massW,mass_y+massH);
      grad.addColorStop(0,"#7F77DD"); grad.addColorStop(1,"#3C3489");
      ctx.fillStyle=grad;
      ctx.beginPath(); ctx.roundRect(cx,mass_y,massW,massH,8); ctx.fill();
      ctx.strokeStyle="#AFA9EC"; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle="#fff"; ctx.font="500 13px 'DM Sans',sans-serif"; ctx.textAlign="center";
      ctx.fillText("m",cx+massW/2,mass_y+massH/2+5);
 
      /* force arrow */
      drawArrow(cx+massW/2,mass_y+massH/2,(-x_pos/s.A)*45,1,"F");
 
      /* displacement annotation */
      if(Math.abs(x_pos)>5){
        ctx.beginPath(); ctx.moveTo(cx-20,cy_eq); ctx.lineTo(cx-20,mass_y+massH/2);
        ctx.strokeStyle=C2.posLine; ctx.lineWidth=1.5; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle=C2.posLine; ctx.font="12px 'Space Mono',monospace"; ctx.textAlign="right";
        ctx.fillText(x_pos>0?"x > 0":"x < 0",cx-24,(cy_eq+mass_y+massH/2)/2+4);
      }
 
      /* UPDATE DOM */
      const speed=Math.abs(Math.sin(s.t*s.omega));
      const isEq=Math.abs(x_pos)<s.A*0.12;
      if(posValRef.current)  posValRef.current.textContent  = (x_pos/s.A*10).toFixed(1)+" cm";
      if(velValRef.current)  velValRef.current.textContent  = speed>0.85?"Máxima":speed<0.15?"Mínima (0)":"Intermedia";
      if(fuerValRef.current) fuerValRef.current.textContent = (-x_pos/s.A*5).toFixed(1)+" N";
      if(faseValRef.current) faseValRef.current.textContent = isEq?"⚖ Equilibrio":x_pos>0?"⬇ +x":"⬆ −x";
 
      s.t += 0.025;
    }
 
    function loop(){ draw(); s.raf=requestAnimationFrame(loop); }
    loop();
    return () => { if(s.raf) cancelAnimationFrame(s.raf); };
  }, []);
 
  const togglePlay = () => {
    const s = stateRef.current;
    s.running = !s.running;
    setPlaying(s.running);
    if(s.running){
      const canvas = canvasRef.current;
      if(!canvas) return;
      const ctx = canvas.getContext("2d");
      function loop(){ /* re-trigger handled by effect cleanup/remount logic */
        // simplest: just toggle the RAF
      }
      // Re-arm RAF
      const W=680,H=320,cx=220,cy_eq=185;
      const graphX=370,graphY=50,graphW=290,graphH=220,trailLen=120;
      function getC(){ return {bg:"#0d0f14",wall:"#2a2d3a",spring:"#7a7f96",eq:"rgba(29,184,138,0.35)",trail:"#f0a500",arrow:"#e24b4a",textSec:"#7a7f96",grid:"rgba(255,255,255,0.04)",graphBg:"rgba(108,99,255,0.07)",graphLine:"#6c63ff",posLine:"rgba(240,165,0,0.7)"}; }
      function runLoop(){
        const C2=getC();
        ctx.clearRect(0,0,W,H); ctx.fillStyle=C2.bg; ctx.fillRect(0,0,W,H);
        ctx.fillStyle=C2.graphBg; ctx.fillRect(graphX,graphY,graphW,graphH);
        ctx.strokeStyle=C2.grid; ctx.lineWidth=0.5;
        for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(graphX,graphY+graphH*i/4);ctx.lineTo(graphX+graphW,graphY+graphH*i/4);ctx.stroke();}
        ctx.strokeStyle=C2.textSec;ctx.lineWidth=0.5;ctx.strokeRect(graphX,graphY,graphW,graphH);
        ctx.beginPath();ctx.moveTo(graphX,graphY+graphH/2);ctx.lineTo(graphX+graphW,graphY+graphH/2);
        ctx.strokeStyle=C2.eq;ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle=C2.textSec;ctx.font="11px 'Space Mono',monospace";ctx.textAlign="left";
        ctx.fillText("x(t) = A·cos(ωt)",graphX+6,graphY+14);
        ctx.fillText("+A",graphX-28,graphY+14);ctx.fillText("0",graphX-14,graphY+graphH/2+4);ctx.fillText("−A",graphX-28,graphY+graphH-6);ctx.fillText("t →",graphX+graphW-30,graphY+graphH-6);
        const xNorm=Math.cos(s.t*s.omega);
        s.graphData[s.graphPtr]=xNorm; s.graphPtr=(s.graphPtr+1)%graphW;
        ctx.beginPath();
        for(let i=0;i<graphW;i++){const gi=(s.graphPtr+i)%graphW;const gx=graphX+i,gy=graphY+graphH/2-s.graphData[gi]*(graphH/2-8);i===0?ctx.moveTo(gx,gy):ctx.lineTo(gx,gy);}
        ctx.strokeStyle=C2.graphLine;ctx.lineWidth=2;ctx.stroke();
        ctx.beginPath();const curGy=graphY+graphH/2-xNorm*(graphH/2-8);ctx.arc(graphX+graphW-1,curGy,5,0,Math.PI*2);ctx.fillStyle=C2.graphLine;ctx.fill();
        const wallW=20,wallH=100,wx=40,wy=cy_eq-wallH/2;
        ctx.fillStyle=C2.wall;ctx.fillRect(wx,wy,wallW,wallH);
        for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(wx,wy+i*20);ctx.lineTo(wx-12,wy+i*20+14);ctx.strokeStyle=C2.wall;ctx.lineWidth=3;ctx.stroke();}
        const x_pos=Math.cos(s.t*s.omega)*s.A,mass_y=cy_eq+x_pos,massW=48,massH=44;
        ctx.beginPath();ctx.moveTo(cx-60,cy_eq);ctx.lineTo(cx+massW/2+60,cy_eq);
        ctx.strokeStyle=C2.eq;ctx.lineWidth=1;ctx.setLineDash([6,4]);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle=C2.textSec;ctx.font="11px 'DM Sans',sans-serif";ctx.textAlign="left";ctx.fillText("equilibrio",cx+massW/2+10,cy_eq+4);
        s.trail.push({y:mass_y});if(s.trail.length>trailLen)s.trail.shift();
        for(let i=1;i<s.trail.length;i++){const alpha=i/s.trail.length*0.55;ctx.beginPath();ctx.arc(cx+massW/2-8,s.trail[i].y+massH/2,2,0,Math.PI*2);ctx.fillStyle=`rgba(240,165,0,${alpha})`;ctx.fill();}
        // spring
        function drawSp(x0,y0,x1,y1,coils){const dx=x1-x0,dy=y1-y0,len=Math.sqrt(dx*dx+dy*dy),nx=-dy/len,ny=dx/len,n=coils*2;ctx.beginPath();ctx.moveTo(x0,y0);for(let i=1;i<=n;i++){const f=i/n,px=x0+dx*f,py=y0+dy*f;ctx.lineTo(px+nx*(i%2===0?1:-1)*12,py+ny*(i%2===0?1:-1)*12);}ctx.lineTo(x1,y1);ctx.strokeStyle=C2.spring;ctx.lineWidth=2;ctx.stroke();}
        drawSp(wx+wallW,cy_eq,cx,mass_y+massH/2-2,7);
        const grad=ctx.createLinearGradient(cx,mass_y,cx+massW,mass_y+massH);grad.addColorStop(0,"#7F77DD");grad.addColorStop(1,"#3C3489");ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(cx,mass_y,massW,massH,8);ctx.fill();ctx.strokeStyle="#AFA9EC";ctx.lineWidth=1;ctx.stroke();ctx.fillStyle="#fff";ctx.font="500 13px 'DM Sans',sans-serif";ctx.textAlign="center";ctx.fillText("m",cx+massW/2,mass_y+massH/2+5);
        function drawArr(x,y,len,dir,label){if(Math.abs(len)<3)return;const ay=y+len*dir;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,ay);ctx.strokeStyle=C2.arrow;ctx.lineWidth=2;ctx.stroke();const hd=dir*Math.sign(len);ctx.beginPath();ctx.moveTo(x,ay);ctx.lineTo(x-7,ay-hd*12);ctx.lineTo(x+7,ay-hd*12);ctx.closePath();ctx.fillStyle=C2.arrow;ctx.fill();ctx.fillStyle=C2.arrow;ctx.font="500 12px 'Space Mono',monospace";ctx.textAlign="center";ctx.fillText(label,x,ay+hd*(-18));}
        drawArr(cx+massW/2,mass_y+massH/2,(-x_pos/s.A)*45,1,"F");
        if(Math.abs(x_pos)>5){ctx.beginPath();ctx.moveTo(cx-20,cy_eq);ctx.lineTo(cx-20,mass_y+massH/2);ctx.strokeStyle=C2.posLine;ctx.lineWidth=1.5;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=C2.posLine;ctx.font="12px 'Space Mono',monospace";ctx.textAlign="right";ctx.fillText(x_pos>0?"x > 0":"x < 0",cx-24,(cy_eq+mass_y+massH/2)/2+4);}
        const speed=Math.abs(Math.sin(s.t*s.omega)),isEq=Math.abs(x_pos)<s.A*0.12;
        if(posValRef.current) posValRef.current.textContent=(x_pos/s.A*10).toFixed(1)+" cm";
        if(velValRef.current) velValRef.current.textContent=speed>0.85?"Máxima":speed<0.15?"Mínima (0)":"Intermedia";
        if(fuerValRef.current) fuerValRef.current.textContent=(-x_pos/s.A*5).toFixed(1)+" N";
        if(faseValRef.current) faseValRef.current.textContent=isEq?"⚖ Equilibrio":x_pos>0?"⬇ +x":"⬆ −x";
        s.t+=0.025;
        s.raf=requestAnimationFrame(runLoop);
      }
      runLoop();
    } else {
      cancelAnimationFrame(s.raf);
    }
  };
 
  return (
    <div className="lab-card">
      <div className="lab-card-title">Laboratorio 01</div>
      <h2>Movimiento Armónico Simple</h2>
      <p >Visualiza en tiempo real la posición, la fuerza restauradora y la gráfica de x(t) = A·cos(ωt). Ajusta amplitud y frecuencia angular con los controles.</p>
 
      <div className="mas-canvas-wrap">
        <canvas ref={canvasRef} style={{ borderRadius: 12, display: "block", width: "100%" }} />
      </div>
 
      <div className="mas-info-row">
        <div className="mas-info-card">Posición (x)<strong ref={posValRef}>0.0 cm</strong></div>
        <div className="mas-info-card">Velocidad<strong ref={velValRef}>—</strong></div>
        <div className="mas-info-card">Fuerza (F)<strong ref={fuerValRef}>0 N</strong></div>
        <div className="mas-info-card">Fase<strong ref={faseValRef}>Equilibrio</strong></div>
      </div>
 
      <div className="mas-controls">
        <button className="lab-btn" onClick={togglePlay}>
          {playing ? "⏸ Pausar" : "▶ Reanudar"}
        </button>
        <div className="mas-ctrl-group">
          <span>Amplitud:</span>
          <input type="range" min="20" max="90" defaultValue="55" style={{ width: 90 }}
            onChange={e => { stateRef.current.A = +e.target.value; stateRef.current.trail=[]; setAmpLabel(e.target.value+" px"); }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.accent }}>{ampLabel}</span>
        </div>
        <div className="mas-ctrl-group">
          <span>Vel. angular ω:</span>
          <input type="range" min="0.3" max="2.0" step="0.1" defaultValue="1.0" style={{ width: 90 }}
            onChange={e => { stateRef.current.omega = +e.target.value; setFreqLabel((+e.target.value).toFixed(1)+"×"); }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.accent }}>{freqLabel}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Simulador de Péndulo ────────────────────────────────────────────────────
const SimuladorPendulo = () => {
  const canvasRef = useRef(null);
  const [longitud, setLongitud] = useState(1.0);
  const [amplitud, setAmplitud] = useState(15);
  const [gravedad, setGravedad] = useState(9.8);
  const [anguloActual, setAnguloActual] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stateRef = useRef({ t: 0, raf: null, trail: [], graphData: new Array(175).fill(0), graphPtr: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 680, H = 280;
    canvas.width = W;
    canvas.height = H;

    const pivotX = 340, pivotY = 30;
    const scale = 110;
    const trailMax = 80;

    const isDark = matchMedia('(prefers-color-scheme:dark)').matches;
    const getColors = () => ({
      bg: isDark ? '#1a1a18' : '#f8f7f4',
      pivot: isDark ? '#888780' : '#5f5e5a',
      string: isDark ? '#b4b2a9' : '#73726c',
      mass: isDark ? '#534AB7' : '#3C3489',
      massRim: isDark ? '#7F77DD' : '#534AB7',
      force: isDark ? '#E24B4A' : '#A32D2D',
      forceT: isDark ? '#EF9F27' : '#BA7517',
      eq: isDark ? 'rgba(30,158,117,0.35)' : 'rgba(15,110,86,0.25)',
      text: isDark ? '#c2c0b6' : '#3d3d3a',
      textSec: isDark ? '#888780' : '#73726c',
      arc: isDark ? 'rgba(127,119,221,0.18)' : 'rgba(83,74,183,0.12)',
      graphBg: isDark ? 'rgba(83,74,183,0.07)' : 'rgba(127,119,221,0.06)',
      graphLine: isDark ? '#7F77DD' : '#534AB7',
    });

    const drawArrow = (x1, y1, x2, y2, col, label) => {
      const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
      if (len < 4) return;
      const ux = dx / len, uy = dy / len;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ux * 10 + uy * 5, y2 - uy * 10 - ux * 5);
      ctx.lineTo(x2 - ux * 10 - uy * 5, y2 - uy * 10 + ux * 5);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      if (label) {
        ctx.fillStyle = col;
        ctx.font = '11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(label, x2 + ux * 14, y2 + uy * 14);
      }
    };

    const draw = () => {
      const C = getColors();
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      const omega = Math.sqrt(gravedad / longitud);
      const amplRad = (amplitud * Math.PI) / 180;
      const theta = amplRad * Math.cos(omega * stateRef.current.t);
      const Lscaled = longitud * scale;
      const bx = pivotX + Math.sin(theta) * Lscaled;
      const by = pivotY + Math.cos(theta) * Lscaled;

      // Arc de amplitud
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, amplRad * Lscaled, -Math.PI / 2 - amplRad, -Math.PI / 2 + amplRad);
      ctx.strokeStyle = C.arc;
      ctx.lineWidth = Lscaled * 0.4;
      ctx.stroke();

      // Pivot
      ctx.beginPath();
      ctx.moveTo(pivotX - 40, pivotY);
      ctx.lineTo(pivotX + 40, pivotY);
      ctx.strokeStyle = C.pivot;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
      ctx.fillStyle = C.pivot;
      ctx.fill();

      // Línea de equilibrio
      const eqX = pivotX, eqY = pivotY + Lscaled;
      ctx.beginPath();
      ctx.moveTo(eqX - 18, eqY);
      ctx.lineTo(eqX + 18, eqY);
      ctx.strokeStyle = C.eq;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.textSec;
      ctx.font = '11px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText('equilibrio', eqX + 22, eqY + 4);

      // Trail
      stateRef.current.trail.push({ x: bx, y: by });
      if (stateRef.current.trail.length > trailMax) stateRef.current.trail.shift();
      for (let i = 1; i < stateRef.current.trail.length; i++) {
        const alpha = (i / stateRef.current.trail.length) * 0.5;
        ctx.beginPath();
        ctx.moveTo(stateRef.current.trail[i - 1].x, stateRef.current.trail[i - 1].y);
        ctx.lineTo(stateRef.current.trail[i].x, stateRef.current.trail[i].y);
        ctx.strokeStyle = isDark ? `rgba(127,119,221,${alpha})` : `rgba(83,74,183,${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // String
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = C.string;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Mass
      const massR = 18;
      ctx.beginPath();
      ctx.arc(bx, by, massR, 0, Math.PI * 2);
      ctx.fillStyle = C.mass;
      ctx.fill();
      ctx.strokeStyle = C.massRim;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '500 11px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('m', bx, by);

      // Fuerzas
      const gScale = 28;
      drawArrow(bx, by, bx, by + gScale, C.force, 'mg');
      const Ft_mag = -gravedad * Math.sin(theta) * (gScale / gravedad);
      const tx = -Math.cos(theta), ty = Math.sin(theta);
      drawArrow(bx, by, bx + tx * Ft_mag, by + ty * Ft_mag, C.forceT, '−mg·sinθ');

      // Ángulo
      if (Math.abs(theta) > 0.01) {
        const ang = theta * (180 / Math.PI);
        ctx.fillStyle = C.textSec;
        ctx.font = '12px system-ui';
        ctx.textAlign = 'left';
        const thetaX = pivotX + (theta > 0 ? 12 : -48), thetaY = pivotY + 28;
        ctx.fillText('θ=' + ang.toFixed(1) + '°', thetaX, thetaY);
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 22, -Math.PI / 2, -Math.PI / 2 + theta, theta < 0);
        ctx.strokeStyle = C.textSec;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Gráfica pequeña
      const graphX = 490, graphY = 20, graphW = 175, graphH = 100;
      ctx.fillStyle = C.graphBg;
      ctx.fillRect(graphX, graphY, graphW, graphH);
      ctx.strokeStyle = C.textSec;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(graphX, graphY, graphW, graphH);
      ctx.beginPath();
      ctx.moveTo(graphX, graphY + graphH / 2);
      ctx.lineTo(graphX + graphW, graphY + graphH / 2);
      ctx.strokeStyle = C.eq;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.textSec;
      ctx.font = '10px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText('θ(t) = θ₀·cos(ωt)', graphX + 4, graphY + 11);

      stateRef.current.graphData[stateRef.current.graphPtr] = theta / amplRad;
      stateRef.current.graphPtr = (stateRef.current.graphPtr + 1) % graphW;

      ctx.beginPath();
      for (let i = 0; i < graphW; i++) {
        const gi = (stateRef.current.graphPtr + i) % graphW;
        const gx = graphX + i, gy = graphY + graphH / 2 - stateRef.current.graphData[gi] * (graphH / 2 - 6);
        i === 0 ? ctx.moveTo(gx, gy) : ctx.lineTo(gx, gy);
      }
      ctx.strokeStyle = C.graphLine;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      setAnguloActual(theta * (180 / Math.PI));
      stateRef.current.t += 0.025;
    };

    const loop = () => {
      draw();
      stateRef.current.raf = requestAnimationFrame(loop);
    };

    if (playing) {
      loop();
    }

    return () => {
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, [longitud, amplitud, gravedad, playing]);

  const T = 2 * Math.PI * Math.sqrt(longitud / gravedad);
  const f = 1 / T;

  const togglePlay = () => setPlaying(!playing);

  return (
    <div className="pd-wrap">
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#6c63ff', fontWeight: 700 }}>
        Péndulo Simple
      </h2>
      <p style={{ fontSize: '14px', color: '#6c63ff', marginBottom: '16px', lineHeight: 1.6 }}>
        Observa el comportamiento del péndulo simple en tiempo real. Ajusta la longitud, la amplitud angular y la gravedad 
        para ver cómo afectan al período de oscilación. La gráfica muestra cómo el ángulo cambia según la fórmula θ(t) = θ₀·cos(ωt), 
        donde ω = √(g/L).
      </p>

      <canvas ref={canvasRef} className="rs-canvas" height="280" />

      <div className="pd-info">
        <div className="pd-card">
          Longitud L<strong>{longitud.toFixed(2)} m</strong>
        </div>
        <div className="pd-card">
          Período T<strong>{T.toFixed(2)} s</strong>
        </div>
        <div className="pd-card">
          Frecuencia f<strong>{f.toFixed(2)} Hz</strong>
        </div>
        <div className="pd-card">
          Ángulo θ<strong>{anguloActual.toFixed(1)}°</strong>
        </div>
      </div>

      <div className="pd-controls">
        <button className="pd-btn" onClick={togglePlay}>
          {playing ? '⏸ Pausar' : '▶ Reanudar'}
        </button>
        <div className="pd-ctrl">
          <span>Longitud L:</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            value={longitud}
            step="0.05"
            style={{ width: '100px' }}
            onChange={(e) => {
              setLongitud(parseFloat(e.target.value));
              stateRef.current.trail = [];
            }}
          />
          <span>{longitud.toFixed(2)} m</span>
        </div>
        <div className="pd-ctrl">
          <span>Amplitud θ₀:</span>
          <input
            type="range"
            min="5"
            max="30"
            value={amplitud}
            step="1"
            style={{ width: '90px' }}
            onChange={(e) => {
              setAmplitud(parseFloat(e.target.value));
              stateRef.current.trail = [];
            }}
          />
          <span>{amplitud}°</span>
        </div>
        <div className="pd-ctrl">
          <span>g:</span>
          <input
            type="range"
            min="1"
            max="25"
            value={gravedad}
            step="0.1"
            style={{ width: '80px' }}
            onChange={(e) => {
              setGravedad(parseFloat(e.target.value));
              stateRef.current.trail = [];
            }}
          />
          <span>{gravedad.toFixed(1)} m/s²</span>
        </div>
      </div>
    </div>
  );
};

// ─── Calculador de Resortes en Serie/Paralelo ────────────────────────────────
const CalculadorResortes = () => {
  const canvasRef = useRef(null);
  const [modo, setModo] = useState('serie');
  const [k1, setK1] = useState(80);
  const [k2, setK2] = useState(120);
  const [F, setF] = useState(25);
  const [kEq, setKEq] = useState(0);
  const [comp, setComp] = useState('');

  useEffect(() => {
    const calcKEq = modo === 'serie' ? 1 / (1 / k1 + 1 / k2) : k1 + k2;
    setKEq(calcKEq);
    setComp(modo === 'serie' 
      ? (calcKEq < k1 ? 'Menor que k₁ (más blando)' : 'Mayor que k₁')
      : 'Mayor que k₁ y k₂ (más rígido)'
    );
  }, [modo, k1, k2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 680, height = 240;
    canvas.width = width;
    canvas.height = height;

    const isDark = matchMedia('(prefers-color-scheme:dark)').matches;
    const colors = {
      bg: isDark ? '#1a1a18' : '#f8f7f4',
      wall: isDark ? '#444441' : '#b4b2a9',
      spring1: isDark ? '#7F77DD' : '#534AB7',
      spring2: isDark ? '#1D9E75' : '#0F6E56',
      mass: isDark ? '#3C3489' : '#534AB7',
      massStroke: isDark ? '#7F77DD' : '#3C3489',
      text: isDark ? '#c2c0b6' : '#3d3d3a',
      textSec: isDark ? '#888780' : '#73726c',
      arrow: isDark ? '#E24B4A' : '#A32D2D',
    };

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);
    ctx.font = '12px system-ui';
    ctx.textBaseline = 'middle';

    const drawSpring = (x0, y0, x1, y1, coils, color, lw = 2) => {
      const dx = x1 - x0, dy = y1 - y0, len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len, ny = dx / len;
      const n = coils * 2;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      for (let i = 1; i <= n; i++) {
        const f = i / n, px = x0 + dx * f, py = y0 + dy * f, s = (i % 2 === 0 ? 1 : -1) * 10;
        ctx.lineTo(px + nx * s, py + ny * s);
      }
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawWall = (x, y, w, h) => {
      ctx.fillStyle = colors.wall;
      ctx.fillRect(x, y, w, h);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y + (i * h) / 4);
        ctx.lineTo(x - 10, y + (i * h) / 4 + 10);
        ctx.strokeStyle = colors.wall;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawMass = (x, y, w, h, label) => {
      ctx.fillStyle = colors.mass;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 6);
      ctx.fill();
      ctx.strokeStyle = colors.massStroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '500 12px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + w / 2, y + h / 2);
    };

    if (modo === 'serie') {
      const x1Defl = (F / k1) * 18;
      const x2Defl = (F / k2) * 18;
      const wx = 40, wy = 80, ww = 16, wh = 80;
      drawWall(wx, wy, ww, wh);

      const sp1x0 = wx + ww, sp1y = 120;
      const sp1x1 = sp1x0 + 90 + x1Defl;
      const sp2x0 = sp1x1 + 20, sp2x1 = sp2x0 + 90 + x2Defl;

      drawSpring(sp1x0, sp1y, sp1x1, sp1y, 6, colors.spring1);
      ctx.fillStyle = colors.textSec;
      ctx.textAlign = 'center';
      ctx.fillText('k₁', sp1x0 + (sp1x1 - sp1x0) / 2, sp1y - 18);

      const jx = sp1x1, jy = sp1y;
      ctx.beginPath();
      ctx.arc(jx, jy, 5, 0, Math.PI * 2);
      ctx.fillStyle = colors.textSec;
      ctx.fill();

      drawSpring(sp2x0, sp1y, sp2x1, sp1y, 6, colors.spring2);
      ctx.fillStyle = colors.textSec;
      ctx.textAlign = 'center';
      ctx.fillText('k₂', sp2x0 + (sp2x1 - sp2x0) / 2, sp1y - 18);

      drawMass(sp2x1, sp1y - 22, 44, 44, 'm');

      ctx.beginPath();
      ctx.moveTo(sp2x1 + 44, sp1y);
      ctx.lineTo(sp2x1 + 44 + 28, sp1y);
      ctx.strokeStyle = colors.arrow;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sp2x1 + 44 + 28, sp1y);
      ctx.lineTo(sp2x1 + 44 + 18, sp1y - 7);
      ctx.lineTo(sp2x1 + 44 + 18, sp1y + 7);
      ctx.closePath();
      ctx.fillStyle = colors.arrow;
      ctx.fill();
      ctx.fillStyle = colors.arrow;
      ctx.textAlign = 'center';
      ctx.fillText(`F=${F}N`, sp2x1 + 44 + 14, sp1y - 16);

      ctx.fillStyle = colors.textSec;
      ctx.textAlign = 'left';
      ctx.font = '11px system-ui';
      ctx.fillText(`Desplazamiento total = F/k₁ + F/k₂ = ${(F / k1 + F / k2).toFixed(2)} m (escala)`, 42, 205);
    } else {
      const defl = (F / kEq) * 18;
      const wx = 40, wy = 60, ww = 16, wh = 120;
      drawWall(wx, wy, ww, wh);

      const spX0 = wx + ww, spX1 = spX0 + 130 + defl;
      drawSpring(spX0, 100, spX1, 100, 6, colors.spring1);
      ctx.fillStyle = colors.textSec;
      ctx.textAlign = 'center';
      ctx.fillText('k₁', spX0 + (spX1 - spX0) / 2, 82);

      drawSpring(spX0, 145, spX1, 145, 6, colors.spring2);
      ctx.fillStyle = colors.textSec;
      ctx.fillText('k₂', spX0 + (spX1 - spX0) / 2, 163);

      ctx.beginPath();
      ctx.moveTo(spX1, 88);
      ctx.lineTo(spX1, 160);
      ctx.strokeStyle = colors.textSec;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawMass(spX1, 100, 44, 44, 'm');

      ctx.beginPath();
      ctx.moveTo(spX1 + 44, 122);
      ctx.lineTo(spX1 + 44 + 28, 122);
      ctx.strokeStyle = colors.arrow;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(spX1 + 44 + 28, 122);
      ctx.lineTo(spX1 + 44 + 18, 115);
      ctx.lineTo(spX1 + 44 + 18, 129);
      ctx.closePath();
      ctx.fillStyle = colors.arrow;
      ctx.fill();
      ctx.fillStyle = colors.arrow;
      ctx.textAlign = 'center';
      ctx.fillText(`F=${F}N`, spX1 + 58, 108);

      ctx.fillStyle = colors.textSec;
      ctx.textAlign = 'left';
      ctx.font = '11px system-ui';
      ctx.fillText('Ambos resortes comparten la misma deformación. F total = F₁ + F₂', 42, 205);
    }
  }, [modo, k1, k2, F, kEq]);

  return (
    <div className="rs-wrap">
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#6c63ff', fontWeight: 700 }}>
        Resortes en Serie y Paralelo
      </h2>
      <p style={{ fontSize: '14px', color: '#6c63ff', marginBottom: '16px', lineHeight: 1.6 }}>
        Visualiza cómo cambia la constante elástica equivalente (k<sub>eq</sub>) cuando los resortes se conectan 
        en serie o en paralelo. Ajusta k₁ y k₂ para observar las diferencias en la deformación total y en la rigidez 
        del sistema. En <strong>serie</strong>, los resortes se deforman independientemente y sus constantes se combinan 
        inversamente. En <strong>paralelo</strong>, comparten la misma deformación y sus constantes se suman.
      </p>
      
      <div className="rs-tabs">
        <button 
          className={`rs-tab ${modo === 'serie' ? 'active' : ''}`}
          onClick={() => setModo('serie')}
        >
          Serie
        </button>
        <button 
          className={`rs-tab ${modo === 'paralelo' ? 'active' : ''}`}
          onClick={() => setModo('paralelo')}
        >
          Paralelo
        </button>
      </div>
      
      <canvas ref={canvasRef} className="rs-canvas" height="240" />
      
      <div className="rs-cards">
        <div className="rs-card">k₁ (resorte 1)<strong>{k1} N/m</strong></div>
        <div className="rs-card">k₂ (resorte 2)<strong>{k2} N/m</strong></div>
        <div className="rs-card">k<sub style={{fontSize: '12px'}}>eq</sub> (equivalente)<strong>{kEq.toFixed(1)} N/m</strong></div>
        <div className="rs-card">Comparado con k₁<strong style={{fontSize: '14px'}}>{comp}</strong></div>
      </div>
      
      <div className="rs-controls">
        <div className="rs-ctrl">
          <span>k₁:</span>
          <input 
            type="range" 
            min="20" 
            max="200" 
            value={k1} 
            step="1"
            onChange={(e) => setK1(+e.target.value)}
          />
          <span>{k1}</span>
        </div>
        <div className="rs-ctrl">
          <span>k₂:</span>
          <input 
            type="range" 
            min="20" 
            max="200" 
            value={k2} 
            step="1"
            onChange={(e) => setK2(+e.target.value)}
          />
          <span>{k2}</span>
        </div>
        <div className="rs-ctrl">
          <span>Fuerza F:</span>
          <input 
            type="range" 
            min="5" 
            max="60" 
            value={F} 
            step="1"
            onChange={(e) => setF(+e.target.value)}
          />
          <span>{F} N</span>
        </div>
      </div>
    </div>
  );
};

// ─── Mapa de contenido ───────────────────────────────────────────────────────
const content = {
  resorte: <SimuladorResorte />,
  pendulo: <SimuladorPendulo />,
  "resortes-combinados": <CalculadorResortes />,
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