const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')


//Rota deve renderizar o formulário de login
router.get('/login', AuthController.loginForm)

//A Rota deve fazer o login de um usuário
router.post('/login', AuthController.login)

//Rota deve renderizar o formulário de registro
router.get('/register', AuthController.registerForm)

//Rota deve salvar um novo usuário no banco de dados
router.post('/register', AuthController.register)

//Rota deve excluir a sessão de um usuário logado
router.get('/logout', AuthController.logout)


module.exports = router
