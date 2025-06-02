import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Deliveryman } from "@/domain/deliveries/enterprise/entities/deliveryman";
import {
  Deliveryman as PrismaDeliveryman,
  User as PrismaUser,
} from "@prisma/client";

type PrismaRecipientWithUser = PrismaDeliveryman & { user: PrismaUser };
export class PrismaDeliverymanMapper {
  static toDomain(raw: PrismaRecipientWithUser): Deliveryman {
    return Deliveryman.create(
      {
        name: raw.user.name,
        cpf: raw.user.cpf,
      },
      new UniqueEntityID(raw.id)
    );
  }
}
