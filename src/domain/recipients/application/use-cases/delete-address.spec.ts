import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { InMemoryAddressRepository } from "test/repositories/in-memory-addres-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Address } from "../../enterprise/entities/address";
import { DeleteAddressUseCase } from "./delete-address";

let inMemoryRecipientRepository: InMemoryRecipientRepository;

let inMemoryAddressRepository: InMemoryAddressRepository;
let sut: DeleteAddressUseCase;

describe("Delete Address", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryAddressRepository = new InMemoryAddressRepository();
    sut = new DeleteAddressUseCase(
      inMemoryAddressRepository,
      inMemoryRecipientRepository
    );
  });

  it("should be able to delete an Address", async () => {
    const recipient = makeRecipient({
      id: new UniqueEntityID("1"),
      name: "Samuel",
      cpf: "12345678900",
      password: "123456",
    });

    await inMemoryRecipientRepository.create(recipient);

    const address = Address.create(
      {
        street: "Rua 1",
        number: "1",
        neighborhood: "Bairro 1",
        city: "Cidade 1",
        postalCode: "123456",
        state: "SP",
      },
      new UniqueEntityID("1")
    );

    await inMemoryAddressRepository.create(address);

    expect(inMemoryAddressRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: "1",
      addressId: "1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAddressRepository.items).toHaveLength(0);
    expect(inMemoryRecipientRepository.items[0].addressId).toEqual(undefined);
  });
});
