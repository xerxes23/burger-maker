import * as actionTypes from  './actionTypes';

export const addIngredient = (ingredientType) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientType
});

export const removeIngredient = (ingredientType) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType
});