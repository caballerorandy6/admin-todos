import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // En el body envio la propiedad complete que quiero modificar en el todo
  const body = { complete };

  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  console.log(todo);

  return todo;
};
