import { Request, Response } from "express";
import { IResult } from "../interfaces/Result";
import UserService from "../services/user";
import { setTokensHeaders } from "../utils/User/Token";

import jwt from 'jsonwebtoken';

class UserController extends UserService {
    public static async login(req: Request, res:Response){
        const result:IResult = await UserService.loginService(req.body);
        
        if(result.status === 200) setTokensHeaders(res, req, result.message);

        res.status(result.status).json(result.message);
    }

    public static async createUser(req: Request, res:Response){
        const result:IResult = await UserService.create(req.body);

        if(result.status === 200) setTokensHeaders(res, req, result.message);

        res.status(result.status).json(result.message);
    }

    public static async deleteUser(req: Request, res:Response){
        const result:IResult = await UserService.delete(req.body);
        res.status(result.status).json(result.message);
    }
}

export default UserController;