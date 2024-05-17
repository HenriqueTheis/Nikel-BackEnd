import { NextFunction ,Request, Response } from "express";

function transactionCreate(req: Request, res: Response, next: NextFunction){
    const{value, date, type, description} = req.body;

    if (!value || !date || !type || !description){
        return res.status(400).json({success: false, msg: "Campos valor, data, tipo e descrição são obrigatórios."});
    }
    next();
}
export default transactionCreate;