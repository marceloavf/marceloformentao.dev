/* eslint-disable jsx-a11y/no-onchange */
import SectionContainer from './SectionContainer'
import Header from './Header'
import Footer from './Footer'
import LeftDarkGradient from './background/left-dark-gradient.svg'
import RightDarkGradient from './background/right-dark-gradient.svg'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
        <div className="hidden fixed w-full h-full -z-10 -bottom-11 -left-28 opacity-60 sm:-bottom-0 sm:-left-64 dark:block">
          <LeftDarkGradient />
        </div>
        <div className="hidden fixed w-full h-full -z-10 -top-96 right-64 opacity-60 sm:-right-96 dark:block">
          <RightDarkGradient />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
