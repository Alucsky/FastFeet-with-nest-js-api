import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { DeliverymanWithPassword } from "@/domain/deliveries/enterprise/entities/value-objects/deliveryman-with-password";
import { Injectable } from "@nestjs/common";
import {
  Deliveryman,
  DeliverymanProps,
} from "@/domain/deliveries/enterprise/entities/deliveryman";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaDeliverymanMapper } from "@/infra/database/prisma/repositories/mappers/prisma-deliveryman-mapper";

export function makeDeliveryman(
  override: Partial<DeliverymanWithPassword> = {},
  id?: UniqueEntityID
) {
  const deliveryman = DeliverymanWithPassword.create({
    id: id ?? new UniqueEntityID(),
    name: faker.person.firstName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    password: faker.internet.password(),
    ...override,
  });

  return deliveryman;
}

@Injectable()
export class DeliverymanFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeliveryman(): Promise<Deliveryman> {
    const user = await this.prisma.user.create({
      data: {
        name: faker.person.firstName(),
        cpf: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString(),
        password: faker.internet.password(),
        userType: "DELIVERYMAN",
        role: "DELIVERYMAN",
      },
    });

    const deliveryman = await this.prisma.deliveryman.create({
      data: {
        userId: user.id,
      },
    });

    return Deliveryman.create(
      {
        name: user.name,
        cpf: user.cpf,
        userId: new UniqueEntityID(user.id),
      },
      new UniqueEntityID(deliveryman.id)
    );
  }
}
