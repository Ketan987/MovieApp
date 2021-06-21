import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image : {
    type : String,
  },
  username :{
    type : String,
    required : true,
    unique : true
  },
  email:{
    type : String,
    required: true,
    unique : true
  },
  password:{
    type : String,
    required: true
  },
  posts: [
    {type : mongoose.Schema.Types.ObjectId, ref : 'postData'}
  ]
},{collection : "userData", timestamps:true})

export default mongoose.model("userData", userSchema);

