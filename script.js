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
    imagem: "media/aurum-hypercars-1.webp",
  },
  {
    nome: "Barbearia Los Santos", categoria: "front-end", exemplo: false,
    descricao: "Site para uma barbearia 24 horas em Valinhos, com poste de barbearia e tesoura em 3D, apresentação dos serviços, combo, endereço com mapa, carrossel de avaliações e agendamento direto pelo WhatsApp.",
    impacto: "",
    tags: ["React", "Three.js", "React Three Fiber", "Tailwind CSS", "Lenis", "Vite"], preview: "https://los-santos-new.vercel.app/", github: "",
    imagem: "media/barbearia-los-santos-1.webp",
  },
  {
    nome: "Site Refrigerantes", categoria: "front-end", exemplo: false,
    descricao: "Vitrine de refrigerantes com três sabores (abacate, laranja e morango) em um carrossel com botões de avançar e voltar, que troca produto e visual a cada tela.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "DOM"], preview: "https://refrigerantes-lovat.vercel.app/", github: "https://github.com/grazielagit1/site-refrigerantes",
    imagem: "media/refrigerantes-1.webp",
  },
  {
    nome: "Instituto Cornélio", categoria: "front-end", exemplo: false,
    descricao: "Landing page responsiva para o Instituto Cornélio.",
    impacto: "",
    tags: ["HTML", "Tailwind CSS", "JavaScript"], preview: "https://instituto-cornelio.vercel.app/", github: "",
    imagem: "media/instituto-cornelio-1.webp",
  },
  {
    nome: "Brasa & Pão", categoria: "front-end", exemplo: false,
    descricao: "Site de hamburgueria com cardápio, montagem do lanche (tamanho e adicionais), favoritos e sacola de compras com quantidades, entrega ou retirada, cupom de desconto e cálculo do total do pedido.",
    impacto: "",
    tags: ["HTML", "CSS", "JavaScript", "Carrinho de compras"], preview: "", github: "",
    imagem: "media/brasa-e-pao-1.webp",
  },
  {
    nome: "Room Agent AI", categoria: "IA & automação", exemplo: false, privado: true,
    descricao: "Inteligência operacional para salas Microsoft Teams Rooms: recebe os alertas do Teams Rooms Pro, registra incidentes, calcula a saúde de cada equipamento e recomenda ações por prioridade e risco, com foco em salas VIP.",
    impacto: "",
    tags: ["Python", "FastAPI", "Mistral AI", "SQLite", "Azure App Service", "Microsoft Graph", "Webhooks"], preview: "", github: "",
    imagem: "media/room-agent-1.webp",
  },
  {
    nome: "Maison Aurore", categoria: "front-end", exemplo: false,
    descricao: "Loja virtual de uma boutique de moda com cena 3D interativa, rolagem suave, vitrine da coleção e página de produto com escolha de tamanho, detalhes que abrem e fecham e sacola de compras.",
    impacto: "",
    tags: ["React", "Three.js", "React Three Fiber", "Tailwind CSS", "Lenis", "Vite"], preview: "https://boutique-khaki-two.vercel.app/", github: "",
    imagem: "media/maison-aurore-1.webp",
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
    <article class="proj${p.imagem || p.imagens ? " has-media" : ""}">
      ${media(p)}
      <div class="proj-body">
        <span class="tag">${esc(p.categoria)}</span>
        <h3>${esc(p.nome)}${p.exemplo ? '<span class="example">exemplo</span>' : ""}</h3>
        <p>${esc(p.descricao)}</p>
        ${p.impacto ? `<p class="impact">${esc(p.impacto)}</p>` : ""}
        ${chips(p.tags)}
      </div>
    </article>`).join("");
}

// mídia do card: galeria de imagens ou uma imagem do site (só ilustrativa, sem link)
function media(p) {
  if (p.imagens && p.imagens.length) return gallery(p);
  if (!p.imagem) return "";
  return `<div class="proj-media"><img src="${esc(p.imagem)}" alt="${esc(`Página do projeto ${p.nome}`)}" loading="lazy"></div>`;
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
