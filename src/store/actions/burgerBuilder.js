import * as actionTypes from  './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientType
});

export const removeIngredient = (ingredientType) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType
});

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients
});

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});


export const initIngredients = () => dispatch => {
    axios.get('https://react-my-burger-4ac9b.firebaseio.com/ingredients.json')
            .then( response => {
                dispatch(setIngredients(response.data));
            })
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            })
}