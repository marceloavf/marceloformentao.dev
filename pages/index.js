import { useContext } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useSpring, animated, config } from '@react-spring/web'
import dynamic from 'next/dynamic'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'
import AnimationContext from '@/context/AnimationOrchestrator'
import Card from '@/components/Card'

const HeroEffect = dynamic(() => import('@/components/HeroEffect'), { ssr: false })
const UnchartedRing = dynamic(() => import('@/components/UnchartedRing'), { ssr: false })

const MAX_DISPLAY = 5

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

  const {
    animation: { ringEffectShouldStart, globalAnimationShouldStart },
  } = useContext(AnimationContext)

  const headingStyle = useSpring({
    duration: 400,
    to: { opacity: 1, y: 0, z: 0, rotateY: 0, rotateX: 0 },
    from: { opacity: 0, y: -30, z: 50, rotateY: 20, rotateX: 30 },
    pause: !ringEffectShouldStart,
  })

  const contentStyle = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -20 },
    pause: !globalAnimationShouldStart,
  })

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="relative pb-14 pt-2 text-center sm:pb-16 sm:pt-3">
        <div className="absolute inset-x-0 top-0 -z-20 m-auto h-full">
          <HeroEffect />
        </div>
        <div className="h-52">
          <UnchartedRing />
        </div>
        <animated.h1
          style={headingStyle}
          className="py-3 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl xl:text-6xl md:leading-14"
        >
          {t('common:hi')} <span className="animate-fade-text">Mar</span>
          <span>celo</span> <span className="animate-fade-text">Formentão</span>
        </animated.h1>
        <animated.p
          style={headingStyle}
          className="px-2 text-xl font-light leading-6 text-gray-500 dark:text-gray-400 sm:px-6 xl:px-0"
        >
          {t('common:mini-bio')}
        </animated.p>
      </div>
      <animated.div style={contentStyle}>
        <div>
          <div className="pt-4 pb-2 flex flex-wrap">
            <Card
              title={t('common:learning')}
              description={t('learning:description')}
              href={'/learning'}
              className="p-4"
            />
            <Card
              title={t('common:about')}
              description={t('common:about-description')}
              href={'/about'}
              className="p-4"
            />
          </div>
          <ul className="divide-y divide-transparent md:px-4">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="pt-12 pb-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('common:pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            {t('common:more')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              {t('common:all')} &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm title={t('newsletter:title')} />
          </div>
        )}
      </animated.div>
    </>
  )
}
