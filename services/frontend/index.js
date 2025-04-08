//Função para criar e retornar um elemento HTML representando um produto
function newBook(book) {
    //Cria uma div para o livro e adiciona a classe de coluna
    const div = document.createElement('div');
    div.className = 'column is-4';

    //Define o conteúdo HTML interno da div com os dados do livro
    div.innerHTML = `
    <div class="card is-shady">
        <div class="card-image">
            <figure class="image is-4by3">
                <img
                     src="${book.photo}" //Imagem do produto
                     alt="${book.name}" //Texto alternativo do produto
                     class="modal-button"
                />
            </figure>
        </div>

        <div class="card-content">
            <div class="content book" data-id="${book.id}"> //Armazena o ID do livro
                <div class="book-meta">
                    <p class="is-size-4">R$${book.price.toFixed(2)}</p>
                    //Preço formatado 
                    <p class="is-size-6"> Disponível em estoque: 5</p> //Quantidade fictícia 
                    <h4 class="is-size-3 tittle">${book.name}</h4> //Nome do produto
                    <p class="subtitle">${book.author}</p> //Autor 
                </div>

                <div class="field has-addons>
                    <div class="control">
                        <input class="input" type="text" placeholder="Digite o CEP"/>
                    </div>

                    <div class="control">
                        <a class="button button-shipping is-info" data-id="${book.id}"> Calcular Frete </a>
                    </div>
                </div>

                <button class="button button-buy is-fullwidth">Comprar</button>

            </div>
        </div>
    </div>`;

    //Retorna o elemento montado
    return div;
}

//Função para calcular o frete com base no ID do livro e no CEP
function calculateShipping(id, cep) {
    fetch('http://localhost:3000/shipping' + cep) //Faz requisição para a API de frete
        .then((data) => {
            if (data.ok) {
                return data.json(); //Converte a resposta para JSON se estiver ok
            }
            throw data.json(); //Caso contrário, lança erro
        })
        .then((data) => {
            //Mostra o valor do frete
            swal('Frete', `O frete é: R$${data.value.toFixed(2)}`, 'sucess');
        })
        .catch((err) => {
            //Mostra erro se a requisição falhar
            swal('Erro', 'Erro as consultar frete', 'error');
            console.log(err);
        });
}

//Aguarda o carregamento completo do DOM