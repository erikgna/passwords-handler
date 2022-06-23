export interface IUser {
    id: number;
    email: string;
    user_name: string;
    password: string;
    confirmPassword?: string;
    access_token?: string;
    refresh_token?: string;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IToken{
    access_token: string;
    refresh_token: string;
}

export interface IRefreshToken{
    id: number;
    iat: number;
    exp: number;
}