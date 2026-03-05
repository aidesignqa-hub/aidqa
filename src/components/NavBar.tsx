import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabaseClient';

export default function NavBar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-6 xl:px-12 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/')}
            className="font-bold text-lg tracking-tight mr-4 hover:opacity-80 transition-opacity"
          >
            AIDQA
          </button>
          <Button
            variant={isActive('/') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/')}
          >
            Dashboard
          </Button>
          <Button
            variant={isActive('/create-monitor') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/create-monitor')}
          >
            Create Monitor
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {userEmail && (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
              <Separator orientation="vertical" className="h-5 hidden sm:inline-block" />
            </>
          )}
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
