import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as rawRender,
  renderHook,
  type RenderHookOptions,
  type RenderOptions,
} from "@testing-library/react";
import type { JSXElementConstructor, ReactElement } from "react";
import { MemoryRouter } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
const Wrapper: JSXElementConstructor<any> = ({
  children,
}: {
  children: ReactElement;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const testRender = (
  ui: ReactElement,
  { ...options }: RenderOptions = {},
) => {
  return { ...rawRender(ui, { wrapper: Wrapper, ...options }), history };
};

export const testHook = <R, P = unknown>(
  render: (initialProps: P) => R,
  options: RenderHookOptions<P> = {},
) => {
  return renderHook<R, P>(render, {
    wrapper: Wrapper,
    ...options,
  });
};
