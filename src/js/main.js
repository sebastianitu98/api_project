import { createElement } from './createElement';
import { getData, localStorageService } from './services';

export const results = document.querySelector("#cocktails");
export const inputQuery = document.querySelector('#selectQuery');


//initialize data from localStorage
localStorageService.initializeData();

//added event listener on input
inputQuery.addEventListener('change', async (e) => {
    const queryString = e.target.value;
    const response = await getData(queryString);

    //initialized the input value
    results.innerHTML = '';

    //manipulated data
    const drinks = response.drinks;
    drinks.map( drink => {
        const cocktail = createElement( drink , true );
        results.appendChild(cocktail);
    })
})

results.classList.add('grid', 'grid-cols-3');
const hamburger = document.querySelector('#hamburger-btn');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('show');
})