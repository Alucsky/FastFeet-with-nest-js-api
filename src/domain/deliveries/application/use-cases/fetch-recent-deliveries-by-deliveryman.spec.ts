import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { FetchRecentDeliveriesByDeliverymanUseCase } from "./fetch-recent-deliveries-by-deliveryman";
import { AddressDelivery } from "../../enterprise/entities/addressDelivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: FetchRecentDeliveriesByDeliverymanUseCase;

describe("Fetch delivery by neighborhood delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new FetchRecentDeliveriesByDeliverymanUseCase(
      inMemoryDeliveryRepository
    );
  });

  it("should be able to Fetch delivery by neighborhood", async () => {
    const delivery1 = makeDelivery(
      {
        deliverymanId: new UniqueEntityID("deliveryman-1"),
      },
      new UniqueEntityID("delivery-1")
    );

    const delivery2 = makeDelivery(
      {
        deliverymanId: new UniqueEntityID("deliveryman-1"),
      },
      new UniqueEntityID("delivery-2")
    );

    const address1 = AddressDelivery.create({
      city: "CityTest",
      neighborhood: "neighborhood-1",
      postalCode: "00000-000",
      state: "SC",
      street: "StreetTest",
      number: "123",
    });

    inMemoryDeliveryRepository.deliveryAddres.push(address1);

    delivery1.addressId = address1.id;
    delivery2.addressId = address1.id;

    await inMemoryDeliveryRepository.create(delivery1);
    await inMemoryDeliveryRepository.create(delivery2);

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      address: {
        city: "CityTest",
        neighborhood: "neighborhood-1",
      },
      status: delivery1.status,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.deliveries.length).toEqual(2);
    }
  });
});
