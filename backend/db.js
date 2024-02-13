const mongoose=require('mongoose');
const {Schema,model}=mongoose;  

mongoose.connect('mongodb+srv://admin:fQ8qLRJqWtSwH33G@cluster0.mmielod.mongodb.net/loginpage');


const userSchema=new Schema({
    username:{
        type:String,
        required:true 
    },
    dob:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{ 
        type:String,
        required:true
    },
    phonenumber:{
            type:String,
            required:true
        }
})

module.exports=User=mongoose.model('User',userSchema);