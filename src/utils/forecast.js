const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    
    const acccessKey = '37257f1a2f7ef62c9004850622fbcb62';
    const url =   'http://api.weatherstack.com/current?access_key=37257f1a2f7ef62c9004850622fbcb62&query=' + latitude +  ',' + longitude + '&units=m' //units=f for temp in ferenhiet, m for celcius
    request({url:url},(err,res)=>{ 
        if(err){
            callback('Unable to connect to location services!',undefined);
            return;
        }else{
            const data = JSON.parse(res.body);
          
            if(!data.current){
                callback('Unable to connect to location services!',undefined);
                return;
            }
            const location = data.location.region;
            const temperature = data.current.temperature;
            callback(undefined,{
                location,
                temperature
            })
        }
       
    })
}

module.exports = forecast;
