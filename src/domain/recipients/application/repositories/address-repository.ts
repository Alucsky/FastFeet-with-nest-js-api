import { Address } from "../../enterprise/entities/address";

export abstract class AddressRepository {
  abstract create(address: Address): Promise<Address>;
  abstract findById(addressId: string): Promise<Address | null>;
  abstract update(address: Address): Promise<Address>;
  abstract delete(addressId: string): Promise<void>;
}
