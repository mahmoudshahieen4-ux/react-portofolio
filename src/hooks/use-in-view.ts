import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-reveal hook.
 * Returns a ref to attach to an element and a boolean that flips to `true`
 * once the element enters the viewport (fires once, then disconnects).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const optionsRef = useRef(options);

  // Keep the latest options without re-running the observer itself.
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, optionsRef.current);

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
