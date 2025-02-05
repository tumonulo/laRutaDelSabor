const fs = require('node:fs')
const path = require('node:path')

module.exports = async function appsList(req, res) {
    const appsDir = path.join(process.cwd(), 'public', 'apps')

    fs.readdir(appsDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'No apps found' })
      }
  
      const folders = files.filter(file => {
        const filePath = path.join(appsDir, file)
        return fs.statSync(filePath).isDirectory()
      })
  
      res.json({ apps: folders })
    })
}