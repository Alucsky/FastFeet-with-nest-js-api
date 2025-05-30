import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";

export interface RecipientProps {
  name: string;
  cpf: string;
  addressId?: UniqueEntityID;
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get addressId() {
    return this.props.addressId;
  }

  set setAddressId(addressId: UniqueEntityID | undefined) {
    this.props.addressId = addressId;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    return new Recipient(props, id);
  }
}
