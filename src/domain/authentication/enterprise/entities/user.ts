import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

type UserType = "admin" | "recipient" | "deliveryman";

export interface UserProps {
  name: string;
  cpf: string;
  password: string;
  userType: UserType;
  role: UserType;
}
export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get role() {
    return this.props.role;
  }
  set role(role: UserType) {
    this.props.role = role;
  }

  get userType() {
    return this.props.userType;
  }
  set userType(userType: UserType) {
    this.props.userType = userType;
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get cpf() {
    return this.props.cpf;
  }
  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    return new User(props, id);
  }
}
