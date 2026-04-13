import mongoose from "mongoose";

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},{timestamps:true})

const blacklistTokenModel=mongoose.model("blacklistTokenModel",blacklistTokenSchema)
export default blacklistTokenModel