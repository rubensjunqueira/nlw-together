<h1 align="center">Nlw-together - Valoriza</h1>

## 💻 Projeto
Projeto criado a partir das aulas do programa Next Level Week ([Rocketseat](https://rocketseat.com.br)). Valoriza é uma [API](https://pt.wikipedia.org/wiki/Interface_de_programa%C3%A7%C3%A3o_de_aplica%C3%A7%C3%B5es) com o intuito de promover o reconhecimento entre companheiro de equipe, nela é possível realizar o cadastro de usuários, autenticação, cadastro de tags e de elogios 😁.

## 🚀 Como executar
 1. Clone o projeto
 ```
    git clone https://github.com/rubensjunqueira/nlw-together.git
 ```
 2. Entre na pasta do projeto
 ```
    cd nlw-together
 ```
 3. Instale as dependências
 ```
    yarn
 ```
 4. Execute as *migrations* para criar as tabelas no banco de dados
 ```
    yarn typeorm migration:run
 ```
 5. Inicie a aplicação
 ```
    yarn dev
 ```

 A aplicação estará disponível em http://localhost:3000

 ## 🔥 Tecnologias
 Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [JSONWebToken](https://github.com/auth0/node-jsonwebtoken#readme)
- [SQLite](https://www.sqlite.org/index.html)
- [Typeorm](https://typeorm.io/#/)