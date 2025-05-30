import { Either, left, right } from "@/core/either";
import { AddressRepository } from "../repositories/address-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { RecipientRepository } from "../repositories/recipient-repository";

interface DeleteAddressUseCaseRequest {
  recipientId: string;
  addressId: string;
}

type DeleteAddressUseCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private recipientRepository: RecipientRepository
  ) {}

  async execute({
    addressId,
    recipientId,
  }: DeleteAddressUseCaseRequest): Promise<DeleteAddressUseCaseResponse> {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      return left(new ResourceNotFoundError());
    }

    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    recipient.setAddressId = undefined;

    await this.recipientRepository.update(recipient);

    await this.addressRepository.delete(addressId);

    return right(null);
  }
}
