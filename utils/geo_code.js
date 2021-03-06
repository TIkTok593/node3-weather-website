const request = require('postman-request');

const getCoding = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJkdWxyYWhtYW5kaWFiIiwiYSI6ImNsM2R6Mjg3YzAwN2szamthc29mdXl3MDEifQ.-GNZDaWE-6CoVoEvuocMYg';

    request({url, json : true},(err,{body})=>{
        if(err){
            callback({err:'Unalbe to connect to location services'},undefined);
        }else if(body.features.length===0){
            callback({err:'Unalbe to connect to location services'},undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = getCoding;