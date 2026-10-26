// ==== abertura: as frases aparecem e somem, uma de cada vez, e depois o site é revelado ====
// Os tempos (em milissegundos) ficam aqui em cima para facilitar ajustes.
(function abertura() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  const frases = [...splash.querySelectorAll(".splash-frase")];
  const TEMPO_NA_TELA = 2600; // quanto cada frase fica visível (inclui o tempo de surgir)
  const INTERVALO = 700;      // pausa entre uma frase sumir e a próxima surgir
  const ULTIMA = 2000;        // a última ("Aproveite!") é mais curta
  const timers = [];
  const depois = (ms, fn) => timers.push(setTimeout(fn, ms));

  document.body.classList.add("splash-aberta"); // trava a rolagem enquanto a abertura está na tela

  // só começa quando as fontes carregaram (senão a frase aparece numa fonte e troca para outra no meio).
  // Se a internet estiver lenta, espera no máximo 1,5 s e segue com a fonte reserva.
  let comecou = false;
  const comecar = () => {
    if (comecou) return;
    comecou = true;
    let t = 300; // pequena pausa na tela preta antes da primeira frase
    frases.forEach((frase, i) => {
      const ultima = i === frases.length - 1;
      depois(t, () => frase.classList.add("ativa"));
      t += ultima ? ULTIMA : TEMPO_NA_TELA;
      depois(t, () => { frase.classList.remove("ativa"); frase.classList.add("saiu"); });
      t += INTERVALO;
    });
    depois(t + 200, revelar);
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(comecar);
  depois(1500, comecar);

  function revelar() {
    timers.forEach(clearTimeout);
    splash.classList.add("fim");                    // a tela preta se dissolve (transição do CSS)
    document.body.classList.remove("splash-aberta");
    setTimeout(() => splash.remove(), 1300);        // depois de sumir, sai da página de vez
  }
  document.getElementById("splashPular").addEventListener("click", revelar);
  addEventListener("keydown", e => { if (e.key === "Escape" && document.body.contains(splash)) revelar(); });
})();

