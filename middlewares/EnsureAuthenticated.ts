require('dotenv').config()

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthentication (req: Request, res: Response, next: NextFunction) {
    const encodedToken:string | undefined = req.headers.authorization;

    if(!encodedToken){
        return res.status(401).json("User unauthorized.");
    }

    const token:string = encodedToken.split(" ")[1];

    try{
        if(process.env.SECRET) verify(token, process.env.SECRET);

        return next();
    }
    catch(error){   
        res.redirect(`http://localhost:3000/api/v1/user/${req.body.refresh_token}`)
    }
}

// try {
//     const refresh_token:string = req.body.refresh_token;
//     if(process.env.SECRET) verify(refresh_token, process.env.SECRET);

//     const teste = await refreshToken(refresh_token);

//     res.status(200).send(teste);    
// } catch (error) {
//     res.status(401).json("Token invalid");    
// }