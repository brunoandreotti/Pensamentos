const bcrypt = require('bcryptjs') //Biblioteca para codificar a senha

const Pensamentos = require('../models/PensamentoModel')
const User = require('../models/UserModel')

module.exports = class AuthController {
  static loginForm(req, res) {
    res.render('auth/login')
  }

  static async login(req, res) {
    const { email, password } = req.body

    //Validações

    //Valida se o usuário existe no banco

    const user = await User.findOne({ where: { email: email } })

    //Se não encontrar o usuário com o e-mail informado
    if (!user) {
      req.flash('error-message', 'E-mail não cadastrado, tente novamente!')
      res.render('auth/login')

      return
    }

    //Valida se a senha informada é a mesma da salva no banco de dados
    //Compara se a senha enviada e a senha no banco de dados
    //Retorna 'true' se as senhas são igual e 'false' se não
    const comparePassword = bcrypt.compareSync(password, user.senha)

    if (!comparePassword) {
      req.flash('error-message', 'Senha inválida, tente novamente!')
      res.render('auth/login')

      return
    }

    //Se passar nas validações inicializa uma sessão
    //Informa que o userid da sessão é o próprio id do user
    req.session.userid = user.id

    req.session.save(() => {
      
      res.redirect('/')
    })
  }

  static registerForm(req, res) {
    res.render('auth/register')
  }

  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body

    //-- Validações
    // validação de senha e confirmação de senha
    if (password != confirmpassword) {
      //Envia os dados da flash message
      req.flash('error-message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')

      return
    }

    // checa se o usuário já exist
    const checkIfUserExist = await User.findOne({ where: { email: email } })

    //Se a const foi preenchida quer dizer que um usuário com o e-mail foi encontrado
    if (checkIfUserExist) {
      //Envia os dados da flash message
      req.flash('error-message', 'E-mail já cadastrado!')
      res.render('auth/register')

      return
    }

    //Criar senha
    //Gera uma string aleatória para ajudar no hash da senha
    const salt = bcrypt.genSaltSync(10)

    //Cria a senha com hash
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      nome: name,
      email: email,
      senha: hashedPassword
    }

    try {
      //Cria e salva o usuário no banco
      await User.create(user)

      req.flash('success-message', 'Cadastro realizado com sucesso!')

      req.session.save(() => {
      
        res.redirect('/login')
      })
    } catch (err) {
      console.log(err)
    }
  }

  static logout(req, res) {
    //Remove uma sessão salva do sistema
    req.session.destroy()

    res.redirect('/login')
  }
}
