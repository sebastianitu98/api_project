import { API_URL } from './constants';
import { results } from './main';
import { createElement } from './createElement';

const byName = document.querySelector('#byName');
const byFirstLetter = document.querySelector('#byFirstLetter');
const random = document.querySelector('#random');
const placeholderManipulator = document.getElementById('selectQuery');
//*creating a variable where we store the current option
// (search by name / by first letter / generating a random cocktail-element)
let currentOption = 'search.php?s='

byName.addEventListener('click', e => {
    currentOption = 'search.php?s=';
    placeholderManipulator.placeholder = 'Search by name';
    placeholderManipulator.style.display = 'block';
})

byFirstLetter.addEventListener('click', e => {
    currentOption = 'search.php?f=';
    placeholderManipulator.placeholder = 'Search by first letter';
    placeholderManipulator.style.display = 'block';
})

random.addEventListener('click', async e => {
    currentOption = 'random.php';
    placeholderManipulator.style.display = 'none';

    const response = await getData('');
    console.log(response)
    const drinks = response.drinks;
    results.innerHTML = '';
    drinks.map(drink => {
        const cocktail = createElement( drink , true );
        results.appendChild(cocktail);
    })
})


//function to fetch data
export const getData = async ( query ) => {
    const cocktails = await fetch(`${API_URL}${currentOption}${query}`);
    return cocktails.json();
}


//added the localStorage manipulator
const ls = window.localStorage;

export const localStorageService = {
    initializeData: () => {
        if (ls.getItem('favorites') === null){
            ls.setItem('favorites',JSON.stringify([]))
        }
    },
    getData: () => { return JSON.parse(ls.getItem('favorites')) },

    setData: ( data ) => { ls.setItem('favorites', JSON.stringify( data )) }
};


//BYN www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
//BFL www.thecocktaildb.com/api/json/v1/1/search.php?f=a
//RND www.thecocktaildb.com/api/json/v1/1/random.php
//BY INGREDIENT www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin