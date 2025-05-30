import { Either, left, right } from "@/core/either";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface UpdateDeliveryToDeliveredUseCaseRequest {
  deliverymanId: string;
  deliveryId: string;
  deliveryConfirmationUrl: string;
}

type UpdateDeliveryToDeliveredUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    delivery: Delivery;
  }
>;

export class UpdateDeliveryToDeliveredUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryConfirmationUrl,
    deliveryId,
    deliverymanId,
  }: UpdateDeliveryToDeliveredUseCaseRequest): Promise<UpdateDeliveryToDeliveredUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    if (delivery.deliverymanId?.toString() !== deliverymanId) {
      return left(new NotAllowedError());
    }

    delivery.deliveryConfirmationUrl = deliveryConfirmationUrl;
    delivery.status = DeliveryStatus.DELIVERED;
    delivery.deliveredAt = new Date();

    await this.deliveryRepository.update(delivery);

    return right({
      delivery,
    });
  }
}
