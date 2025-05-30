import { DeliveryRepository, findRecentDeliveriesByDeliverymanProps } from "@/domain/deliveries/application/repositories/delivery-repository";
import { Delivery } from "@/domain/deliveries/enterprise/entities/delivery";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
    findById(deliveryId: string): Promise<Delivery | null> {
        throw new Error("Method not implemented.");
    }
    create(delivery: Delivery): Promise<Delivery> {
        throw new Error("Method not implemented.");
    }
    update(delivery: Delivery): Promise<Delivery> {
        throw new Error("Method not implemented.");
    }
    delete(deliveryId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findRecentDeliveriesByDeliveryman(params: findRecentDeliveriesByDeliverymanProps): Promise<Delivery[]> {
        throw new Error("Method not implemented.");
    }
}
