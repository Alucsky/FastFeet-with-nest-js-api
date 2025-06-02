import {
  Prisma,
  User as PrismaUser,
  UserType as PrismaUserType,
} from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  User,
  UserType,
} from "@/domain/authentication/enterprise/entities/user";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        password: raw.password,
        userType: raw.userType as UserType,
        role: raw.role as UserType,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      userType: user.userType as PrismaUserType,
      role: user.role as PrismaUserType,
    };
  }
}
