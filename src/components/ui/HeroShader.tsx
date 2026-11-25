"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Aurore en dégradé de marque : bruit simplex (Ashima Arts, licence MIT)
// déformé dans le temps, quatre nappes de couleur qui dérivent lentement, la
// quatrième suit doucement la souris.
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float aspect=u_res.x/u_res.y;
  vec2 p=vec2(uv.x*aspect,uv.y);
  float t=u_time*0.06;

  vec2 q=p+0.32*vec2(snoise(p*1.1+vec2(t,-t)),snoise(p*1.1+vec2(-t*0.8,t*1.2)+7.3));
  float n=snoise(q*1.5+t*0.7);

  vec3 bg=vec3(0.027,0.024,0.102);
  vec3 violet=vec3(0.43,0.30,1.0);
  vec3 pink=vec3(1.0,0.40,0.80);
  vec3 amber=vec3(1.0,0.70,0.38);
  vec3 cyan=vec3(0.30,0.80,1.0);

  vec2 m=vec2(u_mouse.x*aspect,u_mouse.y);
  vec2 c1=vec2(aspect*(0.80+0.10*sin(t*3.0)),0.82+0.10*cos(t*2.3));
  vec2 c2=vec2(aspect*(0.50+0.18*cos(t*2.1)),1.05+0.06*sin(t*2.7));
  vec2 c3=vec2(aspect*(1.00+0.06*sin(t*1.7)),0.30+0.12*sin(t*2.0));
  vec2 c4=mix(vec2(aspect*0.65,0.55),m,0.45);

  float b1=exp(-2.6*dot(q-c1,q-c1));
  float b2=exp(-3.2*dot(q-c2,q-c2));
  float b3=exp(-3.6*dot(q-c3,q-c3));
  float b4=exp(-7.0*dot(q-c4,q-c4));

  vec3 col=bg;
  col+=violet*b1*(0.62+0.30*n);
  col+=pink*b2*(0.42+0.28*n);
  col+=amber*b3*(0.30+0.18*n);
  col+=cyan*b4*0.16;

  float ribbon=smoothstep(0.15,0.95,n)*smoothstep(0.25,1.0,uv.y);
  col+=mix(violet,pink,uv.x)*ribbon*0.10;

  col=mix(bg,col,smoothstep(0.0,0.5,uv.y));
  float d=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(d-0.5)/255.0;
  gl_FragColor=vec4(col,1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/**
 * Fond animé du Hero, en WebGL pur (aucune librairie). Rendu en basse
 * résolution (le flou naturel de l'effet le permet), mis en pause dès que le
 * Hero sort de l'écran ou que l'onglet est caché, et figé en « mouvement
 * réduit ». Si WebGL est indisponible, le dégradé CSS de secours reste visible.
 */
export default function HeroShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = 0.55;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };

    let raf = 0;
    let visible = true;
    const start = performance.now() - 20000;
    const draw = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 20 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };

    canvas.dataset.ready = "1";
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      if (reduced) draw(0);
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", wake);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", wake);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
