import { Either, left, right } from "@/core/either";
import { Address } from "../../enterprise/entities/address";
import { AddressRepository } from "../repositories/address-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetAddressUseCaseRequest {
  addressId: string;
}

type GetAddressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    address: Address;
  }
>;

export class GetAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    addressId,
  }: GetAddressUseCaseRequest): Promise<GetAddressUseCaseResponse> {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      return left(new ResourceNotFoundError());
    }

    return right({
      address,
    });
  }
}
