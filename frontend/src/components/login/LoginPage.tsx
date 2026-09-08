"use client";

import { Button, Card, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "../../shared/i18n/i18n";
import styles from "./LoginPage.module.css";

type LoginFormValues = {
  username: string;
  password: string;
};

const echo = async (data: unknown) => {
  const res = await fetch("http://localhost:4000/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

const handleLogin = async (values: LoginFormValues) => {
  const result = await echo(values);
  console.log("login stub:", result);
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
          label={t("login.username")}
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("login.password")}
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
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
