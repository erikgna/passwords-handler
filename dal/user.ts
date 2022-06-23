require('dotenv').config()

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'

import { UserError } from '../errors/UserError'
import { IRefreshToken, IToken, IUser } from '../interfaces/User'
import { User } from '../models'
import { UserVerifications } from '../utils/User/UserVerifications';

export const login = async (payload: IUser): Promise<IToken> => {
    const verification:UserVerifications = new UserVerifications(payload);

    verification.verifyEmail();
    verification.verifyName();
    verification.verifyPassword();

    const dbUser = await User.findOne(
        {
            where: { email: payload.email }
        }
    );

    if(!dbUser) throw new UserError(400, "Couldn't find an user with this email.");

    if(!bcrypt.compare(payload.password, dbUser.password)) throw new UserError(400, "Passwords doesn't match.");

    if(process.env.SECRET) {
        dbUser.access_token = jwt.sign({ name: payload.user_name, id: dbUser.id }, process.env.SECRET, { expiresIn: '15m' });
        dbUser.refresh_token = jwt.sign({ id: dbUser.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await dbUser?.update(dbUser);

    return { access_token: dbUser.access_token, refresh_token: dbUser.refresh_token };
}

export const create = async (payload: IUser): Promise<IToken> => {
    const verification:UserVerifications = new UserVerifications(payload);

    verification.verifyEmail();
    verification.verifyName();
    verification.verifyPassword();

    if(payload.confirmPassword !== payload.password) throw new UserError(406, "Passwords doesn't match");
    
    payload.password = await bcrypt.hash(payload.password, 12);

    const user = await User.create(payload);

    if(!user) throw new UserError(400, "Couldn't create password.");

    if(process.env.SECRET) {
        user.access_token = jwt.sign({ name: payload.user_name, id: user.id }, process.env.SECRET, { expiresIn: '15m' });
        user.refresh_token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await user.save();

    return { access_token: user.access_token, refresh_token: user.refresh_token };
}

// export const update = async (id: number, payload: IUser): Promise<IUser> => {
//     const verification:UserVerifications = new UserVerifications(payload);
    
//     const password = await User.findByPk(id);

//     if (!password) throw new UserError(406, 'This password was not found');

//     payload.password = await bcrypt.hash(payload.password, 12);

//     const updatedPassword = await password.update(payload);

//     if(!updatedPassword) throw new UserError(400, "Couldn't update password");

//     return updatedPassword;
// }

export const deleteUser = async (payload: IUser) => {
    const user = await User.findByPk(payload.id);

    if(!user) throw new UserError(400, "Couldn't find user.");

    if(!bcrypt.compare(payload.password, user.password)) throw new UserError(400, "Passwords doesn't match.");

    const deletedPasswordCount = await User.destroy({
        where: { id: user.id }
    })

    if (deletedPasswordCount === 0) throw new UserError(406, 'User to delete not found');
}

export const verifyEmail = async (id: number): Promise<IUser> => {
    const password = await User.findByPk(id);

    if (!password) throw new UserError(406, 'This password was not found');

    return password;
}

export const refreshToken = async (refreshToken: string): Promise<IToken> => {
    console.log(refreshToken)
    const decodedToken:IRefreshToken = jwt.decode(refreshToken) as IRefreshToken;
    
    if(!decodedToken) throw new UserError(401, 'No token provided');
    
    const user = await User.findByPk(decodedToken.id);

    if (!user) throw new UserError(406, 'No user found');

    if(user?.refresh_token !== refreshToken) throw new UserError(401, 'Token invalid');

    if(process.env.SECRET) {
        user.access_token = jwt.sign({ name: user.user_name, id: user.id }, process.env.SECRET, { expiresIn: '15m' });
        user.refresh_token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await user.save();

    return { access_token: user.access_token, refresh_token: user.refresh_token };
}