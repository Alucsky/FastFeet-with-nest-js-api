import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface DeliverymanProps {
  name: string;
  cpf: string;
  userId: UniqueEntityID;
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get userId() {
    return this.props.userId;
  }

  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    return new Deliveryman(props, id);
  }
}
