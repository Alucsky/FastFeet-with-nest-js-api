import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { DeliverymanWithPassword } from "@/domain/deliveries/enterprise/entities/value-objects/deliveryman-with-password";

export function makeDeliveryman(
  override: Partial<DeliverymanWithPassword> = {},
  id?: UniqueEntityID
) {
  const deliveryman = DeliverymanWithPassword.create({
    id: id ?? new UniqueEntityID(),
    name: faker.person.firstName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    password: faker.internet.password(),
    ...override,
  });

  return deliveryman;
}
