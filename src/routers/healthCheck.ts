import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ message: "Hello World" });
});

router.get('/check', (req: Request, res: Response) => {
    res.send({ message: "Hello World Health" });
});


export default router;