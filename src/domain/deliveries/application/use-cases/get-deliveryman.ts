import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface GetDeliverymanUseCaseRequest {
  deliverymanId: string;
}

type GetDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman;
  }
>;

export class GetDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    deliverymanId,
  }: GetDeliverymanUseCaseRequest): Promise<GetDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    return right({
      deliveryman,
    });
  }
}
