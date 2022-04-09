import { Lifecycle, RegistrableApp } from "./types";
import { rewriteRouter } from "./router";
import { getCurrentAppAfterFiltering } from "./utils";
import { getMicroApps, setMicroApps } from "./const/microApps";
import { setCurrentApp } from "./const/currentApp";
import { setMainLifecycle } from "./const/mainLifecycle";

export const registerMicroApps = (
  apps: RegistrableApp[],
  mainLifecycle?: Lifecycle
) => {
  setMicroApps(apps);
  setMainLifecycle(mainLifecycle);
};

// 启动微前端框架（只执行一次，其他都靠注册监听）
export const start = () => {
  // 1. 验证当前子应用列表是否为空
  if (getMicroApps().length === 0) {
    throw Error("子应用列表为空，请正确注册");
  }

  // 覆盖路由处理（并注册监听）
  rewriteRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__MICRO_WEB__ = true; // 阻止微应用直接渲染（使用生命周期钩子调用渲染）

  // 2. 对比 location.pathname 和 app.activeRule，查找符合当前路由的子应用
  const app = getCurrentAppAfterFiltering();
  // 首次加载应用，不会触发 pushState，需要在这里手动触发
  if (app != null) {
    const { pathname, hash } = window.location;
    const url = `${pathname}${hash}`;
    window.history.pushState("", "", url);
    setCurrentApp(app);
  }
  console.log(app);
};
