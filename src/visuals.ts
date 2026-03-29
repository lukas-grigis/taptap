import { ModeResponse } from './types';

const BRIGHT_COLORS = [
  '#FF6B6B', '#FECA57', '#48DBFB', '#FF9FF3', '#54A0FF',
  '#5F27CD', '#01A3A4', '#F368E0', '#FF6348', '#7BED9F',
  '#70A1FF', '#FFA502', '#2ED573', '#1E90FF', '#FF4757',
];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animFrameId = 0;
let isFirstTap = true;

type ParticleShape = 'circle' | 'star' | 'square';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
  shape: ParticleShape;
  rotation: number;
  rotationSpeed: number;
}

export function initCanvas(): void {
  canvas = document.getElementById('particles') as HTMLCanvasElement;
  if (canvas) {
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }
}

function resizeCanvas(): void {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

export function randomColor(): string {
  return BRIGHT_COLORS[Math.floor(Math.random() * BRIGHT_COLORS.length)];
}

function randomShape(): ParticleShape {
  const r = Math.random();
  if (r < 0.6) return 'circle';
  if (r < 0.9) return 'star';
  return 'square';
}

export function showResponse(response: ModeResponse): void {
  const display = document.getElementById('display')!;
  const subDisplay = document.getElementById('sub-display')!;
  const stage = document.getElementById('stage')!;

  // Reset screen color
  if (response.screenColor) {
    stage.style.backgroundColor = response.screenColor;
    stage.classList.add('color-flood');
  } else {
    stage.style.backgroundColor = '';
    stage.classList.remove('color-flood');
  }

  // FAB tinting


  // Main display
  if (response.isHTML) {
    display.innerHTML = response.display;
  } else {
    display.textContent = response.display;
  }
  display.style.color = response.color;
  display.style.textShadow = `0 0 60px ${response.color}88, 0 0 120px ${response.color}44`;

  // Force reflow for animation restart
  display.className = '';
  void display.offsetWidth;
  display.className = 'pop-in char-float';

  // Sub display — slide in from below
  if (response.subDisplay) {
    subDisplay.textContent = response.subDisplay;
    subDisplay.style.color = response.color;
    subDisplay.className = '';
    void subDisplay.offsetWidth;
    subDisplay.className = 'fade-in';
  } else {
    subDisplay.textContent = '';
    subDisplay.className = '';
  }

  // Particle burst — confetti on first tap, normal otherwise
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  if (isFirstTap) {
    burstParticles(cx, cy, response.color, 80, true);
    isFirstTap = false;
  } else {
    burstParticles(cx, cy, response.color, 40, false);
  }

  // Clear after 2 seconds
  setTimeout(() => {
    display.classList.add('fade-out');
    subDisplay.classList.add('fade-out');
    setTimeout(() => {
      if (display.classList.contains('fade-out')) {
        display.textContent = '';
        display.innerHTML = '';
        display.className = '';
        display.style.textShadow = '';
        subDisplay.textContent = '';
        subDisplay.className = '';
        stage.style.backgroundColor = '';
        stage.classList.remove('color-flood');
      }
    }, 500);
  }, 5000);
}

function burstParticles(x: number, y: number, color: string, count: number, confetti: boolean): void {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = confetti ? 3 + Math.random() * 5 : 2 + Math.random() * 4;
    const hueShift = confetti ? Math.floor(Math.random() * 360) : 0;
    const particleColor = confetti
      ? `hsl(${hueShift}, 85%, 60%)`
      : (Math.random() > 0.4 ? color : randomColor());

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 3 + Math.random() * 9,
      color: particleColor,
      life: 0,
      maxLife: 40 + Math.random() * 25,
      shape: randomShape(),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
    });
  }
  if (!animFrameId) {
    animFrameId = requestAnimationFrame(animateParticles);
  }
}

function drawStar(cx: number, cy: number, r: number, rotation: number): void {
  if (!ctx) return;
  const spikes = 5;
  const outerRadius = r;
  const innerRadius = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / spikes - Math.PI / 2 + rotation;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawRoundedSquare(cx: number, cy: number, r: number, rotation: number): void {
  if (!ctx) return;
  const size = r * 1.6;
  const half = size / 2;
  const cornerR = size * 0.2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(-half + cornerR, -half);
  ctx.lineTo(half - cornerR, -half);
  ctx.quadraticCurveTo(half, -half, half, -half + cornerR);
  ctx.lineTo(half, half - cornerR);
  ctx.quadraticCurveTo(half, half, half - cornerR, half);
  ctx.lineTo(-half + cornerR, half);
  ctx.quadraticCurveTo(-half, half, -half, half - cornerR);
  ctx.lineTo(-half, -half + cornerR);
  ctx.quadraticCurveTo(-half, -half, -half + cornerR, -half);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animateParticles(): void {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12; // gravity
    p.life++;
    p.rotation += p.rotationSpeed;

    const progress = p.life / p.maxLife;
    const alpha = 1 - progress * progress; // easeInQuad fade
    if (alpha <= 0) return false;

    ctx!.globalAlpha = alpha;
    ctx!.fillStyle = p.color;
    const r = p.radius * alpha;

    if (p.shape === 'star') {
      drawStar(p.x, p.y, r, p.rotation);
    } else if (p.shape === 'square') {
      drawRoundedSquare(p.x, p.y, r, p.rotation);
    } else {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx!.fill();
    }
    return true;
  });

  ctx.globalAlpha = 1;

  if (particles.length > 0) {
    animFrameId = requestAnimationFrame(animateParticles);
  } else {
    animFrameId = 0;
  }
}
