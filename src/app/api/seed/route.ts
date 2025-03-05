import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // deele all todos
  await prisma.todo.deleteMany();

  // Create some todos
  await prisma.todo.createMany({
    data: [
      { description: "Piedra del Alma", complete: true },
      { description: "Gema del poder" },
      { description: "Gema del tiempo" },
      { description: "Gema del espacio" },
      { description: "Gema de la realidad" },
    ],
  });

  return NextResponse.json({ message: "Seed Executed" });
}
