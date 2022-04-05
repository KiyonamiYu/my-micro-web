// var subAppWebpackLib;
(() => {
  // webpackBootstrap
  "use strict";
  // "./src/add-content.js" "./src/index.js" 的 “文件=>eval 函数”映射
  var __webpack_modules__ = {
    "./src/add-content.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n    document.write('Hello world');\n}\n\n\n//# sourceURL=webpack://sub-app-webpack/./src/add-content.js?"
      );
    },
    "./src/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "sayHello": () => (/* binding */ sayHello)\n/* harmony export */ });\n/* harmony import */ var _add_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-content */ "./src/add-content.js");\n\ndocument.write(\'My first Webpack app.<br />\');\n(0,_add_content__WEBPACK_IMPORTED_MODULE_0__["default"])();\n\nconst sayHello = () => {\n    console.log(\'hello world\');\n}\n\n//# sourceURL=webpack://sub-app-webpack/./src/index.js?'
      );
    },
  };
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  /* 定义函数 __webpack_require__.d */
  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  /* 定义函数 __webpack_require__.o */
  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* 定义函数 __webpack_require__.r */
  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  /************************************************************************/

  // 递归导入执行模块
  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/index.js");

  //  缺少`window.__webpack_exports__ = __webpack_exports__;`以至于外部拿不到最后的对象；
  // subAppWebpackLib = __webpack_exports__; // ⭐️ 当设置 output.library = 'subAppWebpackLib', 会在全局创建一个对象 subAppWebpackLib，外部可调用；
  // return __webpack_exports__; // 如果再加上 output.libraryTarget = 'umd'，则会编译成 umd 模块的形式（与上面的立即执行函数完全不同），最后通过 root['subAppWebpackLib'] = factory() 外部可调用；
})();
