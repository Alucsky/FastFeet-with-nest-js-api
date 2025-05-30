import { Either, left, right } from "@/core/either";
import { Address } from "../../enterprise/entities/address";
import { AddressRepository } from "../repositories/address-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface UpdateAddressUseCaseRequest {
  addressId: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  postalCode?: string;
  state?: string;
}

type UpdateAddressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    address: Address;
  }
>;

export class UpdateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    addressId,
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
  }: UpdateAddressUseCaseRequest): Promise<UpdateAddressUseCaseResponse> {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      return left(new ResourceNotFoundError());
    }

    address.update({
      street,
      number,
      neighborhood,
      city,
      postalCode,
      state,
    });

    await this.addressRepository.update(address);

    return right({
      address,
    });
  }
}
