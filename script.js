/* ==== EDITE AQUI: todo o conteúdo do portfólio ==== */
const STACK = [
  { grupo: "Front-end", itens: ["JavaScript (Three.js)", "HTML5", "CSS3", "Tailwind CSS"] },
  { grupo: "Back-end", itens: ["Python (pypdf, openpyxl, regex)", "Java", "APIs REST"] },
  { grupo: "Dados", itens: ["PostgreSQL", "MySQL", "MongoDB", "DAO"] },
  { grupo: "Ferramentas", itens: ["Git / GitHub", "Claude", "ChatGPT", "Scrum / Kanban", "Figma"] },
];

const JOBS = [
  {
    quando: "Atual", atual: true,
    cargo: "Estágio em Pesquisa & Desenvolvimento", empresa: "Netglobe",
    descricao: "Pesquisa e desenvolvimento de soluções de software, incluindo análise de dados, automação de processos e integração de sistemas.",
    tags: ["Full Stack", "API REST", "Microsoft Azure"],
  },
];

const PROJECTS = [
  {
    nome: "Room Agent AI", categoria: "IA & automação", exemplo: false, privado: true,
    descricao: "Inteligência operacional para salas Microsoft Teams Rooms: recebe os alertas do Teams Rooms Pro, registra incidentes, calcula a saúde de cada equipamento e recomenda ações por prioridade e risco, com foco em salas VIP.",
    impacto: "",
    tags: ["Python", "FastAPI", "Mistral AI", "SQLite", "Azure App Service", "Microsoft Graph", "Webhooks"], preview: "", github: "",
  },
  {
    nome: "Cobrança Automática", categoria: "IA & automação", exemplo: false, privado: true,
    descricao: "Automação da cobrança de títulos em aberto: monitora o ERP todos os dias, aplica uma régua de 15 estágios e envia cada e-mail só depois de aprovado no Teams, com checagem de pagamento no momento do envio. Reduziu o tempo entre aprovação e envio de até 24 horas para poucos minutos.",
    impacto: "",
    tags: ["Python", "Azure Functions", "API OMIE", "Microsoft Teams", "SharePoint", "Microsoft Graph"], preview: "", github: "",
  },
  {
    nome: "Loja de Jogos", categoria: "full stack", exemplo: false,
    descricao: "Loja de jogos para computador (como a Steam), com login, cadastro, painel do vendedor, compras e tela de análises, ligada a um banco MySQL.",
    impacto: "",
    tags: ["Java", "Swing", "DAO", "MySQL"], github: "https://github.com/grazielagit1/APS4",
  },
  {
    nome: "Analisador de Gastos", categoria: "back-end", exemplo: false,
    descricao: "Lê extratos em CSV ou PDF do seu banco, separa os gastos por categoria e gera uma planilha Excel com gráficos.",
    impacto: "",
    tags: ["Python", "Pypdf", "Openpyxl", "Regex"], github: "https://github.com/grazielagit1/analisador-de-gastos",
  },
  {
    nome: "Instituto Cornélio", categoria: "front-end", exemplo: false,
    descricao: "Landing page responsiva para o Instituto Cornélio.",
    impacto: "",
    tags: ["HTML", "Tailwind CSS", "JavaScript"], preview: "https://instituto-cornelio.vercel.app/", github: "",
    video: "media/instituto-cornelio.mp4", imagem: "media/instituto-cornelio.webp",
  },
  {
    nome: "Barbearia Los Santos", categoria: "front-end", exemplo: false,
    descricao: "Site para uma barbearia 24 horas em Valinhos, com apresentação dos serviços, combo, endereço com mapa, avaliações de clientes e agendamento direto pelo WhatsApp.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "Responsivo"], preview: "https://barbearia-los-santos-three.vercel.app/", github: "",
    video: "media/barbearia-los-santos.mp4", imagem: "media/barbearia-los-santos.webp",
  },
  {
    nome: "Site Refrigerantes", categoria: "front-end", exemplo: false,
    descricao: "Vitrine de refrigerantes com três sabores (abacate, laranja e morango) em um carrossel com botões de avançar e voltar, que troca produto e visual a cada tela.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "DOM"], preview: "https://refrigerantes-lovat.vercel.app/", github: "https://github.com/grazielagit1/site-refrigerantes",
    video: "media/refrigerantes.mp4", imagem: "media/refrigerantes.webp",
  },
];
/* ==== fim da área editável ==== */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const chips = arr => `<ul class="chips">${arr.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;

document.getElementById("stackList").innerHTML = STACK.map(g =>
  `<div class="stack-group"><h3>${esc(g.grupo)}</h3>${chips(g.itens)}</div>`).join("");

document.getElementById("jobs").innerHTML = JOBS.map(j => `
  <li class="job">
    <div class="job-when">${j.atual ? '<span class="now">● </span>' : ""}${esc(j.quando)}</div>
    <div class="job-body">
      <h3>${esc(j.cargo)}</h3>
      <div class="where">@ ${esc(j.empresa)}</div>
      <p>${esc(j.descricao)}</p>
      ${chips(j.tags)}
    </div>
  </li>`).join("");

const cats = ["todos", ...new Set(PROJECTS.map(p => p.categoria))];
const filtersEl = document.getElementById("filters");
const projEl = document.getElementById("projects");
function renderProjects(cat) {
  filtersEl.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
  projEl.innerHTML = PROJECTS.filter(p => cat === "todos" || p.categoria === cat).map(p => `
    <article class="proj${p.video || p.imagem ? " has-media" : ""}">
      ${media(p)}
      <div class="proj-body">
        <span class="tag">${esc(p.categoria)}</span>
        <h3>${esc(p.nome)}${p.exemplo ? '<span class="example">exemplo</span>' : ""}</h3>
        <p>${esc(p.descricao)}</p>
        ${p.impacto ? `<p class="impact">${esc(p.impacto)}</p>` : ""}
        ${chips(p.tags)}
        <div class="links">
          ${p.preview ? `<a href="${esc(p.preview)}" target="_blank" rel="noopener">Preview ↗</a>` : ""}
          ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
          ${p.privado ? `<span class="private">🔒 repositório privado</span>` : ""}
        </div>
      </div>
    </article>`).join("");
  playVisibleVideos();
}

// mídia do card: vídeo (com a imagem como capa) ou só a imagem.
// Se o projeto tem preview, a mídia vira um link para o site.
function media(p) {
  if (!p.video && !p.imagem) return "";
  const alt = `Demonstração do projeto ${p.nome}`;
  const inner = p.video
    ? `<video muted loop playsinline preload="none" poster="${esc(p.imagem || "")}" aria-label="${esc(alt)}"><source src="${esc(p.video)}" type="video/mp4"></video>`
    : `<img src="${esc(p.imagem)}" alt="${esc(alt)}" loading="lazy">`;
  return p.preview
    ? `<a class="proj-media" href="${esc(p.preview)}" target="_blank" rel="noopener" tabindex="-1">${inner}</a>`
    : `<div class="proj-media">${inner}</div>`;
}

// os vídeos só tocam enquanto o card aparece na tela (economiza dados e bateria).
// Quem pediu menos animação no sistema vê só a imagem de capa.
const videoObserver = "IntersectionObserver" in window && new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  });
}, { threshold: .4 });
function playVisibleVideos() {
  if (!videoObserver || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  projEl.querySelectorAll(".proj-media video").forEach(v => videoObserver.observe(v));
}
filtersEl.innerHTML = cats.map(c => `<button type="button" data-cat="${esc(c)}" id="f-${esc(c).replace(/\s/g, "-")}">${esc(c)}</button>`).join("");
filtersEl.addEventListener("click", e => { const b = e.target.closest("button"); if (b) renderProjects(b.dataset.cat); });
renderProjects("todos");

// status digitando no card de código
const words = ["construindo", "aprendendo", "entregando", "aberta a projetos"];
const typed = document.getElementById("typed");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let w = 0, i = words[0].length, del = true;
  setInterval(() => {
    const word = words[w];
    i += del ? -1 : 1;
    typed.textContent = `"${word.slice(0, i)}"`;
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    else if (!del && i === words[w].length) { del = true; i += 6; }
  }, 110);
} else typed.textContent = '"construindo"';

document.getElementById("copyBtn").addEventListener("click", async e => {
  const text = document.getElementById("email").textContent;
  try { await navigator.clipboard.writeText(text); e.target.textContent = "copiado"; }
  catch { const r = document.createRange(); r.selectNodeContents(document.getElementById("email")); getSelection().removeAllRanges(); getSelection().addRange(r); e.target.textContent = "selecionado"; }
  setTimeout(() => (e.target.textContent = "copiar"), 1800);
});

// menu do celular: abre e fecha a lista de seções
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
matchMedia("(min-width: 761px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

// tilt 3D: foto do hero e cards de projeto
function tilt(el, max, onMove) {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
    onMove && onMove(x, y);
  });
  el.addEventListener("pointerleave", () => { el.style.transform = ""; });
}
if (!reduced && finePointer) {
  const t = document.getElementById("tilt"), ph = t.querySelector(".photo");
  tilt(t, 16, (x, y) => { if (!ph) return; ph.style.setProperty("--gx", (x + .5) * 100 + "%"); ph.style.setProperty("--gy", (y + .5) * 100 + "%"); });
  projEl.style.perspective = "900px";
  new MutationObserver(() => projEl.querySelectorAll(".proj").forEach(p => tilt(p, 8))).observe(projEl, { childList: true });
  projEl.querySelectorAll(".proj").forEach(p => tilt(p, 8));
}

// cena 3D do hero
(function scene() {
  if (!window.THREE) return;
  const canvas = document.getElementById("scene");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, 1, .1, 100);
  cam.position.set(0, 0, 14);

  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const matMain = new THREE.MeshStandardMaterial({ roughness: .35, metalness: .25, flatShading: true });
  const matWire = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: .35 });
  const matGlass = new THREE.MeshStandardMaterial({ roughness: .15, metalness: .6, flatShading: true });
  const orbMat = new THREE.MeshBasicMaterial();

  const shapes = [
    [new THREE.IcosahedronGeometry(1.4, 0), matMain, [-7.2, 3, -3]],
    [new THREE.BoxGeometry(1.5, 1.5, 1.5), matGlass, [-7.6, -3.6, -2]],
    [new THREE.TorusGeometry(1, .34, 14, 36), matMain, [8.4, 4, -4]],
    [new THREE.OctahedronGeometry(1.1, 0), matGlass, [8.6, -3.6, -3]],
    [new THREE.IcosahedronGeometry(3.4, 1), matWire, [9, -.5, -11]],
    [new THREE.BoxGeometry(.8, .8, .8), matMain, [-2.2, 5.4, -5]],
    [new THREE.TorusKnotGeometry(.7, .22, 80, 12), matGlass, [1.4, -5.6, -4]],
  ].map(([g, m, p], i) => {
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(...p);
    mesh.userData = { base: p[1], speed: .25 + i * .07, phase: i * 1.3 };
    sc.add(mesh);
    return mesh;
  });

  const orb = new THREE.Mesh(new THREE.SphereGeometry(.55, 32, 32), orbMat);
  orb.position.set(1.2, 5, -3);
  sc.add(orb);
  const pl = new THREE.PointLight(0xffffff, 2.2, 30);
  pl.position.copy(orb.position);
  sc.add(pl, new THREE.AmbientLight(0xffffff, .35));
  const dl = new THREE.DirectionalLight(0xffffff, .5);
  dl.position.set(-5, 5, 6);
  sc.add(dl);

  function paint() {
    const acc = new THREE.Color(css("--accent")), acc2 = new THREE.Color(css("--accent-2")), line = new THREE.Color(css("--line"));
    const bg2 = new THREE.Color(css("--bg-2"));
    matMain.color = new THREE.Color(css("--wine")).lerp(bg2, .35);
    matGlass.color = bg2.clone().lerp(acc, .3);
    matWire.color = line.clone().lerp(acc, .4);
    orbMat.color = acc; pl.color = acc;
  }
  paint();

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    const narrow = w < 700;
    shapes.forEach(s => s.scale.setScalar(narrow ? .6 : 1));
  }
  addEventListener("resize", resize); resize();

  let mx = 0, my = 0;
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });

  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);
  function frame() {
    const t = clock.getElapsedTime();
    shapes.forEach(s => {
      const u = s.userData;
      s.rotation.x = t * u.speed * .6; s.rotation.y = t * u.speed;
      s.position.y = u.base + Math.sin(t * .6 + u.phase) * .35;
    });
    orb.position.y = 5 + Math.sin(t * .8) * .3; pl.position.copy(orb.position);
    cam.position.x += (mx * 2.2 - cam.position.x) * .04;
    cam.position.y += (-my * 1.6 - cam.position.y) * .04;
    cam.lookAt(0, 0, 0);
    renderer.render(sc, cam);
  }
  if (reduced) { frame(); return; }
  (function loop() { if (visible) frame(); requestAnimationFrame(loop); })();
})();
