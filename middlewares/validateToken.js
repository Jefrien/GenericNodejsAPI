import jwt from "jsonwebtoken";
import { errorTokens } from "../utils/errorsToken.js";

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("Unauthorized");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: errorTokens(error.message) });
    }
    
};