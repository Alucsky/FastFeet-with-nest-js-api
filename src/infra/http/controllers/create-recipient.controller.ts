import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateRecipientUseCase } from "@/domain/recipients/application/use-cases/create-recipient";

const createRecipientBodySchema = z.object({
  cpf: z.string().min(11).max(11),
  name: z.string(),
  password: z.string(),
});

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>;

const validationBodyPipe = new ZodValidationPipe(createRecipientBodySchema);

@Controller("/recipient")
export class CreateRecipientController {
  constructor(private createRecipientUseCase: CreateRecipientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: CreateRecipientBodySchema) {
    const { cpf, name, password } = body;

    const result = await this.createRecipientUseCase.execute({
      cpf,
      name,
      password,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }


    const recipient = result.value;

    return {
      recipient,
    };
  }
}
