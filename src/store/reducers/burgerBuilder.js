import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    price: 4
};

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .8,
    cheese: .5,
    meat: 1.2
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientType]

            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientType]
            }
    
        default:
            return state
    }
}

export default reducer; 