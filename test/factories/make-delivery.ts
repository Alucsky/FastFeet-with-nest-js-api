import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/deliveries/enterprise/entities/delivery";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaDeliveryMapper } from "@/infra/database/prisma/repositories/mappers/prisma-delivery-mapper";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID
) {
  const delivery = Delivery.create(
    {
      recipientId: new UniqueEntityID(),
      addressId: new UniqueEntityID(),
      name: faker.person.firstName(),
      ...override,
    },
    id
  );

  return delivery;
}

@Injectable()
export class DeliveryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDelivery(
    data: Partial<DeliveryProps> = {}
  ): Promise<Delivery> {
    const delivery = makeDelivery(data);

    await this.prisma.delivery.create({
      data: PrismaDeliveryMapper.toPrisma(delivery),
    });

    return delivery;
  }
}
