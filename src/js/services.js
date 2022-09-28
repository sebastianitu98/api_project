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
    placeholderManipulator.display = 'true';
})

byFirstLetter.addEventListener('click', e => {
    currentOption = 'search.php?f=';
    placeholderManipulator.placeholder = 'Search by first letter';
    placeholderManipulator.display = 'true';
})

random.addEventListener('click', async e => {
    currentOption = 'random.php';
    placeholderManipulator.display = 'hidden';

    const response = await getData('');
    console.log(response)
    const drinks = response.drinks;
    results.innerHTML = '';
    drinks.map(drink => {
        const cocktail = createElement(drink);
        results.appendChild(cocktail);
    })
})

//function to fetch data
export const getData = async ( query ) => {
    const cocktails = await fetch(`${API_URL}${currentOption}${query}`);
    return cocktails.json();
}


//BYN www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
//BFL www.thecocktaildb.com/api/json/v1/1/search.php?f=a
//RND www.thecocktaildb.com/api/json/v1/1/random.php
//BY INGREDIENT www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin