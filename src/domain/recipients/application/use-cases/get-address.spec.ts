import { InMemoryAddressRepository } from "test/repositories/in-memory-addres-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Address } from "../../enterprise/entities/address";
import { GetAddressUseCase } from "./get-address";

let inMemoryAddressRepository: InMemoryAddressRepository;
let sut: GetAddressUseCase;

describe("Get Address", () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    sut = new GetAddressUseCase(inMemoryAddressRepository);
  });

  it("should be able to Get an Address", async () => {
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
      addressId: "1",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value).toEqual({
        address: inMemoryAddressRepository.items[0],
      });
    }
  });
});
