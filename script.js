// variaveis

const videoDescricao = document.getElementById("videoDescricao");
const tituloDescricao = document.getElementById("tituloDescricao");
const textoDescricao = document.getElementById("textoDescricao");
const containerDescricao = document.getElementById("containerDescricao");

const trackServicos = document.getElementById("trackServicos");
const boxServicos = document.querySelectorAll(".boxServicos");
const setaEsquerda = document.querySelector(".angleLeft");
const setaDireita = document.querySelector(".angleRight");
const totalItems = trackServicos.children.length;

const setaEsquerdaDescricao = document.querySelector(".setaEsquerdaDescricao");
const setaDireitaDescricao = document.querySelector(".setaDireitaDescricao");

let indice = 0;
let startX = 0;
let movedX = 0;
let isDragging = false;
let descricaoAberta = false;

// conteudo descricao

const conteudoDescricao = [
  {
    titulo: "Projeto elétrico e eletrônico",
    descricao: `• Projetos elétricos para controle e supervisão de máquinas;\n
    • Contemplamos as normas brasileiras.\n• Projetos elétricos elaborados em EPLAN.\n
    • Projetos eletrônicos elaborados em Proteus.\n• Circuitos com tecnologia RISC, ASIC, CMOS, TTL e HCMOS.\n
    • Layout com componentes DIP ou SMD.\n• Nacionalização de placas importadas.\n
    • Projeto e controle com circuitos dedicados para máquinas OEM.`,
    video: "https://i.imgur.com/muZtvRK.mp4",
  },
  {
    titulo: "Software para CLP, IHM, supervisório e rastreabilidade",
    descricao: `• Malhas acima de 10.000 pontos.\n
    • Linguagens de programação IL, STL, ST, FB, Ladder e Grafcet.\n
    • Sistemas de controle tipo PID, Fuzzy Logic ou Fuzzy Neural.\n
    • Desenvolvimento de software para PLC, IHM e robô com as principais marcas do mercado como Rockwell, Siemens, Schneider, Omron, Fanuc, Kuka, Epson, Wago, Delta, Rexroth, Keyence e outros.\n
    • Documentações padronizadas.\n
    • Supervisão de máquinas, produção e outros.\n
    • Rastreabilidade de peças produzidas.\n
    • Armazenamento com banco de dados SQL, Oracle, dBase e Cloud.\n
    • Desenvolvimento em software supervisório, LabVIEW, C/C++, C#, .NET, Java e Python.\n
    • Sistema operacional Windows, Windows Server, Linux ou embarcado.`,
    video: "https://i.imgur.com/bc0NlmN.mp4",
  },
  {
    titulo: "Hardware dedicado de supervisão",
    descricao: `• Projetos elétricos para controle e supervisão de máquinas.\n
    • Contemplamos as normas brasileiras.\n
    • Projetos elétricos elaborados em EPLAN.\n
    • Projetos eletrônicos elaborados em Proteus.\n
    • Circuitos com tecnologia RISC, ASIC, CMOS, TTL e HCMOS.\n
    • Layout com componentes DIP ou SMD.\n
    • Nacionalização de placas importadas.\n
    • Projeto e controle com circuitos dedicados para máquinas OEM.`,
    video: "https://i.imgur.com/Lt4pTNE.mp4",
  },
  {
    titulo: "Retrofitting de máquinas industriais",
    descricao: `• Reforma total de máquinas no sistema de controle e acionamento.\n
    • Otimização de processo e controle de máquinas para aumento de produtividade.\n
    • Inclusão de sistema para manutenção remota e preventiva nas máquinas.`,
    video: "https://i.imgur.com/maHs8lE.mp4",
  },
  {
    titulo: "Manutenção eletroeletrônica",
    descricao: `• Realizamos visitas de manutenção preventiva e corretiva em serviços de hardware e software.\n
    • Assistências remotas procurando auxiliar o pessoal da manutenção nos eventos diários e emergenciais.\n
    • Equipe especializada pronta a atender, reduzir e solucionar os problemas de manutenção.`,
    video: "https://i.imgur.com/Ck7tdWT.mp4",
  },
  {
    titulo: "Desenvolvimento de máquinas industriais especiais",
    descricao: `• Desenvolvemos projetos e equipamentos para operações específicas com o objetivo de atender às necessidades de cada processo produtivo.\n
    • Realizamos a montagem elétrica e mecânica, instalação com hardware e sistemas integrados.\n
    • Efetuamos as orientações necessárias aos funcionários que irão operar a máquina.`,
    video: "https://i.imgur.com/11v7pv3.mp4",
  },
];

