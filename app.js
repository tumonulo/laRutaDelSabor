const express = require('express')
const app = express()
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config()
const port = process.env.PORT ?? 3001

const folderPath = __dirname + '/routes'
fs.readdirSync(folderPath).forEach((file) => {
  const filePath = path.join(folderPath, file)
  const route = require(filePath)
  const routeName = path.basename(file, '.js')
  const routePath = routeName === 'index' ? '/' : `/${routeName}`
  app.use(`${routePath}`, route)
})

app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).sendFile(process.cwd() + '/public/html/404.html')
})

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}!`)
})