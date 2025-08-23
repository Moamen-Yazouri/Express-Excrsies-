import { IUser } from "./user.entity";
import userRepo from "./user.repo";

class UserService {
    getUsers(): IUser[] {
    return userRepo.findAll();
  }

  getUser(id: string): IUser | undefined {
    return userRepo.findById(id);
  }

  public findByEmail(email: string) {
    return userRepo.findByEmail(email);
  }

  public createUser(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ): IUser {
    return userRepo.create({
        name: name,
        email: email, 
        password: password, 
        avatar: avatar
    });
  }

  updateUser(id: string,data: Partial<IUser>) {
    return userRepo.update(id, data);
  }
  deleteUser(id: string) {
    return userRepo.delete(id);
  }
}
export default new UserService();