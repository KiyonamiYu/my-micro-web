import { Lifecycle } from "../types";

let mainLifecycle: Lifecycle = null;

export const getMainLifecycle = () => mainLifecycle;

export const setMainLifecycle = (data?: Lifecycle) => {
  mainLifecycle = data;
};
