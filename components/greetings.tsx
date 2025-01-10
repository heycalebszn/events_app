'use client'

import { useEffect, useState } from 'react'

type GreetingProps = {
  firstName: string
}

export function Greeting({ firstName }: GreetingProps) {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  // Abbreviate long names
  const displayName = firstName.length > 10 ? `${firstName.slice(0, 9)}.` : firstName

  return (
    <h1 className="text-3xl font-bold text-gray-900">
      {greeting}, {displayName}!
    </h1>
  )
}

