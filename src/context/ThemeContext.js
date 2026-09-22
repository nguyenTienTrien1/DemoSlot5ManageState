import { createContext, useContext, useState } from "react";

const themes = {
  light: {
    background: "#f1f5f9",
    card: "#ffffff",
    text: "#172033",
    muted: "#526176",
    border: "#cbd5e1",
    primary: "#2563eb",
  },
  dark: {
    background: "#0f172a",
    card: "#1e293b",
    text: "#f1f5f9",
    muted: "#cbd5e1",
    border: "#64748b",
    primary: "#93c5fd",
  },
};

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ theme, colors: themes[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Component con đọc theme trực tiếp, không cần truyền props qua nhiều tầng.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme phải nằm trong ThemeProvider");
  return context;
}
