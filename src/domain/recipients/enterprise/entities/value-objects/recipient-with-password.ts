import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";

interface RecipientWithPasswordProps {
  id: UniqueEntityID;
  password: string;
  name: string;
  cpf: string;
}

export class RecipientWithPassword extends ValueObject<RecipientWithPasswordProps> {
  static create(props: RecipientWithPasswordProps) {
    return new RecipientWithPassword(props);
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
