"use client";

import { Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../entities/user";
import { Button, Input, PasswordInput } from "@/src/shared/ui";

const { Item } = Form;

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const { t } = useTranslation();
  const register = useUserStore((state) => state.register);
  const error = useUserStore((state) => state.error);
  const clearError = useUserStore((state) => state.clearError);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleRegister = async (values: RegisterFormValues) => {
    const { email, password } = values;
    await register({ email, password });
  };

  return (
    <Form layout="vertical" onFinish={handleRegister}>
      <Item label={t("login.email")} name="email" rules={[{ min: 5 }]}>
        <Input />
      </Item>

      <Item label={t("login.password")} name="password">
        <PasswordInput />
      </Item>

      <Item
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
      </Item>

      <Item>
        <Button type="primary" htmlType="submit" block>
          {t("login.submit")}
        </Button>
      </Item>
    </Form>
  );
};
