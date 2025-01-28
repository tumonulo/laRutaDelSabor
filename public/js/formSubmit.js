const proxyForm = document.getElementById('proxyForm')

proxyForm.addEventListener('submit', async (e) => {
    console.log('checkpoint')
    e.preventDefault()

    try {
        const url = document.getElementById('proxyFormUrl').value

        const request = await fetch(`/proxy/${encodeURIComponent(url)}`, {
            method: 'GET'
        })

        const response = await request.text()

        console.log(response)
    } catch (error) {
        console.error(error)
    }
})