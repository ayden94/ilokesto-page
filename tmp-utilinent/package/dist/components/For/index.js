import { createElement, forwardRef } from "react";
import { createProxy } from "../../core/createProxy";
function BaseFor({ each, children, fallback = null, }) {
    return each && each.length > 0 ? each.map(children) : fallback;
}
const renderForTag = (tag) => 
// forward ref so consumers can attach a ref to the underlying DOM element
forwardRef(({ each, children, fallback = null, ...props }, ref) => {
    const content = BaseFor({ each, children, fallback });
    return createElement(tag, { ...props, ref }, content);
});
export const For = createProxy(BaseFor, renderForTag, "for");
