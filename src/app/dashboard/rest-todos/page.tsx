import prisma from "@/lib/prisma";
import { NewTodo } from "@/todos/components/NewTodo";
import TodosGrid from "@/todos/components/TodosGrid";

//mr para generar metadata
export const metadata = {
  title: "Todo's List",
  description: "SEO Title",
};

const RestTodosPage = async () => {
  //Obteniendo todos los "todos" de la base de datos
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
};

export default RestTodosPage;
