import { NextFunction, Request, Response, Router } from "express";
import { validatioToken } from "../../middleware/validationToken";
import { CodesHttpEnum } from '../../enums/codesHttpEnum';



const routes = Router();    
routes.get('/list', validatioToken as any, async (req : Request, res:Response,nxt:NextFunction)=> {
	res.sendStatus(CodesHttpEnum.ok).json();
})

export default routes;
