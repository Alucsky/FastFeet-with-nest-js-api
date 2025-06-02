import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientWithPassword } from "../../enterprise/entities/value-objects/recipient-with-password";

export abstract class RecipientRepository {
  abstract findById(id: string): Promise<Recipient | null>;
  abstract findByCpf(cpf: string): Promise<Recipient | null>;
  abstract create(recipient: RecipientWithPassword): Promise<Recipient>;
  abstract update(recipient: Recipient): Promise<Recipient>;
  abstract delete(recipientId: string): Promise<void>;
}
