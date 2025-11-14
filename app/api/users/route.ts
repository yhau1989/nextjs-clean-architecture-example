import { NextResponse } from "next/server";
import { makeGetUserUseCase } from "../../../src/infrastructure/Container";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const getUser = makeGetUserUseCase();
  try {
    const user = await getUser.execute(id);
    if (!user) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "internal error" }, { status: 500 });
  }
}