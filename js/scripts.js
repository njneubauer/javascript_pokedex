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

   function add(pokemon){   
    pokemonList.push(pokemon);
   }

   function getAll(){
       return pokemonList;
   }

   function displayList(list) {
        if (typeof list !== 'object'){
            alert('input not an object')
            return
        }
        let name = list.name;
        let height = list.height;
        let type = list.type;
        let selectContainer = document.getElementById("pokemon-container");
        let div = document.createElement('div');
        let content = document.createTextNode(name + ' ' + '(' + 'Height: ' + height + ' ' + 'Type: ' + type + ')');
        div.className = 'grid-item';
        div.appendChild(content);
        selectContainer.appendChild(div);
   }

   return {
    add: add,
    getAll: getAll,
    displayList: displayList
   };
})();

pokemonRepository.add({name: 'Wartortle', height: 3.03, type: 'water'})

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.displayList(pokemon);
});