import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as rawRender,
  type RenderOptions,
} from '@testing-library/react';
import type { JSXElementConstructor, ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

export const testRender = (
  ui: ReactElement,
  {
    ...options
  }: RenderOptions = {},
) => {
  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})
  const Wrapper: JSXElementConstructor<any> = ({
    children,
  }: {
    children: ReactElement;
  }) => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter>
        {children}
        </MemoryRouter>
    </QueryClientProvider>
  );

  return { ...rawRender(ui, { wrapper: Wrapper, ...options }), history };
};
