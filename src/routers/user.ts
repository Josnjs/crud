import { Request, Response, Router } from 'express';
import UserService from '../services/user-service';
import { authentic } from '../middlewares/authenticMiddleware';

const router = Router();

router.get('/', authentic, async (req: Request, res: Response) => {
    const user = await UserService.getAll();
    res.status(201).send(user);
});

router.get('/:document', authentic, async (req: Request, res: Response) => {
    const userIndex = await UserService.getByDocument(req.params.document);
    if (!userIndex) return res.status(400).send({ message: "User not found" })

    res.status(201).send(userIndex);
});

router.post('/', authentic, async (req: Request, res: Response) => {
    if (req.body.age < 16 || req.body.name === undefined || req.body.email === undefined || req.body.password === undefined || req.body.document === undefined) {
        return res.status(400).send({ message: "Unauthorized user, please fill in all fields correctly..." });
    }
    await UserService.createUser(req.body);
    res.status(201).send({ message: "User created" });
});

router.post('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await UserService.authorization(req.body.document, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message })
    }
});

router.delete('/remove/:document', authentic, async (req: Request, res: Response) => {
    try {
        await UserService.removeUser(req.params.document);
        res.status(200).send({ message: "User removed..." });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }

});

router.put('/:document', authentic, async (req: Request, res: Response) => {
    try {
        await UserService.updateUser(req.params.document, req.body);
        res.status(200).send({ message: "User updated..." })
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;