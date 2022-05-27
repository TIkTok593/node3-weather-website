const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo_code = require('../utils/geo_code');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//define paths for Express config
const publicPathDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)//If you want to change the name of the folder that the views files live in 
hbs.registerPartials(partialsPath);

//Setup staic directory to serve
app.use(express.static(publicPathDirectory));


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Abu yahya'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about page',
        name: 'abu yahya1234 s'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name: 'abu yahya1234'
    })
})


app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address)
        return res.send({
            err:'plz you have to provide an address term'
        })
    geo_code(address,(err,{latitude,longitude,location}={})=>{
        console.log(address,latitude,longitude);

        if(err)
            return res.send(err);
        forecast(longitude,latitude,(err,data)=>{
            console.log(address,latitude,longitude);

            res.send({
                data,
                location,
                address
            });
        })
    })

})

app.get('/products',(req,res)=>{
    const searchResult = req.query.search;
    if(!searchResult)
        return res.send({
            err:'you must provide a search term'
        })
    
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        value:'Help article not found',
        name:'abu yahya diab'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        value:'this is my 404 page',
        name:'abedalrahman'});
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);
})