// imagem muda conforme a tela

function setVideoSource() {
  const video = document.getElementById("videoHeader");
  const source = document.getElementById("source");

  if (window.innerWidth <= 480) {
    source.src = "https://i.imgur.com/6qA95Ww.mp4";
  } else {
    source.src = "";
  }

  video.load();
}

window.addEventListener("load", setVideoSource);
window.addEventListener("resize", setVideoSource);

// Carrossel

function getItensVisiveis() {
  if (window.innerWidth <= 768 || descricaoAberta) {
    return 1;
  }
  return 3;
}

function tamanhoRealdoBoxServicos() {
  return boxServicos[0].getBoundingClientRect().width;
}

function carrossel() {
  const larguraBoxServicos = tamanhoRealdoBoxServicos();
  const itensVisiveis = getItensVisiveis();
  const maxIndice = boxServicos.length - itensVisiveis;

  if (indice < 0) indice = 0;
  if (indice > maxIndice) indice = maxIndice;

  const quantoVaiParaOLado = larguraBoxServicos * indice;
  trackServicos.style.transform = `translateX(-${quantoVaiParaOLado}px)`;

  setaEsquerda.style.opacity = indice === 0 ? "0.3" : "1";
  setaEsquerda.style.pointerEvents = indice === 0 ? "none" : "auto";

  setaDireita.style.opacity = indice === maxIndice ? "0.3" : "1";
  setaDireita.style.pointerEvents = indice === maxIndice ? "none" : "auto";

  setaEsquerdaDescricao.style.opacity = indice === 0 ? "0.3" : "1";
  setaEsquerdaDescricao.style.pointerEvents = indice === 0 ? "none" : "auto";

  setaDireitaDescricao.style.opacity = indice === maxIndice ? "0.3" : "1";
  setaDireitaDescricao.style.pointerEvents =
    indice === maxIndice ? "none" : "auto";
}

// Touch

trackServicos.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

trackServicos.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  movedX = e.touches[0].clientX - startX;
});

trackServicos.addEventListener("touchend", () => {
  if (!isDragging) return;

  const threshold = window.innerWidth * 0.01;
  const maxIndice = boxServicos.length - getItensVisiveis();

  if (movedX < -threshold && indice < maxIndice) {
    indice++;
  } else if (movedX > threshold && indice > 0) {
    indice--;
  }

  carrossel();
  atualizarDescricao(indice);

  isDragging = false;
  movedX = 0;
});

// move o carrosel a cada 10 segundos e para se o mouse estiver em cima
let intervalo = iniciarIntervalo();

function iniciarIntervalo() {
  return setInterval(() => {
    const maxIndice = boxServicos.length - getItensVisiveis();
    indice = indice < maxIndice ? indice + 1 : 0;
    carrossel();
    atualizarDescricao(indice);
  }, 10000);
}

function pausarIntervalo() {
  clearInterval(intervalo);
  intervalo = null;
}

function retomarIntervalo() {
  if (intervalo === null) {
    intervalo = iniciarIntervalo();
  }
}

trackServicos.addEventListener("mouseenter", pausarIntervalo);
trackServicos.addEventListener("mouseleave", retomarIntervalo);

containerDescricao.addEventListener("mouseenter", pausarIntervalo);
containerDescricao.addEventListener("mouseleave", retomarIntervalo);

// setas serviços

