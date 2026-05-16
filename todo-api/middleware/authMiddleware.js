import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try{
        // getting token from the request header
        const token = req.headers.authorization?.split(" ")[1];
        // authorization header looks like : "Bearer eyKJNdjkabcn...."
        // hence we take index[1];

        // if no token block the request
        if(!token){
            return res.status(401).json({message: "No token, access denied"});
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user info to request
        req.user = decoded;

        // move on to the actual route
        next();

    } catch(err) {
        res.status(401).json({message: "Invalid or expired token!"});
    }
};

export default authMiddleware;