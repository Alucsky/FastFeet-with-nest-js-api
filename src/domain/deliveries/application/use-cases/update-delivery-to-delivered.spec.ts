import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { UpdateDeliveryToDeliveredUseCase } from "./update-delivery-to-delivered";
import { DeliveryStatus } from "../../enterprise/entities/delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: UpdateDeliveryToDeliveredUseCase;

describe("Update an delivery to delivered", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new UpdateDeliveryToDeliveredUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to Update an delivery to delivered", async () => {
    const delivery = makeDelivery({}, new UniqueEntityID(`delivery-1`));
    delivery.deliverymanId = new UniqueEntityID("deliveryman-1");
    await inMemoryDeliveryRepository.create(delivery);

    const result = await sut.execute({
      deliveryId: "delivery-1",
      deliverymanId: "deliveryman-1",
      deliveryConfirmationUrl: "delivery-confirmation-url",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    if (result.isRight()) {
      expect(result.value.delivery.id.toString()).toEqual("delivery-1");
      expect(result.value.delivery.status).toEqual(DeliveryStatus.DELIVERED);
      expect(result.value.delivery.deliveryConfirmationUrl).toEqual(
        "delivery-confirmation-url"
      );
      expect(result.value.delivery.deliveredAt).toBeInstanceOf(Date);
    }
  });
});
