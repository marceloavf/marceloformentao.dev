/* eslint-disable jsx-a11y/no-onchange */
import SectionContainer from './SectionContainer'
import Header from './Header'
import Footer from './Footer'

const Section = ({ children, isHome }) => {
  return isHome ? <>{children}</> : <SectionContainer>{children}</SectionContainer>
}

const LayoutWrapper = ({ children }) => {
  const pageName = children.type.name
  const isHome = pageName === 'Home'

  return (
    <>
      <Header isHome={isHome} />
      <Section isHome={isHome}>
        <div className="flex flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </Section>
    </>
  )
}

export default LayoutWrapper
