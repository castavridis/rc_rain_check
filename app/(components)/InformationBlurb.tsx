import { sono } from './fonts/sono'
import { young } from './fonts/young'

export default function InformationBlurb () {
  return (
    <div className="fixed rounded-md top-8 left-8 bg-black flex flex-col w-72">
      <div className={"p-3 text-paper-white " + young.className}>Rain Check Work Bench</div>
      <div className="p-3 border-dashed border-t border-paper-black">
        <p className={"text-paper-gray text-sm " + sono.className}>
          Fill out some information to issue a rain check for your loved one(s).
        </p>
      </div>
    </div>
  )
}