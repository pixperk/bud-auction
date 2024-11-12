import Link from 'next/link'
import { UserBadge } from '@/components/UserBadge'
import { NotificationButton } from '@/components/NotificationButton'
import { auth } from '@/auth'
import { SignOut } from '@/components/sign-out'
import SignIn from './sign-in'


const navItems = [
  { name: 'My Auctions', href: '/my-auctions' },
  { name: 'All Auctions', href: '/all-auctions' },
  { name: 'Create Auction', href: '/bids/create' },
]

export async function Navbar() {
  const session = await auth()
 
  return (
    <nav className="bg-background border-b sticky top-0 z-50 transition-shadow duration-300 ease-in-out hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="" />
              <span className="ml-2 text-lg font-semibold text-foreground">Bud Auction</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <NotificationButton />
            {session ? <UserBadge SignOut={<SignOut/>} user={session.user}/> : <SignIn/>}
          </div>
        </div>
        <div className="flex items-center sm:hidden">
          </div>
      </div>
    </nav>
  )
}