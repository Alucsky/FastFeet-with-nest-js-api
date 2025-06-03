import {
  Controller,
  HttpCode,
  Body,
  BadRequestException,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UpdateAddressUseCase } from "@/domain/recipients/application/use-cases/update-address";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const updateAddressBodySchema = z.object({
  addressId: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  postalCode: z.string(),
  state: z.string(),
});

type UpdateAddressBodySchema = z.infer<typeof updateAddressBodySchema>;

const validationBodyPipe = new ZodValidationPipe(updateAddressBodySchema);

@Controller("/address")
export class UpdateAddressController {
  constructor(private updateAddressUseCase: UpdateAddressUseCase) {}

  @Put()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: UpdateAddressBodySchema) {
    const { addressId, city, neighborhood, number, postalCode, state, street } =
      body;

    const result = await this.updateAddressUseCase.execute({
      addressId,
      city,
      neighborhood,
      number,
      postalCode,
      state,
      street,
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

    const address = result.value;

    return {
      address,
    };
  }
}
