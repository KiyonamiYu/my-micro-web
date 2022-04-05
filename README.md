# my-micro-web-demo

子应用

1. webpack 编译（umd 打包、子应用 dev 服务启动配置）；
2. 子应用添加生命周期，在 mount 中调用 render 函数；

微前端框架内部

1. 将所有的子应用注册到内部；
2. 原生路由拦截；
3. 通过 location.pathname 获取当前路由的 app；
4. 主应用生命周期注册；
5. 微应用生命周期注册，并处理微应用切换生命周期调用（拿到当前应用信息）；
6. 使用 fetch.get 请求微应用，和解析 html 和 js；


## 记录

### History的pushState和replaceState用法

参考 [History的pushState和replaceState用法](https://www.cnblogs.com/xuzhudong/p/8886752.html)：
- pushState能够在**不加载页面**的情况下改变浏览器的 URL；
- go、back 会跳转刷新；
- 前端路由实现思路：通过`<a>`添加路由信息，然后拦截`<a>`标签的默认行为，并与注册的路由信息进行匹配；

### eslint 和 prettier 配置

- 参考 [eslint 官网](https://eslint.org/docs/user-guide/getting-started)，了解大体规则；
- 参考 [eslint-config-prettier 集合 prettier](https://github.com/prettier/eslint-config-prettier)；
- 参考 [eslint-plugin-typescript 集合 typescript](https://github.com/bradzacher/eslint-plugin-typescript)；
- vscode 保存之后自动修复（不称为 format）的配置只要配置一个：`"editor.codeActionsOnSave": {"source.fixAll": true,}`；

### 配置 webpack 环境

1. `npm install webpack webpack-cli -D`（web 开发可以安装 `webpack-dev-server`）；
2. 配置 `webpack.config.js`；
3. 添加两个命令 `npm run build` 和 `npm run dev`；

### [配置 TypeScript webpack 环境](https://webpack.js.org/guides/typescript/#basic-setup)

基于”webpack 配置“，改造得到：

1. `npm install --save-dev typescript ts-loader`；
2. 配置 `tsconfig.json`（ts-loader 读取使用 tsc 进行编译）；
3. 热更新：`webpack watch`；

### 模块化——umd

参考文档：[掘金——UMD 非常具体的代码例子](https://juejin.cn/post/6844903927104667662)、[CommonJS、AMD、CMD、UMD、ES6 对比](https://juejin.cn/post/6844904066233925639#heading-3)；

`UMD (Universal Module Definition)`，就是一种`javascript`**通用模块定义规范**（同时满足 `CommonJS`、 `AMD`、 `CMD`），让你的模块能在`javascript`所有运行环境中发挥作用。

#### 例子 🌰

```js
(function (root, factory) {
  console.log("没有模块环境，直接挂载在全局对象上");
  root.umdModule = factory();
})(this, function () {
  return {
    name: "我是一个umd模块",
  };
});
```

可以拆解为：

```js
// 我们的业务逻辑就是这个 factory 函数
const factory = () => {
  return {
    name: "我是一个umd模块",
  };
};

// 这是一个**公用框架**————执行 factory 番薯，将“factory 返回的对象”绑定在 window 上
// 即最后结果为 window.umdModule = { name: xxx }
const fn = (root, factoryParam) => {
  console.log("没有模块环境，直接挂载在全局对象上");
  root.umdModule = factoryParam();
};

fn(this, factory);
```

将公用的 fn 更加通用化，可以改写为：

```js
const fn = (root, factoryParam) => {
  // 兼容 commonjs
  if (typeof module === "object" && typeof module.exports === "object") {
    console.log("是commonjs模块规范，nodejs环境");
    module.exports = factoryParam();
    // 兼容 amd
  } else if (typeof define === "function" && define.amd) {
    console.log("是AMD模块规范，如require.js");
    define(factoryParam);
    // 兼容 cmd
  } else if (typeof define === "function" && define.cmd) {
    console.log("是CMD模块规范，如sea.js");
    define(function (require, exports, module) {
      module.exports = factoryParam();
    });
    // 直接
  } else {
    console.log("没有模块环境，直接挂载在全局对象上");
    root.umdModule = factoryParam();
  }
};
```
