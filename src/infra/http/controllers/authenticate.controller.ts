import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { AuthenticateUserUseCase } from "@/domain/authentication/application/use-cases/authenticate-user";

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { cpf, password } = body;

    const result = await this.authenticateUser.execute({
      cpf,
      password,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    const { accessToken } = result.value;

    console.log(accessToken);

    return {
      access_token: accessToken,
    };
  }
}
