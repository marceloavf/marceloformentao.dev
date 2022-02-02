import useTranslation from 'next-translate/useTranslation'
import { useRef, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Image from './Image'
import Link from './Link'

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 20,
  (x - rect.left - rect.width / 2) / 20,
  1.01,
]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Card = ({ title, description, imgSrc, href }) => {
  const { t } = useTranslation()

  const ref = useRef(null)
  const [xys, set] = useState([0, 0, 1])
  const props = useSpring({ xys, config: config.molasses })

  return (
    <div className="p-4 md:w-1/2 md" style={{ maxWidth: '544px' }} ref={ref}>
      <div className="rounded-md p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full">
        <Link href={href} aria-label={`Link to ${title}`}>
          <animated.div
            style={{ transform: props.xys.to(trans) }}
            onMouseLeave={() => set([0, 0, 1])}
            onMouseMove={(e) => {
              const rect = ref.current.getBoundingClientRect()
              set(calc(e.clientX, e.clientY, rect))
            }}
            className={`${
              imgSrc && 'h-full'
            } will-change-transform overflow-hidden relative rounded-md bg-gray-100 dark:bg-violet-950
          after:absolute after:inset-0 after:z-10 after:bg-cover after:opacity-0 after:pointer-events-none
          after:mix-blend-lighten after:will-change-auto after:bg-texture-pattern after:transition-opacity after:duration-500
          hover:after:opacity-90 hover:after:animate-hue-animation h-full`}
          >
            {imgSrc && (
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center lg:h-48 md:h-36"
                width={544}
                height={306}
              />
            )}
            <div className="p-6">
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
              <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">
                {description}
              </p>
              <div className="text-2xl font-thin leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                <svg className="rotate-180" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.75 8.75V17.25H15.25"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 17L17.25 6.75"
                  />
                </svg>
              </div>
            </div>
          </animated.div>
        </Link>
      </div>
    </div>
  )
}

export default Card
