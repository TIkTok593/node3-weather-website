const request = require('postman-request');

const forecast = (longitude,latitude,callback)=>{
    const url  = 'http://api.weatherstack.com/current?access_key=c91d175f1b7420369cdbe51edb5e4634&query='+latitude+','+longitude+'&units=m';
    request({url,json:true},(err,{body})=>{
        if(err){
            callback(err,undefined);
        }
        else if(body.error){
            callback("we can't handle the err, try agian!",undefined);
        }
        else{
            callback(undefined,{
                location: body.location.timezone_id,
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                wind_speed: body.current.wind_speed,
                wind_dir: body.current.wind_dir
            });

        }
    })
}

module.exports=forecast;