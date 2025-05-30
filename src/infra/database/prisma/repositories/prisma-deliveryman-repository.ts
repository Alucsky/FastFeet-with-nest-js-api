import { DeliverymanRepository } from "@/domain/deliveries/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/deliveries/enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "@/domain/deliveries/enterprise/entities/value-objects/deliveryman-with-password";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  findById(id: string): Promise<Deliveryman | null> {
    throw new Error("Method not implemented.");
  }
  findByCpf(cpf: string): Promise<Deliveryman | null> {
    throw new Error("Method not implemented.");
  }
  create(deliveryman: DeliverymanWithPassword): Promise<Deliveryman> {
    throw new Error("Method not implemented.");
  }
  update(deliveryman: Deliveryman): Promise<Deliveryman> {
    throw new Error("Method not implemented.");
  }
  delete(deliverymanId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
