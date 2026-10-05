"use client";

import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/shared/theme";

// Пункт тёмного бокового меню: так он выглядит как остальная навигация
// в обеих темах и не требует своих стилей.
export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const items = [
    {
      key: "theme",
      label: theme === "dark" ? t("theme.light") : t("theme.dark"),
      onClick: toggleTheme,
    },
  ];

  return <Menu theme="dark" mode="inline" selectable={false} items={items} />;
};
