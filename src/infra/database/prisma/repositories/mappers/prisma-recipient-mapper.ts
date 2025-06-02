import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Recipient } from "@/domain/recipients/enterprise/entities/recipient";
import {
  Prisma,
  Recipient as PrismaRecipient,
  User as PrismaUser,
} from "@prisma/client";

type PrismaRecipientWithUser = PrismaRecipient & { user: PrismaUser };

export class PrismaRecipientMapper {a
  static toDomain(raw: PrismaRecipientWithUser): Recipient {
    return Recipient.create(
      {
        name: raw.user.name,
        cpf: raw.user.cpf,
        addressId: raw.addressId
          ? new UniqueEntityID(raw.addressId)
          : undefined,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(
    recipient: Recipient,
    userId: string
  ): Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      userId,
      addressId: recipient.addressId?.toString(),
    };
  }
}
