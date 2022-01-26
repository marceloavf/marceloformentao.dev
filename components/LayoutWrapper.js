/* eslint-disable jsx-a11y/no-onchange */
import SectionContainer from './SectionContainer'
import Header from './Header'
import Footer from './Footer'
import Image from './Image'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
        <div className="fixed w-full h-full -z-10 -bottom-11 -left-28 opacity-60 sm:-bottom-0 sm:-left-64">
          <Image
            src="/static/images/left-dark-gradient.svg"
            alt="Gradient left background"
            width={1266}
            height={1211}
            layout="fixed"
          />
        </div>
        <div className="fixed w-full h-full -z-10 -top-96 right-64 opacity-60 sm:-right-96">
          <Image
            src="/static/images/right-dark-gradient.svg"
            alt="Gradient right background"
            width={1536}
            height={1527}
            layout="fixed"
          />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
