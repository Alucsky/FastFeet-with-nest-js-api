import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateDeliveryUseCase } from "@/domain/deliveries/application/use-cases/create-delivery";

const createDeliveryBodySchema = z.object({
  name: z.string(),
  addressId: z.string(),
  recipientId: z.string(),
});

type CreateDeliveryBodySchema = z.infer<typeof createDeliveryBodySchema>;

const validationBodyPipe = new ZodValidationPipe(createDeliveryBodySchema);

@Controller("/delivery")
export class CreateDeliveryController {
  constructor(private createDeliveryUseCase: CreateDeliveryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: CreateDeliveryBodySchema) {
    const { name, addressId, recipientId } = body;

    const result = await this.createDeliveryUseCase.execute({
      name,
      addressId,
      recipientId,
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
