import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/deliveries/enterprise/entities/delivery";
import { faker } from "@faker-js/faker";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID
) {
  const delivery = Delivery.create(
    {
      recipientId: new UniqueEntityID(),
      addressId: new UniqueEntityID(),
      name: faker.person.firstName(),
      ...override,
    },
    id
  );

  return delivery;
}
