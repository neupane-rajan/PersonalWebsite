import { useState, useEffect } from 'react';

export const Typewriter = ({ words, speed = 120, loop = true }: { words: string[], speed?: number, loop?: boolean }) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return;
    if (index >= words.length) {
      if (loop) {
        setIndex(0)
        setSubIndex(0)
        setReverse(false)
      }
      return
    }
    if (
      subIndex === words[index].length + 1 && !reverse
    ) {
      setTimeout(() => setReverse(true), 1000)
      return
    }
    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => prev + 1)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 40 : speed)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words, speed, loop])

  if (!words || words.length === 0 || index >= words.length) return null;

  return (
    <span>
      {`${words[index].substring(0, subIndex)}`}
      <span className="border-r-2 border-primary-600 animate-pulse ml-1" />
    </span>
  )
} 