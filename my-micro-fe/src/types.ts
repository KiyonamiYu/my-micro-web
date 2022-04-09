export interface RegistrableApp {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}

type LifecycleFn = (app?: RegistrableApp) => void;

export interface Lifecycle {
  beforeLoad: LifecycleFn[];
  mounted: LifecycleFn[];
  unmounted: LifecycleFn[];
}
