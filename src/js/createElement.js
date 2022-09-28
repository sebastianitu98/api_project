export const createElement = (data) => {

    const divEl = document.createElement("div");
    divEl.classList.add('border-2', 'border-cyan-600', 'rounded-lg', 'mx-5', 'max-w-sm', 'justify-center')

    //create element for name
    const name = document.createElement("h2");
    name.classList.add('font-sans','text-center', 'itens-center', 'mx-auto', 'font-bold', 'text-purple-200', 'my-2')
    name.textContent = data.strDrink;

    //create element for image
    const poster = document.createElement("img");
    poster.classList.add('w-10/12', 'my-3', 'mx-auto', 'items-center','justify-center')
    poster.src = data.strDrinkThumb;

    //create element for id
    const movieIdEl = document.createElement("span");
    movieIdEl.textContent = data.idDrink;

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

    //returning the entire object
    return divEl;
}

