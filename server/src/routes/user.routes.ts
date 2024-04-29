import express from 'express';
import { getUserByIdController, createUserController, updateUserController, deleteUserController } from '../controller/user.controller';

const router = express.Router();

// GET user by ID
router.get('/:id', getUserByIdController);

// POST create a new user
router.post('/', createUserController);

// PUT update an existing user
router.put('/:id', updateUserController);

// DELETE delete a user
router.delete('/:id', deleteUserController);

export default router;
