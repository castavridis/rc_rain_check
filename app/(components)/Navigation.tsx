import { GalleryVerticalEnd, LogOut, SquarePlus, SquareUserRound } from 'lucide-react';

export default function Navigation () {
  return (
    <div className="fixed rounded-md bottom-8 left-8 right-8 bg-black flex justify-between p-3">
      <div className="left flex gap-6">
        <SquarePlus stroke='#FFF' strokeWidth={1} />
        <GalleryVerticalEnd stroke='#FFF' strokeWidth={1}  />
      </div>
      <div className="right flex gap-6">
        <SquareUserRound stroke='#FFF' strokeWidth={1} />
        <LogOut stroke='#FFF' strokeWidth={1} />
      </div>
    </div>
  )
}