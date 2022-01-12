const express = require('express')
const app = express()
const cors = require('cors')
const port = 5006

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.json({message: `Example app listening at http://localhost:${port}`, status: 200})
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})