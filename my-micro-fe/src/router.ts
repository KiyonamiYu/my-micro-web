import { isPathnameChanged } from "./utils";

type HistoryChangeState = typeof history.pushState;

const turnApp = () => {
  if (!isPathnameChanged()) {
    return;
  }
  console.log("turnApp");
};

// 除了改变 url，还要发送自定义事件
const patchRouter = (historyChangeState: HistoryChangeState, type: string) => {
  // 不能使用箭头函数！（this 绑定
  return function (...args: Parameters<HistoryChangeState>) {
    // 改变路由
    historyChangeState.apply(this, args);
    // 通过dispatchEvent来触发"自定义事件"
    window.dispatchEvent(new Event(type));
  };
};

export const rewriteRouter = () => {
  // 拦截路由
  window.history.pushState = patchRouter(
    window.history.pushState,
    "micro_push"
  );
  // 拦截路由
  window.history.replaceState = patchRouter(
    window.history.replaceState,
    "micro_replace"
  );
  // 拦截路由
  window.onpopstate = function () {
    window.dispatchEvent(new Event("micro_pop"));
  };
  // 添加路由跳转事件监听
  window.addEventListener("micro_push", turnApp);
  window.addEventListener("micro_replace", turnApp);
  window.addEventListener("micro_pop", turnApp);
};
