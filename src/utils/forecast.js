const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=67a36afe17cb765bdcddd6e0d621a2d3&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body})=>{
        if(error) {
            callback('Unable to connect to weather seervice.', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + ' percent.')
        }  
    })
}

module.exports = forecast