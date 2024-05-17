import { NextFunction ,Request, Response } from "express";

function transactionUpdate(req: Request, res: Response, next: NextFunction){
    const {value, date , type ,description} = req.body;

    if (value || date || type || description){
     return next();
       
    }
    return res.status(400).json({success: false, msg: "Campo valor, data, tipo e descrição obrigatórios."});
}
export default transactionUpdate;