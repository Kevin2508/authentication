// import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import db from '../config/db.config';
import { RoleRow, User } from '../types';

interface AuthenticatedRequest extends Request{
    id?:number;
    user?:User;
}

export const verifyToken = async(req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    let token = req.headers["authorization"];
    if(!token || typeof token !== "string"){
       res.status(403).json({
            message:"No token provided",
        });
        return;
    }
    if(token?.startsWith("Bearer ")){
        token = token.slice(7);
    }
    
    try {
        const decode = jwt.verify(token, authConfig.secret) as JwtPayload;
        const [user] = await db.query<User[]>(`select * from users where id = ?`, [decode.id]);
        if(user.length == 0){
            res.status(404).json({
                message:"No user Data found",
            });
        }
        req.user= user[0]
    } catch (error) {
        console.error(error);
    }
    next();
}

export const isAdmin = async(req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    const user = req.user;
    const role = "admin";
    console.log(user);
    
    const [roles] = await db.query<RoleRow[]>(`select * from roles where roleName = ?`, [role]);
    if(user?.roleId != roles[0].id){
        res.status(404).json({
            Message:"Not permitted",
        });
    }
    next();
}