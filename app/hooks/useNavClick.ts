import { useRef, useEffect } from 'react'

const useNavClick = (sendMessage: (message: { text: string }) => void) => {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('.user-options') && target !== navRef.current) {
        sendMessage({ text: target.textContent || '' })
        // Remove the nav if it's not the static one
        const nav = target.closest('.user-options') as HTMLElement
        if (nav && (!navRef.current || !navRef.current.contains(target))) {
          nav.remove()
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [sendMessage])

  return navRef
}

export default useNavClick
