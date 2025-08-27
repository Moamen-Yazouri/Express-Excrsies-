import { IUser } from "../../user/user.entity";

export interface ILoginDTO {
    email: string,
    password: string,
}

export interface ILoginResponseDTO extends Omit<IUser, "password"> {};
export interface ISignUpResponseDTO extends Omit<IUser, "password"> {};

export interface ILoginResponseWithJWT  {
    token: string,
    user: Omit<IUser, "password">
};
export interface ISignUpDTO extends Pick<IUser, "password" | "name" | "email" | "avatar"> {};





