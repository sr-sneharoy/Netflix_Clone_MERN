import { User } from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


export const Login = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password) { 
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    } 
    const user = await User.findOne({ email });
    if (!user) { 
      return res
        .status(401)
        .json({ message: 'Invalid email or password!!!', success: false });
    } 
    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){ 
      return res
        .status(401)
        .json({ message: 'Invalid email or password!!!', success: false });
    } 

    const token = jwt.sign({ id: user._id }, "ahgdudygbvuebeub", { expiresIn: "1h" });


    return res.status(200).cookie("token", token).json({
      message: `Welcome back ${user.fullName}`, user, success:true
    });


  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }

}



export const Logout = async (req, res) => {
  return res.status(200).clearCookie("token").json({
    message: "Logged out successfully", success: true
  });
}




export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists', success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);


    await User.create({ 
      fullName, 
      email, 
      password: hashedPassword 
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};
