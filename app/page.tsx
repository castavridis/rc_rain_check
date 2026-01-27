"use client"
export default function Page(): React.ReactElement {
  function handleClick(mode: string) {
    const gradientBg = document.querySelector('.gradient-background')
    gradientBg.classList.remove("day", "dawn-dusk", "evening")
    gradientBg.classList.add(mode)
  }
  return (
    <div className="flex gap-2 mt-2">
      <button className="bg-white text-black border rounded-md p-2" onClick={ () => handleClick("day") }>Day</button>
      <button className="bg-white text-black border rounded-md p-2" onClick={ () => handleClick("dawn-dusk") }>Dawn/Dusk</button>
      <button className="bg-white text-black border rounded-md p-2" onClick={ () => handleClick("evening") }>Night</button>
    </div>
  )
}