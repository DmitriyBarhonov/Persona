"use client";

import { Form, message, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../entities/user";
import { Button, Input, PasswordInput } from "../../../shared/ui";
import styles from "./SignInForm.module.css";

const { Item } = Form;
const { Link } = Typography;

type SignInFormValues = {
  login: string;
  password: string;
};

export const SignInForm = () => {
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
    <Form layout="vertical" onFinish={handleSignIn}>
      <Item label={t("signin.login")} name="login">
        <Input />
      </Item>

      <Item label={t("signin.password")} name="password">
        <PasswordInput />
      </Item>

      <Link href="#" className={styles.forgotPassword}>
        {t("signin.forgotPassword")}
      </Link>

      <Item>
        <Button type="primary" htmlType="submit" block>
          {t("signin.submit")}
        </Button>
      </Item>
    </Form>
  );
};
