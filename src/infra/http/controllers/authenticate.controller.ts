import { PrismaService } from "@/infra/database/prisma/prisma.service";
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { cpf, password } = authenticateBodySchema.parse(body);

    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (!user) {
      throw new UnauthorizedException("user credentials do not match");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("user credentials do not match");
    }

    const accessToken = this.jwt.sign({ sub: user.id, role: user.role });

    return {
      access_token: accessToken,
    };
  }
}
