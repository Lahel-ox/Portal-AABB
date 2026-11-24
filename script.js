const dadosClube = {
  horarios: [
    {
      titulo: "Secretaria e Administração",
      detalhe: "Segunda a sexta: 08h às 18h • Sábado: 08h às 12h",
      observacao: "Atendimento a associados, convidados e regularizações."
    },
    {
      titulo: "Parque Aquático / Piscinas",
      detalhe: "Quinta e sexta: 09h30 às 20h00, Sábado 09h00 às 20h00 e Domingo das 09h00 às 18:30",
    observacao: ""
    },
    {
      titulo: "Quadras e Áreas Esportivas",
      detalhe: "Quinta a domingo: 08h às 20h",
      observacao: "Verifique disponibilidade prévia na secretaria/coordenação."
    },
    {
      titulo: "Quiosques e Churrasqueiras",
      detalhe: "Conforme agendamento prévio do associado",
      observacao: "Respeito aos horários de silêncio e limpeza do espaço."
    }
  ],

  avisos: [
    {
      titulo: "Acesso rápido via QR Code nos murais",
      categoria: "Operação",
      data: "Novembro / 2026",
      descricao: "Associados, visitantes e funcionários podem consultar horários, normas e contatos do clube diretamente pelo celular."
    },
    {
      titulo: "Manutenção preventiva das áreas de lazer",
      categoria: "Lazer",
      data: "Aviso contínuo",
      descricao: "Durante intervenções de limpeza ou manutenção em piscinas, quiosques e quadras, o acesso temporário pode ser ajustado pela equipe."
    },
    {
      titulo: "Atualização cadastral e convidados",
      categoria: "Secretaria",
      data: "Informativo",
      descricao: "Mantenha seus dados atualizados na secretaria para agilizar a emissão de convites e o uso dos benefícios do clube."
    }
  ],

  regras: [
    {
      titulo: "Uso das Piscinas",
      descricao: "Respeite as normas sanitárias, o uso de trajes adequados para banho e as orientações da equipe de guarda-vidas/manutenção."
    },
    {
      titulo: "Convivência e Silêncio",
      descricao: "Mantenha o volume de som moderado nas áreas comuns e quiosques para garantir o conforto de todas as famílias."
    },
    {
      titulo: "Conservação dos Espaços",
      descricao: "Descarte resíduos nas lixeiras adequadas e comunique qualquer ocorrência ou avaria à administração."
    },
    {
      titulo: "Acesso de Visitantes e Funcionários",
      descricao: "A entrada segue os critérios de identificação e autorização definidos pela gestão da AABB Goiânia."
    }
  ],

  espacos: [
    {
      titulo: "Piscinas",
      descricao: "Área aquática para lazer e descanso dos associados e familiares."
    },
    {
      titulo: "Quiosques e Churrasqueiras",
      descricao: "Espaços para confraternizações mediante agendamento e normas do clube."
    },
    {
      titulo: "Quadras e Campos",
      descricao: "Áreas destinadas à prática esportiva e recreação."
    },
    {
      titulo: "Salão e Áreas Verdes",
      descricao: "Ambientes de convivência, eventos e contato com a área arborizada."
    }
  ]
};

let categoriaAtiva = "Todos";
let termoBusca = "";

const elHorarios = document.getElementById("grade-horarios");
const elAvisos = document.getElementById("lista-avisos");
const elRegras = document.getElementById("lista-regras");
const elEspacos = document.getElementById("lista-espacos");
const elBusca = document.getElementById("campo-busca");
const btnLimpar = document.getElementById("limpar-busca");
const filtrosAvisos = document.getElementById("filtros-avisos");
const secoes = document.querySelectorAll(".secao-filtravel");

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function correspondeBusca(texto) {
  if (!termoBusca.trim()) return true;
  return normalizar(texto).includes(normalizar(termoBusca));
}

function renderHorarios() {
  const itens = dadosClube.horarios.filter((item) =>
    correspondeBusca(`${item.titulo} ${item.detalhe} ${item.observacao}`)
  );

  if (!itens.length) {
    elHorarios.innerHTML = `<p class="vazio">Nenhum horário encontrado para "${termoBusca}".</p>`;
    return;
  }

  elHorarios.innerHTML = itens
    .map(
      (item) => `
      <article class="info-box">
        <h3>${item.titulo}</h3>
        <p><strong>${item.detalhe}</strong></p>
        <p>${item.observacao}</p>
      </article>
    `
    )
    .join("");
}

function renderAvisos() {
  const itens = dadosClube.avisos.filter((item) => {
    const bateCategoria = categoriaAtiva === "Todos" || item.categoria === categoriaAtiva;
    const bateTexto = correspondeBusca(`${item.titulo} ${item.categoria} ${item.data} ${item.descricao}`);
    return bateCategoria && bateTexto;
  });

  if (!itens.length) {
    elAvisos.innerHTML = `<p class="vazio">Nenhum aviso encontrado para o filtro selecionado.</p>`;
    return;
  }

  elAvisos.innerHTML = itens
    .map(
      (item) => `
      <article class="aviso-item">
        <div class="aviso-topo">
          <span class="aviso-categoria">${item.categoria}</span>
          <span class="aviso-data">${item.data}</span>
        </div>
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      </article>
    `
    )
    .join("");
}

function renderRegras() {
  const itens = dadosClube.regras.filter((item) =>
    correspondeBusca(`${item.titulo} ${item.descricao}`)
  );

  if (!itens.length) {
    elRegras.innerHTML = `<p class="vazio">Nenhuma regra encontrada para "${termoBusca}".</p>`;
    return;
  }

  elRegras.innerHTML = itens
    .map(
      (item) => `
      <article class="info-box">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      </article>
    `
    )
    .join("");
}

function renderEspacos() {
  const itens = dadosClube.espacos.filter((item) =>
    correspondeBusca(`${item.titulo} ${item.descricao}`)
  );

  if (!itens.length) {
    elEspacos.innerHTML = `<p class="vazio">Nenhum espaço encontrado para "${termoBusca}".</p>`;
    return;
  }

  elEspacos.innerHTML = itens
    .map(
      (item) => `
      <article class="info-box">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      </article>
    `
    )
    .join("");
}

function atualizarVisibilidadeSecoes() {
  if (!termoBusca.trim()) {
    secoes.forEach((secao) => {
      secao.style.display = "";
    });
    return;
  }

  secoes.forEach((secao) => {
    const temConteudo =
      secao.querySelector(".info-box, .aviso-item") !== null || secao.id === "contatos";
    secao.style.display = temConteudo ? "" : "none";
  });
}

function renderizarTudo() {
  renderHorarios();
  renderAvisos();
  renderRegras();
  renderEspacos();
  atualizarVisibilidadeSecoes();
}

elBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarTudo();
});

btnLimpar.addEventListener("click", () => {
  termoBusca = "";
  elBusca.value = "";
  categoriaAtiva = "Todos";
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("ativo", chip.dataset.categoria === "Todos");
  });
  renderizarTudo();
});

filtrosAvisos.addEventListener("click", (e) => {
  const botao = e.target.closest(".chip");
  if (!botao) return;

  categoriaAtiva = botao.dataset.categoria;
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("ativo", chip === botao);
  });
  renderAvisos();
  atualizarVisibilidadeSecoes();
});

renderizarTudo();
