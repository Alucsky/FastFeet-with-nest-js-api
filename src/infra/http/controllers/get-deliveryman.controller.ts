import {
  Controller,
  HttpCode,
  Body,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { GetDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/get-deliveryman";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const getDeliverymanBodySchema = z.object({
  deliverymanId: z.string(),
});

type GetDeliverymanBodySchema = z.infer<typeof getDeliverymanBodySchema>;

const validationBodyPipe = new ZodValidationPipe(getDeliverymanBodySchema);

@Controller("/deliveryman")
export class GetDeliverymanController {
  constructor(private getDeliverymanUseCase: GetDeliverymanUseCase) {}

  @Get()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: GetDeliverymanBodySchema) {
    const { deliverymanId } = body;

    const result = await this.getDeliverymanUseCase.execute({
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

    const deliveryman = result.value;

    return {
      deliveryman,
    };
  }
}
