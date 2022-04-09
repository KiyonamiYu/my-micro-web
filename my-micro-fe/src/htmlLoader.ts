import axios from "axios";
import { RegistrableApp } from "./types";

const deepParse = (root: Element, appEntry: string) => {
  const children = root.children;

  let scriptSrcList: string[] = [];

  if (root.nodeName.toLocaleLowerCase() === "script") {
    const src = root.getAttribute("src");
    // 只考虑 <script src="xxx.js">
    if (src != null) {
      scriptSrcList.push(src);
    }
  }

  if (root.nodeName.toLocaleLowerCase() === "link") {
    const href = root.getAttribute("href");
    if (href != null) {
      // debugger;
      root.setAttribute("href", `${appEntry}${href}`);
    }
  }

  for (let i = 0; i < children.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scriptSrcList = [...scriptSrcList, ...deepParse(children[i], appEntry)];
  }
  return scriptSrcList;
};

// 执行应用中的 js 内容 eval篇
export const performScriptForEval = (
  script: string,
  appName: string,
  global: any
) => {
  const scriptText = `
    (() => () => {
      try {
        // debugger;
        ${script}
        return module.exports; // 可以加 debugger，看到走的是第一个 if(typeof exports === 'object' && typeof module === 'object') { module.exports = factory(); }
      } catch (err) {
        console.error('runScript error:' + err);
      }
    })()
  `;
  return (() => eval(scriptText))().call(global, global);
};

const getResources = async (app: RegistrableApp, htmlText: string) => {
  const div = document.createElement("div");
  div.innerHTML = htmlText;
  const scriptSrcList = deepParse(div, app.entry);
  const scriptList = await Promise.all(
    scriptSrcList.map((src) =>
      axios.get(`${app.entry}${src}`).then(({ data }) => data)
    )
  );
  return {
    element: div,
    scriptList,
  };
};

const parseHTML = async (app: RegistrableApp) => {
  const { data: htmlText } = await axios.get(app.entry);
  return await getResources(app, htmlText);
};

export const htmlLoader = async (app: RegistrableApp) => {
  const { element, scriptList } = await parseHTML(app);
  const container = document.querySelector(app.container);
  if (!container) {
    throw Error(`${app.name} 的容器不存在，请查看是否正确指定`);
  }
  container.appendChild(element);
  scriptList.forEach((script) => {
    const lifecycle = performScriptForEval(script, app.name, window);
    lifecycle.mount();
  });
};
