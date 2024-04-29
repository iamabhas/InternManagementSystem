import { Request, Response } from 'express';
import { getUserById, createUser, updateUser, deleteUser } from '../services/user/user.service';

// Get user by ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;

  try {
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const userData = req.body;

  try {
    const newUser = await createUser(userData);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing user
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;
  const userData = req.body;

  try {
    const updatedUser = await updateUser(userId, userData);

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;

  try {
    await deleteUser(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
