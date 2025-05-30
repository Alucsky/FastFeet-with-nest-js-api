import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateDeliverymanController } from "./controllers/create-deliveryman.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateDeliverymanController,
  ],
})
export class HttpModule {}
