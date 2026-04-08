import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);

router.get("/profile", protect , async(req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        res.json({ success:true, user });
    }catch(error){
        res.status(500).json({ success:false, message: "Server error" });
    }
});

export default router;