import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { PrismaDeliveryRepository } from "./prisma/repositories/prisma-delivery-repository";
import { PrismaDeliverymanRepository } from "./prisma/repositories/prisma-deliveryman-repository";
import { PrismaAddressRepository } from "./prisma/repositories/prisma-address-repository";
import { UsersRepository } from "@/domain/authentication/application/repositories/users-repository";
import { RecipientRepository } from "@/domain/recipients/application/repositories/recipient-repository";
import { DeliverymanRepository } from "@/domain/deliveries/application/repositories/deliveryman-repository";
import { DeliveryRepository } from "@/domain/deliveries/application/repositories/delivery-repository";
import { AddressRepository } from "@/domain/recipients/application/repositories/address-repository";

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
    { provide: DeliverymanRepository, useClass: PrismaDeliverymanRepository },
    { provide: DeliveryRepository, useClass: PrismaDeliveryRepository },
    { provide: AddressRepository, useClass: PrismaAddressRepository },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    RecipientRepository,
    DeliverymanRepository,
    DeliveryRepository,
    AddressRepository,
  ],
})
export class DatabaseModule {}
