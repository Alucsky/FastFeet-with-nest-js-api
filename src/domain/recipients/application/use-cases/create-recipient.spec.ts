import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateRecipientUseCase } from "./create-recipient";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let fakeHasher: FakeHasher;
let sut: CreateRecipientUseCase;

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository, fakeHasher);
  });

  it("should be able to create an Recipient", async () => {
    const result = await sut.execute({
      name: "Samuel",
      cpf: "12345678900",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(1);
    if (result.isRight()) {
      expect(result.value).toEqual({
        recipient: inMemoryRecipientRepository.items[0],
      });
    }
  });
});
