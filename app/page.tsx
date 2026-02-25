import dynamic from 'next/dynamic'
import { getUser } from './(lib)/auth/session'
// import RainCheckForm from './(components)/RainCheckFormII'
import Navigation from './(components)/Navigation'
import InformationBlurb from './(components)/InformationBlurb'
import GridToggle from './(components)/GridToggle'

const GradientToggle = dynamic(
  () => import('./(components)/GradientToggle')
)

const RainCheckFormIII = dynamic(
  () => import('./(components)/RainCheckFormIII')
)

export default async function Page(): Promise<React.ReactElement> {
  const user = await getUser()

  return (
    <div className="wood-bg fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-paper-dark-black fixed top-0 left-0 right-0 bottom-0 opacity-65">
        {/* This exists to lighten the wood bg to add more contrast between InformationBlurb, GridToggle and Navigation */}
      </div>
      <RainCheckFormIII />
      <InformationBlurb />
      <GridToggle />
      <Navigation />
    </div>
    // <div className="wood-bg flex gap-2 mt-2 flex-col container justify-center items-center py-8]">
    //   {
    //     !user &&
    //       <RainCheckForm />
    //   }
    //   <GradientToggle />
    // </div>
  )
}