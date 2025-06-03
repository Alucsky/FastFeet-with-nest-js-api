import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/create-deliveryman";

const createDeliverymanBodySchema = z.object({
  cpf: z.string().min(11).max(11),
  name: z.string(),
  password: z.string(),
});

type CreateDeliverymanBodySchema = z.infer<typeof createDeliverymanBodySchema>;

const validationBodyPipe = new ZodValidationPipe(createDeliverymanBodySchema);

@Controller("/deliveryman")
export class CreateDeliverymanController {
  constructor(private createDeliverymanUseCase: CreateDeliverymanUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationBodyPipe) body: CreateDeliverymanBodySchema) {
    const { cpf, name, password } = body;

    const result = await this.createDeliverymanUseCase.execute({
      cpf,
      name,
      password,
    });

   if (result.isLeft()) {
     throw new BadRequestException();
   }


    const deliveryman = result.value;

    return {
      deliveryman,
    };
  }
}
