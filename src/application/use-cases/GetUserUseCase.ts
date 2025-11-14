import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class GetUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) throw new Error("id is required");
    const user = await this.userRepo.findById(id);
    // Aquí podrías colocar reglas de negocio, mapeos, validaciones.
    return user;
  }
}