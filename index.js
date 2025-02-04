const fs = require('node:fs')
const path = require('node:path')
const cors = require('cors')

const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
  origin: (origin, callback) => {
    const acceptedOrigins = [
      'https://games-navy-seven.vercel.app'
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
  res.status(404).sendFile(process.cwd() + '/public/html/404.html')
})

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}!`)
})