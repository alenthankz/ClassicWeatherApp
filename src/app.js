const express =require('express');
const path =require('path');
const hbs = require('hbs');
const forecast =require('./utils/forecast');

var publicPath = path.join(__dirname,'../public');
var viewPath   = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');



const app = express();
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather'
    })
    
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({error:'provide a location'});
    }
    
    else{
        
        forecast(req.query.address,(error,{location,temp,precip}={})=>{
            if(error){
                 return res.send({error});
            }
            else {
                return res.send({
                    location:'Weather for the location : ' + location,
                    temp:    'Current temp             : '+ temp+ 'celsius',
                    precip:  'Chance of Precipitation  : ' +precip +'%'
                })
            }
       })
    }
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'page not found'
    })
})
app.listen(3000,()=>{
    console.log('server listening');
})


