const Pensamentos = require('../models/PensamentoModel')
const User = require('../models/UserModel')

//Op do sequelize serve para aplicarmos operados em filtros
const { Op } = require('sequelize')

module.exports = class PensamentosController {
  static async showAll(req, res) {
    // => Lógica de filtro
    let busca = ''

    //Verifica se há uma busca
    //req.query retorna um objeto com os dados da string de busca
    if (req.query.search) {
      busca = req.query.search
    }

    let ordem = 'DESC'

    //Se vier 'old' na string de busca, a ordem será 'ASC'(mais antigo para o mais novo)
    if (req.query.order === 'old') {
      ordem = 'ASC'
    } else {
      ordem = 'DESC'
    }

    //Encontrará todos os pensamentos e baseado no UserId retornará também os dados do usuário que escreveu o pensamento
    const pensamentosData = await Pensamentos.findAll({
      include: User,
      where: {
        //Irá aplicar um filtro de like para mostrar todos os pensamentos que contenham o que foi passado na busca, se a busca estiver vazia ele retorna todos os resultados sem o filtro
        title: { [Op.like]: `%${busca}%` }
      },
      order: [['createdAt', ordem]]
    })

    const pensamentos = pensamentosData.map(pensamento =>
      //Faz os dados serem retornados como um array de objetos
      pensamento.get({ plain: true })
    )

    let quantidadePensamentos = pensamentos.length

    //Informar para o Handlebars que quando o valor de 'quantidadePensamentos' for 0, ele será falso
    if (quantidadePensamentos === 0) {
      quantidadePensamentos = false
    }

    res.render('pensamentos/home', {
      pensamentos,
      busca,
      quantidadePensamentos
    })
  }

  static async dashboard(req, res) {
    const userId = req.session.userid

    //Irá encontrar um usuário baseado no Id e já mostrar os Pensamentos que possuem aquele UserId
    const user = await User.findOne({
      where: { id: userId },
      include: Pensamentos,
      plain: true
    })

    //Checa se o usuário existe
    if (!user) {
      res.redirect('/login')
    }

    //Faz um map no array de resultado para retornar somente os dados dentro do 'dataValues'
    const pensamentos = user.Pensamentos.map(
      pensamento => pensamento.dataValues
    )

    let semPensamentos = false

    //Verifica se existe Pensamentos no banco
    if (pensamentos.length === 0) {
      semPensamentos = true
    }

    res.render('pensamentos/dashboard', { pensamentos, semPensamentos, user })
  }

  static createForm(req, res) {
    res.render('pensamentos/create')
  }

  static async create(req, res) {
    const pensamento = {
      title: req.body.title,
      UserId: req.session.userid
    }

    try {
      await Pensamentos.create(pensamento)

      req.flash('success-message', 'Pensamento criado com sucesso!')

      req.session.save(() => {
        res.redirect('/pensamentos/dashboard')
      })
    } catch (err) {
      console.log(`Aconteceu um erro: ${err}`)
    }
  }

  static async editForm(req, res) {
    const id = req.params.id
    const UserId = req.session.userid

    try {
      const pensamento = await Pensamentos.findOne({
        where: { id, UserId },
        raw: true
      })

      res.render('pensamentos/edit', { pensamento })
    } catch (error) {
      console.log(error)
    }
  }

  static async edit(req, res) {
    const id = req.body.id
    const UserId = req.session.userid

    const pensamento = {
      title: req.body.title
    }

    try {
      await Pensamentos.update(pensamento, { where: { id, UserId } })

      req.flash('success-message', 'Pensamento editado com sucesso!')

      req.session.save(() => {
        res.redirect('/pensamentos/dashboard')
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async remove(req, res) {
    const id = req.body.id
    const UserId = req.session.userid

    try {
      //Remove um pensamento de acordo com o id e se o UserId do pensamento for o UserId da sessão, dessa forma só é permitido excluir pensamentos do próprio user
      await Pensamentos.destroy({ where: { id, UserId } })

      req.flash('success-message', 'Pensamento excluído com sucesso!')

      req.session.save(() => {
        res.redirect('/pensamentos/dashboard')
      })
    } catch (err) {
      console.log(err)
    }
  }
}
