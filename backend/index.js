const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.get('/:query', async (req, res) => {
  let response = null
  try {
    response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(req.params.query)}&limit=10&format=json`
    )
    res.set('Access-Control-Allow-Origin', '*')
    res.send(await response.json())
  } catch (error) {
    console.error(error.message)
  }
  console.log(`GET /${req.params.query} ${response.status || 500}`)
})

app.listen(4000)
