import { getUser } from '@/app/(lib)/auth/session'

export default async function UserNav() {
  const user = await getUser()
  return (
    <div className="container m-auto w-full py-4 border-b border-b-amber-50">
      <div className="flex justify-between items-center gap-4 text-white">
        Rain Check
        {
          user &&
            <div className="flex items-center gap-4">
              <span>{user.name}</span>
              <a
                href="/api/auth/logout"
                className="rounded-md border-2 border-zinc-200 py-1.5 px-3 font-medium hover:bg-zinc-100 transition-colors"
              >
                Logout
              </a>
            </div>
        }
      </div>
    </div>
  )
}
