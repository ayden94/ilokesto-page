import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { isValidElement } from "react";
export function isSlottable(child) {
    return isValidElement(child) && child.type === Slottable;
}
export const Slottable = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
