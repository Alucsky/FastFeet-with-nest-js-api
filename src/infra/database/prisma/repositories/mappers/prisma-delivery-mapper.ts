import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Delivery,
  DeliveryStatus,
} from "@/domain/deliveries/enterprise/entities/delivery";
import {
  Prisma,
  Delivery as PrismaDelivery,
  DeliveryStatus as PrismaDeliveryStatus,
} from "@prisma/client";

export class PrismaDeliveryMapper {
  static toDomain(raw: PrismaDelivery): Delivery {
    return Delivery.create(
      {
        addressId: new UniqueEntityID(raw.addressId),
        name: raw.name,
        deliverymanId: raw.deliverymanId
          ? new UniqueEntityID(raw.deliverymanId)
          : undefined,
        recipientId: new UniqueEntityID(raw.recipientId),
        status: raw.status as DeliveryStatus,
        createdAt: raw.createdAt,
        deliveredAt: raw.deliveredAt ?? undefined,
        deliveryConfirmationUrl: raw.deliveryConfirmationUrl ?? undefined,
        pickedUpAt: raw.pickedUpAt ?? undefined,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(delivery: Delivery): Prisma.DeliveryUncheckedCreateInput {
    return {
      id: delivery.id.toString(),
      addressId: delivery.addressId.toString(),
      name: delivery.name,
      deliverymanId: delivery.deliverymanId?.toString(),
      recipientId: delivery.recipientId.toString(),
      status: delivery.status as unknown as PrismaDeliveryStatus,
      createdAt: delivery.createdAt,
      deliveredAt: delivery.deliveredAt ?? null,
      deliveryConfirmationUrl: delivery.deliveryConfirmationUrl ?? null,
      pickedUpAt: delivery.pickedUpAt ?? null,
    };
  }
}
