var url = "https://6a29e84cf59cb8f65f1dc0ee.mockapi.io/api/v1/Materiais";

window.onload = function() {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    var tabela = document.getElementById("lista-materiais");
    data.forEach(function(item) {
      tabela.innerHTML += "<tr><td>" + item.id + "</td><td>" + item.nome + "</td><td>" + item.quantidade + "</td></tr>";
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
    location.reload();
  });
}