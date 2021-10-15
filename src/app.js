const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public' )
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials' )

// Setup handelbars engine and views location
app.set('view engine','hbs') // all what we gonna need to get handelbars set up 
app.set('views',viewsPath) // all what we gonna need to get handelbars set up 
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req , res) =>{   // req is short of request and res is short for response
    res.render('index',{
        title: 'Weather',
        name : 'Youstina Elhamy'
    })

})

app.get('/about',(req , res) =>{   // req is short of request and res is short for response
        res.render('about',{
            title : '  Hello about',
            name : 'Youstina Elhamy'
        })
    
    }) 

    app.get('/help',(req , res) =>{   // req is short of request and res is short for response
        res.render('help',{
            title : ' Need A Help',
            message: 'You Can Go And Save The File to Help You ',
            name:'Youstina Elhamy'
        })
    
    }) 

app.get('/weather',(req , res) =>{   // req is short of request and res is short for response
    
    if(!req.query.address){
        return res.send({
           error : 'You Must Provide an address '
        })
    }
    
 geocode(req.query.address,(error , {latitude ,longitude, location}= {}) =>{

        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                return res.send({error})
             }
        res.send({
                 forecast: forecastData,
                 location,
                 address:req.query.address
                 })

          })
    
    })

})



app.get('/products',(req , res) =>{ 
    
    if(!req.query.search){
        return res.send({
           error : 'You Must Provide a Search Term '
        })
    }

    console.log(req.query.search)
    res.send({
        product :[],
    })

})

app.get('/help/*',(req , res) =>{   // need to come last 
    res.render('404',{
        title : '404',
        name : 'Youstina Elhamy',
        errorMessage : 'Help Article Not Found'
    })

})

app.get('*',(req , res) =>{   // need to come last 
    res.render('404',{
        title : '404',
        name : 'Youstina Elhamy',
        errorMessage : 'Page Not Found'
    })

})


//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('The server is up on port 3000. ') // this is gonna disply in the terminal not in the browser as a usefull peace of information when running the application 
})





// console.log(__dirname)
// console.log(path.join(__dirname, '../public' ))

// app.get('',(req , res) =>{   // req is short of request and res is short for response
//     res.send('<h1>Weather<h1> ')

// })

// app.get('/help',(req , res) =>{   // req is short of request and res is short for response
//     res.send([{
//         name : 'Youstina' 
//     },{
//         name : 'sarah'
//     },{
//         name : 'Andrew'
//     }])

// })

// app.get('/about',(req , res) =>{   // req is short of request and res is short for response
//     res.send('<h1>About Page ! <h1>')

// }) 