import { createContext, useContext } from 'react';

import type { ContextState } from './recipes.types';

// Initial state of the context.
export const initialState: ContextState = {
  dispatch: {
    loading: () => null,
    error: () => null,
    id: () => null,
    params: {
      clear: () => null,
      set: () => null,
      update: () => null,
    },
    list: {
      clear: () => null,
      set: () => null,
      update: () => null,
    },
  },
  state: {
    loading: false,
    error: null,
    id: null,
    params: {},
    list: {
      from: 0,
      to: 0,
      count: 0,
      hits: [],
      _links: {
        next: {
          href: '',
          title: '',
        },
      },
    },
  },
};

// Create a context with the initial state.
export const Context = createContext<ContextState>(initialState);

/**
 * Hook to access the recipes context.
 * @returns The current context state and dispatch functions.
 */
export function useRecipesContext() {
  return useContext(Context);
}
