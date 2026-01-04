import { createElement, forwardRef, useEffect, useLayoutEffect, useRef, useState, } from "react";
import { createProxy } from "../../core/createProxy";
const isPromiseLike = (value) => (typeof value === "object" || typeof value === "function") &&
    value !== null &&
    typeof value.then === "function";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function BaseMount({ children, fallback = null, onError }) {
    const isFunction = typeof children === "function";
    const [resolvedChildren, setResolvedChildren] = useState(() => isFunction ? fallback : children);
    const [status, setStatus] = useState(() => isFunction ? "fallback" : "resolved");
    const callIdRef = useRef(0);
    useIsomorphicLayoutEffect(() => {
        const callId = ++callIdRef.current;
        let canceled = false;
        if (typeof children !== "function") {
            setResolvedChildren(children);
            setStatus("resolved");
            return () => {
                canceled = true;
            };
        }
        let result;
        try {
            result = children();
        }
        catch (error) {
            setStatus("fallback");
            console.error("Mount children threw:", error);
            onError?.(error);
            return () => {
                canceled = true;
            };
        }
        if (isPromiseLike(result)) {
            setStatus("fallback");
            result
                .then((value) => {
                if (canceled || callId !== callIdRef.current) {
                    return;
                }
                setResolvedChildren(value);
                setStatus("resolved");
            })
                .catch((error) => {
                if (canceled || callId !== callIdRef.current) {
                    return;
                }
                setStatus("fallback");
                console.error("Mount children promise rejected:", error);
                onError?.(error);
            });
            return () => {
                canceled = true;
            };
        }
        setResolvedChildren(result);
        setStatus("resolved");
        return () => {
            canceled = true;
        };
    }, [children, onError]);
    return status === "resolved" ? resolvedChildren : fallback;
}
const renderForTag = (tag) => forwardRef(function Render({ children, fallback = null, onError, ...props }, ref) {
    const content = BaseMount({ children, fallback, onError });
    return createElement(tag, { ...props, ref }, content);
});
export const Mount = createProxy(BaseMount, renderForTag, "mount");
