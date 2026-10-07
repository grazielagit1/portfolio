/* ==== Abertura 3D: estrela de pontos que se forma com a rolagem ====
   Como funciona, em resumo:
   1. Calculamos a posição final de cada ponto da estrela (o desenho em "meio-tom").
   2. Cada ponto também ganha uma posição inicial espalhada no espaço e um "atraso".
   3. A rolagem dentro da seção .intro vira um número de 0 a 1 (progresso).
   4. A cada quadro, a placa de vídeo (shader) move cada ponto da posição inicial até a final
      de acordo com esse progresso: no 0 só alguns pontos estão no lugar, no 1 a estrela está completa. */
(function star() {
  const intro = document.getElementById("intro");
  const canvas = document.getElementById("star");
  if (!intro || !canvas || !window.THREE) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) intro.classList.add("static"); // sem animação: a estrela já aparece completa

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return; }
  const dpr = Math.min(devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  const DIST = 19; // distância da câmera: a estrela inteira (com as linhas finas) cabe na altura da tela
  camera.position.set(0, 0, DIST);

  // ---------- 1. o desenho da estrela ----------
  // 8 raios: 4 longos (cima, baixo, esquerda, direita) e 4 curtos nas diagonais.
  const RAIOS = [];
  for (let k = 0; k < 8; k++) {
    const longo = k % 2 === 0;
    RAIOS.push({
      ang: k * Math.PI / 4,
      comp: longo ? 5 : 3.1,     // comprimento do raio
      largura: longo ? .95 : .8, // meia-largura na base
    });
  }
  const RAIO_MAX = 5;
  const PASSO = .15; // distância entre os pontos da grade (como na imagem, alinhados em linhas e colunas)

  // Para um ponto (x, y), diz se ele está dentro de algum raio e o quanto está "no meio" da forma.
  // Devolve null se estiver fora; senão devolve { força } de 0 (borda/ponta) a 1 (centro).
  function dentroDaEstrela(x, y) {
    if (Math.abs(x) + Math.abs(y) < .42) return null; // o "losango" vazio no centro
    let melhor = null;
    for (const r of RAIOS) {
      const dx = Math.cos(r.ang), dy = Math.sin(r.ang);
      const ao_longo = x * dx + y * dy;              // distância ao longo do raio
      const de_lado = Math.abs(-x * dy + y * dx);    // distância para o lado do raio
      if (ao_longo < 0 || ao_longo > r.comp) continue;
      const t = ao_longo / r.comp;
      const meia = r.largura * Math.pow(1 - t, 1.35); // o raio afina até a ponta
      if (de_lado > meia) continue;
      const borda = 1 - de_lado / Math.max(meia, .001);
      const forca = Math.pow(1 - t, .7) * (.45 + .55 * borda);
      if (!melhor || forca > melhor.forca) melhor = { forca };
    }
    return melhor;
  }

  const alvo = [], inicio = [], tamanho = [], atraso = [], cor = [];
  const corCentro = new THREE.Color(cssVar("--accent"));
  const corPonta = new THREE.Color(cssVar("--fg"));
  const tmp = new THREE.Color();

  function addPonto(x, y, forca, linhaFina) {
    const r = Math.hypot(x, y);
    // posição final: o desenho + um pouco de profundidade (mais grossa no centro), para ter volume em 3D
    const z = (Math.random() - .5) * .5 * (1 - r / RAIO_MAX);
    alvo.push(x, y, z);
    // posição inicial: espalhada numa "nuvem" grande, parte dela vindo de trás e da frente da câmera
    const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), d = 7 + Math.random() * 9;
    inicio.push(d * Math.sin(b) * Math.cos(a), d * Math.sin(b) * Math.sin(a), d * Math.cos(b) - 2);
    // tamanho do ponto: grande no corpo, pequeno nas pontas e bordas (efeito meio-tom)
    tamanho.push(linhaFina ? .035 : .03 + .1 * Math.pow(forca, 1.1));
    // atraso: ~10% dos pontos já começam no lugar; o resto chega do centro para as pontas
    atraso.push(Math.random() < .1 && !linhaFina ? -1 : .04 + .62 * (r / RAIO_MAX) + .12 * Math.random());
    tmp.copy(corPonta).lerp(corCentro, Math.max(0, 1 - r / 2.2) * .85);
    cor.push(tmp.r, tmp.g, tmp.b);
  }

  for (let x = -RAIO_MAX; x <= RAIO_MAX; x += PASSO) {
    for (let y = -RAIO_MAX; y <= RAIO_MAX; y += PASSO) {
      const p = dentroDaEstrela(x, y);
      if (p && p.forca > .06) addPonto(x, y, p.forca, false);
    }
  }
  // as linhas finas pontilhadas que passam das pontas (como na imagem de referência)
  // (as horizontais são mais longas, as verticais mais curtas, para não invadir a frase embaixo)
  for (let d = RAIO_MAX * .8; d <= RAIO_MAX * 1.45; d += PASSO * 1.6) {
    addPonto(d, 0, 0, true); addPonto(-d, 0, 0, true);
    if (d <= RAIO_MAX * 1.15) { addPonto(0, d, 0, true); addPonto(0, -d, 0, true); }
  }

  // ---------- 2. os pontos na placa de vídeo ----------
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(alvo, 3));
  geo.setAttribute("aInicio", new THREE.Float32BufferAttribute(inicio, 3));
  geo.setAttribute("aTamanho", new THREE.Float32BufferAttribute(tamanho, 1));
  geo.setAttribute("aAtraso", new THREE.Float32BufferAttribute(atraso, 1));
  geo.setAttribute("aCor", new THREE.Float32BufferAttribute(cor, 3));

  const uniforms = {
    uProgresso: { value: reduced ? 1 : 0 },
    uEscala: { value: 1 },   // converte "tamanho no mundo 3D" em pixels na tela
    uTempo: { value: 0 },
  };

  // vertex shader: roda na placa de vídeo uma vez para cada ponto, a cada quadro
  const vertexShader = `
    attribute vec3 aInicio;
    attribute float aTamanho;
    attribute float aAtraso;
    attribute vec3 aCor;
    uniform float uProgresso;
    uniform float uEscala;
    uniform float uTempo;
    varying float vAlpha;
    varying vec3 vCor;
    void main() {
      // quanto este ponto já andou (0 = no início, 1 = no lugar). Cada um tem seu atraso.
      float t = clamp((uProgresso - aAtraso) / .28, 0., 1.);
      t = 1. - pow(1. - t, 3.); // desacelera ao chegar (ease-out)
      vec3 pos = mix(aInicio, position, t);
      // enquanto viaja, o ponto faz uma leve curva em espiral
      float s = sin((1. - t) * 3.1416);
      pos.xy += vec2(-pos.y, pos.x) * .18 * s;
      // depois de pronta, a estrela "respira" bem de leve
      pos.z += sin(uTempo * 1.4 + position.x * 1.7 + position.y * 1.3) * .05 * t;
      vec4 mv = modelViewMatrix * vec4(pos, 1.);
      gl_Position = projectionMatrix * mv;
      // pontos ainda viajando ficam pequenos e apagados; os que já chegaram, nítidos
      gl_PointSize = aTamanho * uEscala / -mv.z * (.25 + .75 * t);
      vAlpha = .07 + .93 * t;
      vCor = aCor;
    }`;
  // fragment shader: pinta cada ponto como um círculo com borda suave
  const fragmentShader = `
    varying float vAlpha;
    varying vec3 vCor;
    void main() {
      float d = length(gl_PointCoord - .5);
      if (d > .5) discard;
      gl_FragColor = vec4(vCor, vAlpha * smoothstep(.5, .38, d));
    }`;

  const estrela = new THREE.Points(geo, new THREE.ShaderMaterial({
    uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false,
  }));
  scene.add(estrela);

  // poeira de fundo: pontos pequenos e fracos espalhados, dão sensação de profundidade (imersão)
  const poeiraPos = [];
  for (let i = 0; i < 700; i++) poeiraPos.push((Math.random() - .5) * 40, (Math.random() - .5) * 26, -6 - Math.random() * 22);
  const poeiraGeo = new THREE.BufferGeometry();
  poeiraGeo.setAttribute("position", new THREE.Float32BufferAttribute(poeiraPos, 3));
  const poeira = new THREE.Points(poeiraGeo, new THREE.PointsMaterial({
    color: new THREE.Color(cssVar("--muted")), size: .06, transparent: true, opacity: .45, depthWrite: false,
  }));
  scene.add(poeira);

  // ---------- 3. a rolagem vira progresso (0 a 1) ----------
  let alvoProgresso = reduced ? 1 : 0, progresso = alvoProgresso;
  function lerRolagem() {
    const r = intro.getBoundingClientRect();
    const total = intro.offsetHeight - innerHeight;
    alvoProgresso = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
  }
  addEventListener("scroll", lerRolagem, { passive: true });

  // mouse / dedo: a estrela vira um pouco na direção do ponteiro
  let mx = 0, my = 0;
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // em telas estreitas (celular em pé), afasta a câmera para a estrela caber na largura
    camera.position.z = w / h < .8 ? DIST / (w / h / .8) : DIST;
    camera.updateProjectionMatrix();
    uniforms.uEscala.value = h * dpr / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  }
  addEventListener("resize", resize);

  // pausa o desenho quando a abertura sai da tela (economiza bateria)
  let visivel = true;
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; }).observe(intro);

  // ---------- 4. o loop de animação ----------
  const relogio = new THREE.Clock();
  function quadro() {
    const t = relogio.getElapsedTime();
    lerRolagem(); // lê a rolagem a cada quadro (mais confiável que depender só do evento "scroll")
    progresso += (alvoProgresso - progresso) * .08; // suaviza: o progresso "persegue" a rolagem
    uniforms.uProgresso.value = progresso;
    uniforms.uTempo.value = t;
    intro.style.setProperty("--p", progresso.toFixed(3)); // o CSS usa para o brilho e os textos

    // começa de lado e girada; termina de frente para a pessoa
    const resto = 1 - progresso;
    estrela.rotation.y = resto * 1.1 + mx * .5;
    estrela.rotation.x = resto * -.5 + my * .35;
    estrela.rotation.z = resto * .9 + t * .02;
    estrela.scale.setScalar(.75 + .25 * progresso);
    // no último trecho, sobe um pouco para abrir espaço para a frase embaixo
    const fim = Math.min(1, Math.max(0, (progresso - .75) / .25));
    estrela.position.y = fim * fim * (3 - 2 * fim) * 1.3;
    poeira.rotation.y = t * .01 + mx * .08;
    poeira.rotation.x = my * .05;

    renderer.render(scene, camera);
  }
  resize();
  lerRolagem();
  if (reduced) { quadro(); addEventListener("resize", quadro); return; }
  (function loop() { if (visivel) quadro(); requestAnimationFrame(loop); })();

  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
})();
