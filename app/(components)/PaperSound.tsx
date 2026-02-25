import playPaperSound from '../(lib)/utils/rustling-paper'

export default function PaperSound ({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <div
      className="border-2 border-accent-red"
      onMouseEnter={() => playPaperSound('pickup') }
      onMouseLeave={() => playPaperSound('tap') }
    >
      { children }
    </div>
  )
}
