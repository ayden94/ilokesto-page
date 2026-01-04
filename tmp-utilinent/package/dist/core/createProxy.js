import { htmlTags } from "../constants/htmlTags";
import { PluginManager } from "./PluginManager";
export function createProxy(base, renderForTag, category) {
    const tagEntries = Object.keys(htmlTags).reduce((acc, tag) => {
        acc[tag] = renderForTag(tag);
        return acc;
    }, {});
    const target = Object.assign(base, tagEntries);
    return new Proxy(target, {
        get(currentTarget, prop) {
            if (prop in currentTarget) {
                return currentTarget[prop];
            }
            const propName = String(prop);
            if (PluginManager.has(category, propName)) {
                const component = PluginManager.get(category, propName);
                const specialized = renderForTag(component);
                currentTarget[prop] = specialized;
                return specialized;
            }
            if (PluginManager.has("base", propName)) {
                const component = PluginManager.get("base", propName);
                const specialized = renderForTag(component);
                currentTarget[prop] = specialized;
                return specialized;
            }
            return undefined;
        },
    });
}
