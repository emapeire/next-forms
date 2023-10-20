'use client'

// @ts-expect-error becuase it's not in the types yet
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { deleteTodo } from '@/app/actions'
import { FormProps, initialState } from './utils/utils'

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function DeleteForm({ id, todo }: FormProps) {
  const [state, formAction] = useFormState(deleteTodo, initialState)

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="todo" value={todo} />
        <DeleteButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  )
}
