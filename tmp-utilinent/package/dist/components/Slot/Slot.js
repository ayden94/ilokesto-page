import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { composeRefs } from './composeRefs';
import { mergeProps } from './mergeProps';
import { isSlottable } from './Slottable';
export const Slot = forwardRef((props, ref) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
        // Slottable의 children을 가져와서 병합
        const slottableChild = slottable.props.children;
        if (!isValidElement(slottableChild)) {
            return null;
        }
        const newElement = cloneElement(slottableChild, {
            ...mergeProps(slotProps, slottableChild.props),
            ref: ref ? composeRefs(ref, slottableChild.ref) : slottableChild.ref,
            key: slottable.key
        });
        const newChildren = childrenArray.map((child) => {
            if (child === slottable) {
                return newElement;
            }
            return child;
        });
        return _jsx(_Fragment, { children: newChildren });
    }
    const [child] = childrenArray;
    if (!isValidElement(child)) {
        return null;
    }
    return cloneElement(child, {
        ...mergeProps(slotProps, child.props),
        ref: ref ? composeRefs(ref, child.ref) : child.ref
    });
});
