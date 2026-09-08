"use client";

import Link from "next/link";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import "../src/shared/i18n/i18n";
import styles from "./SideMenu.module.css";

const { Sider, Content } = Layout;

type SideMenuProps = {
  children: React.ReactNode;
};

export const SideMenu = (props: SideMenuProps) => {
  const { children } = props;
  const { t } = useTranslation();

  const items = [
    { key: "/main", label: <Link href="/main">{t("menu.main")}</Link> },
    { key: "/login", label: <Link href="/login">{t("menu.login")}</Link> },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};
