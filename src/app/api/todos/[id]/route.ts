import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import * as yup from "yup";

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({ where: { id } });
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json(
        { message: `Todo con id ${id} no encontrado` },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Algo salió mal" }, { status: 500 });
  }
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no encontrado` },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    await putSchema.validate(body);

    const { complete, description } = body;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
