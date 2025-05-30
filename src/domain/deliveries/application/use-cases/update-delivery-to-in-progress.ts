import { Either, left, right } from "@/core/either";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface UpdateDeliveryToInProgressUseCaseRequest {
  deliverymanId: string;
  deliveryId: string;
}

type UpdateDeliveryToInProgressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery;
  }
>;

export class UpdateDeliveryToInProgressUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private deliverymanRepository: DeliverymanRepository
  ) {}

  async execute({
    deliverymanId,
    deliveryId,
  }: UpdateDeliveryToInProgressUseCaseRequest): Promise<UpdateDeliveryToInProgressUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }
    

    delivery.deliverymanId = deliveryman.id;
    delivery.status = DeliveryStatus.IN_PROGRESS;
    delivery.pickedUpAt = new Date();

    await this.deliveryRepository.update(delivery);

    return right({
      delivery,
    });
  }
}
