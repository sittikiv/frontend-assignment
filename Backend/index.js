const express = require('express')
require('dotenv').config()

const createError = require('http-errors')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const JenosizeRoute = require('./Routes/Jenosize.route')

function checkAPIKey(req, res, next) {
    if (req.headers['x-api-key'] === 'jenosize-key') {
        next()
    } else {
        next(createError(401, 'missing_api_key_header'))
    }
}

app.use(checkAPIKey)

app.use('/api', JenosizeRoute)

app.get('/', (req, res, next) => {
    res.send()
})

app.use((req, res, next) => {
    next(createError(404, 'Not Found'))
})

//error handle
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
})