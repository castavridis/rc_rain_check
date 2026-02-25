export default function FieldsetContainer ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): React.ReactElement {
  let classes = "rounded-md drop-shadow-fieldset"

  if (className) {
    classes = classes + " " + className
  }
  return (
    <div
      className={classes}
    >
      { children }
    </div>
  )
}
