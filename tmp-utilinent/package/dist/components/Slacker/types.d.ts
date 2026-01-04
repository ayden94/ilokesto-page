export type SlackerFallbackProps = {
    isLoading: boolean;
    error: Error | null;
    retry: () => void;
};
export type SlackerProps<T = any> = {
    children: (loaded: T) => React.ReactNode;
    errorFallback?: React.ReactNode | ((props: SlackerFallbackProps) => React.ReactNode);
    loadingFallback?: React.ReactNode;
    threshold?: number | number[];
    rootMargin?: string;
    loader: () => Promise<T> | T;
    onError?: (error: Error) => void;
    maxRetries?: number;
    retryDelay?: number;
};
