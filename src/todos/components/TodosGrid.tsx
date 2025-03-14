"use client";

import { Todo } from "@prisma/client";
import TodoItem from "@/todos/components/TodoItem";
//import { useRouter } from "next/navigation";
//import { updateTodo } from "@/todos/helpers/todos";
import { toogleTodo } from "../actions/todo-actions";

interface Props {
  todos?: Todo[];
}

const TodosGrid = ({ todos = [] }: Props) => {
  //const router = useRouter();

  //Asi se actualiza cuando se utiliza la API
  // const toogleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await updateTodo(id, complete);
  //   console.log(updatedTodo);

  //   //Actualizando en tiempo real cuando se hace el uodate
  //   router.refresh();
  //   //Puedo retornar el todo actualizado por si lo necesitp en otro lugaren este caso no lo necesito
  //   //return updatedTodo;
  // };

  //Asi se actualiza con los Server Actions

  return (
    <div className="grid grid-col-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toogleTodo={toogleTodo} />
      ))}
    </div>
  );
};

export default TodosGrid;
