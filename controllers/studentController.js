var express=require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var {studentModel}=require('../models/studentModel')
var {markModel}=require('../models/markModel')
var studentRouter=express.Router()

studentRouter.use(bodyParser.urlencoded({ extended:false}))

studentRouter.use(bodyParser.json())


studentRouter.get('/viewmarks', async(req,res)=>{
    try{
        studentModel.aggregate(
            [
                {
                    $lookup:{
                        from:'marks',
                        localField:'_id',
                        foreignField:'studentId',
                        as:'StudentMarks'
                    }
                }
            ], (error, data)=>{
                return res.json(data)
            }
        )
    }
    catch(error){
        res.send(error)
    }
})


studentRouter.post('/addmarks', (req,res)=>{
    
    var mark=new markModel(req.body)
   
    mark.save(
        (error)=>{
            if (error) {
                res.send("ERROR"+ error)
            }
            else{
                res.json({"status":"success"})
            }
    })

   
})


studentRouter.get('/viewall', async(req,res)=>{
    try{
        var result=await studentModel.find()
        res.json(result)
    }
    catch(error){
        res.send(error)
    }
})


studentRouter.post('/search',async(req,res)=>{
    try{
      var result = await studentModel.find(req.body)
      res.json(result)
    }
    catch(error){
        res.json({"status":"error"})
    }
})

studentRouter.post('/edit', async (req,res)=>{
    try{
        var result = await studentModel.findOneAndUpdate({"_id":req.body._id},req.body)
        res.json(result)
    }
    catch(error){
        res.json({"status":"error"})
    }
})

studentRouter.post('/delete', async (req,res)=>{
    try{
        var result = await studentModel.findByIdAndDelete({"_id":req.body._id})
        res.json(result)
    }
    catch{
        req.json({"status":"error"})
    }
})

studentRouter.post('/read', (req,res)=>{
    
    var studentObject=new studentModel(req.body)
   
    studentObject.save(
        (error)=>{
            if (error) {
                res.send("ERROR"+ error)
            }
            else{
                res.json({"status":"success"})
            }
    })
      
})

studentRouter.post('/add',(req,res)=>{
    var getNum1=parseFloat(req.body.num1)
    var getNum2=parseFloat(req.body.num2)
    var result=getNum1+getNum2
    
    res.json({'Result':result})
})

studentRouter.get('/home', (req,res)=>{
    res.send('Welcome to Home Page')
})

module.exports={studentRouter}

