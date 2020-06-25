const request =require('postman-request');
const urlEncode =require('urlencode')

const forecast =(address,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=d41d3ac1f57bdc937877be75d99b7ffb&query='
    +urlEncode(address);
    request({url,json:true},(error,{body})=>{
        if(error){
            callback(error);
        }
        else if(body.error){
            
            switch(body.error.type){
                case 'request_failed':callback('invalid address',undefined);break;
                case "missing_query" :callback('provide a address',undefined);break;
                default:callback(body.error.type,undefined);
            }
            
            
        }
        else{
            const location=body.location.name+','+body.location.region+','+body.location.country;
            const temp= body.current.temperature;
            const precip= body.current.precip;
            var obj ={
                location,
                temp,
                precip
            }
            callback(undefined,obj);
        }
    })
}

module.exports=forecast
