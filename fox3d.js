// Logo Foxify em 3D girando 360° (hero e mini no menu).
// Cada elemento com [data-fox3d] ganha sua raposa. Atributos opcionais:
//   data-camera="15.5"  distância da câmera (menor = raposa maior)
//   data-drag="false"   desliga o arrastar (usado no menu, que é um link)
// A raposa é desenhada com formas vetoriais (coordenadas tiradas da logo original,
// com o centro da cabeça em x = 0) e extrudada com Three.js.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

document.querySelectorAll("[data-fox3d]").forEach(init);

function init(host) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, parseFloat(host.dataset.camera) || 15.5);
  const canDrag = host.dataset.drag !== "false";

  // luzes: uma principal na frente, uma de recorte atrás e um preenchimento suave
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3a3a, 1.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf27fd0, 1.6);
  rim.position.set(-4, 2, -5);
  scene.add(rim);

  // ---------- formas (y para baixo, como na imagem; invertido depois) ----------
  const S = 1 / 120;          // escala: pixels da logo -> unidades 3D
  const CY = 760;             // centro vertical da cabeça na logo
  const P = (x, y) => [x * S, -(y - CY) * S];

  function headShape() {
    // metade direita da cabeça; a esquerda é espelhada
    const right = [
      ["M", 0, 515],
      ["Q", 100, 512, 180, 555],
      ["Q", 228, 420, 288, 315],       // borda interna da orelha até a ponta
      ["Q", 345, 395, 335, 505],       // borda externa da orelha
      ["L", 352, 512],
      ["Q", 360, 600, 300, 690],       // lateral da cabeça
      ["Q", 280, 760, 365, 818],       // tufo da bochecha
      ["Q", 330, 845, 295, 858],
      ["Q", 330, 872, 345, 888],       // segundo tufo
      ["Q", 260, 940, 195, 968],
      ["Q", 130, 995, 105, 1050],
      ["Q", 78, 1122, 0, 1125],        // queixo
    ];
    const s = new THREE.Shape();
    // monta lista de comandos da direita e da esquerda (espelhada, em ordem inversa)
    s.moveTo(...P(0, 515));
    for (let i = 1; i < right.length; i++) addCmd(s, right[i], 1);
    // volta pelo lado esquerdo
    for (let i = right.length - 1; i >= 1; i--) {
      const cmd = right[i];
      const prev = right[i - 1];
      const end = [prev[prev.length - 2], prev[prev.length - 1]];
      if (cmd[0] === "Q") s.quadraticCurveTo(...P(-cmd[1], cmd[2]), ...P(-end[0], end[1]));
      else s.lineTo(...P(-end[0], end[1]));
    }
    return s;
    function addCmd(sh, c, sx) {
      if (c[0] === "Q") sh.quadraticCurveTo(...P(sx * c[1], c[2]), ...P(sx * c[3], c[4]));
      else sh.lineTo(...P(sx * c[1], c[2]));
    }
  }

  function patchShapes() {
    const band = new THREE.Shape();
    band.moveTo(...P(-192, 960));
    band.quadraticCurveTo(...P(75, 838), ...P(162, 556));
    band.quadraticCurveTo(...P(180, 545), ...P(196, 562));
    band.quadraticCurveTo(...P(210, 610), ...P(198, 680));
    band.quadraticCurveTo(...P(115, 900), ...P(-142, 996));
    band.quadraticCurveTo(...P(-182, 992), ...P(-192, 960));

    const lens = new THREE.Shape();
    lens.absellipse(...P(132, 812), 100 * S, 104 * S, 0, Math.PI * 2, false, 0);
    return [band, lens];
  }

  function crossShape() {
    const cx = 125, cy = 812, L = 52, T = 19;
    const s = new THREE.Shape();
    const pts = [
      [-T, -L], [T, -L], [T, -T], [L, -T], [L, T], [T, T],
      [T, L], [-T, L], [-T, T], [-L, T], [-L, -T], [-T, -T],
    ];
    pts.forEach(([x, y], i) => (i ? s.lineTo : s.moveTo).call(s, ...P(cx + x, cy + y)));
    return s;
  }

  // traço com pontas arredondadas (olho ">" e nariz)
  function stroke(x1, y1, x2, y2, r) {
    const [ax, ay] = P(x1, y1), [bx, by] = P(x2, y2);
    const a = Math.atan2(by - ay, bx - ax);
    const s = new THREE.Shape();
    s.absarc(bx, by, r * S, a - Math.PI / 2, a + Math.PI / 2, false);
    s.absarc(ax, ay, r * S, a + Math.PI / 2, a + Math.PI * 1.5, false);
    return s;
  }

  // ---------- materiais e malhas ----------
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0.05 });
  const pink = new THREE.MeshStandardMaterial({ color: 0xf27fd0, roughness: 0.35, metalness: 0.1 });
  const black = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });

  const fox = new THREE.Group();
  const HEAD_D = 0.55;  // espessura da cabeça
  const bevel = { bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 6, curveSegments: 48 };

  const headGeo = new THREE.ExtrudeGeometry(headShape(), { depth: HEAD_D, ...bevel });
  headGeo.translate(0, 0, -HEAD_D / 2);
  fox.add(new THREE.Mesh(headGeo, white));

  const front = HEAD_D / 2 + 0.08; // superfície da frente (com bisel)
  const detail = (shapes, mat, depth, z) => {
    const g = new THREE.ExtrudeGeometry(shapes, {
      depth, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 3, curveSegments: 40,
    });
    const m = new THREE.Mesh(g, mat);
    m.position.z = z;
    return m;
  };

  // os detalhes vão na frente e atrás, para a raposa ter "rosto" dos dois lados
  const face = new THREE.Group();
  face.add(detail(patchShapes(), pink, 0.06, front - 0.03));
  face.add(detail(crossShape(), white, 0.04, front + 0.03));
  face.add(detail([stroke(-195, 812, -62, 848, 15), stroke(-62, 848, -172, 902, 15)], black, 0.04, front - 0.02));
  face.add(detail(stroke(-22, 1050, 30, 1048, 13), black, 0.04, front - 0.02));
  fox.add(face);
  const back = face.clone();
  back.rotation.y = Math.PI;
  fox.add(back);

  // centraliza no meio da tela
  const box = new THREE.Box3().setFromObject(fox);
  const center = box.getCenter(new THREE.Vector3());
  fox.children.forEach((c) => c.position.sub(new THREE.Vector3(center.x, center.y, 0)));
  const pivot = new THREE.Group();
  pivot.add(fox);
  scene.add(pivot);

  // ---------- tamanho ----------
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  // ---------- interação: arrastar para girar ----------
  let angle = reduceMotion ? -0.35 : 0;
  let velocity = 0;
  const AUTO = reduceMotion ? 0 : 0.9; // rad/s
  let dragging = false, lastX = 0, lastT = 0;

  host.addEventListener("pointerdown", (e) => {
    if (!canDrag) return;
    dragging = true;
    lastX = e.clientX;
    lastT = performance.now();
    host.setPointerCapture(e.pointerId);
  });
  host.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    angle += dx * 0.01;
    velocity = (dx * 0.01) / Math.max((now - lastT) / 1000, 0.008);
    lastX = e.clientX;
    lastT = now;
    if (!running) render();
  });
  const stop = () => (dragging = false);
  host.addEventListener("pointerup", stop);
  host.addEventListener("pointercancel", stop);

  // ---------- loop (pausa quando fora da tela) ----------
  let running = false, prev = 0, visible = true;
  function render() {
    pivot.rotation.y = angle;
    pivot.rotation.x = Math.sin(angle * 0.5) * 0.06;
    renderer.render(scene, camera);
  }
  function tick(t) {
    if (!running) return;
    const dt = Math.min((t - prev) / 1000, 0.05);
    prev = t;
    if (!dragging) {
      velocity += (AUTO - velocity) * Math.min(dt * 2.5, 1); // volta suave à velocidade automática
      angle += velocity * dt;
    }
    pivot.position.y = reduceMotion ? 0 : Math.sin(t / 900) * 0.08; // flutuação leve
    render();
    requestAnimationFrame(tick);
  }
  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    prev = performance.now();
    requestAnimationFrame(tick);
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? start() : (running = false);
  }).observe(host);
  document.addEventListener("visibilitychange", () => (document.hidden ? (running = false) : start()));

  render();
  if (!reduceMotion) start();
}
