"use client";

import { Card, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { RegisterForm } from "../../features/auth/register";
import { SignInForm } from "../../features/auth/sign-in";
import { StarsBackground } from "@/src/shared/ui";
import styles from "./LoginPage.module.css";

const { Title, Link } = Typography;

type Mode = "signin" | "register";

export const LoginPage = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("signin");

  const title = mode === "signin" ? t("signin.title") : t("login.title");

  const form = mode === "signin" ? <SignInForm /> : <RegisterForm />;

  const switchLinkText =
    mode === "signin" ? t("signin.registerLink") : t("login.registerLink");

  const toggleMode = () =>
    setMode((current) => (current === "signin" ? "register" : "signin"));

  return (
    <div className={styles.page}>
      <StarsBackground />

      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          {title}
        </Title>

        {form}

        <Link onClick={toggleMode} className={styles.switchLink}>
          {switchLinkText}
        </Link>
      </Card>
    </div>
  );
};
