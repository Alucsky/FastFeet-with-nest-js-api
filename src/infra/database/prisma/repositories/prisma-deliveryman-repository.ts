import { DeliverymanRepository } from "@/domain/deliveries/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/deliveries/enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "@/domain/deliveries/enterprise/entities/value-objects/deliveryman-with-password";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaDeliverymanMapper } from "./mappers/prisma-deliveryman-mapper";

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = await this.prisma.deliveryman.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!deliveryman) {
      return null;
    }

    return PrismaDeliverymanMapper.toDomain(deliveryman);
  }
  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = await this.prisma.deliveryman.findFirst({
      where: { user: { cpf } },
      include: { user: true },
    });

    if (!deliveryman) {
      return null;
    }

    return PrismaDeliverymanMapper.toDomain(deliveryman);
  }
  async create(deliveryman: DeliverymanWithPassword): Promise<Deliveryman> {
    const user = await this.prisma.user.create({
      data: {
        name: deliveryman.name,
        cpf: deliveryman.cpf,
        password: deliveryman.password,
        userType: "DELIVERYMAN",
        role: "DELIVERYMAN",
      },
    });

    const deliverymanPrisma = await this.prisma.deliveryman.create({
      data: {
        id: deliveryman.id.toString(),
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    return PrismaDeliverymanMapper.toDomain(deliverymanPrisma);
  }
  async update(deliveryman: Deliveryman): Promise<Deliveryman> {
    const existingDeliveryman = await this.prisma.deliveryman.findUnique({
      where: { id: deliveryman.id.toString() },
    });

    if (!existingDeliveryman) {
      throw new Error("Deliveryman not found");
    }

    const deliverymanPrisma = await this.prisma.deliveryman.update({
      where: { id: deliveryman.id.toString() },
      data: {
        user: {
          update: {
            name: deliveryman.name,
            cpf: deliveryman.cpf,
          },
        },
      },
      include: { user: true },
    });

    return PrismaDeliverymanMapper.toDomain(deliverymanPrisma);
  }
  async delete(deliverymanId: string): Promise<void> {
    const deliveryman = await this.prisma.deliveryman.findUnique({
      where: { id: deliverymanId },
    });

    if (!deliveryman) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.deliveryman.delete({ where: { id: deliverymanId } }),
      this.prisma.user.delete({ where: { id: deliveryman.userId } }),
    ]);
  }
}
