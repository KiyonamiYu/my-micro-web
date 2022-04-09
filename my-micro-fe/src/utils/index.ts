import { getCurrentApp } from "../const/currentApp";
import { getMicroApps } from "../const/microApps";
import { RegistrableApp } from "../types";

/**
   *
    http://localhost:9000/main?hello=world

    hash: ""
    host: "localhost:9000"
    hostname: "localhost"
    href: "http://localhost:9000/main?hello=world"
    origin: "http://localhost:9000"
    pathname: "/main"
    port: "9000"
    protocol: "http:"
    search: "?hello=world"
   */
export const getCurrentAppAfterFiltering = () => {
  const currentPathname = window.location.pathname;
  return filterApp("activeRule", currentPathname);
};

const filterApp = (key: keyof RegistrableApp, value: string) => {
  return getMicroApps().filter((app) => app[key] === value)[0];
};

export const isPathnameChanged = () => {
  const currentApp = getCurrentApp();
  if (currentApp?.activeRule === location.pathname) {
    return false;
  }
  return true;
};
