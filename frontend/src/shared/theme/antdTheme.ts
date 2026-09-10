import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#0f172a",
    colorSuccess: "#1a7f37",
    colorWarning: "#9a6700",
    colorError: "#ba1a1a",
    colorInfo: "#505f76",
    colorLink: "#0f172a",
    fontFamily: "Inter, sans-serif",
    fontFamilyCode: "'JetBrains Mono', monospace",
    fontSize: 16,
    borderRadius: 4,
    sizeUnit: 4,
    sizeStep: 4,
  },
  components: {
    Card: {
      borderRadiusLG: 8,
    },
    Modal: {
      borderRadiusLG: 8,
    },
    Tag: {
      borderRadiusSM: 2,
    },
  },
};
