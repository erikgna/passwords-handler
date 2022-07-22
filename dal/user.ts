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
    verification.verifyPassword();

    const dbUser = await User.findOne(
        {
            where: { email: payload.email }
        }
    );

    if(!dbUser) throw new UserError(400, "Couldn't find an user with this email.");

    if(!bcrypt.compare(payload.password, dbUser.password)) throw new UserError(400, "Passwords doesn't match.");

    if(process.env.SECRET) {
        dbUser.accessToken = jwt.sign({ name: dbUser.userName, id: dbUser.id }, process.env.SECRET, { expiresIn: '15m' });
        dbUser.refreshToken = jwt.sign({ id: dbUser.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await dbUser.save();

    return { accessToken: dbUser.accessToken, refreshToken: dbUser.refreshToken };
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
        user.accessToken = jwt.sign({ name: payload.userName, id: user.id }, process.env.SECRET, { expiresIn: '15m' });
        user.refreshToken = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await user.save();

    return { accessToken: user.accessToken, refreshToken: user.refreshToken };
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

    const deletedPasswordCount = await User.destroy({
        where: { id: user.id }
    })

    if (deletedPasswordCount === 0) throw new UserError(406, 'User to delete not found');

    return;
}

export const verifyEmail = async (id: number): Promise<IUser> => {
    const password = await User.findByPk(id);

    if (!password) throw new UserError(406, 'This password was not found');

    return password;
}

export const refreshTokenFunction = async (refreshToken: string): Promise<IToken> => {
    const decodedToken:IRefreshToken = jwt.decode(refreshToken) as IRefreshToken;

    if(!decodedToken) throw new UserError(401, 'No token provided');
    
    const user = await User.findByPk(decodedToken.id);

    if (!user) throw new UserError(406, 'No user found');

    if(user?.refreshToken !== refreshToken) throw new UserError(401, 'Token invalid');

    if(process.env.SECRET) {
        user.accessToken = jwt.sign({ name: user.userName, id: user.id }, process.env.SECRET, { expiresIn: '15m' });
        user.refreshToken = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '14d' });
    }

    await user.save();

    return { accessToken: user.accessToken, refreshToken: user.refreshToken };
}