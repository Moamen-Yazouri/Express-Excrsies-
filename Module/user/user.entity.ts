export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  password: string; 
}
