import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LandingPage } from '../components/LandingPage';
import { MagicalApp } from '../components/MagicalApp';

const Index = () => {
  const [showApp, setShowApp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterApp = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowApp(true);
      setIsTransitioning(false);
    }, 500);
  };

  const handleBackToLanding = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowApp(false);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <ThemeProvider>
      <div className={`transition-all duration-500 ${isTransitioning ? 'page-exit-active' : 'page-enter-active'}`}>
        {showApp ? (
          <MagicalApp onBackToLanding={handleBackToLanding} />
        ) : (
          <LandingPage onEnterApp={handleEnterApp} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
