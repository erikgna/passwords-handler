import { Request, Response } from "express";
import { IResult } from "../interfaces/Result";
import UserService from "../services/user";

class UserController extends UserService {
    public static async login(req: Request, res:Response){
        const result:IResult = await UserService.loginService(req.body);
        res.status(result.status).json(result.message);
    }

    public static async createUser(req: Request, res:Response){
        const result:IResult = await UserService.create(req.body);
        res.status(result.status).json(result.message);
    }

    public static async deleteUser(req: Request, res:Response){
        const result:IResult = await UserService.delete(req.body);
        res.status(result.status).json(result.message);
    }

    public static async newToken(req: Request, res:Response){
        const result:IResult = await UserService.refreshToken(req.params.token);
        res.status(result.status).json(result.message);
    }
}

export default UserController;