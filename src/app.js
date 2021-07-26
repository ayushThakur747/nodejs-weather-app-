const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname,'../public'); 
const partialsPath = path.join(__dirname,'./partials');
app.set('view engine','hbs') 

hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app' ,
        name: 'ayush thakur'  
    }); 
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/weather',(req,res)=>{
    const {location} = req.query;
    if(!location){
        res.send({
            error:"please provide a location"
        })
        return;
    }
    geocode(location,(error,{latitude,longitude,place}={})=>{
        if(error){
            res.send({
                error
            })
            return;
        }    
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                res.send({
                    error
                })
                return;
            }
            console.log("place:",place);
            console.log("forecast data: ",forecastdata.temperature);
            res.json({
                location:place,
                temperature:forecastdata.temperature
            })
        })
    })
})
app.get('*',(req,res)=>{ 
    res.send('404 page');
})
app.listen(5000,()=>{
    console.log("listening to port 5000");
})
