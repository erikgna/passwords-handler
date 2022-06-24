import { Request, Response } from "express";
import { IToken } from "../../interfaces/User";

export const setTokensHeaders = (res:Response, req:Request, tokens:IToken) => {
    res.setHeader('authorization', `Bearer ${tokens.access_token}`);
    res.setHeader('refresh_token', tokens.refresh_token);
}