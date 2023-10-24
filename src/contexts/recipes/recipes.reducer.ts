import { initialState } from './recipes.context';
import {
  ActionTypes,
  type StateActions,
  type ParamsActions,
  type ListActions,
  type ListReducerState,
  type ParamsReducerState,
  type StateReducerState,
} from './recipes.types';

/**
 * Reducer for managing general application state.
 * @param state - Current state of the application.
 * @param action - Action to be applied to the state.
 * @returns New state after applying the action.
 */
export function stateReducer(
  state: StateReducerState,
  { type, payload }: StateActions
): StateReducerState {
  switch (type) {
    case ActionTypes.ERROR:
      return { ...state, error: payload };

    case ActionTypes.LOADING:
      return { ...state, loading: payload };

    case ActionTypes.ID:
      return { ...state, id: payload };

    default:
      return state;
  }
}

/**
 * Reducer for managing parameters state.
 * @param state - Current parameters state.
 * @param action - Action to be applied to the parameters state.
 * @returns New parameters state after applying the action.
 */
export function paramsReducer(
  state: ParamsReducerState,
  { type, payload }: ParamsActions
): ParamsReducerState {
  switch (type) {
    case ActionTypes.SET:
      return payload;

    case ActionTypes.UPDATE:
      return { ...state, ...payload };

    case ActionTypes.CLEAR:
      return initialState.state.params;

    default:
      return state;
  }
}

/**
 * Reducer for managing list state.
 * @param state - Current list state.
 * @param action - Action to be applied to the list state.
 * @returns New list state after applying the action.
 */
export function listReducer(
  state: ListReducerState,
  { type, payload }: ListActions
): ListReducerState {
  switch (type) {
    case ActionTypes.SET:
      return payload;

    case ActionTypes.UPDATE:
      return { ...state, ...payload };

    case ActionTypes.CLEAR:
      return initialState.state.list;

    default:
      return state;
  }
}
