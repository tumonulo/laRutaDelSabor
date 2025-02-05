const button1 = document.getElementById('root-button-1')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/games/list')
        const data = await response.json()

        button1.textContent = `Games - ${data.games.length}`


    } catch (error) {
        console.error('Error al cargar los juegos:', error)
    }
})
