import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for revealing elements on scroll
 * Supports staggered animations and respects reduced motion preference.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instantly reveal all elements if reduced motion is preferred
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we can unobserve to save CPU / memory
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before entering full viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-observe if new DOM elements mount dynamically (e.g. filtered tabs)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
