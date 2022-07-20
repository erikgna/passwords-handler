export interface ICategory {
    id: number;
    categoryName: string;
    userID: number;
    categoryTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
}