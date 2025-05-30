import { UsersRepository } from "@/domain/authentication/application/repositories/users-repository";
import { User } from "@/domain/authentication/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByCpf(cpf: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
