const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWNjb2xhZGVhIiwiYSI6ImNraDAxOWFkZjAyczkycXFtam52a2NjZW0ifQ._wTiR9Cw2JAB1coWs9se1A&limit=1"
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            return callback('Unable to connect to weather service', undefined)
        }
        
        if (body.features.length === 0) {
            return callback('Unable to find location. Try another search', undefined)
        } 
        
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode