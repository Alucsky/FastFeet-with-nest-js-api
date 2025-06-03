import {
  Controller,
  HttpCode,
  Body,
  Patch,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UpdateDeliveryToInProgressUseCase } from "@/domain/deliveries/application/use-cases/update-delivery-to-in-progress";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const updateDeliveryBodySchema = z.object({
  deliveryId: z.string(),
  deliverymanId: z.string(),
});

type UpdateDeliveryBodySchema = z.infer<typeof updateDeliveryBodySchema>;

const validationBodyPipe = new ZodValidationPipe(updateDeliveryBodySchema);

@Controller("/delivery/in-progress")
export class UpdateDeliveryToInProgressUseCaseController {
  constructor(
    private updateDeliveryUseCase: UpdateDeliveryToInProgressUseCase
  ) {}

  @Patch()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: UpdateDeliveryBodySchema) {
    const { deliveryId, deliverymanId } = body;

    const result = await this.updateDeliveryUseCase.execute({
      deliveryId,
      deliverymanId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError();
        default:
          throw new BadRequestException(error.message);
      }
    }

    const delivery = result.value;

    return {
      delivery,
    };
  }
}
