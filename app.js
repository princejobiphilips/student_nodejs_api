var express=require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var {studentModel}=require('./models/studentModel')
var {markModel}=require('./models/markModel')
var {studentRouter}=require('./controllers/studentController')

mongoose.connect("mongodb+srv://prince123:prince123@cluster0.olett.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{useNewUrlParser:true})
.then(() => console.log("Mongodb connected"))
.catch(err =>console.log(err))

var app=express()

app.use(bodyParser.urlencoded({ extended:false}))

app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send('Welcome')
    
})

app.use('/student', studentRouter)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started at http://localhost:3000/");
})
