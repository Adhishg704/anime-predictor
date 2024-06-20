import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorGenerator } from "../utils/error.js";


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
            next(errorGenerator(401, "User already registered"));
        }
        await newUser.save();
        res.json("Signup successful");
    } catch (error) {
        console.log(error);
    }
}