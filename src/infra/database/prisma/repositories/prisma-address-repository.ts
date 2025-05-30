import { AddressRepository } from "@/domain/recipients/application/repositories/address-repository";
import { Address } from "@/domain/recipients/enterprise/entities/address";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  create(address: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  findById(addressId: string): Promise<Address | null> {
    throw new Error("Method not implemented.");
  }
  update(address: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  delete(addressId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
