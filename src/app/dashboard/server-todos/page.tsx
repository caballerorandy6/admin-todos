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
