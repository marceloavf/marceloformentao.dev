import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_VALUE = {
  animation: {
    heroEffectShouldStart: true,
    heroEffectIsFinished: false,
    ringEffectShouldStart: false,
    ringEffectIsFinished: false,
    globalAnimationShouldStart: false,
  },
  setAnimation: () => {},
}

const AnimationContext = createContext(DEFAULT_VALUE)

const AnimationContextProvider = ({ children }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const [animation, setState] = useState(DEFAULT_VALUE.animation)

  const setAnimation = (data) => setState((prevState) => ({ ...prevState, ...data }))

  useEffect(() => {
    if (!isHome) {
      setAnimation({ globalAnimationShouldStart: true })
    }
  }, [isHome])

  useEffect(() => {
    if (animation.heroEffectIsFinished) {
      setAnimation({ ringEffectShouldStart: true })
    }
  }, [animation.heroEffectIsFinished])

  useEffect(() => {
    if (animation.ringEffectIsFinished) {
      setAnimation({ globalAnimationShouldStart: true })
    }
  }, [animation.ringEffectIsFinished])

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
