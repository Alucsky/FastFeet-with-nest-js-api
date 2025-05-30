import { Address } from "../../enterprise/entities/address";

export interface AddressRepository {
  create(address: Address): Promise<Address>;
  findById(addressId: string): Promise<Address | null>;
  update(address: Address): Promise<Address>;
  delete(addressId: string): Promise<void>;
}
