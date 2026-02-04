import { useEffect, useRef, useCallback } from "react";

const LoadMoreTrigger = ({
    isLoading,
    hasMore,
    onLoadMore,
}: {
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;

            if (entry.isIntersecting && !isLoading && hasMore) {
                onLoadMore();
            }
        },
        [isLoading, hasMore, onLoadMore]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [handleIntersection]);

    return <div ref={ref} style={{ height: 1 }} />;
};

export default LoadMoreTrigger;
