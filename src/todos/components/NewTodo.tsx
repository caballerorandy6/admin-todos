"use client";

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
//import { createTodo } from "@/todos/helpers/todos";
//import { useRouter } from "next/navigation";
//import { deletedTodos } from "@/todos/helpers/todos";
import { addTodo } from "@/todos/actions/todo-actions";
import { deleteCompleted } from "@/todos/actions/todo-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  //const router = useRouter();

  // Asi se borra utilizando la API
  // const deleteCompleted = async () => {
  //   await deletedTodos();
  //   router.refresh();
  // };

  //Asi se crea un Todo utilizando la API
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (description.trim().length === 0) return;
  //   const newTodo = await createTodo(description);
  //   setDescription("");
  //   router.refresh();
  //   return newTodo;
  // };

  //Creando Todo utilizando ServerActions
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo(description);
    setDescription("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="What thing needs to be done?"
      />

      <button
        type="submit"
        className="flex items-center justify-center cursor-pointer rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Create
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()} //OJO => Se debe enviar asi el onClick de los serverActions onClick={() => deleteCompleted()} si no da error
        type="button"
        className="flex items-center justify-center rounded ml-2 cursor-pointer bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};
