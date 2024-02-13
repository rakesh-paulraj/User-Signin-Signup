const express=require("express");
const zod =require("zod");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../JWT_SECRET");;
const User=require("../db");
const app=express();
app.use(express.json());

const signupbody = zod.object({
    username: zod.string(),
	phonenumber: zod.string(),
	email: zod.string(),
	password: zod.string(),
    gender: zod.string(),
    dob: zod.string()
})
const router=express.Router();
app.post("/signup", async (req,res)=>{
    const body=req.body;
   
   
        const user = await User.create(body);
        
        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
   
});

app.post("/",async (req,res)=>{
    

    const user = await user.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userid: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
});

app.listen(3000);