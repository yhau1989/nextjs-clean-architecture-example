import { SupabaseUserRepository } from "./repositories/SupabaseUserRepository";
import { GetUserUseCase } from "../application/use-cases/GetUserUseCase";

const userRepo = new SupabaseUserRepository();

export const makeGetUserUseCase = () => new GetUserUseCase(userRepo);