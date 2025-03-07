import prisma from "@/lib/prisma";
import TodosGrid from "@/todos/components/TodosGrid";

//mr para generar metadata
export const metadata = {
  title: "Todo's List",
  description: "SEO Title",
};

const RestTodosPage = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
};

export default RestTodosPage;
