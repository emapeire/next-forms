'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { createTodo } from '@/app/actions'
import { useEffect, useState } from 'react'
import { initialState } from './utils/utils'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState)
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (state?.resetInput) {
      setInputValue('');
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input
        type="text"
        id="todo"
        name="todo"
        required
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
