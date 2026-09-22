"use client";

import { Card, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../shared/i18n/i18n";
import { RegisterForm } from "./RegisterForm";
import { SignInForm } from "./SignInForm";
import styles from "./LoginPage.module.css";

type Mode = "signin" | "register";

export const LoginPage = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("signin");

  const title = mode === "signin" ? t("signin.title") : t("login.title");
  const form =
    mode === "signin" ? (
      <SignInForm onSwitchToRegister={() => setMode("register")} />
    ) : (
      <RegisterForm onSwitchToSignIn={() => setMode("signin")} />
    );

  return (
    <Card className={styles.card}>
      <Typography.Title level={3} className={styles.title}>
        {title}
      </Typography.Title>

      {form}
    </Card>
  );
};
