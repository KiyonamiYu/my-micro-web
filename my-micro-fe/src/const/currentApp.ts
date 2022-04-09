import { RegistrableApp } from "../types";

let currentApp: RegistrableApp | null = null;

export const getCurrentApp = () => currentApp;

export const setCurrentApp = (app?: RegistrableApp) => {
  currentApp = app;
};
