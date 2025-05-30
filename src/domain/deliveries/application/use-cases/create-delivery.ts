import { Either, right } from "@/core/either";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateDeliveryUseCaseRequest {
  addressId: string;
  recipientId: string;
  name: string;
}

type CreateDeliveryUseCaseResponse = Either<
  null,
  {
    delivery: Delivery;
  }
>;

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    addressId,
    recipientId,
    name,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = Delivery.create({
      recipientId: new UniqueEntityID(recipientId),
      name,
      addressId: new UniqueEntityID(addressId),
    });

    await this.deliveryRepository.create(delivery);

    return right({
      delivery,
    });
  }
}
