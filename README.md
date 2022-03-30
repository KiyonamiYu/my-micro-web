# my-micro-web-demo

1. webpack 编译（umd 打包、子应用 dev 服务启动配置）；
2. 子应用添加生命周期，在 mount 中调用 render 函数；

## 记录

### 模块化——umd

参考文档：[掘金——UMD 非常具体的代码例子](https://juejin.cn/post/6844903927104667662)、[CommonJS、AMD、CMD、UMD、ES6 对比](https://juejin.cn/post/6844904066233925639#heading-3)；

`UMD (Universal Module Definition)`，就是一种`javascript`**通用模块定义规范**（同时满足 `CommonJS`、 `AMD`、 `CMD`），让你的模块能在`javascript`所有运行环境中发挥作用。

#### 例子🌰

```js
(function(root, factory) {
    console.log('没有模块环境，直接挂载在全局对象上')
    root.umdModule = factory();
}(this, function() {
    return {
        name: '我是一个umd模块'
    }
}))
```
可以拆解为：
```js
// 我们的业务逻辑就是这个 factory 函数
const factory = () => {
  return {
    name: '我是一个umd模块',
  };
};

// 这是一个**公用框架**————执行 factory 番薯，将“factory 返回的对象”绑定在 window 上
// 即最后结果为 window.umdModule = { name: xxx }
const fn = (root, factoryParam) => {
  console.log('没有模块环境，直接挂载在全局对象上');
  root.umdModule = factoryParam();
};

fn(this, factory);
```

将公用的 fn 更加通用化，可以改写为：

```js
const fn = (root, factoryParam) => {
  // 兼容 commonjs
  if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('是commonjs模块规范，nodejs环境');
        module.exports = factoryParam();
  // 兼容 amd
  } else if (typeof define === 'function' && define.amd) {
      console.log('是AMD模块规范，如require.js');
      define(factoryParam);
  // 兼容 cmd
  } else if (typeof define === 'function' && define.cmd) {
      console.log('是CMD模块规范，如sea.js');
      define(function(require, exports, module) {
          module.exports = factoryParam();
      })
  // 直接
  } else {
      console.log('没有模块环境，直接挂载在全局对象上')
      root.umdModule = factoryParam();
  }
};
```

