import { Either, left, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Delivery } from "../../enterprise/entities/delivery";

interface GetDeliveryUseCaseRequest {
  deliveryId: string;
}

type GetDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery;
  }
>;

export class GetDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: GetDeliveryUseCaseRequest): Promise<GetDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    return right({
      delivery,
    });
  }
}
