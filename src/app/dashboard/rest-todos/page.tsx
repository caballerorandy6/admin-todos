import prisma from "@/lib/prisma";

//mr para generar metadata
export const metadata = {
  title: "Todo's List",
  description: "SEO Title",
};

const ServerTodosPage = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      {/*  TODO: Formulario para agregar */}
      {todos.map((todo) => (
        <div key={todo.id}>{todo.description}</div>
      ))}
    </div>
  );
};

export default ServerTodosPage;
