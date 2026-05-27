import jwt from jsonwebtoken;
import 'dotenv/configure';


export default function authMiddleware(req, res, next){

    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        const valid = jwt.verify(token, process.env.PRIVATE_KEY);

        req.user = valid;

        next();

    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}