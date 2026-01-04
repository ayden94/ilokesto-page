import { createElement, forwardRef } from "react";
import { createProxy } from "../../core/createProxy";
import { resolveWhen } from "../../utils/resolveWhen";
import { flattenChildren } from "./flattenChildren";
import { isMatchElement } from "./Match";
function BaseSwitch({ children, fallback = null }) {
    const childArray = flattenChildren(children);
    for (const child of childArray) {
        if (!isMatchElement(child)) {
            continue;
        }
        const { when } = child.props;
        if (!resolveWhen(when)) {
            continue;
        }
        return child;
    }
    return fallback;
}
const renderForTag = (tag) => forwardRef(function Render({ children, fallback = null, ...props }, ref) {
    const content = BaseSwitch({ children, fallback });
    return createElement(tag, { ...props, ref }, content);
});
export const Switch = createProxy(BaseSwitch, renderForTag, "switch");
