// src/infra/database/prisma/repositories/prisma-recipient-repository.ts
import { RecipientRepository } from "@/domain/recipients/application/repositories/recipient-repository";
import { Recipient } from "@/domain/recipients/enterprise/entities/recipient";
import { RecipientWithPassword } from "@/domain/recipients/enterprise/entities/value-objects/recipient-with-password";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserType } from "@prisma/client";
import { PrismaRecipientMapper } from "./mappers/prisma-recipient-mapper";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!recipient) {
      return null;
    }

    return PrismaRecipientMapper.toDomain(recipient);
  }

  async findByCpf(cpf: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findFirst({
      where: { user: { cpf } },
      include: { user: true },
    });

    if (!recipient) {
      return null;
    }

    return PrismaRecipientMapper.toDomain(recipient);
  }

  async create(recipient: RecipientWithPassword): Promise<Recipient> {
    const user = await this.prisma.user.create({
      data: {
        name: recipient.name,
        cpf: recipient.cpf,
        password: recipient.password,
        userType: UserType.RECIPIENT,
        role: UserType.RECIPIENT,
      },
    });

    const recipientPrisma = await this.prisma.recipient.create({
      data: {
        id: recipient.id.toString(),
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    return PrismaRecipientMapper.toDomain(recipientPrisma);
  }

  async update(recipient: Recipient): Promise<Recipient> {
    const existingRecipient = await this.prisma.recipient.findUnique({
      where: { id: recipient.id.toString() },
    });

    if (!existingRecipient) {
      throw new Error("Recipient not found");
    }

    const recipientPrisma = await this.prisma.recipient.update({
      where: { id: recipient.id.toString() },
      data: {
        user: {
          update: {
            name: recipient.name,
            cpf: recipient.cpf,
          },
        },
      },
      include: { user: true },
    });

    return PrismaRecipientMapper.toDomain(recipientPrisma);
  }

  async delete(recipientId: string): Promise<void> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id: recipientId },
    });

    if (!recipient) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.recipient.delete({ where: { id: recipientId } }),
      this.prisma.user.delete({ where: { id: recipient.userId } }),
    ]);
  }
}
