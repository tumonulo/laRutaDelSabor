const games = document.getElementById('games')

window.addEventListener('DOMContentLoaded', async () => {
    games.textContent = 'Cargando juegos...'
    try {
        const response = await fetch('/games/list')
        const data = await response.json()

        games.innerHTML = ''

        data.games.forEach(game => {
            const gameDiv = document.createElement('div')
            gameDiv.classList.add('game')
        
            const gameImg = document.createElement('img')
            gameImg.src = `https://api.popcat.xyz/screenshot?url=${encodeURIComponent(window.location.origin + `/games/${game}`)}`
            gameImg.alt = `${game} thumbnail`
            gameImg.classList.add('game-image')
            gameImg.onerror = () => {
                gameImg.src = '../assets/img/webPreviewNotFound.png'
            }
        
            const gameText = document.createElement('p')
            gameText.classList.add('game-text')
            gameText.textContent = game.replace(/-/g, ' ').toUpperCase();

            gameDiv.appendChild(gameImg);
            gameDiv.appendChild(gameText);
        
            gameDiv.addEventListener('click', () => {
                window.location.href = `/games/${game}`
            })
        
            games.appendChild(gameDiv)
        })
    } catch (error) {
        console.error('Error al cargar los juegos:', error)
        games.textContent = 'Hubo un problema al cargar los juegos. Por favor, intentalo de nuevo más tarde.'
        games.style.color = 'red'
    }
})
