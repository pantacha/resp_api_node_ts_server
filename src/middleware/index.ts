import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, resp: Response, next: NextFunction) => {

    const e = validationResult(req); // validaciones de resultado
    if(!e.isEmpty()){
        return resp.status(400).json({err: e.array()}); // si hay err devolver un estado 400 con los mensajes de err
    }

    next();

}