const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname,'../public'); //path to public dir
const partialsPath = path.join(__dirname,'./partials');//seting path for partials //remember path is set from root not the relative path that is why we are using __dirname
app.set('view engine','hbs') //to set the view engine with hbs handlebar, handlebar allow us to render dynamic html content


hbs.registerPartials(partialsPath);// partial setup //partials are like those components which we want to reuse 

app.use(express.static(publicDir));//set up static directory to serve

app.get('',(req,res)=>{
    //render first argumnet is the name of html file you want to render and 2nd argument is the dynamic content
    res.render('index',{
        title:'Weather app' ,
        name: 'ayush thakur'  
    }) //to render index.hbs file , it will automatically match index in the views folder, to change default views path we can use app.set('views', path ...);
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
       
        //callback chaining
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

//handeling pages which does not exists

app.get('*',(req,res)=>{ //* means anything, and we put it at the end because to handle every other request which is a 404
    res.send('404 page');
})

app.listen(5000,()=>{
    console.log("listening to port 5000");
})
