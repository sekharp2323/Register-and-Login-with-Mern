const mongoose=require('mongoose');

const uschema=new mongoose.Schema({
    email:{type:String,},
    password:{type:String,},
    password2:{type:String,},
});

const uModel=mongoose.model("cookies",uschema);
module.exports=uModel;