"use client";

import Link from "next/link";
import { Layout, Menu } from "antd";
import styles from "./SideMenu.module.css";

const { Sider, Content } = Layout;

const items = [
  { key: "/main", label: <Link href="/main">Главная</Link> },
  { key: "/login", label: <Link href="/login">Вход</Link> },
];

export default function SideMenu({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={styles.layout}>
      <Sider>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
}
