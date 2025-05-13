//Importa a biblioteca gRPC para criar o arquivo .proto
const grpc = require('@grpc/proto-loader');

//Importa a biblioteca para cerrgar o arquivo .proto
const protoLoader = require('@grpc/proto-loader');

//Carrega e processa o arquivo shipping.proto, que define o serviço e as mensagens
const packageDefinition = protoLoader.loadSync('proto/shipping.proto', {
    keepCase: true, //Mantém os nomes dos campos como estão no .proto
    longs: String, //Converte tipos longos para String
    enums: String, //Converte enums para String
    arrays: true //Interpreta campos repeated como arrays
});

//Cria o cliente gRPC a partir da definição de serviço carregada
const ShippingService = grpc.loadPackeageDefinition(packageDefinition).ShippingService;

//Instancia o cliente gRPC conectado ao serviço de frete na porta 3001
const client = new ShippingService('127.0.0.1:3001', grpc.credentials.createInsecure());
