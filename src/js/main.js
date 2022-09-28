import { createElement } from './createElement';
import { getData } from './services';

export const results = document.querySelector("#cocktails");
export const inputQuery = document.querySelector('#selectQuery');

//added event listener on input
inputQuery.addEventListener('change', async (e) => {
    const queryString = e.target.value;
    const response = await getData(queryString);

    //initialized the input value
    results.innerHTML = '';

    //manipulated data
    const drinks = response.drinks;
    drinks.map(drink => {
        const cocktail = createElement(drink);
        results.appendChild(cocktail);
    })
})

results.classList.add('grid','grid-cols-4');

