const buttonGames = document.getElementById('root-button-games')
const buttonApps = document.getElementById('root-button-apps')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const gamesResponse = await fetch('/games/list')
        const gamesData = await gamesResponse.json()

        if (!gamesData) {
            return console.log('No hay ningun juego')
        }

        buttonGames.textContent = `Games - ${gamesData.games.length}`

        const appsResponse = await fetch('/apps/list')
        const appsData = await appsResponse.json()

        if (!appsData) {
            return console.log('No hay ninguna app')
        }

        buttonApps.textContent = `Apps - ${appsData.apps.length}`

    } catch (error) {
        console.error('Error al cargar los juegos o las apps:', error)
    }
})
