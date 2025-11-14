import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { supabase } from "../supabaseClient";

export class SupabaseUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email")
      .eq("id", id)
      .single();

    if (error) {
      // Ajusta manejo de errores según tu configuración
      if (error.code === "PGRST116") return null;
      throw error;
    }
    if (!data) return null;
    return {
      id: data.id,
      name: data.name ?? null,
      email: data.email ?? null
    };
  }

  async findAll(): Promise<User[]> {
    const { data, error } = await supabase.from("users").select("id, name, email");
    if (error) throw error;
    return (data ?? []).map((r: any) => ({
      id: r.id,
      name: r.name ?? null,
      email: r.email ?? null
    }));
  }
}