import { RowDataPacket } from "mysql2";

export interface signUp extends RowDataPacket{
    id : number;
    userName: string;
    email: string;
    password: string;
    roleId: number;
}

export interface RoleRow extends RowDataPacket{
    id: number;
    roleName: string;
}

export interface User extends RowDataPacket{
    userName:string;
    email:string;
    pswd:string;
    roleId:number;
}