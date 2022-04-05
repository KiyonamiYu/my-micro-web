import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// 非微前端架构，直接执行
if (!window.__MICRO_WEB__) {
  render();
}

export const bootstrap = () => {
  console.log('sub-app-react 开始加载');
}

export const mount = () => {
  render();
  console.log('sub-app-react 加载完成');
}

export const unmount = () => {
  console.log('sub-app-react 卸载完成');
}