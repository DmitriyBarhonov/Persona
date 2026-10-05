"use client";

import { ConfigProvider } from "antd";
import { antdThemes } from "./antdTheme";
import { useTheme } from "./useTheme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const { theme } = useTheme();

  return <ConfigProvider theme={antdThemes[theme]}>{children}</ConfigProvider>;
};
