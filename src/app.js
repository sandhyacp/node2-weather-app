const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configurations(views folder and public folder)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath) //views location (changed from default 'views' to 'templates' folder)
hbs.registerPartials(partialsPath)

// Setup static directory to serve static content (images, css and html)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Sandhya CP'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sandhya CP'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'You can find the help here.',
        name: 'Sandhya CP'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You are required to provide the address in URL.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandhya CP',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandhya CP',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})