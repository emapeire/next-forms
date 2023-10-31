import { AddForm } from '@/app/add-form';
import CardComponet from './components/card';
import { supabase } from './lib/supabase-client';
// import { sql } from '@vercel/postgres';

export const runtime = 'edge';
export const preferredRegion = 'home';

export default async function Home() {
  // const data = await sql`SELECT * FROM todos`;
  // const { rows: todos } = data;

  const { data: todos, error } = await supabase
    .from('todos')
    .select('*');

  if (error) {
    console.error(error);
    return <div>Error fetching todos</div>;
  }

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <CardComponet id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
