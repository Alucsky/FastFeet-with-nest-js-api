import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { GetRecipientUseCase } from "./get-recipient";
import { makeUser } from "test/factories/make-user";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: GetRecipientUseCase;

describe("get Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new GetRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to get an Recipient", async () => {
    const recipient = makeRecipient({
      cpf: "12345678900",
      name: "Samuel",
    });

    await inMemoryRecipientRepository.create(recipient);
    expect(inMemoryRecipientRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.recipient.name).toEqual("Samuel");
    }
  });
});
