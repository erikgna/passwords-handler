require('dotenv').config()

import { NextFunction, Request, Response } from "express";
import { verify, decode } from "jsonwebtoken";
import { refreshTokenFunction } from "../dal/user";
import { IRefreshToken, IToken } from "../interfaces/User";
import { setTokensHeaders } from "../utils/User/Token";

export async function ensureAuthentication (req: Request, res: Response, next: NextFunction) {
    const encodedToken:string | undefined = req.headers.authorization;

    if(!encodedToken){
        return res.status(401).json("User unauthorized.");
    }

    const token:string = encodedToken.split(" ")[1];

    const decodedToken = decode(token) as IRefreshToken;

    req.body['userID'] = decodedToken['id'];

    try{
        if(process.env.SECRET) verify(token, process.env.SECRET);

        return next();
    }
    catch(error){
        try {
            const refreshToken:string = req.headers.refreshToken as string;
            if(process.env.SECRET) verify(refreshToken, process.env.SECRET);

            const tokens:IToken = await refreshTokenFunction(refreshToken);

            setTokensHeaders(res, req, tokens);
   
            return next();
        } catch (error) {
            return res.status(401).json("Token invalid.");
        }
    }
}
