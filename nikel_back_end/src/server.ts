import express, { Request, Response } from 'express';
import cors from 'cors';
import UserController from './controller/user.controller';
import userCreate from './middleware/user-create.middleware';
import userUpdate from './middleware/user-update.middleware';
import existUser from './middleware/user-exist.middleware';
import TransactionController from './controller/transaction.controller';
import existTransaction from './middleware/tramnsaction-exist.middleware copy';
import transactionCreate from './middleware/transaction-create.middleware copy';
import AuthController from './controller/auth.controller';
import auth from './middleware/auth.middleware';



const app = express();//chamando uma variavel para usar o express
const port = 3333;//incluindo uma porta para o local 3333





app.use(cors());// Express.usar.Cors
app.use(express.json());// Express.usar.Express.Json

app.listen(port, ()=>{
    console.log(`Server está rodando na porta ${port}`);
}) //mostra que esse servidor está ouvindo a porta

app.get("/", (req: Request, res: Response )=> {
    res.status(200).json({success: true, msg:"Back-End Nikel"});

})

const controllerAuth = new AuthController();
app.post("/login",controllerAuth.create);

const controllerUser = new UserController();
app.post("/users",userCreate ,controllerUser.create);

app.use(auth);// Middleware de autenticação aplicado para todas as rotas abaixo
app.get("/users",auth, controllerUser.index);// Visualizar usuários
app.put("/users/:id",[auth,existUser ,userUpdate], controllerUser.update);// Atualizar a informação de um usuário
app.delete("/users/:id",[auth,existUser],controllerUser.delete);// Deletar usuário
app.get("/users/:id",[auth, existUser],controllerUser.show);// Visualizar 1 usuário, representado pelo ID

const controllerTransaction = new TransactionController(); // transaction
app.get("/transactions", controllerTransaction.index); //Ver transactions
app.post("/transactions",transactionCreate,controllerTransaction.create);// Criar Transaction
app.put("/transactions/:id",existTransaction,controllerTransaction.update);// Atualizar Transaction de um ID
app.delete("/transactions/:id",existTransaction,controllerTransaction.delete);// Deletar Transaction
app.get("/transactions/:id",existTransaction,controllerTransaction.show);// Visualizar transaction de um ID