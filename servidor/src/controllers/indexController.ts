import {Request, Response } from 'express';

class IndexController{
    public index (req: Request, res: Response) {
        res.json({text: 'API Is /api/reservas'})
    } 
}

export const indexController = new IndexController();