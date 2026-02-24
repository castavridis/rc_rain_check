import dynamic from 'next/dynamic'
import { getUser } from './(lib)/auth/session'
import RainCheckForm from './(components)/RainCheckFormII'

const GradientToggle = dynamic(
  () => import('./(components)/GradientToggle')
)

const RainCheckFormIII = dynamic(
  () => import('./(components)/RainCheckFormIII')
)

export default async function Page(): Promise<React.ReactElement> {
  const user = await getUser()

  return (
    <div className="wood-bg flex gap-2 mt-2 flex-col container justify-center items-center py-8]">
      <RainCheckFormIII />
      {/* {
        !user &&
          <RainCheckForm />
      } */}
      <GradientToggle />
    </div>
  )
}