import { useReducer, useMemo, type ReactNode } from 'react';

import { Context, initialState } from './recipes.context';
import { stateReducer, paramsReducer, listReducer } from './recipes.reducer';
import { ActionTypes, type ContextState, type DispatchActions } from './recipes.types';

/**
 * Provider component to manage the application state and dispatch actions.
 * @param children - React components to be wrapped by the provider.
 */
export function Provider({ children }: { children: ReactNode }) {
  // Use reducers to manage different parts of the application state.
  const [params, paramsDispatch] = useReducer(paramsReducer, initialState.state.params);
  const [list, listDispatch] = useReducer(listReducer, initialState.state.list);
  const [general, generalDispatch] = useReducer(stateReducer, {
    loading: initialState.state.loading,
    error: initialState.state.error,
    id: initialState.state.id,
  });

  // Create a dispatch object to manage actions and provide them to the context.
  const dispatch: DispatchActions = useMemo(
    () => ({
      // Actions for managing general application state.
      loading: payload => generalDispatch({ type: ActionTypes.LOADING, payload }),
      error: payload => generalDispatch({ type: ActionTypes.ERROR, payload }),
      id: payload => generalDispatch({ type: ActionTypes.ID, payload }),
      params: {
        // Actions for managing parameters state.
        set: payload => paramsDispatch({ type: ActionTypes.SET, payload }),
        update: payload => paramsDispatch({ type: ActionTypes.UPDATE, payload }),
        clear: payload => paramsDispatch({ type: ActionTypes.CLEAR, payload }),
      },
      list: {
        // Actions for managing list state.
        set: payload => listDispatch({ type: ActionTypes.SET, payload }),
        update: payload => listDispatch({ type: ActionTypes.UPDATE, payload }),
        clear: payload => listDispatch({ type: ActionTypes.CLEAR, payload }),
      },
    }),
    []
  );

  // Create the context value with the combined state and dispatch functions.
  const value: ContextState = useMemo(
    () => ({
      state: { ...general, params, list },
      dispatch,
    }),
    [general, params, list, dispatch]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
