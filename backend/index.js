const express=require("express");

const cors=require("cors");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("./JWT_SECRET");;
require("dotenv").config(); 
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
  localhoost: 'localhost',
  dialect:'mysql',
});

const app=express();
app.use(express.json());
app.use(cors());

const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
    },
    phonenumber: {
      type: DataTypes.STRING(20),
    },
    jwt_token: {
      type: DataTypes.STRING(512),
      
    },
  }, {
    timestamps: false,
    
   
  });
app.post("/signup", async (req,res)=>{
    const {username, dob, email, password, gender, phonenumber}=req.body;
   
   
        const user = await User.create({
            username,
            dob,
            email,
            password,
            gender,
            phonenumber
        });
        
        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
   
});

app.post("/signin", async (req, res) => {
 
        const user = await User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });

        if (user) {
            const token = jwt.sign({ userid: user.user_id }, JWT_SECRET);

            res.json({ token: token });
            res.json({ msg: "User logged in successfully" });
            return;
        }

        res.status(401).json({ message: "Error while logging in" });
  
});


app.listen(3000);