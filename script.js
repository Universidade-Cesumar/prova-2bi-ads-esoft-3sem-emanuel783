var url = "https://6a29e84cf59cb8f65f1dc0ee.mockapi.io/api/v1/Materiais";

var todosMateriais = [];

function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if(quantidadeRetirada <= 0) {
    return false;
  }
  if(quantidadeRetirada > estoqueAtual) {
    return false;
  }
  return true;
}

window.onload = function() {
  carregarMateriais();

  document.getElementById("input-busca").onkeyup = function() {
    var busca = this.value.toLowerCase();
    var filtrados = todosMateriais.filter(function(item) {
      return item.nome.toLowerCase().includes(busca);
    });
    renderizarTabela(filtrados);
  }
}

function carregarMateriais() {
  try {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      todosMateriais = data;
      renderizarTabela(data);
    })
    .catch(err => {
      console.log("erro ao carregar:", err);
      alert("erro ao carregar os materiais. verifique sua conexao");
    });
  } catch(err) {
    console.log("erro:", err);
  }
}

function renderizarTabela(lista) {
  var tabela = document.getElementById("lista-materiais");
  tabela.innerHTML = "";

  document.getElementById("total-itens").textContent = lista.length;

  lista.forEach(function(item) {
    var linha = "<tr";
    if(item.quantidade < 10) {
      linha += " class='estoque-critico'";
    }
    linha += ">" +
      "<td>" + item.id + "</td>" +
      "<td>" + item.nome + "</td>" +
      "<td>" + item.quantidade + "</td>" +
      "<td>" +
        "<button class='btn-baixar' onclick='retirar(" + item.id + ", " + item.quantidade + ")'>Retirar</button>" +
        "<button class='btn-excluir' onclick='excluir(" + item.id + ")'>Excluir</button>" +
      "</td>" +
    "</tr>";
    tabela.innerHTML += linha;
  });
}

document.getElementById("btn-cadastrar").onclick = function() {
  var nome = document.getElementById("input-nome").value;
  var qtd = document.getElementById("input-quantidade").value;

  if(nome == "" || qtd == "") {
    alert("preencha os campos");
    return;
  }

  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, quantidade: qtd })
    })
    .then(res => res.json())
    .then(function() {
      document.getElementById("input-nome").value = "";
      document.getElementById("input-quantidade").value = "";
      carregarMateriais();
    })
    .catch(err => {
      console.log("erro ao cadastrar:", err);
      alert("erro ao cadastrar. tente novamente");
    });
  } catch(err) {
    console.log("erro:", err);
  }
}

function retirar(id, estoqueAtual) {
  var qtdRetirar = document.getElementById("input-retirada").value;
  qtdRetirar = Number(qtdRetirar);

  if(qtdRetirar == "" || qtdRetirar == 0) {
    alert("informe a quantidade a retirar");
    return;
  }

  if(!validarRetirada(estoqueAtual, qtdRetirar)) {
    alert("quantidade invalida! verifique o estoque disponivel");
    return;
  }

  var novaQtd = estoqueAtual - qtdRetirar;

  try {
    fetch(url + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidade: novaQtd })
    })
    .then(res => res.json())
    .then(function() {
      document.getElementById("input-retirada").value = "";
      carregarMateriais();
    })
    .catch(err => {
      console.log("erro ao retirar:", err);
      alert("erro ao atualizar o estoque");
    });
  } catch(err) {
    console.log("erro:", err);
  }
}

function excluir(id) {
  if(!confirm("tem certeza que quer excluir?")) {
    return;
  }

  try {
    fetch(url + "/" + id, {
      method: "DELETE"
    })
    .then(function() {
      carregarMateriais();
    })
    .catch(err => {
      console.log("erro ao excluir:", err);
      alert("erro ao excluir o material");
    });
  } catch(err) {
    console.log("erro:", err);
  }
}
