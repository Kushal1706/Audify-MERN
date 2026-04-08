import jwt from "jsonwebtoken";

export function protect(req,res, next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "No token provided. Access denied."
            });
        }

        //Extract the token from the header
        const token = authHeader.split(" ")[1];
        
        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach the user information to the request object
        req.userId = decoded.id;

        //Move to next handler
        next();
    }
    catch(error){
        req.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}