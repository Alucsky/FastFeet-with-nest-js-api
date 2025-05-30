import { Either, left, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface FetchRecentDeliveriesByDeliverymanUseCaseRequest {
  deliverymanId: string;
  address?: {
    neighborhood?: string;
    city: string;
  };
  status?: DeliveryStatus;
}

type FetchRecentDeliveriesByDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveries: Delivery[];
  }
>;

export class FetchRecentDeliveriesByDeliverymanUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliverymanId,
    address,
    status,
  }: FetchRecentDeliveriesByDeliverymanUseCaseRequest): Promise<FetchRecentDeliveriesByDeliverymanUseCaseResponse> {
    const deliveries =
      await this.deliveryRepository.findRecentDeliveriesByDeliveryman({
        deliverymanId: new UniqueEntityID(deliverymanId),
        address,
        status,
      });

    if (!deliveries) {
      return left(new ResourceNotFoundError());
    }

    return right({
      deliveries,
    });
  }
}
