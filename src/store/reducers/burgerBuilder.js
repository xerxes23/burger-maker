import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 4,
    error: false
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
        
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                price: 4
            }
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    
        default:
            return state
    }
}

export default reducer; 