import mongoose from "mongoose";


async function connectToDb() {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  }
  catch(err){
    console.log(err)
  }
    
}

export {connectToDb}
