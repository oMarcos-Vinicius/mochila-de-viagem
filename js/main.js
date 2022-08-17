const formulario = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
var itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elementos) => {
    criaElemento(elementos);
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    console.log(existe);
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);
        //Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        //itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        if (itens[itens.length - 1]) {
            itemAtual.id = itens[itens.length - 1].id + 1
        } else {
            itemAtual.id = 0
        }

        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    var novoItem = document.createElement('li');
    novoItem.classList.add('item')
    var numeroItem = document.createElement('strong');
    numeroItem.dataset.id = item.id;
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id)); // Referenciar a função botaoDeleta no nó da função principal
    lista.appendChild(novoItem);
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}