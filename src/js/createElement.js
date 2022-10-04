import { localStorageService } from './services';

const cocktailsSection = document.querySelector('#cocktails');
var favorites = localStorageService.getData();

export const createElement = ( data , canAddToFavorites ) => {

    const divEl = document.createElement("div");
    divEl.classList.add('border-2', 'border-cyan-600', 'rounded-lg', 'mx-5', 'max-w-sm', 'justify-center')

    //create element for name
    const name = document.createElement("h2");
    name.classList.add('font-sans','text-center', 'items-center', 'mx-auto', 'font-bold', 'text-purple-200', 'my-2')
    name.textContent = data.strDrink;

    //create element for image
    const poster = document.createElement("img");
    poster.classList.add('w-10/12', 'my-3', 'mx-auto', 'items-center','justify-center')
    poster.src = data.strDrinkThumb;

    //create element for id
    const idEl = document.createElement("span");
    idEl.textContent = data.idDrink;

    //create element for ingredients
    const ingredientsEl = document.createElement('div');
    ingredientsEl.classList.add('grid', 'grid-cols-4', 'max-w-full', 'items-center', 'w-10/12', 'grid-flow-row');
    const getIngredients = (data) => {
        let ingredients = [];
        for(let i=1; i<=15; i++){
            let ingredient = "strIngredient"+i;
            let measure = "strMeasure"+i;
            if (data[ingredient] != null){
                ingredients.push([data[ingredient],data[measure]])
            }
        }
        return ingredients;
    }
    
    //create element for instructions
    const instructions = document.createElement("p");
    instructions.textContent = data.strInstructions;

    //create favorites button
    const favBtn = document.createElement('button')
    favBtn.classList.add('border-2', 'border-cyan-600')
        
    canAddToFavorites? favBtn.textContent = "Add to favorites": favBtn.textContent ="Remove from favorites";
    
    //creating the entire cocktail-element
    divEl.appendChild(name);
    divEl.appendChild(poster);

    //looping ingredients to get each ingredient and quantity for each cocktail
    for (let i=0 ; i < getIngredients(data).length; i++) {
        const ingredientEl = document.createElement('h6');
        ingredientEl.classList.add('my-1', 'mx-6', 'border-cyan-600', 'border-2', 'w-max', 'whitespace-nowrap', 'text-justify')

        const ingredients = getIngredients(data);
        if(ingredients[i][1] != null){
            ingredientEl.textContent = "" + ingredients[i][0] + " " + ingredients[i][1];
        } else {
            ingredientEl.textContent= "" + ingredients[i][0];
        }
        ingredientsEl.appendChild(ingredientEl);
    }
    divEl.appendChild(ingredientsEl);
    divEl.appendChild(instructions);
    divEl.appendChild(favBtn);
    
    //add functionality for addToFavorites button
        
    favBtn.addEventListener('click', () => {
        if (canAddToFavorites === true) {
            favorites.push(data);
            localStorageService.setData(favorites);
            canAddToFavorites = false;
            favBtn.textContent ="Remove from favorites";
        } else {
            const filteredFavorites = favorites.filter( (el) =>  el.idDrink !== data.idDrink);
            localStorageService.setData(filteredFavorites);
            favorites = localStorageService.getData();          
            cocktailsSection.innerHTML = "";
            favorites.map(element => {
                const drinkEl = createElement( element , false );
                cocktailsSection.appendChild(drinkEl);
            });
        }
    })

    //returning the entire object
    return divEl;
    
}