import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import * as yup from "yup";

// Función para evitar código duplicado en la validación
const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({ where: { id } });
};

// ✅ GET final corregido
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json(
        { message: `Todo with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ Schema Validator para el PUT con YUP
const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

// ✅ PUT actualizado
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Verificar que el TODO existe antes de actualizarlo
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    // Actualizando todo
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
