const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handle bar engine and view location
app.set('view engine', 'hbs') //重要
app.set('views', viewPath)
hbs.registerPartials(partialPath)


//Setup static Directory
app.use(express.static(publicDirectoryPath)) 


app.get('',  (req,res) => {
    res.render('index', {       //用render
        title: 'Weather app',
        name: 'Tony'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'TonyHsieh'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Tony'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

        geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longtitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
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
        name: 'Tony',
        errorMessage: 'Help article not found'
    })
})

app.get('*' ,(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Tony',
        errorMessage: 'Page not found...'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})