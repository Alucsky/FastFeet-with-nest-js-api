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

export interface DeliveryRepository {
  findById(deliveryId: string): Promise<Delivery | null>;
  create(delivery: Delivery): Promise<Delivery>;
  update(delivery: Delivery): Promise<Delivery>;
  delete(deliveryId: string): Promise<void>;
  findRecentDeliveriesByDeliveryman(
    params: findRecentDeliveriesByDeliverymanProps
  ): Promise<Delivery[]>;
}
