import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSpring, animated, config } from '@react-spring/web'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import AnimationContext from '@/context/AnimationOrchestrator'
import NowPlaying from '@/components/NowPlaying'

export default function Footer() {
  const { locale } = useRouter()

  const {
    animation: { globalAnimationShouldStart },
  } = useContext(AnimationContext)

  const contentStyle = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -20 },
    pause: !globalAnimationShouldStart,
  })

  return (
    <animated.footer style={contentStyle}>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-3 flex">
          <NowPlaying />
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" aria-label={siteMetadata.headerTitle[locale]}>
            {siteMetadata.headerTitle[locale]}
          </Link>
        </div>
      </div>
    </animated.footer>
  )
}
