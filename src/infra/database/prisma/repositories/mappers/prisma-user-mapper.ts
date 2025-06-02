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
        userType: this.convertUserType(raw.userType),
        role: this.convertUserType(raw.role as PrismaUserType),
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
      userType: this.convertToPrismaUserType(user.userType),
      role: this.convertToPrismaUserType(user.role),
    };
  }

  private static convertUserType(userType: PrismaUserType): UserType {
    switch (userType) {
      case "ADMIN":
        return "admin";
      case "RECIPIENT":
        return "recipient";
      case "DELIVERYMAN":
        return "deliveryman";
      default:
        throw new Error(`Invalid UserType: ${userType}`);
    }
  }

  private static convertToPrismaUserType(userType: UserType): PrismaUserType {
    switch (userType) {
      case "admin":
        return "ADMIN";
      case "recipient":
        return "RECIPIENT";
      case "deliveryman":
        return "DELIVERYMAN";
      default:
        throw new Error(`Invalid UserType: ${userType}`);
    }
  }
}
