import React from "react";
import { Layout, Button } from "antd";
import 'antd/dist/antd.css'; // TODO 去掉 antd 的全局样式引入

export default function App() {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout.Content><Button type="primary">测试按钮</Button></Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
}
