import { IUser } from "./user.entity";

class UserRepository {
    private users: IUser[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      createdAt: new Date('2025-01-01T10:00:00Z'),
      updatedAt: new Date('2025-01-01T10:00:00Z'),
      password: 'hashed-password'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: new Date('2025-02-01T12:00:00Z'),
      updatedAt: new Date('2025-02-01T12:00:00Z'),
      password: 'hashed-password'
    },
    {
      id: '3',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      createdAt: new Date('2025-03-01T14:30:00Z'),
      updatedAt: new Date('2025-03-01T14:30:00Z'),
      password: 'hashed-password'
    }
  ];
  private idCount = 4;
  
  findAll(): IUser[] {

    return this.users;
  }

  findById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): IUser | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(user: Omit<IUser, "id" | "createdAt" | "updatedAt">): IUser {
    const newUser = {...user, 
        id: this.idCount.toString(),
        createdAt: new Date(),
        updatedAt: new Date()

    };
    this.users.push(newUser);
    this.idCount++;
    return newUser;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  update(id: string, data: Partial<IUser>): IUser | undefined {

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;
    if (data.name) this.users[userIndex]!.name = data.name;
    if (data.email) this.users[userIndex]!.email = data.email;
    if (data.avatar) this.users[userIndex]!.avatar = data.avatar;
    
    return this.users[userIndex];

  }
}
export default new UserRepository();