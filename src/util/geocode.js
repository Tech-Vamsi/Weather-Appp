
const request=require('request')
function geocode(place,callback){
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoidmFtc2lha3VsYSIsImEiOiJjazY5YjZncGUwZHlqM2Rsajl3amYzcmV4In0.9LJkSd7Xu8VKYCqVV0OquA'
 request({url:url,json:true},function(error,res){
     if(error){
         console.log('There is an error')
     }else if(res.body.features.length==0){
     callback("no location found",{})

     }else{
    const body=res.body;
    callback(undefined,{lat:body.features[0].geometry.coordinates[0],lng:body.features[0].geometry.coordinates[1]})
     }
    //console.log('Latitude: '+body.features[0].geometry.coordinates[0]+' Longitude:'+body.features[0].geometry.coordinates[1])
})}
module.exports=geocode;