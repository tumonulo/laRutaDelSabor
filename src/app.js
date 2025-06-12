import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { PORT } from './configs/config.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(cors({
  origin: (origin, callback) => {
    const acceptedOrigins = [
      'https://la-ruta-del-sabor.vercel.app'
    ]
    if (!origin || acceptedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by')

const routesPath = path.join(__dirname, 'routes')

const files = fs.readdirSync(routesPath).filter(f => f.endsWith('.js'))

for (const file of files) {
  const filePath = path.join(routesPath, file)
  const routeModule = await import(filePath)
  const router = routeModule.default

  if (!router) {
    console.warn(`La ruta ${file} no exporta un router por defecto.`)
  }

  const routeName = path.basename(file, '.js')
  const mainPaths = ['index', 'main', 'home']
  const routePath = mainPaths.includes(routeName) ? '/' : `/${routeName}`

  app.use(routePath, router)
}

app.use((req, res) => {
  res.status(404).render('pages/404')
})

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})