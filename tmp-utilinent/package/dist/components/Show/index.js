import { createElement, forwardRef } from "react";
import { createProxy } from "../../core/createProxy";
import { resolveWhen } from "../../utils/resolveWhen";
const BaseShow = ({ when, children, fallback = null }) => {
    const shouldRender = resolveWhen(when);
    return shouldRender
        ? typeof children === "function"
            ? children(when)
            : children
        : fallback;
};
const renderForTag = (tag) => forwardRef(function Render({ when, children, fallback = null, ...props }, ref) {
    const content = BaseShow({ when, children, fallback });
    return createElement(tag, { ...props, ref }, content);
});
export const Show = createProxy(BaseShow, renderForTag, "show");
