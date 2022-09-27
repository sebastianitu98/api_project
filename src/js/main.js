import { API_URL } from './constants';
import { createElement } from './createElement';

const results = document.querySelector("#cocktails");
const inputQuery = document.querySelector('#selectQuery');

results.innerHTML = 'Coconut';

//added event listener on input
inputQuery.addEventListener('change', async (e) => {
    const queryString = e.target.value;
    const response = await getData(queryString);

    const drinks = response.drinks;
    console.log(drinks);
    drinks.map(drink => {
        const cocktail = createElement(drink);
        results.appendChild(cocktail);
    })
})

//function to fetch data
const getData = async ( query ) => {
    const cocktails = await fetch(`${API_URL}search.php?s=${query}`);
    return cocktails.json();
}


