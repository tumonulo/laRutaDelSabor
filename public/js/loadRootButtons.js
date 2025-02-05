const button1 = document.getElementById('root-button-1')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/games/list')
        const gamesData = await response.json()

        if (!gamesData) {
            return console.log('No hay ningun juego')
        }

        button1.textContent = `Games - ${gamesData.games.length}`


    } catch (error) {
        console.error('Error al cargar los juegos:', error)
    }
})
