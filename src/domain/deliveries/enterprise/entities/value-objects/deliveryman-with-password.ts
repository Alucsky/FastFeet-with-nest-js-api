import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";

interface DeliverymanWithPasswordProps {
  id: UniqueEntityID;
  password: string;
  name: string;
  cpf: string;
}

export class DeliverymanWithPassword extends ValueObject<DeliverymanWithPasswordProps> {
  static create(props: DeliverymanWithPasswordProps) {
    return new DeliverymanWithPassword(props);
  }

  get id() {
    return this.props.id;
  }
  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }
}
