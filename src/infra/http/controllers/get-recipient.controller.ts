import {
  Controller,
  HttpCode,
  Body,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { GetRecipientUseCase } from "@/domain/recipients/application/use-cases/get-recipient";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

const getRecipientBodySchema = z.object({
  recipientId: z.string(),
});

type GetRecipientBodySchema = z.infer<typeof getRecipientBodySchema>;

const validationBodyPipe = new ZodValidationPipe(getRecipientBodySchema);

@Controller("/recipient")
export class GetRecipientController {
  constructor(private getRecipientUseCase: GetRecipientUseCase) {}

  @Get()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: GetRecipientBodySchema) {
    const { recipientId } = body;

    const result = await this.getRecipientUseCase.execute({
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
    const recipient = result.value;

    return {
      recipient,
    };
  }
}
