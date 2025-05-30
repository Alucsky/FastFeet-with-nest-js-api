import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export enum DeliveryStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}
export interface DeliveryProps {
  name: string;
  addressId: UniqueEntityID;
  recipientId: UniqueEntityID;
  deliverymanId?: UniqueEntityID;
  status: DeliveryStatus;
  createdAt: Date;
  deliveryConfirmationUrl?: string;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
}

export class Delivery extends Entity<DeliveryProps> {
  get addressId() {
    return this.props.addressId;
  }
  set addressId(addressId: UniqueEntityID) {
    this.props.addressId = addressId;
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get deliveryConfirmationUrl() {
    return this.props.deliveryConfirmationUrl;
  }
  set deliveryConfirmationUrl(deliveryConfirmationUrl: string | undefined) {
    this.props.deliveryConfirmationUrl = deliveryConfirmationUrl;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }

  set deliverymanId(deliverymanId: UniqueEntityID | undefined) {
    this.props.deliverymanId = deliverymanId;
  }

  get status() {
    return this.props.status;
  }
  set status(status: DeliveryStatus) {
    this.props.status = status;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get pickedUpAt() {
    return this.props.pickedUpAt;
  }
  set pickedUpAt(pickedUpAt: Date | null | undefined) {
    this.props.pickedUpAt = pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }
  set deliveredAt(deliveredAt: Date | null | undefined) {
    this.props.deliveredAt = deliveredAt;
  }

  static create(
    props: Optional<DeliveryProps, "status" | "createdAt">,
    id?: UniqueEntityID
  ) {
    return new Delivery(
      {
        ...props,
        status: DeliveryStatus.PENDING,
        createdAt: new Date(),
      },
      id
    );
  }
}
