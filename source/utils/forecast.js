const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/e3794898520749a7d18b3fc258d781ab/' + lat + ',' + long + '?units=si'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weaather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            current = body.currently
            daily = body.daily
            callback(undefined, daily.data[0].summary + ' It is currently '+ current.temperature + ' degrees out. The high today is ' + daily.data[0].temperatureHigh + ' with a low of ' +  daily.data[0].temperatureLow + '. There is a '+ current.precipProbability + ' chance of rain.' )
        }
    })
}


module.exports = forecast