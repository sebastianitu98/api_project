import { localStorageService } from './services';

const cocktailsSection = document.querySelector('#cocktails');
var favorites = localStorageService.getData();

export const createElement = ( data , canAddToFavorites ) => {

    const divEl = document.createElement("div");
    divEl.classList.add('border-2', 'border-cyan-600', 'rounded-2xl', 'mx-5', 'relative', 'max-w-xs', 'text-center', 'my-5', 'p-1', 'card')

    //create element for name
    const name = document.createElement("h2");
    name.classList.add('font-sans','text-center', 'items-center', 'mx-auto', 'font-bold', 'text-purple-200', 'my-2')
    name.textContent = data.strDrink;

    //create element for image
    const poster = document.createElement("img");
    poster.classList.add('min-w-xs', 'my-3', 'mx-auto', 'pl-3', 'pr-3', 'w-60', 'h-auto')
    poster.src = data.strDrinkThumb;

    //create element for id
    const idEl = document.createElement("span");
    idEl.textContent = data.idDrink;

    //create element for ingredients
    const ingredientsEl = document.createElement('div');
    ingredientsEl.classList.add('flex', 'flex-wrap', 'mx-auto', 'items-center');
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
    
    //create element to wrap the instructions so we won't have 100-line instructions list
    const instructionsWrapper = document.createElement('div');

    //create element for instructions
    const instructions = document.createElement("p");
    const instructionsWord = 'Instructions:';
    instructions.textContent = instructionsWord + " " + data.strInstructions;
    // instructions.classList.add('text-purple-200', 'pb-9')

    instructionsWrapper.appendChild(instructions);
    instructionsWrapper.classList.add('text-purple-200', 'max-h-32', 'overflow-auto', 'mb-9')

    //create favorites button
    const favBtn = document.createElement('button')
    favBtn.classList.add('border-2', 'border-cyan-600', 'absolute', 'bottom-2', 'inset-x-1', 'rounded-full', 'text-purple-200')
        
    canAddToFavorites? favBtn.textContent = "Add to favorites": favBtn.textContent ="Remove from favorites";
    
    //creating the entire cocktail-element
    divEl.appendChild(name);
    divEl.appendChild(poster);

    //looping ingredients to get each ingredient and quantity for each cocktail
    for (let i=0 ; i < getIngredients(data).length; i++) {
        const ingredientEl = document.createElement('h6');
        ingredientEl.classList.add('text-pink-50', 'text-xxs', 'box-border', 'my-0_25', 'mx-auto', 'border-cyan-600', 'border', 'p-1', 'rounded-lg', 'w-max','text-justify', 'inline-block')

        const ingredients = getIngredients(data);
        if(ingredients[i][1] != null){
            ingredientEl.textContent = "" + ingredients[i][0] + " " + ingredients[i][1];
        } else {
            ingredientEl.textContent= "" + ingredients[i][0];
        }
        ingredientsEl.appendChild(ingredientEl);
    }
    divEl.appendChild(ingredientsEl);
    divEl.appendChild(instructionsWrapper);
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