/* ==== EDITE AQUI: todo o conteúdo do portfólio ==== */
const STACK = [
  { grupo: "Front-end", itens: ["JavaScript (Three.js)", "HTML5", "CSS3", "Tailwind CSS"] },
  { grupo: "Back-end", itens: ["Python (pypdf, openpyxl, regex)", "Java", "APIs REST"] },
  { grupo: "Dados", itens: ["PostgreSQL", "MySQL", "MongoDB", "DAO", "PowerBI"] },
  { grupo: "Ferramentas", itens: ["Git / GitHub", "Claude/Cowork", "ChatGPT", "Scrum / Kanban", "Figma"] },
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
    nome: "Aurum Hypercars", categoria: "front-end", exemplo: false,
    descricao: "Site de carros hiperesportivos com carro 3D que se desmonta peça por peça conforme a rolagem, coleção de modelos e configurador em tempo real: cor, acabamentos, rodas, interior, vistas da câmera e abertura das portas.",
    impacto: "",
    tags: ["3D interativo", "WebGL", "Animação no scroll", "Configurador 3D"], preview: "", github: "",
    video: "media/aurum-hypercars.mp4", imagem: "media/aurum-hypercars.webp",
  },
  {
    nome: "Barbearia Los Santos", categoria: "front-end", exemplo: false,
    descricao: "Site para uma barbearia 24 horas em Valinhos, com poste de barbearia e tesoura em 3D, apresentação dos serviços, combo, endereço com mapa, carrossel de avaliações e agendamento direto pelo WhatsApp.",
    impacto: "",
    tags: ["React", "Three.js", "React Three Fiber", "Tailwind CSS", "Lenis", "Vite"], preview: "https://los-santos-new.vercel.app/", github: "",
    video: "media/barbearia-los-santos.mp4", imagem: "media/barbearia-los-santos.webp",
  },
  {
    nome: "Site Refrigerantes", categoria: "front-end", exemplo: false,
    descricao: "Vitrine de refrigerantes com três sabores (abacate, laranja e morango) em um carrossel com botões de avançar e voltar, que troca produto e visual a cada tela.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "DOM"], preview: "https://refrigerantes-lovat.vercel.app/", github: "https://github.com/grazielagit1/site-refrigerantes",
    video: "media/refrigerantes.mp4", imagem: "media/refrigerantes.webp",
  },
  {
    nome: "Instituto Cornélio", categoria: "front-end", exemplo: false,
    descricao: "Landing page responsiva para o Instituto Cornélio.",
    impacto: "",
    tags: ["HTML", "Tailwind CSS", "JavaScript"], preview: "https://instituto-cornelio.vercel.app/", github: "",
    video: "media/instituto-cornelio.mp4", imagem: "media/instituto-cornelio.webp",
  },
  {
    nome: "Brasa & Pão", categoria: "front-end", exemplo: false,
    descricao: "Site de hamburgueria com cardápio, montagem do lanche (tamanho e adicionais), favoritos e sacola de compras com quantidades, entrega ou retirada, cupom de desconto e cálculo do total do pedido.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "Carrinho de compras"], preview: "", github: "",
    video: "media/brasa-e-pao.mp4", imagem: "media/brasa-e-pao.webp",
  },
  {
    nome: "Room Agent AI", categoria: "IA & automação", exemplo: false, privado: true,
    descricao: "Inteligência operacional para salas Microsoft Teams Rooms: recebe os alertas do Teams Rooms Pro, registra incidentes, calcula a saúde de cada equipamento e recomenda ações por prioridade e risco, com foco em salas VIP.",
    impacto: "",
    tags: ["Python", "FastAPI", "Mistral AI", "SQLite", "Azure App Service", "Microsoft Graph", "Webhooks"], preview: "", github: "",
    imagens: ["media/room-agent-1.webp", "media/room-agent-2.webp", "media/room-agent-3.webp", "media/room-agent-4.webp"],
  },
  {
    nome: "Maison Aurore", categoria: "front-end", exemplo: false,
    descricao: "Loja virtual de uma boutique de moda com cena 3D interativa, rolagem suave, vitrine da coleção e página de produto com escolha de tamanho, detalhes que abrem e fecham e sacola de compras.",
    impacto: "",
    tags: ["React", "Three.js", "React Three Fiber", "Tailwind CSS", "Lenis", "Vite"], preview: "https://boutique-khaki-two.vercel.app/", github: "",
    video: "media/maison-aurore.mp4", imagem: "media/maison-aurore.webp",
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
    <article class="proj${p.video || p.imagem || p.imagens ? " has-media" : ""}">
      ${media(p)}
      <div class="proj-body">
        <span class="tag">${esc(p.categoria)}</span>
        <h3>${esc(p.nome)}${p.exemplo ? '<span class="example">exemplo</span>' : ""}</h3>
        <p>${esc(p.descricao)}</p>
        ${p.impacto ? `<p class="impact">${esc(p.impacto)}</p>` : ""}
        ${chips(p.tags)}
      </div>
    </article>`).join("");
  tocarAoAparecer();
}

// mídia do card: galeria de imagens, vídeo (com a imagem como capa) ou só uma imagem.
// É só ilustrativa, sem link. O vídeo toca sozinho quando aparece na tela e pode ser pausado.
function media(p) {
  if (p.imagens && p.imagens.length) return gallery(p);
  if (!p.video && !p.imagem) return "";
  const alt = `Demonstração do projeto ${p.nome}`;
  const inner = p.video
    ? `<video muted loop playsinline preload="metadata" poster="${esc(p.imagem || "")}" aria-label="${esc(alt)}"><source src="${esc(p.video)}" type="video/mp4"></video>
       <button class="play-btn" type="button" aria-label="Reproduzir vídeo de ${esc(p.nome)}"><span class="play-icon"></span></button>`
    : `<img src="${esc(p.imagem)}" alt="${esc(alt)}" loading="lazy">`;
  return `<div class="proj-media">${inner}</div>`;
}

// galeria: as imagens ficam lado a lado numa faixa que rola na horizontal.
// Setas e bolinhas rolam a faixa; no celular dá para deslizar com o dedo.
function gallery(p) {
  const total = p.imagens.length;
  const imgs = p.imagens.map((src, i) =>
    `<img src="${esc(src)}" alt="${esc(p.nome)}: imagem ${i + 1} de ${total}" ${i ? 'loading="lazy"' : ""} draggable="false">`).join("");
  const dots = p.imagens.map((_, i) =>
    `<button class="gal-dot" type="button" data-go="${i}" aria-label="Ver imagem ${i + 1}"${i ? "" : ' aria-current="true"'}></button>`).join("");
  return `
    <div class="proj-media gallery">
      <div class="gal-track" tabindex="0" role="group" aria-roledescription="carrossel" aria-label="Imagens do projeto ${esc(p.nome)}">${imgs}</div>
      <button class="gal-btn prev" type="button" data-step="-1" aria-label="Imagem anterior"></button>
      <button class="gal-btn next" type="button" data-step="1" aria-label="Próxima imagem"></button>
      <div class="gal-dots">${dots}</div>
    </div>`;
}

// setas e bolinhas: calcula a imagem de destino e rola até ela (dá a volta no fim e no começo)
projEl.addEventListener("click", e => {
  const btn = e.target.closest(".gal-btn, .gal-dot");
  if (!btn) return;
  const track = btn.closest(".gallery").querySelector(".gal-track");
  const total = track.children.length;
  const atual = Math.round(track.scrollLeft / track.clientWidth);
  const alvo = btn.dataset.go !== undefined
    ? Number(btn.dataset.go)
    : (atual + Number(btn.dataset.step) + total) % total;
  track.scrollTo({ left: alvo * track.clientWidth });
  markDot(track, alvo);
});
// visualização ampliada: clicar numa imagem da galeria abre ela em tela cheia, no tamanho real
const lightbox = document.createElement("dialog");
lightbox.className = "lightbox";
lightbox.setAttribute("aria-label", "Imagem ampliada");
lightbox.innerHTML = `
  <figure>
    <img alt="">
    <figcaption><span class="lb-title"></span><span class="lb-count"></span></figcaption>
  </figure>
  <button class="lb-btn lb-close" type="button" aria-label="Fechar"></button>
  <button class="lb-btn lb-prev gal-btn prev" type="button" aria-label="Imagem anterior"></button>
  <button class="lb-btn lb-next gal-btn next" type="button" aria-label="Próxima imagem"></button>`;
document.body.append(lightbox);
let lbFotos = [], lbAtual = 0, lbNome = "";
function lbMostrar(i) {
  lbAtual = (i + lbFotos.length) % lbFotos.length;
  const img = lightbox.querySelector("img");
  img.src = lbFotos[lbAtual];
  img.alt = `${lbNome}: imagem ${lbAtual + 1} de ${lbFotos.length}`;
  lightbox.querySelector(".lb-title").textContent = lbNome;
  lightbox.querySelector(".lb-count").textContent = `${lbAtual + 1} / ${lbFotos.length}`;
}
projEl.addEventListener("click", e => {
  const img = e.target.closest(".gal-track img");
  if (!img) return;
  const track = img.parentElement;
  lbFotos = [...track.children].map(i => i.getAttribute("src"));
  lbNome = img.closest(".proj").querySelector("h3").textContent;
  lbMostrar([...track.children].indexOf(img));
  lightbox.showModal();
});
lightbox.addEventListener("click", e => {
  if (e.target.closest(".lb-prev")) lbMostrar(lbAtual - 1);
  else if (e.target.closest(".lb-next")) lbMostrar(lbAtual + 1);
  else if (e.target.closest(".lb-close") || e.target === lightbox) lightbox.close(); // clicar fora da imagem também fecha
});
lightbox.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") lbMostrar(lbAtual - 1);
  if (e.key === "ArrowRight") lbMostrar(lbAtual + 1);
});

function markDot(track, atual) {
  track.closest(".gallery").querySelectorAll(".gal-dot").forEach((d, i) => d.toggleAttribute("aria-current", i === atual));
}
// setas do teclado quando a galeria está em foco
projEl.addEventListener("keydown", e => {
  if (!e.target.classList.contains("gal-track") || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
  e.preventDefault();
  e.target.closest(".gallery").querySelector(e.key === "ArrowLeft" ? ".prev" : ".next").click();
});
// ao rolar (pelas setas ou com o dedo), acende a bolinha da imagem que está aparecendo
projEl.addEventListener("scroll", e => {
  const track = e.target;
  if (!track.classList || !track.classList.contains("gal-track")) return;
  markDot(track, Math.round(track.scrollLeft / track.clientWidth));
}, true);

// os vídeos tocam sozinhos (sem som, em loop) quando aparecem na tela e pausam quando saem,
// para não gastar internet e bateria com vídeo que ninguém está vendo.
// Quem pediu menos animação no sistema vê a capa e dá play se quiser.
const autoplayLigado = !matchMedia("(prefers-reduced-motion: reduce)").matches;
const observaVideos = "IntersectionObserver" in window && new IntersectionObserver(entradas => {
  entradas.forEach(({ target: video, isIntersecting }) => {
    if (isIntersecting) {
      if (!video.dataset.pausadoPelaPessoa) video.play().catch(() => {});
    } else if (!video.paused) {
      video.pause(); // pausa automática ao sair da tela (não conta como pausa da pessoa)
    }
  });
}, { threshold: .25 });
function tocarAoAparecer() {
  if (!observaVideos || !autoplayLigado) return;
  projEl.querySelectorAll(".proj-media video").forEach(v => observaVideos.observe(v));
}

// play / pause: um clique no botão (ou no próprio vídeo) alterna.
// Se a pessoa pausar, o vídeo fica pausado (não volta a tocar sozinho ao rolar a página).
projEl.addEventListener("click", e => {
  const box = e.target.closest(".proj-media");
  const video = box && box.querySelector("video");
  if (!video) return;
  if (video.paused) {
    delete video.dataset.pausadoPelaPessoa;
    video.play().catch(() => {});
  } else {
    video.dataset.pausadoPelaPessoa = "1";
    video.pause();
  }
});
// mantém o botão em sincronia com o estado do vídeo (tocando ou pausado)
projEl.addEventListener("play", e => setPlaying(e.target, true), true);
projEl.addEventListener("pause", e => setPlaying(e.target, false), true);
function setPlaying(video, playing) {
  const box = video.closest(".proj-media");
  const btn = box && box.querySelector(".play-btn");
  if (!btn) return;
  box.classList.toggle("playing", playing);
  const nome = btn.getAttribute("aria-label").replace(/^(Reproduzir|Pausar) vídeo de /, "");
  btn.setAttribute("aria-label", `${playing ? "Pausar" : "Reproduzir"} vídeo de ${nome}`);
}
filtersEl.innerHTML = cats.map(c => `<button type="button" data-cat="${esc(c)}" id="f-${esc(c).replace(/\s/g, "-")}">${esc(c)}</button>`).join("");
filtersEl.addEventListener("click", e => { const b = e.target.closest("button"); if (b) renderProjects(b.dataset.cat); });
renderProjects("todos");

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

// tilt 3D: os cards de projeto sem mídia inclinam acompanhando o mouse
function tilt(el, max) {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
  });
  el.addEventListener("pointerleave", () => { el.style.transform = ""; });
}
if (!reduced && finePointer) {
  projEl.style.perspective = "900px";
  new MutationObserver(() => projEl.querySelectorAll(".proj:not(.has-media)").forEach(p => tilt(p, 8))).observe(projEl, { childList: true });
  projEl.querySelectorAll(".proj:not(.has-media)").forEach(p => tilt(p, 8));
}

// cena 3D do topo: uma espiral pontilhista (feita só de pontos) girando devagar
// Ideia: cada ponto fica sobre uma espiral que abre do centro para fora; perto do centro os pontos
// são pequenos e apagados, no meio do braço são maiores e mais fortes (efeito "pontilhismo").
(function scene() {
  if (!window.THREE) return;
  const canvas = document.getElementById("scene");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return; }
  const dpr = Math.min(devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, 1, .1, 100);
  cam.position.set(0, 0, 16);

  // ---- os pontos da espiral ----
  const BRACOS = 2;        // quantos braços a espiral tem
  const VOLTAS = 2.6;      // quantas voltas cada braço dá
  const RAIO = 6.2;        // tamanho da espiral
  const POR_BRACO = 1500;  // pontos em cada braço
  const pos = [], tam = [], alfa = [], fase = [];
  for (let b = 0; b < BRACOS; b++) {
    for (let i = 0; i < POR_BRACO; i++) {
      const t = i / POR_BRACO;                       // 0 = centro, 1 = ponta do braço
      const ang = t * VOLTAS * Math.PI * 2 + b * (Math.PI * 2 / BRACOS);
      const r = .25 + Math.pow(t, .85) * RAIO;
      const espalha = (.12 + t * .7) * (Math.random() - .5) * 2; // o braço engrossa para fora
      const lado = (Math.random() - .5) * (.15 + t * .55);
      const x = Math.cos(ang) * (r + espalha) - Math.sin(ang) * lado;
      const y = Math.sin(ang) * (r + espalha) + Math.cos(ang) * lado;
      const z = (Math.random() - .5) * .5 * (1 - t) + Math.sin(t * 9) * .25; // leve ondulação = profundidade
      pos.push(x, y, z);
      const meio = Math.sin(Math.PI * Math.min(1, t * 1.15));               // 0 nas pontas, 1 no meio do braço
      tam.push(.025 + .085 * meio * (.55 + Math.random() * .45));
      alfa.push(.18 + .82 * meio * (.6 + Math.random() * .4));
      fase.push(Math.random() * Math.PI * 2);
    }
  }
  // poeira solta em volta, para dar profundidade
  for (let i = 0; i < 600; i++) {
    const a = Math.random() * Math.PI * 2, r = 1 + Math.random() * RAIO * 1.35;
    pos.push(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - .5) * 3);
    tam.push(.015 + Math.random() * .03); alfa.push(.12 + Math.random() * .25); fase.push(Math.random() * 6.28);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("aTam", new THREE.Float32BufferAttribute(tam, 1));
  geo.setAttribute("aAlfa", new THREE.Float32BufferAttribute(alfa, 1));
  geo.setAttribute("aFase", new THREE.Float32BufferAttribute(fase, 1));
  const uniforms = { uEscala: { value: 1 }, uTempo: { value: 0 }, uForca: { value: 1 } };
  const pontos = new THREE.Points(geo, new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    // vertex shader: posiciona cada ponto e calcula o tamanho em pixels (menor quanto mais longe)
    vertexShader: `
      attribute float aTam; attribute float aAlfa; attribute float aFase;
      uniform float uEscala; uniform float uTempo; uniform float uForca;
      varying float vAlfa;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aTam * uEscala / -mv.z;
        vAlfa = aAlfa * uForca * (.75 + .25 * sin(uTempo * 1.3 + aFase)); // cada ponto "cintila" de leve
      }`,
    // fragment shader: desenha cada ponto como um círculo branco de borda suave
    fragmentShader: `
      varying float vAlfa;
      void main() {
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        gl_FragColor = vec4(1., 1., 1., vAlfa * smoothstep(.5, .35, d));
      }`,
  }));
  const grupo = new THREE.Group();
  grupo.add(pontos);
  grupo.rotation.x = -1.05; // inclinada, vista de lado: assim a espiral ganha perspectiva 3D
  grupo.rotation.y = .35;
  sc.add(grupo);

  // ---- tamanho da tela ----
  // computador (1024px ou mais): a espiral fica à direita do texto.
  // celular e tablet: fica atrás do texto, com pouca opacidade, para não atrapalhar a leitura.
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    uniforms.uEscala.value = h * dpr / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)));
    const meiaAltura = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z; // metade da altura visível, em unidades 3D
    const meiaLargura = meiaAltura * cam.aspect;
    uniforms.uForca.value = 1;
    if (innerWidth >= 1024) {
      grupo.position.set(Math.min(4.2, meiaLargura * .5), 0, 0);
      grupo.scale.setScalar(1);
    } else {
      // celular e tablet: atrás do texto, centralizada e bem fraca, como uma textura de fundo
      grupo.position.set(0, 0, 0);
      grupo.scale.setScalar(Math.min(1, (meiaLargura * 1.1) / RAIO));
      uniforms.uForca.value = .28;
    }
  }
  addEventListener("resize", resize); resize();

  let mx = 0, my = 0;
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });

  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);
  function frame() {
    const t = clock.getElapsedTime();
    uniforms.uTempo.value = t;
    pontos.rotation.z = -t * .08;                       // a espiral gira em torno do próprio centro
    // inclina levemente acompanhando o mouse (no celular e tablet, sem giro lateral, para ficar centralizada)
    grupo.rotation.y = (innerWidth >= 1024 ? .35 : .05) + mx * .35;
    grupo.rotation.x = -1.05 + my * .25;
    renderer.render(sc, cam);
  }
  if (reduced) { frame(); addEventListener("resize", frame); return; }
  (function loop() { if (visible) frame(); requestAnimationFrame(loop); })();
})();
