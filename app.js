const fs = require('node:fs')
const path = require('node:path')

const cors = require('cors')
const favicon = require('serve-favicon')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(favicon(path.join(__dirname, 'public', 'assets', 'icons', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
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

const folderPath = __dirname + '/routes'
fs.readdirSync(folderPath).forEach((file) => {
  const filePath = path.join(folderPath, file)
  const route = require(filePath)
  const routeName = path.basename(file, '.js')
  const routePath = routeName === 'index' ? '/' : `/${routeName}`
  app.use(`${routePath}`, route)
})

app.use((req, res) => {
  res.status(404).render('pages/404')
})

app.listen(PORT, () => {
    console.log(`app listening on port http://localhost:${PORT}!`)
})