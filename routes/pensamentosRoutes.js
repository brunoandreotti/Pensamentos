const express = require('express')
const router = express.Router()

const PensamentoController = require('../controllers/PensamentoController')

//AuthMiddleware
const checkAuth = require('../helpers/authMiddleware').checkAuth

//Rota deve exibir os dashboard se o usuário estiver logado
router.get('/dashboard', checkAuth, PensamentoController.dashboard)

//Rota deve exibir o formulário de criação de pensamento se o usuário estiver logado
router.get('/add', checkAuth, PensamentoController.createForm)

//Rota deve adicionar um pensamento no banco de dados se o usuário estiver logado
router.post('/add', checkAuth, PensamentoController.create)

//Rota deve exibir o formulário de edição de pensamento de acordo com o ID passado na URL se o usuário estiver logado
router.get('/edit/:id', checkAuth, PensamentoController.editForm)

//Rota deve alterar o pensamento no banco de dados se o usuário estiver logado
router.post('/edit', checkAuth, PensamentoController.edit)

//Rota deve remover um pensamento no banco de dados
router.post('/remove', checkAuth, PensamentoController.remove)

//Rota deve exibir todos os Pensamentos
router.get('/', PensamentoController.showAll)

module.exports = router
