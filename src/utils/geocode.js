const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYXl1c2g3NDciLCJhIjoiY2tyaXA1ZDd5MHZrbTJucGdxbmN1MWpjMSJ9.cHPvocADOfl67TT0oSAINA'; 

    request({url:url},(err,res)=>{
        if(err){
            callback('Unable to connect to location services!',undefined);
            return;
        }else{
            const data = JSON.parse(res.body);
            if(!data.features.length){
                callback('Unable to connect to location services!',undefined);
                return;
            }
            const place = data.features[0].place_name;
            const latitude = data.features[0].center[1];
            const longitude = data.features[0].center[0];
            callback(undefined,{
                latitude,
                longitude,
                place
            })
        }
    })
}


module.exports = geocode;
