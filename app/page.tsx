import { sql } from '@vercel/postgres';
import { AddForm } from '@/app/add-form';
import CardComponet from './components/card';

export const runtime = 'edge';
export const preferredRegion = 'home';

export default async function Home() {
  const data = await sql`SELECT * FROM todos`;
  const { rows: todos } = data;

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
