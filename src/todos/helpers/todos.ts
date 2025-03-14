import { Todo } from "@prisma/client";

export const sleep = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

//Actualizar un todo por su id
export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // En el body envio la propiedad complete que quiero modificar en el todo

  //Funcion que demora dos segundos el update intencionalmente para trabajar con la Actualizacion Optimista
  await sleep();

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

//Crear un nuevo todo
export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const response = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  console.log(todo);

  return todo;
};

//Eliminar Todos
export const deletedTodos = async (): Promise<void> => {
  const response = await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.json();
};
