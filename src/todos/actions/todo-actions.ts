"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sleep } from "@/todos/helpers/todos";

//Crear un Todo
export const addTodo = async (
  description: string
): Promise<Todo | { message: string }> => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    console.log(error);
    return { message: "Error creating Todo" };
  }
};

//Actualizar Todo
export const toogleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep();

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Todo with ${id} not found`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  //Revalidando para que se actualice el todo en cuanto le haga click
  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

//Eliminar Action
export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath("/dashboard/server-todos");
};
