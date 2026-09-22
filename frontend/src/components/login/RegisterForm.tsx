"use client";

import { Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { createUser } from "../../shared/api";
import { Button, Input, PasswordInput } from "../../shared/ui";
import styles from "./LoginPage.module.css";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const handleRegister = async (values: RegisterFormValues) => {
  const { email, password } = values;
  const user = await createUser({ email, password });
  console.log("user created:", user);
};

type RegisterFormProps = {
  onSwitchToSignIn: () => void;
};

export const RegisterForm = (props: RegisterFormProps) => {
  const { onSwitchToSignIn } = props;
  const { t } = useTranslation();

  return (
    <>
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item label={t("login.email")} name="email" rules={[{ min: 5 }]}>
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

      <Typography.Link onClick={onSwitchToSignIn} className={styles.switchLink}>
        {t("login.registerLink")}
      </Typography.Link>
    </>
  );
};
