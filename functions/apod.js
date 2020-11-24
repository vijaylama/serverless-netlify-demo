const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const BASE_URL = "https://api.nasa.gov/planetary/apod"
  const {date} = JSON.parse(event.body)

  return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
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
        body: JSON.stringify({error})
      }
    })
}
