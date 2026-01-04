import { MatchProps } from "./types";
export declare function Match<T>({ when, children }: MatchProps<T>): import("react").ReactNode;
export declare const isMatchElement: (child: React.ReactNode) => child is React.ReactElement<MatchProps>;
