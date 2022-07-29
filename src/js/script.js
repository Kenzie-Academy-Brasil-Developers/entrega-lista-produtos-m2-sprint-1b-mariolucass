// seu código aqui
// li img h3 span p
// Declaração de obtenção de elementos atraves do DOM.
let secaoProdutos = document.getElementById("listaproduct");
let tagValorTotal = document.querySelector(".priceContainer span");
let botoesFiltrar = document.getElementById("botoesContainer");
let inputSearch = document.querySelector(".containerBuscaPorNome input");
let inputButton = document.querySelector(".containerBuscaPorNome button");

function listproducts(array) {
  array.forEach(function (element) {
    let nome = element.nome;
    let preco = element.preco;
    let secao = element.secao;
    let img = element.img;
    let tagLi = document.createElement("li");
    let tagImg = document.createElement("img");
    let tagName = document.createElement("h3");
    let tagSecaoProduto = document.createElement("span");
    let tagPreco = document.createElement("p");

    tagImg.src = img;
    tagName.innerText = nome;
    tagPreco.innerText = `R$${preco}.00`;
    tagSecaoProduto.innerText = secao;

    secaoProdutos.append(tagLi);
    tagLi.append(tagImg, tagName, tagSecaoProduto, tagPreco);
  });
  let valorSecao = produtos.reduce(
    (acc, itemAtual) => acc + itemAtual.preco,
    0
  );
  tagValorTotal.innerText = `R$ ${valorSecao}.00`;
}

listproducts(produtos);

//
botoesFiltrar.addEventListener("click", filtrarSecao);
function filtrarSecao(event) {
  let produtosHortifruti = produtos.filter(function (element) {
    return element.secao == "Hortifruti";
  });
  let produtosLaticinio = produtos.filter(function (element) {
    return element.secao == "Laticínio";
  });
  let produtosPanificadora = produtos.filter(function (element) {
    return element.secao == "Panificadora";
  });
  let botaodasecao = event.target;
  if (botaodasecao.tagName == "BUTTON") {
    secaoProdutos.innerHTML = "";
    if (botaodasecao.id == "Hortifruti") {
      let valorSecao = produtosHortifruti.reduce(
        (acc, itemAtual) => acc + itemAtual.preco,
        0
      );
      listproducts(produtosHortifruti);
      tagValorTotal.innerText = `R$ ${valorSecao}.00`;
    } else if (botaodasecao.id == "Laticínios") {
      let valorSecao = produtosLaticinio.reduce(
        (acc, itemAtual) => acc + itemAtual.preco,
        0
      );
      listproducts(produtosLaticinio);
      tagValorTotal.innerText = `R$ ${valorSecao}.00`;
    } else if (botaodasecao.id == "Panificadora") {
      let valorSecao = produtosPanificadora.reduce(
        (acc, itemAtual) => acc + itemAtual.preco,
        0
      );
      listproducts(produtosPanificadora);
      tagValorTotal.innerText = `R$ ${valorSecao}.00`;
    } else if (botaodasecao.id == "Allproducts") {
      let valorSecao = produtos.reduce(
        (acc, itemAtual) => acc + itemAtual.preco,
        0
      );
      listproducts(produtos);
      tagValorTotal.innerText = `R$ ${valorSecao}.00`;
    }
  }
}

// let arrayyy = [
//   {
//     preco: 20,
//     calor: 30,
//   },
// ];

// let testereduce = arrayyy.reduce((acc, itemAtual) => acc + itemAtual.preco, 0);

// console.log(testereduce);
