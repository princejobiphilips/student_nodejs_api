var mongoose=require('mongoose')


var markSchema=new mongoose.Schema(
    {
        studentId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'students',
        },
        mark_Physics:{
            type:Number,
            required:true
        },
        mark_Chemistry:{
            type:Number,
            required:true
        },
        mark_Biology:{
            type:Number,
            required:true
        }
    }
)

var markModel=mongoose.model('marks', markSchema);

module.exports={markModel}
