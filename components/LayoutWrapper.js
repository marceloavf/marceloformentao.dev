/* eslint-disable jsx-a11y/no-onchange */
import SectionContainer from './SectionContainer'
import Header from './Header'
import Footer from './Footer'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
