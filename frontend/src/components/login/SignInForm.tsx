"use client";

import { Form, message, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../entities/user";
import { Button, Input, PasswordInput } from "../../shared/ui";
import styles from "./LoginPage.module.css";

type SignInFormValues = {
  login: string;
  password: string;
};

type SignInFormProps = {
  onSwitchToRegister: () => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const { onSwitchToRegister } = props;
  const { t } = useTranslation();
  const signIn = useUserStore((state) => state.signIn);
  const error = useUserStore((state) => state.error);
  const clearError = useUserStore((state) => state.clearError);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSignIn = async (values: SignInFormValues) => {
    const { login: email, password } = values;
    await signIn({ email, password });
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSignIn}>
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

      <Typography.Link
        onClick={onSwitchToRegister}
        className={styles.switchLink}
      >
        {t("signin.registerLink")}
      </Typography.Link>
    </>
  );
};
