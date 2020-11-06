const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1a852460e3bf2cb88536d48c8add7e46&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            return callback('Unable to connect to weather service', undefined)
        }
        
        if (body.error) {
            return callback('Unable to find location', undefined)
        } 
        console.log(body)
        // const temperature = body.current.temperature
        // const humidity = body.current.humidity
        const data = JSON.stringify(body.current)

        callback(undefined, data)
    })
}

module.exports = forecast

