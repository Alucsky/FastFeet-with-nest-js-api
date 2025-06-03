import {
  Controller,
  HttpCode,
  Body,
  Patch,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UpdateDeliveryToDeliveredUseCase } from "@/domain/deliveries/application/use-cases/update-delivery-to-delivered";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

const updateDeliveryBodySchema = z.object({
  deliveryId: z.string(),
  deliverymanId: z.string(),
  deliveryConfirmationUrl: z.string(),
});

type UpdateDeliveryBodySchema = z.infer<typeof updateDeliveryBodySchema>;

const validationBodyPipe = new ZodValidationPipe(updateDeliveryBodySchema);

@Controller("/delivery/to-delivered")
export class UpdateDeliveryToDeliveredController {
  constructor(
    private updateDeliveryUseCase: UpdateDeliveryToDeliveredUseCase
  ) {}

  @Patch()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: UpdateDeliveryBodySchema) {
    const { deliveryId, deliverymanId, deliveryConfirmationUrl } = body;

    const result = await this.updateDeliveryUseCase.execute({
      deliveryConfirmationUrl,
      deliveryId,
      deliverymanId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError();
        case NotAllowedError:
          throw new NotAllowedError();
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
