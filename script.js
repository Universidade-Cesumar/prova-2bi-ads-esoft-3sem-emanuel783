var url = "https://6a29e84cf59cb8f65f1dc0ee.mockapi.io/api/v1/Materiais";

// valida se a retirada é possivel
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
}

function carregarMateriais() {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    var tabela = document.getElementById("lista-materiais");
    tabela.innerHTML = "";

    data.forEach(function(item) {
      tabela.innerHTML += "<tr>" +
        "<td>" + item.id + "</td>" +
        "<td>" + item.nome + "</td>" +
        "<td>" + item.quantidade + "</td>" +
        "<td>" +
          "<button class='btn-baixar' onclick='retirar(" + item.id + ", " + item.quantidade + ")'>Retirar</button>" +
          "<button class='btn-excluir' onclick='excluir(" + item.id + ")'>Excluir</button>" +
        "</td>" +
      "</tr>";
    });
  });
}

document.getElementById("btn-cadastrar").onclick = function() {
  var nome = document.getElementById("input-nome").value;
  var qtd = document.getElementById("input-quantidade").value;

  if(nome == "" || qtd == "") {
    alert("preencha os campos");
    return;
  }

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
  });
}

function retirar(id, estoqueAtual) {
  var qtdRetirar = document.getElementById("input-retirada").value;
  qtdRetirar = Number(qtdRetirar);

  if(qtdRetirar == "" || qtdRetirar == 0) {
    alert("informe a quantidade a retirar");
    return;
  }

  // usa a funcao de validacao
  if(!validarRetirada(estoqueAtual, qtdRetirar)) {
    alert("quantidade invalida! verifique o estoque disponivel");
    return;
  }

  var novaQtd = estoqueAtual - qtdRetirar;

  fetch(url + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantidade: novaQtd })
  })
  .then(res => res.json())
  .then(function() {
    document.getElementById("input-retirada").value = "";
    carregarMateriais();
  });
}

function excluir(id) {
  if(!confirm("tem certeza que quer excluir?")) {
    return;
  }

  fetch(url + "/" + id, {
    method: "DELETE"
  })
  .then(function() {
    carregarMateriais();
  });
}