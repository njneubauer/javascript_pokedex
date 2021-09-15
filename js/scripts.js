let pokemonList = [
    {
        name: 'Pikachu', 
        height: 1.3, 
        type: 'electric'
    },
    {
        name: 'Charizard',
        height: 5.5,
        type: ['fire', 'flying']
    },
    {
        name: 'Venusaur', 
        height: 6.5,
        type: 'electric'
    },
    {
        name: 'Squirtle',
        height: 1.6,
        type: ['grass', 'poison']
    }
];

let tallestPokemon = 0;
let shortestPokemon = 0;

for (let i=0; i<pokemonList.length; i++){
    // Initialize height variables with height of first pokemon in array
    if(i==0){
        tallestPokemon = pokemonList[0].height;
        shortestPokemon = pokemonList[0].height;
    }
    // Find tallest pokemon height
    if(pokemonList[i].height>tallestPokemon){
        tallestPokemon = pokemonList[i].height;
    }
    // Find shortest pokemon height
    if(pokemonList[i].height<shortestPokemon){
        shortestPokemon = pokemonList[i].height;
    }
};

console.log(tallestPokemon);
console.log(shortestPokemon);

let tallPokemonComment = "Wow, this pokemon is the tallest of the bunch!";
let smallPokemonComment = "Small, but MIGHTY!";

for (let i=0; i<pokemonList.length; i++){
    // add opening <ul> tag
    if (i<1){
        document.write('<ul>');
    };

    // Add items <li> to <ul>. Add comments for shortest and tallest pokemon based on their height.
    if(pokemonList[i].height==tallestPokemon){
        document.write('<li>' + pokemonList[i].name +' '+ `(Height:${pokemonList[i].height})`+ `--${tallPokemonComment}` +'</li>');
    }
    else if(pokemonList[i].height==shortestPokemon){
        document.write('<li>' + pokemonList[i].name +' '+ `(Height:${pokemonList[i].height})`+ `--${smallPokemonComment}` +'</li>');
    }
    else {
        document.write('<li>' + pokemonList[i].name +' '+ `(Height:${pokemonList[i].height})`+ '</li>');
    }

    // add closing </ul> tag
    if (i==pokemonList.length){
        document.write('</ul>');
    }
};