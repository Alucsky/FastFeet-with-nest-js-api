import { ConflictException, UseGuards, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createDeliverymanBodySchema = z.object({
  userId: z.string(),
});

type CreateDeliverymanBodySchema = z.infer<typeof createDeliverymanBodySchema>;
const validationBodyPipe = new ZodValidationPipe(createDeliverymanBodySchema);
@UseGuards(JwtAuthGuard)
@Controller("/deliveryman")
export class CreateDeliverymanController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(validationBodyPipe) body: CreateDeliverymanBodySchema,
    @CurrentUser() userPayload: UserPayload
  ) {
    const { userId } = createDeliverymanBodySchema.parse(body);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ConflictException("user does not exist");
    }

    const deliveryman = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        type: "deliveryman",
      },
    });

    return {
      deliveryman,
    };
  }
}
