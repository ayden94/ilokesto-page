import { isValidElement } from "react";
import { resolveWhen } from "../../utils/resolveWhen";
export function Match({ when, children }) {
    if (!resolveWhen(when)) {
        return null;
    }
    return typeof children === "function"
        ? children(when)
        : children;
}
export const isMatchElement = (child) => isValidElement(child) && child.type === Match;
