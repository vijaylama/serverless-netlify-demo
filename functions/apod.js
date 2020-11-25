const fetch = require('node-fetch')
const parseISO = require('date-fns/parseISO')
const getMonth = require('date-fns/getMonth')
const getDate = require('date-fns/getDate')
const isBefore = require('date-fns/isBefore')

function getDates(dateString) {
  const today = new Date()
  const date = parseISO(dateString)

  const month = getMonth(date) + 1
  const day = getDate(date)

  const startYear = isBefore(new Date(2020, month, day), today) ? 2020 : 2019
  const NUM_YEARS = 5

  return [...Array(NUM_YEARS).keys()].map(i => `${startYear - i}-${month}-${day}`)
}

exports.handler = async function(event, context) {
  const BASE_URL = "https://api.nasa.gov/planetary/apod"
  const {date} = JSON.parse(event.body)

  const dates = getDates(date)

  async function fetchDate(apod_date) {
    return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${apod_date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
  }

  return Promise.all(dates.map(d => fetchDate(d)))
    .then(values => {
      return {
        statusCode: 200,
        body: JSON.stringify(values)
      }
    })
    .catch(error => {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({error})
      }
    })
}
