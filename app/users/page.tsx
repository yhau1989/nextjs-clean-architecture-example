import React from "react";
import { makeGetUserUseCase } from "../../src/infrastructure/Container";
import { UserCard } from "../../src/presentation/components/UserCard";

// Server Component
export default async function UsersPage() {
  const getUser = makeGetUserUseCase();

  // Ejemplo: reemplaza "some-user-id" por un id real en tu tabla users
  const user = await getUser.execute("some-user-id");

  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <section className="mt-6">
      <h1 className="text-xl font-semibold mb-4">Usuario</h1>
      <UserCard user={user} />
    </section>
  );
}