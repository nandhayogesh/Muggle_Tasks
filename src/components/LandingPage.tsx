import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from '../contexts/ThemeContext';
import { Wand2, Sparkles } from 'lucide-react';
import hogwartsHero from '../assets/hogwarts-hero.jpg';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hogwartsHero})`,
          filter: theme === 'lumos' ? 'brightness(0.6) contrast(1.1)' : 'brightness(0.7) contrast(1.1)',
        }}
      />
      {/* Conditional dark overlay for light mode */}
      {theme === 'lumos' && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      {/* Magical Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Floating Magical Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="magical-float absolute top-20 left-20 text-primary/30">
          <Sparkles size={24} />
        </div>
        <div className="magical-float absolute top-40 right-32 text-accent/40" style={{ animationDelay: '2s' }}>
          <Sparkles size={18} />
        </div>
        <div className="magical-float absolute bottom-32 left-1/4 text-primary/20" style={{ animationDelay: '4s' }}>
          <Sparkles size={20} />
        </div>
        <div className="magical-float absolute top-1/3 right-20 text-accent/30" style={{ animationDelay: '6s' }}>
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="font-magical text-6xl md:text-8xl font-bold mb-6 text-foreground drop-shadow-2xl">
            <span className="bg-gradient-magical bg-clip-text text-transparent">
              MuggleTasks
            </span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="font-parchment text-2xl md:text-3xl mb-4 text-foreground/90 drop-shadow-lg">
            The Wizard's Decree List
          </h2>
          
          {/* Description */}
          <p className="font-parchment text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Organize your magical endeavors with the most enchanting to-do list in all the wizarding world. 
            Cast away chaos and conjure productivity with every decree you inscribe.
          </p>

          {/* Alohomora Button */}
          <Button
            onClick={onEnterApp}
            className="btn-magical text-xl md:text-2xl py-6 px-12 font-magical font-bold group relative overflow-hidden"
            size="lg"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Wand2 className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Alohomora
              <Sparkles className="h-5 w-5 group-hover:animate-spin transition-transform duration-300" />
            </span>
          </Button>
          
          {/* Magical Quote */}
          <p className="font-parchment text-sm text-muted-foreground/80 mt-8 italic">
            "The way to get started is to quit talking and begin doing."
          </p>
        </div>
      </div>

      {/* Bottom Magical Border */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent" />
    </div>
  );
};