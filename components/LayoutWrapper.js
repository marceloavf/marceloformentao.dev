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
        <div className="flex min-h-screen flex-col justify-between">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
        <div className="fixed -bottom-11 -left-28 -z-10 h-full w-full opacity-60 sm:-bottom-0 sm:-left-64">
          <LeftDarkGradient />
        </div>
        <div className="fixed -top-96 right-64 -z-10 h-full w-full opacity-60 sm:-right-96">
          <RightDarkGradient />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
