import { useEffect, useState } from "react";

export function useSessionStorage<T>(item: string, initialValue: T) {
  const [sessionValue, setSessionValue] = useState<T>(initialValue)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let sessionValue = sessionStorage.getItem(item)
    if (sessionValue) setSessionValue(JSON.parse(sessionValue))
  }, [window])

  function updateSessionStorage(newValue: T) {
    setSessionValue(newValue)
    sessionStorage.setItem(item, JSON.stringify(newValue))
  }

  return {
    sessionValue,
    updateSessionStorage
  }
}