import useTranslation from 'next-translate/useTranslation'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Card from '@/components/Card'

export default function AuthorLayout({ children, frontMatter, availableLocales }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:about')} - ${name}`}
        description={`${t('SEO:author')} - ${name}`}
        availableLocales={availableLocales}
      />
      <div className="divide-y divide-transparent">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('headerNavLinks:about')}
          </h1>
        </div>
        <div className="items-start">
          <div className="bg-slate-700 darK:bg-slate-100 bg-opacity-10 rounded-lg text-center flex flex-col items-center p-2 md:flex-row">
            <div>
              <Card onlyImg className="p-4">
                <Image src={avatar} alt="avatar" objectFit="cover" layout="fill" />
              </Card>
            </div>
            <h3 className="py-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 py-6 px-4 md:py-0 md:px-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
              <SocialIcon kind="github" href={github} size={5} />
              <SocialIcon kind="linkedin" href={linkedin} size={5} />
              <SocialIcon kind="twitter" href={twitter} size={5} />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark md:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
