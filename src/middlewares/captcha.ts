import svgCaptcha from 'svg-captcha';
import session from 'express-session';
import { Request, Response } from 'express';

declare module "express-session" {
  interface SessionData {
    captcha?: string; 
  }
}

export const authCaptcha = async(req:Request,res:Response)=>{
    // Always generate a new captcha
    const captcha = svgCaptcha.create({
      size: 4, // length of random string
      noise: 2, // number of noise lines
      color: true,
      background: '#f0f0f0'
    });
    (req.session as any).captcha = captcha.text;

  // Send the SVG image data to the React frontend
  res.type('svg');
  res.status(200).send(captcha.data);
  
}