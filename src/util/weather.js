const request=require('request')
function getWeather(data,callback){
    url='https://api.darksky.net/forecast/2093dfceed89a65d1a77552952f570dd/'+data.lng+','+data.lat+'?units=si',
    //     json:true
request({url:url,json:true},function(error,response){
//   console.log(response)
if(error)
{
callback('There is an error',{})
}else if(response.body.error){
  callback('error in occured',{})
}else{
callback(undefined,{summary:response.body.daily.data[0].summary,temp:response.body.currently.temperature,prob:response.body.currently.precipProbability})
 }})}

 module.exports=getWeather;