import { User } from "../../enterprise/entities/user";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(userId: string): Promise<void>;
}
