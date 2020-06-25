const request = require('postman-request');
const geocode =(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'
            +address+'.json?limit=1&proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWxlbnRoYW5reiIsImEiOiJja2J1ZTUzbGowaTk2MnJsaWYwN3plZW93In0.yiPllGUDaeN26RMvFRyVcA';
    request({url:url,json:true},(error,response)=>{
        if(error){
            console.log(error);

        }
        else if(response.body.message=="Not Found"){
            console.log("Not Found");
        }
        else{
            const lattitude =response.body.features[0].center[1];
            const longitude =response.body.features[0].center[0];
            const placeName=response.body.features[0].place_name;
            console.log(lattitude);
        }
    });
}




module.exports=geocode;