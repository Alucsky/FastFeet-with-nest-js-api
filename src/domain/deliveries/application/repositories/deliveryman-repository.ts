import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "../../enterprise/entities/value-objects/deliveryman-with-password";

export interface DeliverymanRepository {
  findById(id: string): Promise<Deliveryman | null>;
  findByCpf(cpf: string): Promise<Deliveryman | null>;
  create(deliveryman: DeliverymanWithPassword): Promise<Deliveryman>;
  update(deliveryman: Deliveryman): Promise<Deliveryman>;
  delete(deliverymanId: string): Promise<void>;
}
