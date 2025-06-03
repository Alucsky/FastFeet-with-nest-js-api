import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Deliveryman } from "@/domain/deliveries/enterprise/entities/deliveryman";
import {
  Deliveryman as PrismaDeliveryman,
  User as PrismaUser,
} from "@prisma/client";

type PrismaDeliverymanWithUser = PrismaDeliveryman & { user: PrismaUser };

export class PrismaDeliverymanMapper {
  static toDomain(raw: PrismaDeliverymanWithUser): Deliveryman {
    return Deliveryman.create(
      {
        name: raw.user.name,
        cpf: raw.user.cpf,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(deliveryman: Deliveryman): PrismaDeliveryman {
    return {
      id: deliveryman.id.toString(),
      userId: deliveryman.userId.toString(),
    };
  }
}
