'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateTodo } from '@/app/actions';
import { initialState, FormProps } from './utils/utils';

function EditButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Edit
    </button>
  );
}

export function EditForm({ id, todo }: FormProps) {
  const [state, formAction] = useFormState(updateTodo, initialState);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <input
          type="text"
          id={`edit-${id}`}
          name="todo"
          required
          defaultValue={todo}
        />
        <EditButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
}
