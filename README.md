<br />
<p align="center">
    <img src="./public/img/logo.png" alt="Logo" width="150">

  <h3 align="center">Pensamentos com NodeJS, Express, Sequelize e PostgreSQL</h3>
 <br />
  <p align="center">
     Pensamentos
      <p align="center">
  <a href="#sobre"> Sobre </a> |
  <a href="#conhecimentos-praticados"> Conhecimentos praticados </a> |
  <a href="#rotas-da-aplicação"> Rotas da aplicação </a> |
  <a href="#tecnologias-utilizadas"> Tecnologias utilizadas </a>      
       <br />
    <br />
    <h1 align="center">
    <img src="./readme/pensamentos.gif" alt="gif-readme">
 </h1>
  </p>
</p>


# Sobre
O objetivo do projeto foi criar um sistema para compartilhar Pensamentos, com a finalidade de colocar em prática os meus conhecimentos em Express, Autenticação, Sequelize e MVC.

Na aplicação é possível cadastrar um usuário, logar com um usuário, visualizar todos os pensamentos enviados outros usuários, visualizar os pensamentos enviados pelo próprio usuário e adicionar, editar, excluir, buscar e filtrar pensamentos.

# Conhecimentos Praticados
✔ NodeJs <br>
✔ Express <br>
✔ Express-session <br>
✔ Sequelize <br>
✔ CRUD com Sequelize <br>
✔ Padrão MVC


# Rotas da aplicação:

## Autenticação

<b>[GET] </b> /login : A rota deve exibir o formulário de login.<br><br>

<b> [POST] </b> /login : A rota deve fazer o login de um usuário.<br><br>

<b>[GET] </b> /register : A rota deve exibir o formulário de registro.<br><br>

<b>[POST] </b> /register : A rota deve salvar um novo usuário no banco de dados.<br><br>

<b>[GET] </b> /logout: A rota deve excluir a sessão de um usuário logado.<br>

## Pensamentos

<b>[GET] </b> /pensamentos/ : A rota deve exibir todos os Pensamentos.<br><br>

<b>[GET] </b> /pensamentos/dashboard : A rota deve exibir o dashboard do usuário se o usuário estiver logado.<br><br>

<b>[GET] </b> /pensamentos/add : A rota deve exibir o formulário de criação de pensamento se o usuário estiver logado.<br><br>

<b>[POST] </b> /pensamentos/add : A rota deve adicionar um pensamento no banco de dados se o usuário estiver logado.<br><br>

<b>[GET] </b> /pensamentos/edit/:id : A rota deve exibir o formulário de edição de pensamento de acordo com o ID do pensamento passado na URL se o usuário estiver logado.<br><br>

<b>[POST] </b> /pensamentos/edit : A rota deve alterar o pensamento no banco de dados se o usuário estiver logado.<br><br>

<b>[POST] </b> /pensamentos/remove : A rota deve remover um pensamento no banco de dados.<br><br>



# Tecnologias utilizadas: 
<p align="center">
<a href="https://nodejs.org/en/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="40" /></a> <a href="https://expressjs.com/pt-br/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height="40" width="40" /></a> <a href="https://insomnia.rest/download"><img src="https://raw.githubusercontent.com/brunoandreotti/biblioteca-backend/79c23c6a4bdd0bc6cb95463ee47741f2226cb0b1/readme/insomnia.svg" height="40" width="40" /></a> <a href="https://sequelize.org"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" height="40" width="40" /></a>
</p>



---
**Desenvolvido por <a href="https://www.linkedin.com/in/bruno-andreotti/">Bruno Andreotti</a> .** 