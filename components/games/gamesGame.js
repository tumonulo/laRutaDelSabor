module.exports = async function gamesGame(req, res) {
    const gameName = req.params.game
    const gameDir = path.join(__dirname, 'public', 'games', gameName)
    const indexPath = path.join(gameDir, 'index.html')
  
    if (!fs.existsSync(gameDir)) {
      return res.status(404).json({ error: 'Juego no encontrado' })
    }
  
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ error: 'El juego no tiene un archivo index.html' })
    }
  
    res.sendFile(indexPath)
}