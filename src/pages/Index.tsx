import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LandingPage } from '../components/LandingPage';
import { MagicalApp } from '../components/MagicalApp';

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  return (
    <ThemeProvider>
      {showApp ? (
        <MagicalApp onBackToLanding={() => setShowApp(false)} />
      ) : (
        <LandingPage onEnterApp={() => setShowApp(true)} />
      )}
    </ThemeProvider>
  );
};

export default Index;
