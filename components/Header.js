import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg t="1621673206449" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-current text-black dark:text-white"><path d="M947.5 390.6l-377-290c-34.5-26.5-82.6-26.5-117.1 0l-377 290c-14 10.8-16.6 30.9-5.9 44.9 10.8 14 30.9 16.6 44.9 5.9l28.5-21.9V768c0 88.2 71.8 160 160 160h80c35.3 0 64-28.7 64-64V640c0-17.6 14.4-32 32-32h64c17.6 0 32 14.4 32 32v224c0 35.3 28.7 64 64 64h80c88.2 0 160-71.8 160-160V419.4l28.5 21.9c5.8 4.5 12.7 6.6 19.5 6.6 9.6 0 19.1-4.3 25.4-12.5 10.8-13.9 8.2-34-5.8-44.8zM816 768c0 52.9-43.1 96-96 96h-80V640c0-52.9-43.1-96-96-96h-64c-52.9 0-96 43.1-96 96v224h-80c-52.9 0-96-43.1-96-96V370.2l284.5-218.8c11.5-8.8 27.5-8.8 39 0L816 370.2V768z"></path></svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
