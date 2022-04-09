import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { microApps } from "../const/micro-apps";
import "antd/dist/antd.css"; // TODO 去掉 antd 的全局样式引入
import "./index.css";

export default function App() {
  const defaultSelectedKey = location.pathname;
  return (
    <Layout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={defaultSelectedKey}>
          <Menu.Item key="/main">
            <Link to="/main">主应用</Link>
          </Menu.Item>
          {microApps.map(({ name, activeRule }) => (
            <Menu.Item key={activeRule}>
              <Link to={activeRule}>{name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <div id="micro-container">
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    </Layout>
  );
}
