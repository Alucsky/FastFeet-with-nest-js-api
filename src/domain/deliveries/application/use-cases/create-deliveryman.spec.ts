import { CreateDeliverymanUseCase } from "./create-deliveryman";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemorydeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";

let inMemoryDeliverymanRepository: InMemorydeliverymanRepository;
let fakeHasher: FakeHasher;
let sut: CreateDeliverymanUseCase;

describe("Create Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemorydeliverymanRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher
    );
  });

  it("should be able to create a Deliveryman", async () => {
    const result = await sut.execute({
      cpf: "12332122321",
      name: "SAMUEL",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverymanRepository.items).toHaveLength(1);
    expect(inMemoryDeliverymanRepository.items[0].name).toEqual("SAMUEL");
  });
});
