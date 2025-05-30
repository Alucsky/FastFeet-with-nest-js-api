import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { CreateDeliveryUseCase } from "./create-delivery";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: CreateDeliveryUseCase;

describe("Create delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to create a delivery", async () => {
    const result = await sut.execute({
      recipientId: "1",
      addressId: "1",
      name: "pacote 1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryRepository.items[0].recipientId).toEqual(
      new UniqueEntityID("1")
    );
  });
});
