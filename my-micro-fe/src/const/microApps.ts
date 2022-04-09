import { RegistrableApp } from "../types";

let microApps: RegistrableApp[] = [];

export const getMicroApps = () => microApps;

export const setMicroApps = (data: RegistrableApp[] | RegistrableApp) => {
  if (Array.isArray(data)) {
    microApps = data;
  } else {
    microApps.push(data);
  }
};
