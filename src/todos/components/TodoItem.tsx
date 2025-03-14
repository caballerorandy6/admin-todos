"use client";

import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from "react";
//import { toogleTodo } from "../actions/todo-actions";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo?: Todo;
  toogleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

const TodoItem = ({ todo, toogleTodo }: Props) => {
  //Utilizando useOptimistic
  const [todoOptimistic, toogleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean): Todo | undefined => {
      if (!state) return undefined;

      return {
        ...state,
        complete: newCompleteValue,
      };
    }
  );

  const onToogleTodoOptimistic = async () => {
    try {
      startTransition(() => toogleTodoOptimistic(!todoOptimistic?.complete));
      await toogleTodo(todoOptimistic?.id || "", !todoOptimistic?.complete);
    } catch (error) {
      console.log(error);
      startTransition(() => toogleTodoOptimistic(!todoOptimistic?.complete));
    }
  };

  return (
    <div className={`${todo?.complete ? "todoDone" : "todoPending"}`}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
          // onClick={() =>
          //   toogleTodo(todoOptimistic?.id || "", !todoOptimistic?.complete)
          // }
          onClick={onToogleTodoOptimistic}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todoOptimistic}`}
        >
          {todoOptimistic?.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic?.description}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
