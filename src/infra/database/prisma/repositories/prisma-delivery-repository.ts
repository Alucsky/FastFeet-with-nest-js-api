import {
  DeliveryRepository,
  findRecentDeliveriesByDeliverymanProps,
} from "@/domain/deliveries/application/repositories/delivery-repository";
import { Delivery } from "@/domain/deliveries/enterprise/entities/delivery";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaDeliveryMapper } from "./mappers/prisma-delivery-mapper";
import { PrismaDeliveryFiltersMapper } from "./mappers/PrismaDeliveryFiltersMapper";

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(deliveryId: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery) {
      return null;
    }

    return PrismaDeliveryMapper.toDomain(delivery);
  }

  async create(delivery: Delivery): Promise<Delivery> {
    const raw = await this.prisma.delivery.create({
      data: PrismaDeliveryMapper.toPrisma(delivery),
    });

    return PrismaDeliveryMapper.toDomain(raw);
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const data = PrismaDeliveryMapper.toPrisma(delivery);

    const updatedDelivery = await this.prisma.delivery.update({
      where: { id: delivery.id.toString() },
      data: {
        addressId: data.addressId,
        name: data.name,
        deliverymanId: data.deliverymanId,
        recipientId: data.recipientId,
        status: data.status,
        deliveredAt: data.deliveredAt,
        deliveryConfirmationUrl: data.deliveryConfirmationUrl,
        pickedUpAt: data.pickedUpAt,
      },
    });

    return PrismaDeliveryMapper.toDomain(updatedDelivery);
  }

  async delete(deliveryId: string): Promise<void> {
    await this.prisma.delivery.delete({
      where: { id: deliveryId },
    });
  }

  async findRecentDeliveriesByDeliveryman(
    params: findRecentDeliveriesByDeliverymanProps
  ): Promise<Delivery[]> {
    const filters =
      PrismaDeliveryFiltersMapper.toPrismaFindRecentDeliveriesByDeliveryman(
        params
      );

    const deliveries = await this.prisma.delivery.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return deliveries.map(PrismaDeliveryMapper.toDomain);
  }
}
