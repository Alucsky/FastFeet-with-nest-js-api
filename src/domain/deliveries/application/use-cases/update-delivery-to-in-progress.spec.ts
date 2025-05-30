import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { DeliveryStatus } from "../../enterprise/entities/delivery";
import { UpdateDeliveryToInProgressUseCase } from "./update-delivery-to-in-progress";
import { InMemorydeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { makeDeliveryman } from "test/factories/make-deliveryMan";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let inMemoryDeliverymanRepository: InMemorydeliverymanRepository;
let sut: UpdateDeliveryToInProgressUseCase;

describe("Update an delivery to in progress", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    inMemoryDeliverymanRepository = new InMemorydeliverymanRepository();
    sut = new UpdateDeliveryToInProgressUseCase(
      inMemoryDeliveryRepository,
      inMemoryDeliverymanRepository
    );
  });

  it("should be able to Update an delivery to in progress", async () => {
    const delivery = makeDelivery({}, new UniqueEntityID(`delivery-1`));
    const deliveryman = makeDeliveryman({
      id: new UniqueEntityID("deliveryman-1"),
    });
    await inMemoryDeliverymanRepository.create(deliveryman);
    await inMemoryDeliveryRepository.create(delivery);

    const result = await sut.execute({
      deliveryId: "delivery-1",
      deliverymanId: "deliveryman-1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    if (result.isRight()) {
      expect(result.value.delivery.id.toString()).toEqual("delivery-1");
      expect(result.value.delivery.status).toEqual(DeliveryStatus.IN_PROGRESS);
      expect(result.value.delivery.deliveryConfirmationUrl).toEqual(undefined);
    }
  });
});
