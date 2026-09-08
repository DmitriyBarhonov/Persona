"use client";

import { Flex, Typography } from "antd";
import styles from "./page.module.css";

const Home = () => {
  return (
    <Flex className={styles.wrapper} align="center" justify="center">
      <Typography.Title level={2}>Nexa Finance</Typography.Title>
    </Flex>
  );
};

export default Home;
