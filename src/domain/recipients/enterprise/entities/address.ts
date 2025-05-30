import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface AddressProps {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

export class Address extends Entity<AddressProps> {
  constructor(props: AddressProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: AddressProps, id?: UniqueEntityID) {
    return new Address(props, id);
  }
  public update(props: Partial<AddressProps>) {
    if (props.street) this.props.street = props.street;
    if (props.number) this.props.number = props.number;
    if (props.neighborhood) this.props.neighborhood = props.neighborhood;
    if (props.city) this.props.city = props.city;
    if (props.postalCode) this.props.postalCode = props.postalCode;
    if (props.state) this.props.state = props.state;
  }

  get street() {
    return this.props.street;
  }
  set street(street: string) {
    this.props.street = street;
  }

  get number() {
    return this.props.number;
  }
  set number(number: string) {
    this.props.number = number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }
  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  get city() {
    return this.props.city;
  }
  set city(city: string) {
    this.props.city = city;
  }

  get postalCode() {
    return this.props.postalCode;
  }
  set postalCode(postalCode: string) {
    this.props.postalCode = postalCode;
  }

  get state() {
    return this.props.state;
  }
  set state(state: string) {
    this.props.state = state;
  }
}
