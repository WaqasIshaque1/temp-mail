"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemePreset, ThemeStyles } from "@/types/theme";
import { defaultPresets } from "@/lib/theme-presets";

interface ThemeContextType {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  currentStyles: ThemeStyles | null;
  availableThemes: Record<string, ThemePreset>;
  applyTheme: (themeKey: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState("modern-minimal");
  const [currentStyles, setCurrentStyles] = useState<ThemeStyles | null>(null);
  const [availableThemes] = useState(defaultPresets);

  const applyTheme = (themeKey: string) => {
    const theme = availableThemes[themeKey];
    if (!theme) return;

    setCurrentTheme(themeKey);
    setCurrentStyles(theme.styles as ThemeStyles);

    // Apply CSS variables to document root
    const root = document.documentElement;
    const isDark = document.documentElement.classList.contains('dark');
    const themeStyles = isDark ? theme.styles.dark : theme.styles.light;

    Object.entries(themeStyles).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value);
      }
    });
  };

  useEffect(() => {
    // Apply initial theme
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (currentStyles) {
        applyTheme(currentTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [currentTheme, currentStyles]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        currentStyles,
        availableThemes,
        applyTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
}