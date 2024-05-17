import { NextFunction, Request, Response } from "express";
import repository from "../database/repository";

async function auth(req: Request, res: Response, next: NextFunction){
    const {user, password} = req.headers;

    if(user && password){
        const userLoged = await repository.users.findUnique({
            where: {login: `${user}`,password: `${password}`},
            
        });
        if(userLoged){
            console.log("userLoged");
            return next();
        }

        
        console.log("User && password");
    
    }
    return res.status(400).json({success: false, msg: "usuário não logado."});
    
}

export default auth;