require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const uModel=require('./models/UserModel');
const userRoute=require('./routes/userRoute');

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sekhar1:ZaP3D1SntNztmKW0@cluster0.jhoncfk.mongodb.net/Token?retryWrites=true&w=majority").then(()=>{console.log("Connected to dabase")}).catch(
    ()=>{console.log("Not connected to database")}
);

app.listen(4000,()=>{
    console.log("Live with True Spirit");
})

app.use("/auth",userRoute);

