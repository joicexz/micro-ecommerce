//Importa a biblioteca gRPC para criar o arquivo .proto
const grpc = require('@grpc/proto-loader');

//Importa a biblioteca para carregar o arquivo .proto
const protoLoader = require('@grpc/proto-loader');

//Carrega e processa o arquivo shipping.proto, que define o serviço e as mensagens
const packageDefinition = protoLoader.loadSync('proto/shipping.proto', {
    keepCase: true, //Mantém os nomes dos campos como estão no .proto
    longs: String, //Converte tipos longos para String
    enums: String, //Converte enums para String
    arrays: true //Interpreta campos repeated como arrays
});

//Carrega o pacote grpc com base na definição
const shippingProto = grpc.loadPackeageDefinition(packageDefinition);

//Cria uma nova instância do servidor grpc
const server = new grpc.Server();

//Adiciona o serviço ShippingService ao servidor, implementando o método GetShippingRate
server.addService(shippingProto.ShippingService.service, {
    //Implementação da função GetShippingRate
    //Simula um valor de frete gerando um número entre 1 e 100
    GetShippingRate: (_, callback) => {
        const shippingValue = Math.random() * 100 + 1; // Valor aleatório de R$1 a R$100

        //Retorna o valor do frete ao cliente via callback
        callback(null, {
            value: shippingValue,
        });
    },
});

//Define a porta e endereço onde o servidor grpc ficará escutando (0.0.0.0 permite conexões externas)
server.bindAsync('0.0.0.0:3001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Shipping Service running at http:127.0.0.1:3001');
    server.start(); //Inicia o servidor
});