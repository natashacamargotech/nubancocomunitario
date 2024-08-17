# nubancocomunitario
Projeto desenvolvido como parte da Imersão Java Script do {Reprograma}.
 O sistema permite gerenciar clientes, contas bancárias e gerentes, com funcionalidades para adicionar, remover e modificar contas de clientes.

 
1. Clone o repositório:

    ```bash
    git clone git@github.com:natashacamargotech/nubancocomunitario.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd nubancocomunitario
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run start:dev
```

## Teste
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov


## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **NestJS**: Framework para construção de aplicações Node.js eficientes e escaláveis.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento de dados.
- **TypeORM**: ORM (Object-Relational Mapping) utilizado para interagir com o banco de dados de forma simplificada.


XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

## Hexagonal Simplificada

A arquitetura hexagonal divide a aplicação em três partes principais:

1. **Application**: Define os casos de uso e as interações entre o domínio e o mundo externo.
2. **Domain**: Contém as regras de negócio e a lógica principal da aplicação.
3. **Infrastructure**: Implementa os adaptadores e interfaces para comunicação com sistemas externos, como bancos de dados, APIs, etc.

