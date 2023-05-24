import { createSlice } from '@reduxjs/toolkit';

export interface NutritionFacts{
    query: string,
    num_servings: 0,
    aggregate: string,
    line_delimited: false,
    use_raw_food: false,
    include_subrecipe: false,
    timezone: string,
    consumed_at: string,
    lat: 0,
    lng: 0,
    meal_type: 0,
    use_branded_foods: false,
    locale: string,
    taxonomy: false,
    ingredient_statement: false,
    last_modified: false
  }
const initialState: NutritionFacts = {
    query: "water",
    num_servings: 0,
    aggregate:  "water",
    line_delimited: false,
    use_raw_food: false,
    include_subrecipe: false,
    timezone:  "water",
    consumed_at:  "water",
    lat: 0,
    lng: 0,
    meal_type: 0,
    use_branded_foods: false,
    locale:  "water",
    taxonomy: false,
    ingredient_statement: false,
    last_modified: false
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseQuery: (state, action) => { state.query = action.payload },
        chooseNum_servings: (state, action) => { state.num_servings = action.payload },
        chooseAggregate: (state, action) => { state.aggregate = action.payload },
        chooseLine_delimited: (state, action) => { state.line_delimited = action.payload },
        chooseUse_raw_food: (state, action) => { state.use_raw_food = action.payload },
        chooseInclude_subrecipe: (state, action) => { state.include_subrecipe = action.payload },
        chooseTimezone: (state, action) => { state.timezone = action.payload },
        chooseConsumed_at: (state, action) => { state.consumed_at = action.payload },
        chooseLat: (state, action) => { state.lat = action.payload },
        chooseLng: (state, action) => { state.lng = action.payload },
        chooseMeal_type:(state, action) => { state.meal_type = action.payload },
        chooseUse_branded_foods:(state, action) => { state.use_branded_foods = action.payload },
        chooseLocale:  (state, action) => { state.locale = action.payload },
        chooseTaxonomy: (state, action) => { state.taxonomy = action.payload },
        chooseIngredient_statement: (state, action) => { state.ingredient_statement= action.payload },
        chooseLast_modified: (state, action) => { state.last_modified = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseQuery,
    chooseNum_servings,
    chooseAggregate,
    chooseLine_delimited,
    chooseUse_raw_food,
    chooseInclude_subrecipe ,
    chooseTimezone,
    chooseConsumed_at,
    chooseLat,
    chooseLng,
    chooseMeal_type,
    chooseUse_branded_foods,
    chooseLocale,
    chooseTaxonomy,
    chooseIngredient_statement,
    chooseLast_modified,
} = rootSlice.actions;

