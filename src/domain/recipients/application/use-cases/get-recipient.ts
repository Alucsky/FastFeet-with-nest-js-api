import { Either, left, right } from "@/core/either";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetRecipientUseCaseRequest {
  recipientId: string;
}

type GetRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient,

  }
>;

export class GetRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    return right({
      recipient,
    });
  }
}
