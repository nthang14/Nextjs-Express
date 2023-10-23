import HeaderApp from "~/components/layout/header/Header";
import FooterApp from "~/components/layout/footer/Footer";
// import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { createElement } from "react";
import Link from "next/link";
const { Header, Content, Sider } = Layout;

const menu = [
  {
    key: "data-analysis",
    label: "Data Analysis",
    children: [
      {
        key: "dashboard",
        icon: createElement(HomeOutlined),
        label: <Link href="/">Dashboard</Link>,
      },
    ],
  },
  {
    key: "in-app wallet",
    label: "Users",
    children: [
      {
        key: "Users",
        icon: createElement(HomeOutlined),
        label: <Link href="/users">Users</Link>,
      },
      {
        key: "Transfer",
        icon: createElement(HomeOutlined),
        label: <Link href="/">Transfer</Link>,
      },
      {
        key: "Transaction History",
        icon: createElement(HomeOutlined),
        label: <Link href="/">Transaction History</Link>,
      },
    ],
  },
];

export default function AppLayout({ children }: any) {
  const onClick = (e: any) => {};
  return (
    <>
      <Layout style={{ height: "100vh" }} className="pni-layout">
        <Header className="pni-layout-header">
          <HeaderApp />
        </Header>
        <Layout>
          <Sider>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["dashboard"]}
              defaultOpenKeys={["data-analysis", "in-app wallet"]}
              mode="inline"
              items={menu}
              onClick={onClick}
            >
              {/* {menu.map((m) => (
                <Menu.Item key={m.key}>{m.label}</Menu.Item>
              ))} */}
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <main className="px-16 py-6">{children}</main>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
