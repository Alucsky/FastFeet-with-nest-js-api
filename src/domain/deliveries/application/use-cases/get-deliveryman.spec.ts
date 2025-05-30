import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";

import { GetDeliverymanUseCase } from "./get-deliveryman";
import { InMemorydeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { makeDeliveryman } from "test/factories/make-deliveryMan";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryDeliverymanRepository: InMemorydeliverymanRepository;
let sut: GetDeliverymanUseCase;

describe.only("get Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemorydeliverymanRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetDeliverymanUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to get a Deliveryman", async () => {
    const deliveryman = makeDeliveryman({
      name: "SAMUEL",
      cpf: "12332122321",
      password: "123456",
      id: new UniqueEntityID("1"),
    });

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliverymanId: "1",
    });

    expect(inMemoryDeliverymanRepository.items).toHaveLength(1);
    if (result.isRight()) {
      expect(result.value.deliveryman.name).toEqual("SAMUEL");
    }
    expect(result.isRight()).toBe(true);
  });
});
