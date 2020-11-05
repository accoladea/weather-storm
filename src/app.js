const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Storm',
        name: 'Islomzhan Akhmedov',
        isHomePage: true
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Weather Storm',
        data: 'Started to work on this project very recently'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help | Weather Storm',
        message: 'You can find many helpful links in here!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({error:'Must provide an address to search'})
    }
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if(error) return res.send({error})

        forecast(latitude, longitude, (error, message) => {
            if(error) return res.send({error})
        
            return res.send({location,message})
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title:'Not Found | Weather Storm', errorMessage: "Help article wasn't found"})
})

app.get('*', (req, res) => {
    res.render('404', {title:'Not Found | Weather Storm', errorMessage: "Page doesn't exist .. "})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})