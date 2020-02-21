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
            callback(undefined, daily.data[0].summary + ' It is currently '+ current.temperature + ' degrees out. There is a '+ current.precipProbability*100 + '% chance of rain')
        }
    })
}


module.exports = forecast