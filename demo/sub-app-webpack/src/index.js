import addContent from './add-content';
import './index.css';

const render = () => {
    addContent();
    console.log('---===hello world===---');
}

// 非微前端架构，直接执行
if (!window.__MICRO_WEB__) {
  render();
}

export const bootstrap = () => {
  console.log('sub-app-webpack 开始加载');
}

export const mount = () => {
  render();
  console.log('sub-app-webpack 加载完成');
}

export const unmount = () => {
  console.log('sub-app-webpack 卸载完成');
}
