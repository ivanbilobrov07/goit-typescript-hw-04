import { ReactNode, useEffect, useRef } from "react";

interface IObserverProps {
  children: ReactNode;
  onContentEndVisible: () => void;
}

interface IOptions {
  rootMargin: string;
  threshold: number | number[];
  root: Element | null;
}

export function Observer({ children, onContentEndVisible }: IObserverProps) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IOptions = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
