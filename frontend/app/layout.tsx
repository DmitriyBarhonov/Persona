import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SideMenu } from "./SideMenu";
import { ThemeProvider, themeScript } from "@/src/shared/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
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
    // suppressHydrationWarning: themeScript ставит data-theme на <html>
    // до гидрации, и React не должен считать это расхождением.
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SideMenu>{children}</SideMenu>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
