import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { FetchRecentDeliveriesByDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/fetch-recent-deliveries-by-deliveryman";
import { DeliveryStatus } from "@/domain/deliveries/enterprise/entities/delivery";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const FetchRecentDeliveriesByDeliverymanQuerySchema = z.object({
  deliverymanId: z.string(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  status: z
    .enum(["PENDING", "IN_PROGRESS", "DELIVERED", "CANCELED"])
    .optional(),
});

type FetchRecentDeliveriesByDeliverymanQuery = z.infer<
  typeof FetchRecentDeliveriesByDeliverymanQuerySchema
>;

const validationQueryPipe = new ZodValidationPipe(
  FetchRecentDeliveriesByDeliverymanQuerySchema
);

@Controller("/deliveries/recent")
export class FetchRecentDeliveriesByDeliverymanUseCaseController {
  constructor(
    private fetchRecentDeliveriesByDeliverymanUseCase: FetchRecentDeliveriesByDeliverymanUseCase
  ) {}

  @Get()
  async handle(
    @Query(validationQueryPipe)
    query: FetchRecentDeliveriesByDeliverymanQuery
  ) {
    const { deliverymanId, city, neighborhood, status } = query;

    const result = await this.fetchRecentDeliveriesByDeliverymanUseCase.execute(
      {
        deliverymanId,
        address: {
          city: city || "",
          neighborhood: neighborhood,
        },
        status: status as DeliveryStatus,
      }
    );

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError();
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { deliveries } = result.value;

    return {
      deliveries,
    };
  }
}
