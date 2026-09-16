"use client";

import { Card, Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "../../shared/i18n/i18n";
import { createUser } from "../../shared/api";
import { Button, Input, PasswordInput } from "../../shared/ui";
import styles from "./LoginPage.module.css";

type LoginFormValues = {
  email: string;
  password: string;
};

const handleLogin = async (values: LoginFormValues) => {
  const user = await createUser(values);
  console.log("user created:", user);
};

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Card className={styles.card}>
      <Typography.Title level={3} className={styles.title}>
        {t("login.title")}
      </Typography.Title>

      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label={t("login.email")}
          name="email"
          rules={[{ min: 5 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t("login.password")} name="password">
          <PasswordInput />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("login.submit")}
          </Button>
        </Form.Item>
      </Form>

      <Typography.Link href="#" className={styles.registerLink}>
        {t("login.registerLink")}
      </Typography.Link>
    </Card>
  );
};
