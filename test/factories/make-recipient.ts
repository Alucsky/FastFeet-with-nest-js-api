import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RecipientWithPassword } from "@/domain/recipients/enterprise/entities/value-objects/recipient-with-password";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Recipient } from "@/domain/recipients/enterprise/entities/recipient";

export function makeRecipient(
  override: Partial<RecipientWithPassword> = {},
  id?: UniqueEntityID
) {
  const recipient = RecipientWithPassword.create({
    name: faker.person.firstName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    id: id ?? new UniqueEntityID(),
    password: faker.internet.password(),
    ...override,
  });

  return recipient;
}

@Injectable()
export class RecipientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipient(): Promise<Recipient> {
    const user = await this.prisma.user.create({
      data: {
        name: faker.person.firstName(),
        cpf: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString(),
        password: faker.internet.password(),
        userType: "RECIPIENT",
        role: "RECIPIENT",
      },
    });

    const recipient = await this.prisma.recipient.create({
      data: {
        userId: user.id,
      },
    });

    return Recipient.create(
      {
        name: user.name,
        cpf: user.cpf,
        userId: new UniqueEntityID(user.id),
      },
      new UniqueEntityID(recipient.id)
    );
  }
}
