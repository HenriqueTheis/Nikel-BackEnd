import { NextFunction ,Request, Response } from "express";
import repository from "../database/repository";

async function existUser (req: Request, res: Response, next: NextFunction){
const{id} = req.params;
const user =  await repository.users.findUnique({
    where: {id: Number(id)}
});
if (user){
    return next();
}
    return res.status(400).json({success: false, msg: "Usuário não encontrado"});
}
export default existUser;