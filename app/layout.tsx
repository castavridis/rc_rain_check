import LoginButton from './_components/LoginButton'
import RainCheckForm from './_components/RainCheckForm'
import UserNav from './_components/UserNav'
import './globals.css'

export default function RootLayout (
  { children }: { children: React.ReactNode }
): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <UserNav />
        <LoginButton />
        <RainCheckForm />
        {children}
      </body>
    </html>
  )
}