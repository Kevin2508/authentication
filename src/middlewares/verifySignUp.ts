import { NextFunction, Request, Response } from "express";
import db from "../config/db.config";
import { User } from "../types";
export const checkDuplicateSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.body.userName;
    console.log(userName);
    const [user] = await db.query<User[]>(`select * from users where userName = ?`,[userName]);
    console.log('From Middleware: ',user)
    if(user.length > 0){
      return res.status(404).json({
        accessToken: null,
        message:'User Already exist',
      })
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
