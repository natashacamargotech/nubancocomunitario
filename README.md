# nubancocomunitario
Projeto desenvolvido como parte da Imersão Java Script do {Reprograma},desenvolvido com NestJS.
 O sistema permite gerenciar clientes, contas bancárias e gerentes, com funcionalidades para adicionar, remover e modificar contas e clientes.

## Instalação

1. Após o clone, navegue até o diretório do projeto:
cd nubancocomunitario

2. Instale as dependências:
npm install

## Execução

3. Para iniciar o servidor de desenvolvimento (no terminal):
npm run start:dev


### Desafio semana 3
Objetivos de aprendizagem do desafio 🎯
Entender como o TypeScript, uma linguagem de programação superset de JavaScript, se integra naturalmente ao ecossistema do Node.js.
Compreender os princípios e características de uma arquitetura RESTful.
Identificar os recursos, URIs, métodos HTTP e códigos de status comuns em uma API REST.
Aprender a projetar e implementar uma API RESTful usando Node.js, seguindo as melhores práticas de REST.
{Reprograma}Bank
Disponibilizando nossa API
Seu desafio é criar uma API RESTful para o sistema bancário desenvolvido na semana 2, agora incluindo a funcionalidade de Gerente de Conta. O Gerente é responsável por gerenciar os clientes e suas contas, podendo abrir, fechar e modificar o tipo de conta.

Abaixo estão os requisitos:
Ao cliente do banco ser adicionadas as seguintes informações:
Contas
Gerente
Gerente deve ter as seguintes informações:
Nome completo
Número de identificação (ID)
Clientes
Requisitos de negócio:
Criar classes para representar Cliente e Gerente, incluindo os atributos mencionados no diagrama.
Implementar métodos nas classes Cliente e Gerente para abrir, fechar e modificar o tipo de conta.
Atualizar a classe Conta para manter uma referência ao cliente associado a ela.
Implementar métodos na classe Gerente para adicionar e remover clientes, bem como para abrir, fechar e modificar o tipo de conta para um determinado cliente.
Organizar a estrutura do projeto de forma apropriada, seguindo as melhores práticas para uma API RESTful.

diagrama_desafio_semanal_s3.png