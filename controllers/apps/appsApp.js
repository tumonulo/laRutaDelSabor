const fs = require('node:fs')
const path = require('node:path')

module.exports = async function appsApp(req, res) {
    const { app } = req.params.app
    const appDir = path.join(process.cwd(), 'public', 'apps', app)
    const indexPath = path.join(appDir, 'index.html')
  
    if (!fs.existsSync(appDir)) {
      return res.status(404).sendFile(process.cwd() + '/public/html/404.html')
    }
  
    if (!fs.existsSync(indexPath)) {
      return res.status(404).sendFile(process.cwd() + '/public/html/404.html')
    }
  
    res.sendFile(indexPath)
}