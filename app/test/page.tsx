"use client";
import { FormEvent, useState } from 'react'
 
export default function Page() {
      const [bot, setBot] = useState<boolean | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/sensitive', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json<{
      error?: string;
      data?: string;
    }>()
    if (data.error) {
      setBot(true);
    } else if (data.data) {
      setBot(false);
    }
  }
 
  return (
    <div>
    {bot !== undefined && bot ? <p id="is-bot">You are a bot</p> : <p id="is-bot">You are not a bot</p>}
    <form onSubmit={onSubmit}>
      <input type="text" name="whatever" />
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}