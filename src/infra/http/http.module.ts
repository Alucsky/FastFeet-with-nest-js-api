import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateDeliverymanController } from "./controllers/create-deliveryman.controller";
import { AuthenticateUserUseCase } from "@/domain/authentication/application/use-cases/authenticate-user";
import { CryptographyModule } from "../criptography/criptography.module";
import { CreateDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/create-deliveryman";
import { CreateDeliveryUseCase } from "@/domain/deliveries/application/use-cases/create-delivery";
import { FetchRecentDeliveriesByDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/fetch-recent-deliveries-by-deliveryman";
import { GetDeliveryUseCase } from "@/domain/deliveries/application/use-cases/get-delivery";
import { GetDeliverymanUseCase } from "@/domain/deliveries/application/use-cases/get-deliveryman";
import { UpdateDeliveryToDeliveredUseCase } from "@/domain/deliveries/application/use-cases/update-delivery-to-delivered";
import { UpdateDeliveryToInProgressUseCase } from "@/domain/deliveries/application/use-cases/update-delivery-to-in-progress";
import { CreateAddressUseCase } from "@/domain/recipients/application/use-cases/create-address";
import { CreateRecipientUseCase } from "@/domain/recipients/application/use-cases/create-recipient";
import { DeleteAddressUseCase } from "@/domain/recipients/application/use-cases/delete-address";
import { GetRecipientUseCase } from "@/domain/recipients/application/use-cases/get-recipient";
import { UpdateAddressUseCase } from "@/domain/recipients/application/use-cases/update-address";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, CreateDeliverymanController],
  providers: [
    AuthenticateUserUseCase,
    CreateDeliverymanUseCase,
    CreateDeliveryUseCase,
    FetchRecentDeliveriesByDeliverymanUseCase,
    GetDeliveryUseCase,
    GetDeliverymanUseCase,
    UpdateDeliveryToDeliveredUseCase,
    UpdateDeliveryToInProgressUseCase,
    CreateAddressUseCase,
    CreateRecipientUseCase,
    DeleteAddressUseCase,
    GetRecipientUseCase,
    UpdateAddressUseCase,
  ],
})
export class HttpModule {}
