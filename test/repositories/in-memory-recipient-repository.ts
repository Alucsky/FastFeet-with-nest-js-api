import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RecipientRepository } from "@/domain/recipients/application/repositories/recipient-repository";
import { Recipient } from "@/domain/recipients/enterprise/entities/recipient";
import { RecipientWithPassword } from "@/domain/recipients/enterprise/entities/value-objects/recipient-with-password";

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = [];

  async create(recipient: RecipientWithPassword) {
    const recipientWithoutPassword = Recipient.create(
      {
        name: recipient.name,
        cpf: recipient.cpf,
      },
      new UniqueEntityID(recipient.id.toString())
    );

    this.items.push(recipientWithoutPassword);
    return recipientWithoutPassword;
  }

  async findByCpf(cpf: string) {
    const recipient = this.items.find((item) => item.cpf === cpf);
    
    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async findById(id: string) {
    const recipient = this.items.find((item) => item.id.toString() === id);

    if (!recipient) {
      return null;
    }

    return recipient;
  }
  async delete(recipientId: string) {
    const recipientIndex = this.items.findIndex(
      (item) => item.id.toString() === recipientId
    );

    if (recipientIndex !== -1) {
      this.items.splice(recipientIndex, 1);
    }
  }
  async update(recipient: Recipient) {
    const recipientIndex = this.items.findIndex(
      (item) => item.id.toString() === recipient.id.toString()
    );
    if (recipientIndex !== -1) {
      this.items[recipientIndex] = recipient;
    }
    return recipient;
  }
}
