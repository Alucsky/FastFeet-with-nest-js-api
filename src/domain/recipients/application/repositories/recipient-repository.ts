import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientWithPassword } from "../../enterprise/entities/value-objects/recipient-with-password";

export interface RecipientRepository {
  findById(id: string): Promise<Recipient | null>;
  findByCpf(cpf: string): Promise<Recipient | null>;
  create(recipient: RecipientWithPassword): Promise<Recipient>;
  update(recipient: Recipient): Promise<Recipient>;
  delete(recipientId: string): Promise<void>;
}
