import { NextFunction ,Request, Response } from "express";
import repository from "../database/repository";

async function existTransaction (req: Request, res: Response, next: NextFunction){
const{id} = req.params;
const transaction =  await repository.transactions.findUnique({
    where: {id: Number(id)}
});
if (transaction){
    return next();
}
    return res.status(400).json({success: false, msg: "Transaction não encontrado"});
}
export default existTransaction;