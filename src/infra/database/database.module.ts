import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { PrismaDeliveryRepository } from "./prisma/repositories/prisma-delivery-repository";
import { PrismaDeliverymanRepository } from "./prisma/repositories/prisma-deliveryman-repository";
import { PrismaAddressRepository } from "./prisma/repositories/prisma-address-repository";

@Module({
  providers: [
    PrismaService,
    PrismaUsersRepository,
    PrismaRecipientRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
    PrismaAddressRepository,
  ],
  exports: [
    PrismaService,
    PrismaUsersRepository,
    PrismaRecipientRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
    PrismaAddressRepository,
  ],
})
export class DatabaseModule {}
