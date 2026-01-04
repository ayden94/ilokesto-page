import { Children, Fragment, isValidElement } from "react";
export const flattenChildren = (nodes) => Children.toArray(nodes).flatMap((child) => {
    if (isValidElement(child) && child.type === Fragment) {
        return flattenChildren(child.props.children);
    }
    return [child];
});
