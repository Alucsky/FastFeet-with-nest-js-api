import { AddressRepository } from "@/domain/recipients/application/repositories/address-repository";
import { Address } from "@/domain/recipients/enterprise/entities/address";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAddressMapper } from "./mappers/prisma-address-mapper";

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Address): Promise<Address> {
    const addressPrisma = await this.prisma.address.create({
      data: {
        city: address.city,
        neighborhood: address.neighborhood,
        number: address.number,
        postalCode: address.postalCode,
        state: address.state,
        street: address.street,
      },
    });

    return PrismaAddressMapper.toDomain(addressPrisma);
  }
  async findById(addressId: string): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      return null;
    }

    return PrismaAddressMapper.toDomain(address);
  }

  async update(address: Address): Promise<Address> {
    const data = PrismaAddressMapper.toPrisma(address);

    const updatedAddress = await this.prisma.address.update({
      where: { id: address.id.toString() },
      data: {
        city: address.city,
        neighborhood: address.neighborhood,
        number: address.number,
        postalCode: address.postalCode,
        state: address.state,
        street: address.street,
        id: address.id.toString(),
      },
    });

    return PrismaAddressMapper.toDomain(updatedAddress);
  }
  async delete(addressId: string): Promise<void> {
    const recipients = await this.prisma.recipient.findMany({
      where: {
        addressId,
      },
    });

    await Promise.all(
      recipients.map((recipient) => {
        return this.prisma.recipient.update({
          where: { id: recipient.id },
          data: { addressId: null },
        });
      })
    );

    await this.prisma.address.delete({
      where: { id: addressId },
    });
  }
}
