// lib/start-view-transition.ts
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function startViewTransitionNavigate(
  event: React.MouseEvent<HTMLAnchorElement>,
  router: AppRouterInstance,
  href: string
) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }

  event.preventDefault();

  if (!document.startViewTransition) {
    router.push(href);
    return;
  }

  document.startViewTransition(() => {
    router.push(href);
  });
}