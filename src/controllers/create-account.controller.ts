import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

import { z } from "zod";

const createAccountBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string(),
  role: z.enum(["admin", "common"]),
  type: z.enum(["deliveryman", "recipient"]),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, cpf, password, role, type } =
      createAccountBodySchema.parse(body);

    const userWithSameCpf = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (userWithSameCpf) {
      throw new ConflictException("this Cpf already exists");
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        cpf,
        password: hashedPassword,
        role,
        type,
      },
    });
  }
}
