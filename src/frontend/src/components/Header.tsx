import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Moon, Sun, Menu, Activity } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const getUserInitials = () => {
    if (userProfile?.name) {
      return userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate({ to: '/' })} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/assets/generated/peterbuiltwl-logo-transparent.dim_300x100.png"
              alt="PETERBUILTWL"
              className="h-8 w-auto"
            />
          </button>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" onClick={() => navigate({ to: '/dashboard' })} className="rounded-full">
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate({ to: '/apps' })} className="rounded-full">
                Apps
              </Button>
              <Button variant="ghost" onClick={() => navigate({ to: '/payments' })} className="rounded-full">
                Payments
              </Button>
              <Button variant="ghost" onClick={() => navigate({ to: '/donations' })} className="rounded-full">
                Donations
              </Button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate({ to: '/dashboard' })}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/apps' })}>Apps</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/payments' })}>Payments</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/donations' })}>Donations</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/implementation-library' })}>
                  Implementation Library
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/about' })}>About</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/stress-test' })}>
                  <Activity className="mr-2 h-4 w-4" />
                  Stress Test
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isAuthenticated && userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/implementation-library' })}>
                  Implementation Library
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/about' })}>About</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/stress-test' })}>
                  <Activity className="mr-2 h-4 w-4" />
                  Stress Test
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAuth}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!isAuthenticated && (
            <Button onClick={handleAuth} disabled={disabled} className="rounded-full">
              {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
