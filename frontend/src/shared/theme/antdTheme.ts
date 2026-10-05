import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { Theme } from "./useTheme";

const { defaultAlgorithm, darkAlgorithm } = theme;

// Общее для обеих тем: шрифты, размеры, скругления.
const baseToken: ThemeConfig["token"] = {
  fontFamily: "var(--font-inter), sans-serif",
  fontFamilyCode: "var(--font-jetbrains-mono), monospace",
  fontSize: 16,
  borderRadius: 4,
  sizeUnit: 4,
  sizeStep: 4,
};

const components: ThemeConfig["components"] = {
  Card: { borderRadiusLG: 8 },
  Modal: { borderRadiusLG: 8 },
  Tag: { borderRadiusSM: 2 },
  // Выбранный пункт тёмного меню antd красит основным цветом,
  // а наш тёмно-синий на тёмно-синем меню не видно.
  Menu: { darkItemSelectedBg: "#475569" },
};

// Светлая — та же, что была до редизайна.
const light: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...baseToken,
    colorPrimary: "#0f172a",
    colorSuccess: "#1a7f37",
    colorWarning: "#9a6700",
    colorError: "#ba1a1a",
    colorInfo: "#505f76",
    colorLink: "#0f172a",
  },
  components,
};

// Тёмная — штатный тёмный режим antd. Своё тут только основной цвет и ссылки:
// тёмно-синий из светлой темы на чёрном фоне не видно, берём светлее из той же гаммы.
const dark: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...baseToken,
    colorPrimary: "#64748b",
    colorLink: "#94a3b8",
  },
  components,
};

export const antdThemes: Record<Theme, ThemeConfig> = { light, dark };
