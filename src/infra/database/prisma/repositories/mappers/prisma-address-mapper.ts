import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Address } from "@/domain/recipients/enterprise/entities/address";
import { Prisma, Address as PrismaAddres } from "@prisma/client";

export class PrismaAddressMapper {
  static toDomain(raw: PrismaAddres): Address {
    return Address.create(
      {
        city: raw.city,
        neighborhood: raw.neighborhood,
        number: raw.number,
        postalCode: raw.postalCode,
        state: raw.state,
        street: raw.street,
      },
      new UniqueEntityID(raw.id)
    );
  }
  static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
    return {
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      postalCode: address.postalCode,
      state: address.state,
      street: address.street,
      id: address.id.toString(),
    };
  }
}
