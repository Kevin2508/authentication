import svgCaptcha from 'svg-captcha';
import session from 'express-session';
import { Request, Response } from 'express';

declare module "express-session" {
  interface SessionData {
    captcha?: string; // Add your custom properties here
  }
}

export const authCaptcha = async(req:Request,res:Response)=>{
    // Only generate new captcha if one doesn't exist
    if (!(req.session as any).captcha) {
      const captcha = svgCaptcha.create({
        size: 4, // length of random string
        noise: 2, // number of noise lines
        color: true,
        background: '#f0f0f0'
      });
      (req.session as any).captcha = captcha.text;
      (req.session as any).captchaImage = captcha.data;
    }

  // Send the SVG image data to the React frontend
  res.type('svg');
  res.status(200).send((req.session as any).captchaImage);
  
}