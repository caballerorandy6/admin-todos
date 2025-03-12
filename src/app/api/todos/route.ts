import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";

//GET
export async function GET(request: Request) {
  //Tomando los query params de la URL, si no hay query params se toma el valor por defecto de 10
  //Los searchParams son un objeto que contiene todos los query params de la URL y son opcionales
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");

  //Validando que el query param sea un número pq siempre se recibe como string los query params
  if (isNaN(take)) {
    return NextResponse.json(
      { error: "Take has to be a number" },
      { status: 400 }
    );
  }

  //Validando que el query param sea un número pq siempre se recibe como string los query params
  const skip = Number(searchParams.get("skip") ?? "0");
  if (isNaN(skip)) {
    return NextResponse.json(
      { error: "Skip has to be a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({ take, skip });
  return NextResponse.json(todos);
}

//Schema Validator para el POST con YUP
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

//POST
export async function POST(request: NextRequest) {
  try {
    //Desestructurando el body del request y validando que cumpla con el schema
    //Es importante desestructurar para asegurar que lo que voy a insertar en la DB es lo que espero, en este caso el id y los demas campos se generan automaticamente por la base de datos
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// DELETE completed Todos
export async function DELETE() {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    return NextResponse.json(`${deletedTodos.count} todo's deleted`);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error deleting todos" },
      { status: 400 }
    );
  }
}
