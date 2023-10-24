import { Provider } from './recipes.Provider';
import * as constants from './recipes.constants';
import * as context from './recipes.context';
import * as reducers from './recipes.reducer';
import * as typings from './recipes.types';

const Recipes = {
  constants: { ...constants, initialState: context.initialState },
  Context: context.Context,
  Provider,
  reducers: {
    general: reducers.stateReducer,
    params: reducers.paramsReducer,
    list: reducers.listReducer,
  },
  use: context.useRecipesContext,
  ...typings,
};

export default Recipes;
