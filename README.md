![tailwind-nextjs-banner](/public/static/images/tailwind-i18n.png)

# Tailwind Nextjs Starter Blog

[![GitHub Repo stars](https://img.shields.io/github/stars/timlrx/tailwind-nextjs-starter-blog?style=social)](https://GitHub.com/timlrx/tailwind-nextjs-starter-blog/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/timlrx/tailwind-nextjs-starter-blog?style=social)](https://GitHub.com/timlrx/tailwind-nextjs-starter-blog/network/)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftimlrxx)](https://twitter.com/timlrxx)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/timlrx)](https://github.com/sponsors/timlrx)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/GautierArcin/i18n-tailwind-nextjs-starter-blog/tree/demo/next-translate)

Unofficial i18n fork of the excellent [Tailwind CSS blogging starter template](https://github.com/timlrx/tailwind-nextjs-starter-blog) implementing sub-path i18n routing & `next-translate`.
I try to maintin it as up to date as possible with main repo.

Check out the documentation below to get started (or on main repo) to get started.

Feel free to contribute if you see any features missing.

## Examples

- [Demo Blog](https://tailwind-nextjs-starter-blog-seven.vercel.app) - this repo
- [My blog](www.gautierarcin.com)

Using the template? Feel free to create a PR and add your blog to this list.

## Motivation

I wanted found [Tailwind CSS blogging starter template](https://github.com/timlrx/tailwind-nextjs-starter-blog) and was quite happy with it. Only problem is that it didn't supported multiple languages and I wanted to create a blog in both English and French.

## Features

All of the main repo Features &

- Sub-path routing with locale(s)

- Multi-langage post support

- Optimized & flexible multi-locale SEO

## Quick Start Guide

Please follow [main repo](https://github.com/timlrx/tailwind-nextjs-starter-blog)'s' **Quick Start Guide** section for general instructions. This section will only cover what to do to add your own(s) locale(s) to the site.

This repository is furnished with `en` as defaultLocale and with `fr` as additional locale. You can provide as many locales as you want, you'll just add the corresponding translation.

If you add a new translations in `locales` folder, please PR this repo. That might help next users / forks.

1. Checkout the `demo/next-translate` branch on this repo. `Master` is kept up to date with [`timlrx/tailwind-nextjs-starter-blog`](https://github.com/timlrx/tailwind-nextjs-starter-blog)
2. Add your own locales and default locale in `i18n.json`
3. Add a folder for every locale in the `locales` folder.
4. For each `.json` files (`404.json`, `common.json`, `headerNavLink.json`, ...) in your `/locales/[locale]` folder, provide a translation
5. Complete `data/siteMetadata.js`, adding the localized version for certain field (like `title` or `description`, for example.)
6. Complete the localization of `data/projectData.js`
7. Voilà ! You're done !

## Post

To have localized version for post, please follow this naming convention:

`myPost.md` : default locale

`myPost.[locale].md`: additional locales

Post can be provided in only one locale (that doesn't need to be defaultLocale).

The API routes used in the newsletter component cannot be used in a static site export. You will need to use a form API endpoint provider and substitute the route in the newsletter component accordingly. Other hosting platforms such as Netlify also offer alternative solutions - please refer to their docs for more information.

## Support

Using the template? Support this effort by giving a star on Github, sharing your own blog and giving a shoutout on Twitter or be a project [sponsor](https://github.com/sponsors/timlrx).

## Licence

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/LICENSE) © [Timothy Lin](https://www.timrlx.com)
