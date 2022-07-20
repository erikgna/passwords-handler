export interface IUser {
    id: number;
    email: string;
    userName: string;
    password: string;
    confirmPassword?: string;
    accessToken?: string;
    refreshToken?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IToken{
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshToken{
    id: number;
    iat: number;
    exp: number;
}