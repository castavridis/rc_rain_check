import dynamic from 'next/dynamic'
import { getUser } from './_lib/auth/session'
import RainCheckForm from './_components/RainCheckForm'

const GradientToggle = dynamic(
  () => import('./_components/GradientToggle')
)

export default async function Page(): Promise<React.ReactElement> {
  const user = await getUser()
  return (
    <div className="flex gap-2 mt-2 flex-col container justify-center items-center py-8">
      {
        user &&
          <RainCheckForm />
      }
      <GradientToggle />
    </div>
  )
}