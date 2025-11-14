import React from "react";
import { User } from "../../domain/entities/User";

export function UserCard({ user }: { user: User }) {
  return (
    <article className="p-4 rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-1">{user.name ?? "—"}</h2>
      <p className="text-sm text-gray-600">{user.email ?? "Sin email"}</p>
      <p className="text-xs text-gray-400 mt-2">ID: {user.id}</p>
    </article>
  );
}