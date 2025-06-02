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
        status: this.convertStatus(raw.status),
        createdAt: raw.createdAt,
        deliveredAt: raw.deliveredAt ?? undefined,
        deliveryConfirmationUrl: raw.deliveryConfirmationUrl ?? undefined,
        pickedUpAt: raw.pickedUpAt ?? undefined,
      },
      new UniqueEntityID(raw.id)
    );
  }

  private static convertStatus(status: PrismaDeliveryStatus): DeliveryStatus {
    switch (status) {
      case "PENDING":
        return DeliveryStatus.PENDING;
      case "IN_PROGRESS":
        return DeliveryStatus.IN_PROGRESS;
      case "DELIVERED":
        return DeliveryStatus.DELIVERED;
      case "CANCELED":
        return DeliveryStatus.CANCELED;
      default:
        throw new Error(`Invalid delivery status: ${status}`);
    }
  }

  static toPrisma(delivery: Delivery): Prisma.DeliveryUncheckedCreateInput {
    return {
      id: delivery.id.toString(),
      addressId: delivery.addressId.toString(),
      name: delivery.name,
      deliverymanId: delivery.deliverymanId?.toString(),
      recipientId: delivery.recipientId.toString(),
      status: this.convertToPrismaStatus(delivery.status),
      createdAt: delivery.createdAt,
      deliveredAt: delivery.deliveredAt ?? null,
      deliveryConfirmationUrl: delivery.deliveryConfirmationUrl ?? null,
      pickedUpAt: delivery.pickedUpAt ?? null,
    };
  }

  private static convertToPrismaStatus(
    status: DeliveryStatus
  ): PrismaDeliveryStatus {
    switch (status) {
      case DeliveryStatus.PENDING:
        return "PENDING";
      case DeliveryStatus.IN_PROGRESS:
        return "IN_PROGRESS";
      case DeliveryStatus.DELIVERED:
        return "DELIVERED";
      case DeliveryStatus.CANCELED:
        return "CANCELED";
      default:
        throw new Error(`Invalid delivery status: ${status}`);
    }
  }
}
