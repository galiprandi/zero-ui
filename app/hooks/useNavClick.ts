import { useRef, useEffect } from 'react'

const useNavClick = (sendMessage: (message: { text: string }) => void) => {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON') {
        sendMessage({ text: target.textContent || '' })
      }
    }

    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll('button')
      buttons.forEach(button => {
        button.addEventListener('click', handleClick)
      })

      return () => {
        buttons.forEach(button => {
          button.removeEventListener('click', handleClick)
        })
      }
    }
  }, [sendMessage])

  return navRef
}

export default useNavClick
