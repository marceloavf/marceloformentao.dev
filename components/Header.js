import { useState, useContext } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { animated, config, useSpring } from '@react-spring/web'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'
import AnimationContext from '@/context/AnimationOrchestrator'

export default function Header({ isHome }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [navShow, setNavShow] = useState(false)
  const { locale, locales, defaultLocale } = router

  const {
    animation: { globalAnimationShouldStart },
  } = useContext(AnimationContext)

  const changeLanguage = (locale) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  const styles = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -20 },
    pause: !globalAnimationShouldStart,
  })

  return (
    <>
      <header
        className={`w-full ${
          isHome ? 'fixed' : 'sticky'
        } z-30 top-0 flex items-center justify-between bg-white dark:bg-violet-1000 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <animated.nav
          style={styles}
          className="w-full max-w-3xl mx-auto px-4 py-2 sm:px-6 xl:px-0 flex items-center justify-between"
        >
          <div className="w-full flex items-center justify-between text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-2 font-medium text-gray-900 sm:py-4 sm:px-3 dark:text-gray-100"
                >
                  {t(`headerNavLinks:${link.title.toLowerCase()}`)}
                </Link>
              ))}
            </div>
            <div className="flex">
              {locales.map((e, index) => (
                <span key={e}>
                  <button
                    aria-label={`Change to ${e}`}
                    type="button"
                    value={locale}
                    onClick={() => changeLanguage(e)}
                    className="cursor-pointer inline-block p-2 font-medium text-gray-900 sm:py-4 dark:text-gray-100"
                  >
                    {e}
                  </button>
                  {index === 0 && (
                    <span className="py-1 text-gray-300 dark:text-gray-700 sm:py-4">/</span>
                  )}
                </span>
              ))}
              <ThemeSwitch />
            </div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="w-8 h-8 ml-1 mr-1 rounded"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              >
                {navShow ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </animated.nav>
      </header>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </>
  )
}
