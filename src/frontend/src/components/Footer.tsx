import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025. Built with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
            <span>using</span>
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
          <div className="text-sm font-bold tracking-wider gradient-text">
            PETERBUILTWL + $DSWENTWORTH
          </div>
        </div>
      </div>
    </footer>
  );
}
