import { Router } from 'express';
import { uploadSingle } from '../../config/multer.config';
import userController from './user.controller';

const router = Router();



// GET /api/users - Get all users
router.get('/', userController.getUsers);

// GET /api/users/:uid - Get user by ID
router.get('/:uid', userController.getUser);

// POST /api/users - Create user (with optional avatar)
router.post('/', uploadSingle('avatar'), userController.createUser);

// PUT /api/users/:id - Update user (with optional avatar)
router.patch('/:id', uploadSingle('avatar'), userController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', userController.deleteUser);

export const userRouter = router;