import { useState, useEffect } from 'react'

const useIsMobileOrTablet = () => {
  const [isMoblieOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(
        window.innerWidth < 1024 &&
          window.matchMedia('(pointer: coarse)').matches,
      )
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMoblieOrTablet
}

export default useIsMobileOrTablet
