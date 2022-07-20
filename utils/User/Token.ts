import { Request, Response } from "express";
import { IToken } from "../../interfaces/User";

export const setTokensHeaders = (res:Response, req:Request, tokens:IToken) => {
    res.setHeader('authorization', `Bearer ${tokens.accessToken}`);
    res.setHeader('refreshToken', tokens.refreshToken);
}