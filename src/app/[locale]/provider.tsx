"use client";

import { ThemeProvider } from "neato/theme";

export function Provider ({ children }: { children: React.ReactNode }) {
return (
        <ThemeProvider>
          {children}
        </ThemeProvider>
      );
}