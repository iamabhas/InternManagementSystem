import UserSchema, { IUser } from '../../database/schema/user.schema';

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user: IUser | null = await UserSchema.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to get user by ID');
  }
};

export const createUser = async (userData: any): Promise<IUser> => {
  try {
    const newUser: IUser = await UserSchema.create(userData);
    return newUser;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};


export const updateUser = async (userId: string, userData: any): Promise<IUser | null> => {
  try {
    const updatedUser: IUser | null = await UserSchema.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};


export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await UserSchema.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
