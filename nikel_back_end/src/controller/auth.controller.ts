import { Request, Response } from "express";
import repository from "../database/repository";


class AuthController {
      async create (req: Request, res: Response){
        console.log("passou aqui 1");
        const{login, password}= req.body;
        
        const user = await repository.users.findUnique({
            where: {login, password},
        });
        console.log("passou aqui 2");
        if (!user){
            return res.status(401).json({success: false, msg: "Usuário ou senha não confere."});
        }

        return res.status(200).json({success: true, msg: "login realizado com sucesso"});
    }
}


export default AuthController;


// AUTENTICAÇÃO PARA PODER LOGAR 