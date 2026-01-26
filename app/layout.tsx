import './globals.css'

export default function RootLayout (
  { children }: { children: React.ReactNode }
): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <div>Rain Check</div>
        {children}
      </body>
    </html>
  )
}