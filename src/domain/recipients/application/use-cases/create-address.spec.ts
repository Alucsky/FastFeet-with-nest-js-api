import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { InMemoryAddressRepository } from "test/repositories/in-memory-addres-repository";
import { CreateAddressUseCase } from "./create-address";
import { makeRecipient } from "test/factories/make-recipient";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryAddressRepository: InMemoryAddressRepository;
let sut: CreateAddressUseCase;

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryAddressRepository = new InMemoryAddressRepository();
    sut = new CreateAddressUseCase(
      inMemoryAddressRepository,
      inMemoryRecipientRepository
    );
  });

  it("should be able to create an Recipient", async () => {
    const recipient = makeRecipient({
      id: new UniqueEntityID("1"),
      name: "Samuel",
      cpf: "12345678900",
      password: "123456",
    });

    await inMemoryRecipientRepository.create(recipient);

    const result = await sut.execute({
      recipientId: "1",
      street: "Rua 1",
      number: "1",
      neighborhood: "Bairro 1",
      city: "Cidade 1",
      postalCode: "123456",
      state: "SP",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAddressRepository.items).toHaveLength(1);
    if (result.isRight()) {
      expect(result.value).toEqual({
        address: inMemoryAddressRepository.items[0],
      });
    }
  });
});
