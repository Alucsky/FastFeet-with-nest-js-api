import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "../../enterprise/entities/value-objects/deliveryman-with-password";

export abstract class DeliverymanRepository {
  abstract findById(id: string): Promise<Deliveryman | null>;
  abstract findByCpf(cpf: string): Promise<Deliveryman | null>;
  abstract create(deliveryman: DeliverymanWithPassword): Promise<Deliveryman>;
  abstract update(deliveryman: Deliveryman): Promise<Deliveryman>;
  abstract delete(deliverymanId: string): Promise<void>;
}
