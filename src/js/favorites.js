import { createElement } from "./createElement";
import { localStorageService } from "./services";

const favBtn = document.querySelector("#favorites");
const cocktails = document.querySelector('#cocktails');


favBtn.addEventListener('click', () => {
    cocktails.innerHTML='';
    const newFavorites = localStorage.get
})


favBtn.addEventListener('click', () => {
    cocktails.innerHTML = '';
    const favorites = localStorageService.getData('favorites');
    favorites.map(drink => {
        const drinkEl = createElement(drink, false)
        cocktails.appendChild(drinkEl);
    })
})