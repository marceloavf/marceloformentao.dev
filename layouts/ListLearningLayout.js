import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Image from '@/components/Image'
import TOCInline from '@/components/TOCInline'
import Pre from '@/components/Pre'

const HeadingTwo = (props) => {
  return (
    <span className="not-prose">
      <h2
        className="text-2xl font-extrabold inline-block bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-3xl"
        {...props}
      />
    </span>
  )
}

export default function ListLearningLayout({
  posts,
  post,
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const MDXComponents = {
    Image,
    TOCInline,
    a: Link,
    h2: HeadingTwo,
    pre: Pre,
  }

  const MDXLayout = useMemo(() => getMDXComponent(post.mdxSource), [post.mdxSource])

  return (
    <>
      <div className="divide-y divide-transparent">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('learning:subtitle')}
          </p>
        </div>
        <ul>
          {initialDisplayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter

            return (
              <li key={slug} className="py-4">
                <article className="space-y-2">
                  <dl>
                    <dt className="sr-only">{t('common:pub')}</dt>
                  </dl>
                  <div className="space-y-3">
                    <div className="prose dark:prose-dark max-w-none">
                      <MDXLayout components={MDXComponents} />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSlug={'learning'}
        />
      )}
    </>
  )
}
