import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.json({ status: 404, message: "Missing Required Details" });

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ status: 409, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const { password: _, ...userDetails } = newUser.toObject();

        return res.json({ status: 201, message: "User Created Successfully", token, user: userDetails });

    } catch (error) {
        console.log('error', error);
        return res.json({ status: 502, error: "Internal Server Error" });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ status: 404, message: "Missing Required Details" });

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: 404, message: "User Not Found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ status: 401, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const { password: _, ...userDetails } = user.toObject();

        return res.json({ status: 200, message: "Login Successful", token, user: userDetails });

    } catch (error) {
        console.log('error', error);
        return res.json({ status: 502, error: "Internal Server Error" });
    }
}

const getMe = async (req,res) => {
    try {
        const userId = req.user.id

        if(!userId)
            return res.json({status:401, message:"Unauthorized"})

        const userDetails = await User.findById(userId).select("-password");
        
        return res.json({ status: 200, message: "User fetched successfully", user: userDetails });
    } catch (error) {
        console.log('error', error);
        return res.json({ status: 502, error: "Internal Server Error" });
    }
}

export { Signup, Login, getMe };