import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function NavBar() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0b]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0b]/60">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-[#f97316] text-lg leading-none" aria-hidden="true">◆</span>
          <span className="text-white font-bold tracking-tight text-lg">AIDQA</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">New scan</Button>
          </Link>
          <Link to="/history">
            <Button variant="ghost" size="sm" className="text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">History</Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:text-white hover:bg-[#18181b] hover:border-[rgba(255,255,255,0.15)] bg-transparent"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </nav>
      </div>
    </header>
  )
}
