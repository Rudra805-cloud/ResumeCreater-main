import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklist.model.js";
/**
 * @name handelUserRegisterController
 * @description Handle user register contain user name ,password etc
 * @access public 
 */

async function handelUserRegisterController(req,res) {
    const {username,password,email}=req.body;
    if(!username || !password || !email ){
        return res.status(400).json({
                massage:"all field not filled"

            })
    }
    const  isUserAlreadyExists=await userModel.findOne({
    $or:[ {username},{email} ]
    })
    if(isUserAlreadyExists){
         return res.status(400).json({
                massage:"User already exist with username or email"
            })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,
        email,
       password: hash

    })
    const token =jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        massage:"User Register successfully",
        user : {
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}
/**
 * @name handelUserLoginController
 * @description Handle user login contain user name,email ,password 
 * @access public 
 */
  async function handelUserLoginController(req,res){
    const {password,email}=req.body;
    if(!password || !email ){
        return res.status(400).json({
                massage:"all field not filled"

            })
    }
    const  user=await userModel.findOne({email})
    if(!user){
         return res.status(400).json({
                massage:"User not exist with username or email"
            })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
         return res.status(400).json({
                massage:"User password is wrong"
            })
    }
    const token =jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        massage:"User loged in sussesfully",
        id:user._id,
        email:user.email
    })

  }
  /**
 * @name handelUserLogoutController
 * @description Handle user logout 
 * @access public 
 */
  async function handelUserLogoutController(req,res){
    const token=req.cookies.token
    console.log("token:", token);


    if(token){
      await blacklistTokenModel.create({token })
    }
    res.clearCookie("token")
    res.status(200).json({
        massage:"User logout sussesfully"
    })
  }
    /**
 * @name handelGetmeController
 * @description get details of already loged in user 
 * @access public 
 */
async function handelGetmeController(req,res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}
export {handelUserRegisterController,handelUserLoginController,handelUserLogoutController,handelGetmeController}