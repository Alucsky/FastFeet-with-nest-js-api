import { DeliveryStatus as PrismaDeliveryStatus } from "@prisma/client";
import { findRecentDeliveriesByDeliverymanProps } from "@/domain/deliveries/application/repositories/delivery-repository";

export class PrismaDeliveryFiltersMapper {
  static toPrismaFindRecentDeliveriesByDeliveryman(
    params: findRecentDeliveriesByDeliverymanProps
  ) {
    const { deliverymanId, status, address } = params;

    return {
      deliverymanId: deliverymanId.toString(),
      ...(status && { status: status as unknown as PrismaDeliveryStatus }),
      ...(address
        ? {
            address: {
              city: address.city,
              ...(address.neighborhood
                ? { neighborhood: address.neighborhood }
                : {}),
            },
          }
        : {}),
    };
  }
}
