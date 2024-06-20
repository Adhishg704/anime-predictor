import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(401).json({errorMsg: "User already registered"});
        }
        await newUser.save();
        return res.status(200).json("Signup successful");
    } catch (error) {
        console.log(error);
    }
}