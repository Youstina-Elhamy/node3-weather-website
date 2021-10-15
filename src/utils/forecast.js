const request = require('request')

const forecast = (lat , long , callback) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=a32f820e92223d1493f10b5da4ffcc30&units=metric'
   
    request({ url , json : true },(error , {body}) => {

            if(error){
                callback('Unable to connect to weather service!', undefined)
            }else if(body.message){
                callback('Unable to find the location . Try another search', undefined)
            } else {
                 callback(undefined , 
                     'The weather_description is ' + body.weather[0].description + 
                   ' . The temperature is : '+ body.main.temp +
                   '   .  The pressure is : ' +body.main.pressure  +
                   ' . The Minimum tempreture for the day is : ' +body.main.temp_min  +
                   ' , And the Maximum tempreture for the day is : ' +body.main.temp_max + '.' 
                 )
            }
        })
}

module.exports = forecast 