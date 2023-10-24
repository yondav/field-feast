import type { Nullable, NumericalString, ValueOf } from '../../utils';

import type {
  cuisineTypes,
  dietLabels,
  dishTypes,
  healthLabels,
  mealTypes,
  nutrients,
} from './recipes.constants';

// Represents a cuisine type.
export type CuisineType = ValueOf<typeof cuisineTypes>;

// Represents a meal type.
export type MealType = ValueOf<typeof mealTypes>;

// Represents a dish type.
export type DishType = ValueOf<typeof dishTypes>;

// Represents diet labels.
export type DietLabels = keyof typeof dietLabels;

// Represents a parameterized diet label.
export type DietLabelParam = ValueOf<typeof dietLabels>;

// Represents health labels.
export type HealthLabels = keyof typeof healthLabels;

// Represents a parameterized health label.
export type HealthLabelParam = ValueOf<typeof healthLabels>;

// Represents a query param that could potentially accept more than one value.
export type ParamValue<T> = T | Array<T>;

// Represents a query parameter that would accept a single number or a range.
export type RangeValue = NumericalString | [NumericalString, NumericalString];

// Represents an object of query parameters.
export type QueryParams = {
  diet: ParamValue<DietLabelParam>;
  health: ParamValue<HealthLabelParam>;
  cuisineType: ParamValue<CuisineType>;
  mealType: ParamValue<MealType>;
  dishType: ParamValue<DishType>;
  calories: RangeValue;
  time: RangeValue;
  imageSize: ParamValue<ImageSizes>;
  random: boolean;
  field: ParamValue<keyof Recipe>;
  cont: ParamValue<string>;
};

// Represents available image sizes.
export type ImageSizes = 'THUMBNAIL' | 'SMALL' | 'REGULAR' | 'LARGE';

// Represents a sized image with URI, width, and height.
export type SizedImage = {
  uri: string;
  width: number;
  height: number;
};

// Represents an ingredient with text, quantity, measure, etc.
export type Ingredient = {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
};

// Represents nutrient types.
export type NutrientType = keyof typeof nutrients;

// Represents a nutrient with label, quantity, and unit.
export type Nutrient = {
  uri?: string;
  label: string;
  quantity: number;
  unit: string;
};

// Represents digest information.
export type Digest = {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
};

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: { [key in ImageSizes]: SizedImage };
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: Array<DietLabels>;
  healthLabels: Array<HealthLabels>;
  cautions: Array<string>;
  ingredientLines: Array<string>;
  ingredients: Array<Ingredient>;
  calories: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  totalTime: number;
  cuisineType: Array<CuisineType>;
  mealType: Array<MealType>;
  dishType: Array<DishType>;
  totalNutrients: { [key in NutrientType]?: Nutrient };
  totalDaily: { [key in NutrientType]?: Nutrient };
  digest: Array<Digest & { sub: Array<Digest> }>;
}

// Represents links with href and title.
export type RecipeLink = { [key in 'href' | 'title']: string };

// Represents a hit object with a recipe and links.
export interface Hit {
  recipe: Recipe;
  _links: {
    self: RecipeLink;
  };
}

// Represents a list of hits.
export interface HitList {
  from: number;
  to: number;
  count: number;
  hits: Array<Omit<Hit, 'recipe'> & { recipe: Pick<Recipe, 'uri' | 'image' | 'label'> }>;
  _links: {
    next: RecipeLink;
  };
}

// Represents type classifications for dispatch actions.
export enum ActionTypes {
  'LOADING',
  'ERROR',
  'ID',
  'SET',
  'UPDATE',
  'CLEAR',
}

// Represents ActionTypes pertaining to the general reducer.
export type GeneralActionTypes = Exclude<
  ActionTypes,
  ActionTypes.CLEAR | ActionTypes.SET | ActionTypes.UPDATE
>;

// Represents ActionTypes pertaining to list and params reducers.
export type SpecifiedActionTypes = Exclude<
  ActionTypes,
  ActionTypes.ERROR | ActionTypes.ID | ActionTypes.LOADING
>;

// Represents generic reducer action.
export type Action<
  T extends K extends void ? GeneralActionTypes : SpecifiedActionTypes,
  P extends ActionPayloadMap<K>[T],
  K extends void | 'params' | 'list' = void,
> = { type: T; payload: P };

// Represents actions supported by the general reducer.
export type StateActions =
  | Action<ActionTypes.LOADING, boolean>
  | Action<ActionTypes.ERROR, Nullable<string>>
  | Action<ActionTypes.ID, Nullable<string>>;

// Represents the actions supported by the params reducer.
export type ParamsActions =
  | Action<ActionTypes.SET, Partial<QueryParams>, 'params'>
  | Action<ActionTypes.UPDATE, Partial<QueryParams>, 'params'>
  | Action<ActionTypes.CLEAR, null, 'params'>;

// Represents the actions supported by the list reducer.
export type ListActions =
  | Action<ActionTypes.SET, HitList, 'list'>
  | Action<ActionTypes.UPDATE, Partial<HitList>, 'list'>
  | Action<ActionTypes.CLEAR, null, 'list'>;

// A map that matches action types to their associated, supported payloads.
export type ActionPayloadMap<
  C extends keyof Pick<ContextState['state'], 'params' | 'list'> | void = void,
> = {
  [ActionTypes.CLEAR]: null;
  [ActionTypes.ERROR]: Nullable<string>;
  [ActionTypes.ID]: Nullable<string>;
  [ActionTypes.LOADING]: boolean;
  [ActionTypes.SET]: C extends 'params' ? Partial<QueryParams> : HitList;
  [ActionTypes.UPDATE]: C extends 'params' ? Partial<QueryParams> : Partial<HitList>;
};

// Represents a generic dispatch action declaration.
export type DispatchAction<
  T extends ActionTypes,
  K extends 'params' | 'list' | void = void,
> = (payload: ActionPayloadMap<K>[T]) => void;

// Represents all of the reducer actions.
export type DispatchActions = {
  loading: DispatchAction<ActionTypes.LOADING>;
  error: DispatchAction<ActionTypes.ERROR>;
  id: DispatchAction<ActionTypes.ID>;
  params: {
    clear: DispatchAction<ActionTypes.CLEAR, 'params'>;
    set: DispatchAction<ActionTypes.SET, 'params'>;
    update: DispatchAction<ActionTypes.UPDATE, 'params'>;
  };
  list: {
    clear: DispatchAction<ActionTypes.CLEAR, 'list'>;
    set: DispatchAction<ActionTypes.SET, 'list'>;
    update: DispatchAction<ActionTypes.UPDATE, 'list'>;
  };
};

// Represents the state of recipes context.
export interface ContextState {
  dispatch: DispatchActions;
  state: {
    loading: boolean;
    error: Nullable<string>;
    id: Nullable<string>;
    params: Partial<QueryParams>;
    list: HitList;
  };
}

// Represents states broken up for appropriate reducers.
export type StateReducerState = Pick<ContextState['state'], 'error' | 'id' | 'loading'>;
export type ParamsReducerState = ContextState['state']['params'];
export type ListReducerState = ContextState['state']['list'];
