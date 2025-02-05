const apps = document.getElementById('apps')

window.addEventListener('DOMContentLoaded', async () => {
    apps.textContent = 'Cargando apps...'
    try {
        const response = await fetch('/apps/list')
        const data = await response.json()

        apps.innerHTML = ''

        data.apps.forEach(app => {
            const appDiv = document.createElement('div')
            appDiv.classList.add('app')
        
            const appImg = document.createElement('img')
            appImg.src = `https://api.popcat.xyz/screenshot?url=${encodeURIComponent(window.location.origin + `/apps/${app}`)}`
            appImg.alt = `${app} thumbnail`
            appImg.classList.add('app-image')
            appImg.onerror = () => {
                appImg.src = '../assets/img/webPreviewNotFound.png'
            }
        
            const appText = document.createElement('p')
            appText.classList.add('app-text')
            appText.textContent = app.replace(/-/g, ' ').toUpperCase();

            appDiv.appendChild(appImg);
            appDiv.appendChild(appText);
        
            appDiv.addEventListener('click', () => {
                window.location.href = `/apps/${app}`
            })
        
            apps.appendChild(appDiv)
        })
    } catch (error) {
        console.error('Error al cargar los juegos:', error)
        apps.textContent = 'Hubo un problema al cargar las apps. Por favor, intentalo de nuevo más tarde.'
        apps.style.color = 'red'
    }
})
