import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useGetFounderProfile } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Sparkles, Target, Briefcase } from 'lucide-react';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: founderProfile } = useGetFounderProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        credits: BigInt(0),
        subscriptionStatus: undefined,
      });
      toast.success('Profile created successfully! Welcome to PETERBUILTWL.');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile. Please try again.');
    }
  };

  return (
    <Dialog open={showProfileSetup} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to PETERBUILTWL!
          </DialogTitle>
          <DialogDescription className="text-center">
            Let's set up your profile to get started with our AI-powered apps.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={saveProfile.isPending}>
            {saveProfile.isPending ? 'Creating Profile...' : 'Get Started'}
          </Button>
        </form>

        {founderProfile && (
          <>
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  About the Founder
                </h3>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-30"></div>
                  <img
                    src="/assets/generated/damien-founder-portrait.dim_300x300.png"
                    alt={founderProfile.name}
                    className="relative h-24 w-24 rounded-full border-2 border-primary/20 object-cover"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h4 className="text-xl font-bold">{founderProfile.name}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{founderProfile.title}</p>
                </div>

                <div className="w-full space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <p className="text-muted-foreground leading-relaxed">{founderProfile.bio}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Core Skills</p>
                        <p className="text-muted-foreground">{founderProfile.coreSkills}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Mission Statement</p>
                        <p className="text-muted-foreground italic">"{founderProfile.missionStatement}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
