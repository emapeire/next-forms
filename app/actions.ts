"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { supabase } from "./lib/supabase-client";
// import { sql } from "@vercel/postgres";

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(prevState: never, formData: FormData) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const data = schema.parse({
    todo: formData.get("todo"),
  });

  try {
    // await sql`
    //   INSERT INTO todos (text)
    //   VALUES (${data.todo})
    // `;

    const { error } = await supabase
      .from("todos")
      .insert([{ text: data.todo }]);

    if (error) throw error;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}`, resetInput: true };
  } catch (e) {
    return { message: "Failed to create todo", resetInput: false };
  }
}

export async function updateTodo(prevState: never, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    // await sql`
    //   UPDATE todos
    //   SET text = ${data.todo}
    //   WHERE id = ${data.id};
    // `;

    const { error } = await supabase
      .from("todos")
      .update({ text: data.todo })
      .eq("id", data.id);

    if (error) throw error;

    revalidatePath("/");
    return { message: `Updated todo ${data.todo}`, resetInput: true };
  } catch (e) {
    return { message: "Failed to update todo", resetInput: false };
  }
}

export async function deleteTodo(prevState: never, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    // await sql`
    //   DELETE FROM todos
    //   WHERE id = ${data.id};
    // `;

    const { error } = await supabase.from("todos").delete().eq("id", data.id);

    if (error) throw error;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
