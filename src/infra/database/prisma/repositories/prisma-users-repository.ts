import { UsersRepository } from "@/domain/authentication/application/repositories/users-repository";
import { User } from "@/domain/authentication/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "./mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
