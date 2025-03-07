"use client";

import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo?: Todo;
  toogleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

const TodoItem = ({ todo, toogleTodo }: Props) => {
  return (
    <div
      className={`${
        todo?.complete
          ? "line-through bg-blue-50 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
          : "bg-red-50 rounded-lg shadow-sm p-5 border-dashed border border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
      }`}
    >
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
