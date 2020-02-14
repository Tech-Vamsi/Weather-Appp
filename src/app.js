const path=require('path')
const hbs=require('hbs');
const getLoc=require('../public/js/app')
const express=require('express')
const geocode=require('./util/geocode')
const weather=require('./util/weather')
const bodyParser=require('body-parser')
console.log(path.join(__dirname,'..public'))
const app=express();
const port=process.env.PORT||3000
const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialPath)
// app.get('',(req,res)=>{
//    res.send('<h1>Hello Express!!!!</h1>')
// })
app.use(bodyParser());

app.get('',(req,res)=>{
    res.render('index',{
        link:'Weather',
        title:'Vamsi Akula',
        age:25
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        link:'Weather',
        name:'Vamsi',
        age:25
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        link:'Weather',
        src:"./img/img.jpg"
    })
})
app.get('/weather',(req,res)=>{
   
    // res.send({
    //     forecast:"it is snowing",
    //     loc:"New York",
    //     address:req.query.address
    // })
    // geocode(req.query.address,(error,{lat,lng})=>{
    //     if(error){
    //         return res.send({error})
    //     }else{
    //         weather({lat,lng},(error,{summary,temp,prob})=>{
    //             if(error) return res.send(error)
    //             res.send({
    //                 forrecast:summary,
    //                 temp,
    //                 prob
    //             })
    //         })
    //     }
    // })
    // var {summary,temp,prob}
    
    if(!req.query.address){
         res.render('weather',{
           error:"Must provide address"
        })
    }
    geocode(req.query.address,(error,{lat,lng})=>{
        if(error)
        {
          res.render('weather',{error})
        }else{
            // console.log({lat,lng})
       weather({lat,lng},(error,{summary,temp,prob})=>{
                if(error){
                 res.render('weather',{error})
                }else{
            res.render('weather',{summary,temp,prob})
                }
            })
        }
         })
    
    
})

app.get('/help/*',(req,res)=>{
    res.send('Not Found')
})
app.get('/weather/*',(req,res)=>{
    res.render('error',{
        link:'Weather',
        title:'Weather'
    })
})
app.get('/products',(req,res)=>{
if(!req.query.search){
    return res.send({
    "Error" : "Must providfe a search string"
})}
    res.send({
        products:[]
    })
})
app.get('/about/*',(req,res)=>{
    res.render('error',{
        link:'Weather',
    title:'About'    
    })
})
app.get('*',(req,res)=>{
res.send('404 Page')
})
app.listen(port,()=>{
    console.log('Sever is up on port 3000')
})