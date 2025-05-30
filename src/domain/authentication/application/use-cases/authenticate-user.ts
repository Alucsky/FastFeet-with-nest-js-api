import { Either, left, right } from "@/core/either";
import { WrongCredentialsError } from "@/core/errors/errors/wrong-credentials-error";
import { UsersRepository } from "../repositories/users-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";

interface AuthenticateUserUseCaseRequest {
  cpf: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    });

    return right({
      accessToken,
    });
  }
}
