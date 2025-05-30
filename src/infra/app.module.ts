import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./infra/controllers/create-account.controller";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "./infra/controllers/authenticate.controller";
import { CreateDeliverymanController } from "./infra/controllers/create-deliveryman.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateDeliverymanController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
