"use client";

import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";

export const MainPage = () => {
  const { t } = useTranslation();

  return <Typography.Paragraph>{t("main.text")}</Typography.Paragraph>;
};
