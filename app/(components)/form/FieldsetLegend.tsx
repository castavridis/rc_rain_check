import { young } from '../fonts/young'
import { sono_bold } from '../fonts/sono'

export default function FieldsetLegend ({
  children,
  title,
  type = 'label',
  className,
  required = false,
}: {
  children: React.ReactNode
  title: string
  type: 'label' | 'title'
  className?: string,
  required?: boolean
}): React.ReactElement {
  switch (type) {
    case 'label':
      return (
        <label className={"text-sm " + sono_bold.className}>
          { title }{ required && <span className="text-red-500">*</span> }
          { children }
        </label>
      )
    case 'title':
      let classes = "px-4 py-3 text-paper-black"
      if (className) {
        classes = classes + " " + className
      }
      return (
        <label className={young.className}>
          <div className={classes}>
            { title }{ required && <span className="inline-block ml-1 text-red-500">*</span> }
          </div>
          { children }
        </label>
      )
  }
}
