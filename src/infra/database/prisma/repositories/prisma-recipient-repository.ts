import { RecipientRepository } from "@/domain/recipients/application/repositories/recipient-repository";
import { Recipient } from "@/domain/recipients/enterprise/entities/recipient";
import { RecipientWithPassword } from "@/domain/recipients/enterprise/entities/value-objects/recipient-with-password";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
    findById(id: string): Promise<Recipient | null> {
        throw new Error("Method not implemented.");
    }
    findByCpf(cpf: string): Promise<Recipient | null> {
        throw new Error("Method not implemented.");
    }
    create(recipient: RecipientWithPassword): Promise<Recipient> {
        throw new Error("Method not implemented.");
    }
    update(recipient: Recipient): Promise<Recipient> {
        throw new Error("Method not implemented.");
    }
    delete(recipientId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
