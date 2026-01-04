import type { RegistryCategory } from "../types";
export declare function createProxy<TProxy extends object, TBase extends object = TProxy>(base: TBase, renderForTag: (tag: any) => React.ForwardRefExoticComponent<any>, category: RegistryCategory): TProxy;
