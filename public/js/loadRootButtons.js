const button1 = document.getElementById('root-button-1')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const gamesResponse = await fetch('/games/list')
        const gamesData = await gamesResponse.json()

        if (!gamesData) {
            return console.log('No hay ningun juego')
        }

        button1.textContent = `Games - ${gamesData.games.length}`

        const appsResponse = await fetch('/games/list')
        const appsData = await appsResponse.json()

        if (!appsData) {
            return console.log('No hay ninguna app')
        }

    } catch (error) {
        console.error('Error al cargar los juegos o las apps:', error)
    }
})
