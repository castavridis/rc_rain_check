import LoginButton from './(components)/LoginButton'
import RainCheckForm from './(components)/RainCheckForm'
import UserNav from './(components)/UserNav'
import './globals.css'

export default function RootLayout (
  { children }: { children: React.ReactNode }
): React.ReactElement {

  return (
    <html lang="en">
      <body className="bg-paper-dark-black">
        { children }
        {/* <div className="gradient-background dawn-dusk fixed inset-0 z-0" aria-hidden="true">
          <div className="gradient-bg absolute inset-0" aria-hidden="true"></div>
          <div className="gradient-mg absolute inset-0" aria-hidden="true"></div>
          <div className="gradient-fg absolute inset-0" aria-hidden="true"></div>
          <div className="noise absolute inset-0" aria-hidden="true"></div>
        </div>
        <div className="relative z-10">
          <UserNav />
          {children}
        </div> */}
      </body>
    </html>
  )
}