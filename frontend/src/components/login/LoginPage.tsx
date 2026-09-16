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
  confirmPassword: string;
};

const handleLogin = async (values: LoginFormValues) => {
  const { email, password } = values;
  const user = await createUser({ email, password });
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

        <Form.Item
          label={t("login.confirmPassword")}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("login.confirmPasswordMismatch")),
                );
              },
            }),
          ]}
        >
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
