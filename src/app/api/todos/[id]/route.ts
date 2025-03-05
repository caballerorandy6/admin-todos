import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { todo } from "@prisma/client";
import * as yup from "yup";

interface Params {
  params: {
    id: string;
  };
}

//Fucion para evitar codigo duplicado en la validacion
const getTodo = async (id: string): Promise<todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });
  return todo;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const todo = getTodo(params.id);

    if (!todo) {
      return NextResponse.json(
        { message: `Todo whit id ${id} not found` },
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

//Schema Validator para el PUT con YUP
const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

//PUT by ID
export async function PUT(request: NextRequest, { params }: Params) {
  const id = params.id;
  //Obtengo el todo aqui solo para verificar que exista y no intentar actualizar un todo que no existe
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo whit id ${id} not found` },
      { status: 404 }
    );
  }

  try {
    //En el PUT se espera que se envíe un body con los campos que se quieren actualizar
    //En este caso se espera que se envíe un body con los campos complete y description, el ...rest son otros campos que no se van a actualizar, en este caso no hay otros campos
    const { complete, description, ...rest } = await putSchema.validate(
      await request.json()
    );
    console.log("REST", rest);

    //Actualizando todo
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
}
