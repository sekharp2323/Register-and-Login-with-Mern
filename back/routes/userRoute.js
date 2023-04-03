const router=require('express').Router();
const uModel=require('../models/UserModel');
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const protect=require('../middlewares/middleauth');

router.post("/reg",async(req,res)=>{
    const {email,password,password2}=req.body;
    if(!email || !password || !password2)
    return res.status(401).json({message:"Please enter all the fields"});
    const existing=await uModel.findOne({email});
    if(existing)
    return res.status(401).json({message:"Entered Email is already registered"});
    if(password.length<6)
    return res.status(401).json({message:"Password must be atleast 6 characters"});

    if(password !==password2)
    return res.status(401).json({message:"Passwords must match"});

    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);
    
    const newUser=await new uModel({email,
        password:passwordHash});
    const saveUser=await newUser.save();
    
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.json({data:newUser,token:token});
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    return res.status(401).json({message:"Please Enter Both Email and Password"});
    const existing=await uModel.findOne({email});
    if(!existing)
    return res.status(401).json({message:"Entered Email is not registered"});
    const validPassword= await bcrypt.compare(req.body.password,existing.password)
    if(!validPassword)
    return res.status(401).json({message:"Invalid password"});

    const token=jwt.sign({id:existing._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.json({token:token});
})

router.post("/me",protect, (req,res)=>{
    res.json(req.user);
})


module.exports=router;