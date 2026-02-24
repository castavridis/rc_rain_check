import { AlignCenterVertical, LayoutGrid } from 'lucide-react';

export default function GridToggle (): React.ReactElement {
  return (
    <div className="fixed top-8 right-8 gap-3 p-2 rounded-md border bg-black flex flex-row">
      <div className="p-2">
        <AlignCenterVertical stroke="#FFF" strokeWidth={1} />
      </div>
      <div className="rounded-md bg-paper-black p-2">
        <LayoutGrid stroke="#FFF" strokeWidth={1} />
      </div>
    </div>
  )
}