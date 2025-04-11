

export interface ICreateTrainer {
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface IUpdateProfile{
    firstName?:string
    lastName?:string,
    email?:string
}