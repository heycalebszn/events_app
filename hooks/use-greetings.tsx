"use client"

import { useState, useEffect } from 'react'

export function useGreeting(name?: string) {
  const [greeting, setGreeting] = useState('')
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let timeGreeting = ''
      
      if (hour < 12) timeGreeting = "Good morning"
      else if (hour < 17) timeGreeting = "Good afternoon"
      else timeGreeting = "Good evening"

      setGreeting(name ? `${timeGreeting}, ${name.split(' ')[0]}` : timeGreeting)
      
      setTimestamp(new Date().toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
      }))
    }

    // Initial update
    updateGreeting()

    // Update every minute
    const interval = setInterval(updateGreeting, 60000)

    return () => clearInterval(interval)
  }, [name])

  return { greeting, timestamp }
}