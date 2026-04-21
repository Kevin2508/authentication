import { Request, Response } from "express";
import authConfig from "../config/auth.config";
import bcrypt from 'bcryptjs';
import { RoleRow, User } from "../types";
import db from "../config/db.config";
import jwt from "jsonwebtoken";
import svgCaptcha from 'svg-captcha';
export const signup = async (req:Request, res:Response)=>{
    
    try {
        const {userName, email, password} = req.body;
        console.log(req.body);  
        const hashedPassword = await bcrypt.hash(password, 8);
        const roleName = 'user';
        console.log(hashedPassword);
        const [roleData] = await db.query<RoleRow[]>(
            `select id,roleName from roles WHERE roleName = ?`,
            [roleName]
        )
        console.log(roleData);
        console.log(req.body);
        res.send("VGHjkhf")
        const [result] = await db.query(`insert into users(userName, email, pswd, roleId) values(?,?,?,?)`,[userName, email, hashedPassword, roleData[0].id])
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export const signin = async(req:Request, res:Response)=>{
    try {  
        const email = req.body.email;
        const [user] = await db.query<User[]>(
            `select * from users where email = ?`,[email]
        );
        const isPasswordValid = bcrypt.compareSync(req.body.password, user[0].pswd);
        
        console.log(user);
        if(!isPasswordValid){
            return res.status(401).json({
                accessToken: null,
                message:'Invalid Data',
            })
        }
        const token = jwt.sign({id: user[0].id}, authConfig.secret, {
            expiresIn: 86400,
        });
        console.log(token);
        if(token){
            res.status(200).json({
                accessToken: token,
                message: 'Signin successfull',
            })
        }
    } catch (error) {
        console.error(error)
    }                                                                                                                                                                                                                                
}

