const axios = require('axios')

module.exports = async function imageGenerations(req, res) {
    const { prompt } = req.params.prompt
    const tokenImageGeberations = process.env.TOKENIMAGEGENERATIONS
    try {
        const response = await axios.get("https://api.rnilaweera.lk/api/v1/user/dalle", {
            prompt: prompt,
            negative_prompt: "blurry, bad quality, worst quality",
        }, {
            headers: {
                Authorization: `Bearer ${tokenImageGeberations}`,
            }
        })
        const imageURL = response.data.image.url
        res.json({ image: imageURL })
    } catch(error) {
        console.error(error)
        res.json({ error: 'An error occur by creating the image'})
    }
}