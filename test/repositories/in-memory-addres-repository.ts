import { AddressRepository } from "@/domain/recipients/application/repositories/address-repository";
import { Address } from "@/domain/recipients/enterprise/entities/address";

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = [];

  async create(address: Address): Promise<Address> {
    this.items.push(address);
    return address;
  }

  async findById(addressId: string): Promise<Address | null> {
    const address = this.items.find((item) => item.id.toString() === addressId);

    if (!address) {
      return null;
    }

    return address;
  }

  async update(address: Address): Promise<Address> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === address.id.toString()
    );

    if (index !== -1) {
      this.items[index] = address;
    }

    return address;
  }

  async delete(addressId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === addressId.toString()
    );

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
