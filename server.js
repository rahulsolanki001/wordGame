import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
const app = express();


//mongodb connection
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 


 // defining user model schema 
const userSchema=new mongoose.Schema({
  username:{type:String,required:true},
  scores:[Number],
  maxLevel:Number
});

const User=mongoose.model("User",userSchema)



const port = process.env.PORT || 5000;
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//returning all users
app.get('/', async (req, res) => {
  const data=await User.find().sort({scores:-1}).limit(10)
  res.send(data)
});

app.post("/",async (req,res)=>{
  console.log(req.body)
  const username=req.body.username;
  
  if(!username){
    return res.status(422).json({error:"Username is required"});
  }
  const userExist=await User.findOne({username:username})
  if(userExist){
    res.status(202).json({
      message : "User identified",
      id:userExist.id
    })
  }
  else{
    const user= new User({
      username:username,
      scores:[],
      maxLevel:1
    })
    await user.save();
    res.status(201).json({
      message:"New user created successfully!!",
      id:user.id
    });
  }
  }
)

app.get("/:id",async(req,res)=>{
  const user=await User.findById(req.params.id)
  console.log(user)
  if(!user){
    res.send("user not found")
  }else{
    res.send("hi there, "+user.username)
  }
})

app.put("/:id",async(req,res)=>{
  const user=await User.findById(req.params.id)
  const score=req.body.score
  const maxLevel=req.body.level
  if(!user){
    res.status(402).json({message:"No user found by the given id"})
  }else if(score){
    user.scores.push(score);
    user.maxLevel=maxLevel
    await user.save();
    res.status(200).json({message:"Updated Successfully",username:user.username})
  }
})


if(process.env.NODE_ENV=="production"){
  app.use(express.static("frontend/build"));
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});