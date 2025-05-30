import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface AddressDeliveryProps {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

export class AddressDelivery extends Entity<AddressDeliveryProps> {
  constructor(props: AddressDeliveryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: AddressDeliveryProps, id?: UniqueEntityID) {
    return new AddressDelivery(props, id);
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get postalCode() {
    return this.props.postalCode;
  }

  get state() {
    return this.props.state;
  }
}
