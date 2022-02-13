import React, { createContext, useState } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_VALUE = {
  animation: {
    heroEffectShouldStart: true,
    heroEffectIsFinished: true,
    ringEffectShouldStart: true,
    ringEffectIsFinished: true,
    globalAnimationShouldStart: true,
  },
  setAnimation: () => {},
}

const AnimationContext = createContext(DEFAULT_VALUE)

const AnimationContextProvider = ({ children }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const [animation, setState] = useState(DEFAULT_VALUE.animation)

  const setAnimation = (data) => setState((prevState) => ({ ...prevState, ...data }))

  return (
    <AnimationContext.Provider
      value={{
        animation,
        setAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}
export { AnimationContextProvider }
export default AnimationContext
