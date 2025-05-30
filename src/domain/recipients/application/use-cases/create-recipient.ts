import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientWithPassword } from "../../enterprise/entities/value-objects/recipient-with-password";
import { RecipientRepository } from "../repositories/recipient-repository";
import { HashGenerator } from "@/domain/authentication/application/cryptography/hash-generator";
import { UserAlreadyExistsError } from "@/core/errors/errors/user-already-exists-error";

interface CreateRecipientUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateRecipientUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    recipient: Recipient;
  }
>;

export class CreateRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const passwordHash = await this.hashGenerator.hash(password);

    const recipientWithSameCpf = await this.recipientRepository.findByCpf(cpf);

    if (recipientWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const recipientWithPassword = RecipientWithPassword.create({
      name,
      cpf,
      password: passwordHash,
      id: new UniqueEntityID(),
    });

    const recipient = await this.recipientRepository.create(
      recipientWithPassword
    );

    return right({
      recipient,
    });
  }
}