setaEsquerda.addEventListener("click", () => {
  indice--;
  if (indice < 0) indice = conteudoDescricao.length - 1;

  carrossel();
  atualizarDescricao(indice);
});

setaDireita.addEventListener("click", () => {
  indice++;
  if (indice >= conteudoDescricao.length) indice = 0;

  carrossel();
  atualizarDescricao(indice);
});

// seta descriçao

setaEsquerdaDescricao.addEventListener("click", () => {
  indice--;
  if (indice < 0) indice = conteudoDescricao.length - 1;

  carrossel();
  atualizarDescricao(indice);
});

setaDireitaDescricao.addEventListener("click", () => {
  indice++;
  if (indice >= conteudoDescricao.length) indice = 0;

  carrossel();
  atualizarDescricao(indice);
});

// atualiza descriçao

function atualizarDescricao(index) {
  const servico = conteudoDescricao[index];

  tituloDescricao.textContent = servico.titulo;

  // Divide a descrição por quebra de linha e envolve em <p>
  const paragrafos = servico.descricao
    .split("\n")
    .map((linha) => `<p>${linha.trim()}</p>`)
    .join("");

  textoDescricao.innerHTML = paragrafos;
  videoDescricao.src = servico.video;
}

// descricao abre

const caixote = document.querySelectorAll(".caixote");

caixote.forEach((box, index) => {
  box.addEventListener("click", () => {
    indice = index;
    descricaoAberta = true;

    atualizarDescricao(index);
    containerDescricao.style.display = "flex";

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");

      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });
    deixaPretoViewport();
    atualizarFlexBoxes();
    carrossel();
  });
});

// fecha descrição
const fecharDescricao = document.getElementById("fecharDescricao");

fecharDescricao.addEventListener("click", () => {
  containerDescricao.style.display = "none";
  descricaoAberta = false;

  caixote.forEach((item) => {
    const botao = item.querySelector(".botaoSaibaMais");
    const frase = item.querySelector(".fraseServicos");
    if (botao) botao.style.display = "block";
    if (frase) frase.style.display = "block";
  });
  deixaPretoViewport();
  atualizarFlexBoxes();
  carrossel();
});

// funcao muda flex com base na tela

function atualizarFlexBoxes() {
  const largura = window.innerWidth;

  boxServicos.forEach((box) => {
    if (largura <= 768 || descricaoAberta) {
      box.style.flex = "0 0 100%";
    } else {
      box.style.flex = "0 0 calc(100% / 3)";
    }
  });
}
// funcao deixa preto o viewport
const viewport = document.getElementById("viewportServicos");

function deixaPretoViewport() {
  const largura = window.innerWidth;

  if (largura < 768) {
    viewport.style.background = descricaoAberta
      ? "rgba(10, 25, 45, 0.7)"
      : "black";
  } else if (largura < 1024) {
    viewport.style.background = descricaoAberta
      ? "linear-gradient(to bottom, rgb(111, 7, 7), #212121)"
      : "black";
  }
}
// mostra o conteudo em 1024px width

window.addEventListener("load", () => {
  if (window.innerWidth >= 1024 && !descricaoAberta) {
    descricaoAberta = true;
    containerDescricao.style.display = "flex";
    atualizarDescricao(indice);
    atualizarFlexBoxes();
    carrossel();

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");

      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });
  }
});

// responsivo

window.addEventListener("resize", () => {
  const maxIndice = boxServicos.length - getItensVisiveis();
  if (indice > maxIndice) {
    indice = maxIndice;
  }
  carrossel();
});

window.addEventListener("resize", () => {
  const largura = window.innerWidth;

  // Se aumentou para >= 1024px e a descrição ainda não estiver aberta
  if (largura >= 1024 && !descricaoAberta) {
    descricaoAberta = true;
    containerDescricao.style.display = "flex";
    atualizarDescricao(indice);

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");

      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });
  }

  atualizarFlexBoxes();

  const maxIndice = boxServicos.length - getItensVisiveis();
  if (indice > maxIndice) {
    indice = maxIndice;
  }

  carrossel();
});

// funcoes
