let pokemonRepository = (function(){
    let pokemonList = [
        {
            name: 'Pikachu', 
            height: 1.3, 
            type: 'electric',
        },
        {
            name: 'Charizard',
            height: 5.5,
            type: ['fire', 'flying'],
        },
        {
            name: 'Venusaur', 
            height: 6.5,
            type: 'electric',
        },
        {
            name: 'Squirtle',
            height: 1.6,
            type: ['grass', 'poison']
        }
        ];

    function addPokemon(pokemon){
        // Check if pokemon is an object
        if (typeof pokemon !== 'object'){
            alert('input not an object')
            return
        }
        // add pokemon object to list
        pokemonList.push(pokemon);
   }

    function getAll(){
        // return list of pokemon objects
        return pokemonList;
   }

    function addListItem(pokemon) {
        let name = pokemon.name;
        let selectUl = document.getElementsByClassName('pokemon-list')[0];
        let li = document.createElement('li')
        let button = document.createElement('button')

        // add event listener to button
        button.addEventListener('click', function(){showDetails(pokemon)});
        // add name to button
        button.innerText = name;
        // add button to li element
        li.appendChild(button);
        // add li element to ul list
        selectUl.appendChild(li);
   }

    function showDetails(pokemon){
        // show pokemon details on click event
        let name = pokemon.name;
        console.log(name);
   }

   return {
    addPokemon: addPokemon,
    getAll: getAll,
    addListItem: addListItem
   };
})();

// Test to add pokemon to pokemonList
pokemonRepository.addPokemon({name: 'Wartortle', height: 3.03, type: 'water'})

// loop through pokemonList and display as HTML
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});