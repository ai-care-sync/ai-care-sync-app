'use strict'

require('./config')

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const fs = require('fs');
const spawn = require('child_process').spawn

const middleware = require('./middleware')

const zoomAppRouter = require('./api/zoomapp/router')
const zoomRouter = require('./api/zoom/router')
const thirdPartyOAuthRouter = require('./api/thirdpartyauth/router')
// Create app
const app = express()

// Set view engine (for system browser error pages)
app.set('view engine', 'pug')

// Set static file directory (for system browser error pages)
app.use('/', express.static('public'))

// Set universal middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(middleware.session)
app.use(middleware.setResponseHeaders)

// Zoom App routes
app.use('/api/zoomapp', zoomAppRouter)
if (
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_ISSUER_BASE_URL
) {
  app.use('/api/auth0', thirdPartyOAuthRouter)
} else {
  console.log('Please add Auth0 env variables to enable the /auth0 route')
}

app.use('/zoom', zoomRouter)

app.get('/hello', (req, res) => {
  res.send('Hello Zoom Apps!')
  res.send('medical-term')
})

//Medical Term Lookup

app.get('/medical-term/:wordID', (req,res) => {
  let savedData = {}
  const medTerm = req.params.wordID
  const path = "./wordRequest.php"
  const dataPath = "./data.json"
  const resultPath = "./results.json"
  const phpProcess = spawn('php', [path, medTerm])
  phpProcess.on('close', () => {
    setTimeout(() => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if(err) {
          console.error("Error reading data file: ", err)
          return
        }
        try {
          const jsonData = JSON.parse(data);
          if(jsonData.length > 0 && typeof jsonData[0] == 'object'){
            jsonData.forEach(item => {
              const sdef = item.shortdef;
              const name = item.meta.id;
              if(!savedData[name]){
                savedData[name] = sdef;
              }
            })
          } else{
            console.log('Unable to find term.')
            if(jsonData.length > 0){
              console.log('Did you mean any of the following terms?')
              console.log(jsonData)
              savedData = jsonData
            }
          }
          const results = JSON.stringify(savedData, null, 4)
          fs.writeFileSync(resultPath, results, 'utf8')
          console.log('Results saved to results.json')
          res.json(savedData);
        } catch (e) {
          console.error('Error parsing data: ', e)
          return
        }
      })
    }, 400)
  })
})

// Handle 404
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Handle errors (system browser only)
app.use((error, req, res) => {
  res.status(error.status || 500)
  res.render('error', {
    title: 'Error',
    message: error.message,
    stack: error.stack,
  })
})

// Start express server
http.createServer(app).listen(process.env.PORT, () => {
  console.log('Zoom App is listening on port', process.env.PORT)
})
