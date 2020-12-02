const fetch = require("node-fetch")
exports.handler = async function (event, context) {
    const BASE_URL = "https://api.nasa.gov/planetary/apod"
    const { date } = JSON.parse(event.body)
    console.log({ date })
    return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`)
        .then(res => {
            console.log({ res })
            if (!res.ok) {
                throw new Error("Network response not ok")
            }
            return res.json()
        })
        .then(data => {

            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
        })
        .catch(error => {
            return {
                statusCode: 500,
                body: JSON.stringify({ error })
            }
        })
}