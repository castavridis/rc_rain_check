import { AlignCenterVertical, LayoutGrid } from 'lucide-react';

export default function GridToggle (): React.ReactElement {
  return (
    <div className="fixed top-8 right-8 gap-3 p-2 rounded-md border border-gray-600 flex flex-row">
      <div className="p-2">
        <AlignCenterVertical stroke="#FFF" strokeWidth={1} />
      </div>
      <div className="rounded-md bg-gray-600 p-2">
        <LayoutGrid stroke="#FFF" strokeWidth={1} />
      </div>
    </div>
  )
}