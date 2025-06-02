import { Module } from "@nestjs/common";

import { BcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/authentication/application/cryptography/hash-generator";
import { Encrypter } from "@/domain/authentication/application/cryptography/encrypter";
import { HashComparer } from "@/domain/authentication/application/cryptography/hash-comparer";
import { JwtEncrypter } from "./jwt-encripter";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
