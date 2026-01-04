import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createElement, forwardRef } from "react";
import { createProxy } from "../../core/createProxy";
function BaseRepeat({ times, children, fallback = null }) {
    const content = times && times > 0 && Number.isInteger(times)
        ? Array.from({ length: times }, (_, i) => children(i))
        : fallback ?? null;
    return _jsx(_Fragment, { children: content });
}
const renderForTag = (tag) => forwardRef(({ times, children, fallback = null, ...props }, ref) => {
    const content = BaseRepeat({ times, children, fallback });
    return createElement(tag, { ...props, ref }, content);
});
export const Repeat = createProxy(BaseRepeat, renderForTag, "repeat");
