import { InMemoryAddressRepository } from "test/repositories/in-memory-addres-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Address } from "../../enterprise/entities/address";
import { UpdateAddressUseCase } from "./update-address";

let inMemoryAddressRepository: InMemoryAddressRepository;
let sut: UpdateAddressUseCase;

describe("Update Address", () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    sut = new UpdateAddressUseCase(inMemoryAddressRepository);
  });

  it("should be able to Update an Address", async () => {
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
      street: "Rua 2",
      number: "2",
      neighborhood: "Bairro 2",
      city: "Cidade 2",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const updated = result.value.address;

      expect(updated.street).toBe("Rua 2");
      expect(updated.number).toBe("2");
      expect(updated.neighborhood).toBe("Bairro 2");
      expect(updated.city).toBe("Cidade 2");
      expect(updated.postalCode).toBe("123456"); // Não mudou
      expect(updated.state).toBe("SP"); // Não mudou
    }
  });
});
