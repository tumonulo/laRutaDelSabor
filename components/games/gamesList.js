module.exports = async function gamesList(req, res) {
    const gamesDir = path.join(__dirname, 'public', 'games')

    fs.readdir(gamesDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo leer la carpeta de juegos' })
      }
  
      const folders = files.filter(file => {
        const filePath = path.join(gamesDir, file)
        return fs.statSync(filePath).isDirectory()
      })
  
      res.json({ juegos: folders })
    })
}