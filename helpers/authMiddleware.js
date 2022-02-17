module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid

  //Verifica se possui um userId na session(só terá esse Id se uma sessão tiver sido iniciado)
  //Se não possui o usuário é redirecionado para o login, caso tenho, a rota é executada normalmente

  if (!userId) {
    res.redirect('/login')
  }

  next()
}
