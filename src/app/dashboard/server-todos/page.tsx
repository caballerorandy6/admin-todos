//Utilizar esto para revalidar la Data en TODA pagina, layout o Ruta
//Muy bueno cuando se necesita actualizar la data en tiempo real en Server Actions
export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo } from "@/todos/components/NewTodo";
import TodosGrid from "@/todos/components/TodosGrid";

//mr para generar metadata
export const metadata = {
  title: "Todo's List",
  description: "SEO Title",
};

const ServerTodosPage = async () => {
  //Obteniendo todos los "todos" de la base de datos
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  console.log("construido");

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
};

export default ServerTodosPage;
