"use client";

import { Card, Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "../../shared/i18n/i18n";
import { Button, Input, PasswordInput } from "../../shared/ui";
import styles from "./SignInPage.module.css";

export const SignInPage = () => {
  const { t } = useTranslation();

  return (
    <Card className={styles.card}>
      <Typography.Title level={3} className={styles.title}>
        {t("signin.title")}
      </Typography.Title>

      <Form layout="vertical">
        <Form.Item label={t("signin.login")} name="login">
          <Input />
        </Form.Item>

        <Form.Item label={t("signin.password")} name="password">
          <PasswordInput />
        </Form.Item>

        <Typography.Link href="#" className={styles.forgotPassword}>
          {t("signin.forgotPassword")}
        </Typography.Link>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("signin.submit")}
          </Button>
        </Form.Item>
      </Form>

      <Typography.Link href="/login" className={styles.registerLink}>
        {t("signin.registerLink")}
      </Typography.Link>
    </Card>
  );
};
