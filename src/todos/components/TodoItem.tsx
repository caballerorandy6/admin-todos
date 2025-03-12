"use client";

import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo?: Todo;
  toogleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

const TodoItem = ({ todo, toogleTodo }: Props) => {
  return (
    <div className={`${todo?.complete ? "todoDone" : "todoPending"}`}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
          onClick={() => toogleTodo(todo?.id || "", !todo?.complete)}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todo}`}
        >
          {todo?.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">{todo?.description}</div>
      </div>
    </div>
  );
};

export default TodoItem;
