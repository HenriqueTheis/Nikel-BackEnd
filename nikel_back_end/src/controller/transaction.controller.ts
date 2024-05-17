import { Request, Response } from "express";
import repository from "../database/repository";

class TransactionController {
    async index(req: Request, res: Response){
        try{
            const transactions = await repository.transactions.findMany();

        return res.status(200).json({success: true, data: transactions});
        } catch(error){
            return res.status(500).json({success: false, msg: "Error ao buscar as transactions"});
        }
        
    }
    async create(req: Request, res: Response){
        const {value, type, description, date} = req.body;
        try{
            const transaction = await repository.transactions.create({
                data: {
                    value: Number(value),
                    date:new Date(date),
                    type: Number(type),
                    description
                }
            });
            return res.status(200).json({success: true, msg: "Lançamento Realizado com sucesso"});
        } catch(error){
            return res.status(500).json({success: false, msg: "Error ao lançar as transactions"});
        }
        
    }
    async show(req: Request, res: Response){
        const { id } = req.params;
        try{
            const transaction = await repository.transactions.findUnique({
                where: {id: Number(id)}
            });
            return res.status(200).json({success: true, data: transaction}); 
        } catch (error){
            return res.status(500).json({success: false, msg: "Error ao buscar a transaction"});
        }
       
    }
    async update(req: Request, res: Response){
        
        const { id } = req.params;
        const {value, type, description, date} = req.body;
        
        try{
            const transaction = await repository.transactions.update({
                where:{ id: Number(id)},
                data: {
                    value: Number(value),
                    date:new Date(date),
                    type: Number(type),
                    description
                }
                
            });
            
            return res.status(200).json({success: true, msg: "Update Realizado com sucesso"});
            
        } catch(error){
            return res.status(500).json({success: false, msg: "Error ao Altetrar transactions"});
        }
    }
    async delete(req: Request, res: Response){
        const { id } = req.params;
        try{
            const transaction = await repository.transactions.delete({
                where:{id: Number(id)}
            });   
            return res.status(200).json({success: true, msg: "Transaction Deletada com sucesso"});         
        } catch(error){
            return res.status(500).json({success: false, msg: "Error ao Deletar transactions"});
        }
        }
    }


export default TransactionController;