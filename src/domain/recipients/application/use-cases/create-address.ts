import { Either, left, right } from "@/core/either";
import { Address } from "../../enterprise/entities/address";
import { AddressRepository } from "../repositories/address-repository";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface CreateAddressUseCaseRequest {
  recipientId: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

type CreateAddressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    address: Address;
  }
>;

export class CreateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private recipientRepository: RecipientRepository
  ) {}

  async execute({
    recipientId,
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    const address = Address.create({
      street,
      number,
      neighborhood,
      city,
      postalCode,
      state,
    });

    await this.addressRepository.create(address);

    recipient.setAddressId = address.id;

    await this.recipientRepository.update(recipient);

    return right({
      address,
    });
  }
}
