# nubancocomunitario
Projeto desenvolvido como parte da Imersão Java Script do {Reprograma},desenvolvido com NestJS.
 O sistema permite gerenciar clientes, contas bancárias e gerentes, com funcionalidades para adicionar, remover e modificar contas e clientes.

 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Objetivos de aprendizagem do desafio 🎯
Explorar práticas recomendadas para criar um design de código claro e eficiente
Aplicar SOLID, DRY e KISS
Implementar padrões de código PD_Factory, PD_Adapter, PD_Observer
Identificar como os padrões de design influenciam a estrutura e organização de um sistema.
{Reprograma}Bank - melhorando nossa aplicação

Nesta semana, o desafio é refatorar a aplicação desenvolvida anteriormente, aplicando práticas recomendadas para criar um design de código e eficiente. Além disso, serão aplicados os princípios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion), DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid) e alguns padrões de design, como Factory, Adapter e Observer.

Requisitos de negócio:
Adicionar a capacidade de realizar pagamentos de contas por PIX ou número de boleto.
O cliente deve possuir saldo em conta ou limite no cheque especial para efetuar a transação.
Sugestão de Estrutura de Pastas:

reprograma-bank/
├── src/
│   ├── controllers/
│   │   └── xxxController.ts
│   ├── models/
│   │   └── xxxModel.ts
│   ├── routes/
│   │   └── xxxRoutes.ts
│   ├── services/
│   │   └── xxxService.ts
│   └── index.ts
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md

Na estrutura sugerida:
src/controllers/: Contém os controladores para manipular as requisições HTTP, lidando principalmente com a interação entre a API e o modelo de dados.
src/models/: Armazena os modelos de dados das entidades Cliente, Gerente e Conta, representando a estrutura de dados da aplicação.
src/routes/: Define as rotas da API para cada entidade, mapeando as solicitações HTTP para as funções correspondentes nos controladores.
src/services/: Armazena os serviços responsáveis por implementar a lógica de negócios da aplicação, mantendo a separação de responsabilidades e facilitando a reutilização do código.
src/index.ts: Arquivo principal que inicializa o servidor e conecta-se ao banco de dados, fornecendo a entrada para a aplicação.
Material
[Semana 4] - Repositório Github 💻
Última edição: 9 de jul.
Material
[Semana 4] - Gravações 🎥
1

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 
## Instalação
$ npm install

## Execução

$ npm run start


$ npm run start:dev

## Teste
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov


