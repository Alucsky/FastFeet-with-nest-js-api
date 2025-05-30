import { User } from "@/domain/authentication/enterprise/entities/user";

export class InMemoryUsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id.toString() === id);
    return user || null;
  }

  async update(user: User): Promise<User> {
    const recipientIndex = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString()
    );
    if (recipientIndex !== -1) {
      this.items[recipientIndex] = user;
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((user) => user.id.toString() !== id);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.items.find((user) => user.cpf === cpf);
    return user || null;
  }
}
