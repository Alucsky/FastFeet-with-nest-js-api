import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { GetDeliveryUseCase } from "./get-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: GetDeliveryUseCase;

describe("Get delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new GetDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to Get a delivery", async () => {
    for (let i = 0; i < 3; i++) {
      const delivery = makeDelivery({}, new UniqueEntityID(`delivery-${i}`));
      await inMemoryDeliveryRepository.create(delivery);
    }
    const delivery = makeDelivery({}, new UniqueEntityID("delivery-1"));

    await inMemoryDeliveryRepository.create(delivery);

    const result = await sut.execute({
      deliveryId: "delivery-1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(4);
    if (result.isRight()) {
      expect(result.value.delivery.id.toString()).toEqual("delivery-1");
    }
  });
});
