require('dotenv').config()

import bcrypt from 'bcrypt';

import { UserError } from '../errors/UserError'
import { IUser } from '../interfaces/User'
import { User } from '../models'
import { UserVerifications } from '../utils/User/UserVerifications';

export const getById = async (id: number): Promise<IUser> => {
    const user = await User.findByPk(id, {
        attributes: ['refresh_token', 'access_token']
    });

    if (!user) throw new UserError(406, 'This user was not found');

    return user;
}

export const create = async (payload: IUser): Promise<any> => {
    const verification:UserVerifications = new UserVerifications(payload);

    if(process.env.PASSWORD_HASH) payload.password = await bcrypt.hash(payload.password, process.env.PASSWORD_HASH);

    const password = await User.create(payload);

    if(!password) throw new UserError(400, "Couldn't create password.");

    return password;
}

export const update = async (id: number, payload: IUser): Promise<IUser> => {
    const verification:UserVerifications = new UserVerifications(payload);
    
    const password = await User.findByPk(id);

    if (!password) throw new UserError(406, 'This password was not found');

    if(process.env.PASSWORD_HASH) payload.password = await bcrypt.hash(payload.password, process.env.PASSWORD_HASH);

    const updatedPassword = await password.update(payload);

    if(!updatedPassword) throw new UserError(400, "Couldn't update password");

    return updatedPassword;
}

export const deleteById = async (id: number) => {
    const deletedPasswordCount = await User.destroy({
        where: {id}
    })

    if (deletedPasswordCount === 0) throw new UserError(406, 'Password to delete not found');
}

export const verifyEmail = async (id: number): Promise<IUser> => {
    const password = await User.findByPk(id);

    if (!password) throw new UserError(406, 'This password was not found');

    return password;
}