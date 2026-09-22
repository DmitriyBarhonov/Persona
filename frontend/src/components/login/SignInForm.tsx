"use client";

import { Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Button, Input, PasswordInput } from "../../shared/ui";
import styles from "./LoginPage.module.css";

type SignInFormProps = {
  onSwitchToRegister: () => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const { onSwitchToRegister } = props;
  const { t } = useTranslation();

  return (
    <>
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

      <Typography.Link
        onClick={onSwitchToRegister}
        className={styles.switchLink}
      >
        {t("signin.registerLink")}
      </Typography.Link>
    </>
  );
};
