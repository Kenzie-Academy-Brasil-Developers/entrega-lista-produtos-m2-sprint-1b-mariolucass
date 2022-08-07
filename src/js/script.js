// seu código aqui
// li img h3 span p

// Declaração de obtenção de elementos atraves do DOM.

let listaProdutos = document.getElementById("lista__product");
let botoesFiltrar = document.getElementById("botoesContainer");
let cartList = document.getElementById("cart__list");
let tagValorTotal = document.querySelector(".cart__value span");
let tagQtdeTotal = document.querySelector(".cart__value p");
let qtdeTotal = document.querySelector(".quantidades");
let inputSearch = document.querySelector(".containerBuscaPorNome input");
let inputButton = document.querySelector(".containerBuscaPorNome button");
let carrinhoVazio = document.querySelector(".cart__empty");

//Criar cards

function createCard(element, secao) {
  let tagLi = document.createElement("li");
  let tagImg = document.createElement("img");
  let tagName = document.createElement("h3");
  let tagSecaoProduto = document.createElement("span");
  let tagComponentes = document.createElement("span");
  let tagPreco = document.createElement("p");
  let tagButton = document.createElement("button");
  let tagQuantidade = document.createElement("span");

  tagImg.src = element.img;
  tagButton.id = element.id;
  tagName.innerText = element.nome;
  tagSecaoProduto.innerText = element.secao;
  tagPreco.innerText = `R$${element.preco}`;

  if (secao == listaProdutos) {
    tagButton.innerText = "Adicionar ao carrinho.";
    tagButton.addEventListener("click", addToCart);
    tagComponentes.innerText = `${element.componentes}`;
    tagSecaoProduto.classList.add("card__secao");
  } else {
    tagValorTotal.innerText = `R$ ${somaCarrinho(arrayCart)}`;
    tagButton.innerText = "Remover";
    tagButton.addEventListener("click", removeToList);
    tagQuantidade.innerText = `Quantidade: ${element.quantidade}`;
  }

  tagComponentes.classList.add("card__components");

  if (secao == listaProdutos) {
    tagLi.append(
      tagImg,
      tagName,
      tagComponentes,
      tagSecaoProduto,
      tagPreco,
      tagButton
    );
  } else {
    tagLi.append(
      tagImg,
      tagName,
      tagSecaoProduto,
      tagPreco,
      tagQuantidade,
      tagButton
    );
  }

  return tagLi;
}

//Listar Produtos

function listproducts(array, secao) {
  secao.innerHTML = "";
  array.forEach((element) => secao.append(createCard(element, secao)));
}
listproducts(produtos, listaProdutos);

//Filtrar SecaoProdutos

botoesFiltrar.addEventListener("click", filtrarSecao);
//Callback
function filtrarSecao(event) {
  let produtosHortifruti = produtos.filter(function (element) {
    return element.secao == "Hortifruti";
  });
  let produtosLaticinio = produtos.filter(function (element) {
    return element.secao == "Laticinio";
  });
  let produtosPanificadora = produtos.filter(function (element) {
    return element.secao == "Panificadora";
  });

  let botaodasecao = event.target;
  if (botaodasecao.tagName == "BUTTON") {
    listaProdutos.innerHTML = "";
    if (botaodasecao.id == "Hortifruti") {
      listproducts(produtosHortifruti, listaProdutos);
    } else if (botaodasecao.id == "Laticínios") {
      listproducts(produtosLaticinio, listaProdutos);
    } else if (botaodasecao.id == "Panificadora") {
      listproducts(produtosPanificadora, listaProdutos);
    } else if (botaodasecao.id == "Allproducts") {
      listproducts(produtos, listaProdutos);
    }
  }
}

//Input Busca

inputButton.addEventListener("click", realizarBusca);
//Callback
function realizarBusca() {
  let valorDoUsuario = inputSearch.value;
  let result = buscar(valorDoUsuario);
  listproducts(result, listaProdutos);
}

//Carrinho de compras.

let arrayCart = [];
tagValorTotal.innerText = `R$ 0.00`;
qtdeTotal.innerText = `Adicione mais produtos 🛒`;

//Funções complementares

function addToCart(event) {
  let buttonClick = event.target;
  if (buttonClick.tagName == "BUTTON") {
    produtos.forEach((element) => {
      if (element.id == buttonClick.id) {
        if (arrayCart.includes(element)) {
          indexElemento = arrayCart.indexOf(element);
          arrayCart[indexElemento].quantidade += 1;
        } else {
          element.quantidade = 1;
          arrayCart.push(element);
        }
      }
    });
  }
  carrinhoVazio.innerHTML = "";
  mensagemDeProdutos(arrayCart);
  listproducts(arrayCart, cartList);
}

function removeToList(event) {
  let btnClicadoId = event.target.id;
  let acharProduto = arrayCart.find((element) => element.id == btnClicadoId);
  if (acharProduto.quantidade == 1) {
    let indexProdutoRemove = arrayCart.indexOf(acharProduto);
    arrayCart.splice(indexProdutoRemove, 1);
  } else if (acharProduto.quantidade > 1) {
    acharProduto.quantidade--;
  }

  if (arrayCart.length == 0) {
    carrinhoVazio.innerHTML = `<h3>O carrinho está vazio..</h3>
    <span>Adicione mais itens.</span>`;
  }
  mensagemDeProdutos(arrayCart);
  listproducts(arrayCart, cartList);
}

function somaCarrinho(array) {
  return array.reduce(
    (acc, itemAtual) => acc + +itemAtual.quantidade * +itemAtual.preco,
    0
  );
}

function somaQtdes(array) {
  return array.reduce((acc, itemAtual) => acc + +itemAtual.quantidade, 0);
}

function acharQuantidade(array) {
  array.find((element) => element.quantidade > 1);
}

function mensagemDeProdutos(array) {
  tagValorTotal.innerText = `R$ ${somaCarrinho(arrayCart)}`;
  qtdeTotal.innerText = `${somaQtdes(arrayCart)}`;
  if (somaQtdes(array) == 0) {
    tagValorTotal.innerText = `R$ 0.00`;
    qtdeTotal.innerText = `Adicione mais produtos. 🛒`;
  } else if (somaQtdes(array) == 1) {
    qtdeTotal.innerText = `${somaQtdes(arrayCart)} Produto.`;
  } else if (somaQtdes(array) > 1) {
    qtdeTotal.innerText = `${somaQtdes(arrayCart)} Produtos.`;
  }
}

function buscar(valor) {
  let arrBusca = [];
  produtos.forEach((element) => {
    let nomePesquisado = valor.toLowerCase();
    let nomeProduto = element.nome.toLowerCase();
    let categoriaProduto = element.secao.toLowerCase();
    if (
      nomeProduto.includes(nomePesquisado) ||
      categoriaProduto.includes(nomePesquisado)
    ) {
      arrBusca.push(element);
    }
  });
  return arrBusca;
}
