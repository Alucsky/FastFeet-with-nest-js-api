import {
  Controller,
  HttpCode,
  Body,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { DeleteAddressUseCase } from "@/domain/recipients/application/use-cases/delete-address";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const deleteAddressBodySchema = z.object({
  addressId: z.string(),
  recipientId: z.string(),
});

type DeleteAddressBodySchema = z.infer<typeof deleteAddressBodySchema>;

const validationBodyPipe = new ZodValidationPipe(deleteAddressBodySchema);

@Controller("/address")
export class DeleteAddressController {
  constructor(private deleteAddressUseCase: DeleteAddressUseCase) {}

  @Delete()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: DeleteAddressBodySchema) {
    const { addressId, recipientId } = body;

    const result = await this.deleteAddressUseCase.execute({
      addressId,
      recipientId,
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
