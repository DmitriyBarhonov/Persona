"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./themeScript";

export type Theme = "light" | "dark";

// Источник правды — атрибут data-theme на <html>: его ставит themeScript
// до отрисовки и меняет setTheme. React просто следит за этим атрибутом.
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// Сервер не знает выбор пользователя и рендерит светлую.
// Сразу после гидрации React перечитает атрибут.
const getServerTheme = (): Theme => "light";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const setTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Хранилище недоступно — тема просто не запомнится.
  }
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggleTheme };
};
