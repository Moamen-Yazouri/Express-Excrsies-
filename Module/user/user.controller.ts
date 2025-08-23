
import userService from "./user.service";
import { Request, Response } from 'express';
class UserController {
    getUsers(req: Request<{}, {}, {}, {page: string, limit: number}>, res: Response) {
        const users = userService.getUsers();
        res.json(users);
    }

    getUser = (req: Request<{ uid: string }>, res: Response) => {
        const id = req.params.uid;
        if (!id) return res.status(400).json({ error: 'ID required' });

        const user = userService.getUser(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    };

    
    createUser = (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const user = userService.createUser(name, email, password, avatar);
        res.status(201).json(user);
    };

    
    updateUser = (req: Request, res: Response) => {

        const id = req.params.uid;
        if (!id) return res.status(400).json({ error: 'ID required' });

        const { name, email } = req.body;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const user = userService.updateUser(id, {name: name, email: email, avatar: avatar});

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    };

    deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: 'ID required' });

        const deleted = userService.deleteUser(id);
        if (!deleted) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
  };
}

export default new UserController();