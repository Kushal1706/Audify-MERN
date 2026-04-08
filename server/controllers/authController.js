import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate JWT token
function generateToken(userId) {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );
}

// Register a new user
export async function register(req,res){
    try{
        const{name,email,password} = req.body;

        //1. Validate fields exist
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        //2. Validate password length
        if(password.length<8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long."
            });
        }

        //3. Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 6. Generate JWT token
        const token = generateToken(user._id);

        // 7. Send response with user data and token
        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
}

// Login an existing user
export async function login(req,res){
    try{
        const{email,password} = req.body;
    
        //1. Validate fields exist
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
    
        //2. Find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }
    
        //3. Compare password with hash
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }
    
        //4. Generate JWT token
        const token = generateToken(user._id);
    
        //5. Send response with user data and token
        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch(error){
        //console.log("Login error", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
}