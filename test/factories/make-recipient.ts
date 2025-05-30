import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RecipientWithPassword } from "@/domain/recipients/enterprise/entities/value-objects/recipient-with-password";

export function makeRecipient(
  override: Partial<RecipientWithPassword> = {},
  id?: UniqueEntityID
) {
  const recipient = RecipientWithPassword.create({
    name: faker.person.firstName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    id: id ?? new UniqueEntityID(),
    password: faker.internet.password(),
    ...override,
  });

  return recipient;
}
