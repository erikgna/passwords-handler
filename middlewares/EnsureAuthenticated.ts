require('dotenv').config()

import { NextFunction, Request, Response } from "express";
import { verify, decode } from "jsonwebtoken";
import { refreshTokenFunction } from "../dal/user";
import { IRefreshToken, IToken } from "../interfaces/User";
import { setTokensHeaders } from "../utils/User/Token";

export async function ensureAuthentication (req: Request, res: Response, next: NextFunction) {
    try{
        const authorization:string | undefined = req.headers.authorization;        

        if(!authorization){
            return res.status(401).json("User unauthorized.");
        }

        const token:string = authorization.split(" ")[1];

        const decodedToken = decode(token) as IRefreshToken;

        req.body['userID'] = decodedToken['id'];

        
        if(process.env.SECRET) verify(token, process.env.SECRET);

        return next();
    }
    catch(error){
        try {
            const refreshToken:string = req.headers.refreshtoken as string;
            
            if(!refreshToken){
                return res.status(401).json("User unauthorized.");
            }            

            if(process.env.SECRET) verify(refreshToken, process.env.SECRET);

            const tokens:IToken = await refreshTokenFunction(refreshToken);

            setTokensHeaders(res, req, tokens);
            
            return next();
        } catch (error) {
            return res.status(401).json("Token invalid.");
        }
    }
}
