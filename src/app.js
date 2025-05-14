const fs = require('node:fs')
const path = require('node:path')

const cors = require('cors')

const express = require('express')
const app = express()

const { PORT } = require('./config.js')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(cors({
  origin: (origin, callback) => {
    const acceptedOrigins = [
      'https://la-ruta-del-sabor.vercel.app'
    ]

    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by')

const folderPath = path.join(__dirname, 'routes')
const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'))

for (const file of files) {

  const filePath = path.join(folderPath, file)
  const route = require(filePath)

  const mainPaths = ['index', 'main', 'home']
  
  const routeName = path.basename(file, '.js')

  const routePath = mainPaths.includes(routeName) ? '/' : `/${routeName}`

  app.use(routePath, route)
}

app.use((req, res) => {
  res.status(404).render('pages/404')
})

app.listen(PORT, () => {
    console.log(`app listening on port http://localhost:${PORT}!`)
})