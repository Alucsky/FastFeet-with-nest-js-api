import {
  Controller,
  HttpCode,
  Post,
  Body,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateAddressUseCase } from "@/domain/recipients/application/use-cases/create-address";

const createAddressBodySchema = z.object({
  recipientId: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  postalCode: z.string(),
  state: z.string(),
});

type CreateAddressBodySchema = z.infer<typeof createAddressBodySchema>;

const validationBodyPipe = new ZodValidationPipe(createAddressBodySchema);

@Controller("/address")
export class CreateAddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: CreateAddressBodySchema) {
    const {
      city,
      postalCode,
      state,
      neighborhood,
      number,
      recipientId,
      street,
    } = body;

    const result = await this.createAddressUseCase.execute({
      city,
      postalCode,
      state,
      neighborhood,
      number,
      recipientId,
      street,
    });

    const address = result.value;

    return {
      address,
    };
  }
}
