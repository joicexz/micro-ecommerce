//Importa o framework web Express para criar rotas HTTP
const express = require('express');

//Importa o cliente gRPC para o serviço de frete
const shipping = require('.shipping');

//Importa o cliente gRPC para o serviço de produtos
const inventory = require('./inventory');

//Importa middleware pra permitir requisições cross-origin (CORS)
const cors = require('cors');

//Inicializa o aplicativo Express
const app = express();

//Aplica o middleware de CORS para permitir que op frontend em outro domínio consuma a API
app.use(cors());

/*
* Retorna a lista de produtos da loja via InventoryService
 */
app.get('products', (req, res, next) => {
    //Chama o método gRPC SearchAllProducts do microsserviço de inventário
    inventory.SearchAllProducts(null, (err, data) => {
        if (err) {
            //Se houver erro, loga no console  e retorna erro HTTP 500
            console.error(err);
            res.status(500).send({ error: 'algo falhou' });
        } else {
            //Se sucesso, responde com a lista de produtos no formato JSON
            res.json(data.products);
        }
    });
});

/*
*Consulta o frete de envio no ShippingService
*/
app.get('/shipping/:cep', (req, res, next) => {
    //Chama o método gRPC GetShippingRate, passando o CEP como parametro
    shipping.GetShippingRate(
        {
            cep: req.params.cep, //Pega o cep da URL
        },
        (err, data) => {
            if (err) {
                //Em caso de erro, loga e retorna 500
                console.error(err);
                res.status(500).send({ error: 'algo falhou' });
            } else {
                //Retorna o cep consultado e o valor do frete calculado
                res.json({
                    cep: req.params.cep,
                    value: data.value,
                });
            }
        }
    );
});

/*
*Inicia o router (rotas)
*/
app.listen(3000, () => {
    console.log('Serviço de Controller rodando em http://127.0.0.1:3000');
});