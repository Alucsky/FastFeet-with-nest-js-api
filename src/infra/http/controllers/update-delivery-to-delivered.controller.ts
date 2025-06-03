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
      throw new BadRequestException();
    }

    const delivery = result.value;

    return {
      delivery,
    };
  }
}
