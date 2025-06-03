import {
  Controller,
  HttpCode,
  Body,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { GetDeliveryUseCase } from "@/domain/deliveries/application/use-cases/get-delivery";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const getDeliveryBodySchema = z.object({
  deliveryId: z.string(),
});

type GetDeliveryBodySchema = z.infer<typeof getDeliveryBodySchema>;

const validationBodyPipe = new ZodValidationPipe(getDeliveryBodySchema);

@Controller("/delivery")
export class GetDeliveryController {
  constructor(private getDeliveryUseCase: GetDeliveryUseCase) {}

  @Get()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: GetDeliveryBodySchema) {
    const { deliveryId } = body;

    const result = await this.getDeliveryUseCase.execute({
      deliveryId,
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
