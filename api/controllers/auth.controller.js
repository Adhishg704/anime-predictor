import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ errorMsg: "User already registered" });
    }
    await newUser.save();
    return res.status(200).json("Signup successful");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
        return res.status(404).json({errorMsg: "User not found"});
    } 
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) {
        return res.status(400).json({errorMsg: "Invalid password"});
    }
    const {password: pass, ...rest} = validUser._doc;
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    return res.status(200).cookie("access_token", token, {
        httpOnly: true
    }).json(rest);
  } catch (error) {
    console.log(error);
  }
};
