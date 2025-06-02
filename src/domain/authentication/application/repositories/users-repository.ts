import { User } from "../../enterprise/entities/user";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}
