import LoginButton from './_components/LoginButton'
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
        {children}
      </body>
    </html>
  )
}