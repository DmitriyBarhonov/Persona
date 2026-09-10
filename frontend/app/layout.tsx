import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ConfigProvider } from "antd";
import { SideMenu } from "./SideMenu";
import { antdTheme } from "../src/shared/theme/antdTheme";
import "../src/shared/theme/tokens.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexa Finance",
  description: "Nexa Finance",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConfigProvider theme={antdTheme}>
          <SideMenu>{children}</SideMenu>
        </ConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
