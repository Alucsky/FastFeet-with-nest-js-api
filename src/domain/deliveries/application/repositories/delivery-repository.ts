import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";

export interface findRecentDeliveriesByDeliverymanProps {
  deliverymanId: UniqueEntityID;
  address?: {
    city: string;
    neighborhood?: string;
  };
  status?: DeliveryStatus;
}

export abstract class DeliveryRepository {
  abstract findById(deliveryId: string): Promise<Delivery | null>;
  abstract create(delivery: Delivery): Promise<Delivery>;
  abstract update(delivery: Delivery): Promise<Delivery>;
  abstract delete(deliveryId: string): Promise<void>;
  abstract findRecentDeliveriesByDeliveryman(
    params: findRecentDeliveriesByDeliverymanProps
  ): Promise<Delivery[]>;
}
