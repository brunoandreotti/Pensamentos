const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

//Models
const Pensamento = require('./models/PensamentoModel')
const User = require('./models/UserModel')

//Routers
const pensamentosRouter = require('./routes/pensamentosRoutes')
const authRouter = require('./routes/authRoutes')

//Controllers
const PensamentosController = require('./controllers/PensamentoController')


//Mudar o nome do arquivo connection-example para connection o colocar as credenciais do seu banco de dados
const connection = require('./database/connection')

const app = express()

//Define a engine da view
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Configuração leitura do body da req
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

//Especifica onde será salvo os dados das sessões e configura cookies
app.use(
  session({
    name: 'session',
    secret: 'meu_secret_da_sessão', //Quando mais complexo o secret melhor
    resave: false, //Se cair a sessão o usuário será desconectado
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false, //Define cookie seguro, para ser true o site precisa ter  HTTPS
      maxAge: 3600000, // Define a duração para um dia em milissegundos
      httpOnly: true //Define que será utilizado somente HTTP pois está sendo usado na maquina local, caso fosse pra produção é necessário utilizar HTTPS
    }
  })
)



//Configura as flash messages
app.use(flash())

//Define a pasta de arquivos estáticos
app.use(express.static('public'))

//Verifica se o usuário possui uma sessão
app.use((req, res, next) => {
  //Se possuir
  if (req.session.userid) {
    //Passa a sessão da requisição para a resposta
    //Desse modo todas as res possuirão os dados da sessão do usuário, facilitando a execução de algumas lógicas, por exemplo acessar os dados no front-end
    res.locals.session = req.session
  }

  next()
})

//Rotas
app.use('/pensamentos', pensamentosRouter)
app.use('/', authRouter)

//Informa que a rota '/' mostrará todos os Pensamentos
app.get('/', PensamentosController.showAll)

//Sincroniza o banco de dados com a aplicação
connection
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando!')
    })
  })
  .catch(err => console.log(err))


