import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliverymanRepository } from "@/domain/deliveries/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/deliveries/enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "@/domain/deliveries/enterprise/entities/value-objects/deliveryman-with-password";

export class InMemorydeliverymanRepository implements DeliverymanRepository {
  public items: Deliveryman[] = [];

  async create(deliveryman: DeliverymanWithPassword): Promise<Deliveryman> {
    const deliverymanWithoutPassword = Deliveryman.create(
      {
        name: deliveryman.name,
        cpf: deliveryman.cpf,
      },
      new UniqueEntityID(deliveryman.id.toString())
    );

    this.items.push(deliverymanWithoutPassword);
    return deliverymanWithoutPassword;
  }
  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.cpf === cpf);

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }
  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.id.toString() === id);

    if (!deliveryman) {
      return null;
    }
    return deliveryman;
  }
  async delete(deliverymanId: string): Promise<void> {
    const deliverymanIndex = this.items.findIndex(
      (item) => item.id.toString() === deliverymanId
    );
    if (deliverymanIndex !== -1) {
      this.items.splice(deliverymanIndex, 1);
    }
  }
  async update(deliveryman: Deliveryman): Promise<Deliveryman> {
    const deliverymanIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryman.id.toString()
    );
    if (deliverymanIndex !== -1) {
      this.items[deliverymanIndex] = deliveryman;
    }
    return deliveryman;
  }
}
