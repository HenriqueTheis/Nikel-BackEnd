import { Request, Response } from "express";
import repository from "../database/repository";

class UserController{
    async index(req: Request, res: Response){
        try{
            const users =await repository.users.findMany();//[findMany]= traz todos os usuário do banco - Repository é da arquivo repository.ts
        
            return res
            .status(200)
            .json({success: true, data: users});

        } catch (error){
            res.status(500).json({success: false, msg: "Erro ao buscar usuários"});
        }
       
    }
    async create(req: Request, res: Response){
        const {login, password} = req.body;
        try{
        const create = await repository.users.create({
            data: {login, password},
        });        
        return res
        .status(200)
        .json({success: true, msg:"usuário criado com sucesso"});

        } catch (error){
            res
            .status(500)
            .json({success: false, msg: "Erro ao criar usuários"});
        }
    }

    async update(req: Request, res: Response){
        const {id} = req.params;
        const {name, password}= req.body;
        try {
            const updateDB = await repository.users.update({
                where: {id: Number(id)},
                data: {
                    name: name,
                    password: password,
                },
            });
            res
            .status(200)
            .json({success: true, msg: "Usuário atualizado com sucesso."});
        } catch (error){
            res
            .status(500)
            .json({success: true, msg: "Erro ao atualizar o usuário"});
        }
    }
    async show(req: Request, res: Response){
        const {id} = req.params;
        try {
            const user = await repository.users.findUnique({
                where: {id: Number(id)},
                
            });
            return res
            .status(200)
            .json({success: true, data: user});

        } catch (error) {
            res
            .status(500)
            .json({success: true, msg: "Erro ao buscar o usuário"}); 
        }

    }
    async delete(req: Request, res: Response){
        const {id} = req.params;
        try{
            const deleteDB = await repository.users.delete({
                where: { id: Number(id)},
            });
            return res.status(200).json({ success: true, msg : "Usuário excluido com sucesso."});
        } catch (error){
            return res.status(400).json({ success: false, msg: "Falha ao excluir usuário."});
        }
        
    }
}


export default UserController;