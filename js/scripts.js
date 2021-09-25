let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150'

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

    function addListItem(pokemon){
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

    function showLoadingGif(){
        let loadingGif = "img/gifs/BeanEater200px.gif";
        let img = document.createElement('img');
        img.src = loadingGif;
        img.className = 'loading-icon';
        document.getElementById('body').appendChild(img);
    }

    function hideLoadingGif(){
        let element = document.getElementsByClassName('loading-icon');
        element[0].parentNode.removeChild(element[0]);
    }

    function loadList(){
        showLoadingGif();
        // Hit pokemon API
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            // store pokemon name & details url in an array
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                addPokemon(pokemon);
            });
            hideLoadingGif();
        }).catch(function(e){
            hideLoadingGif();
            console.error(e);
        })
    }

    function loadDetails(item){
        // set url to item url from loadList()
        let url = item.detailsUrl;
        // Hit pokemon API
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Add the details information to the item. This is utilized in showDetails()
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(pokemon){
        console.log(pokemon)
        // show pokemon details on click event
        loadDetails(pokemon).then(function(){
        });
    }

   return {
    addPokemon: addPokemon,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
   };
})();

function sortListAZ(list) {
    let sorted = list.sort(function(a,b){
        let nameA = a.name
        let nameB = b.name
        if (nameA < nameB){
            return -1;
        }
        else if (nameA > nameB){
            return 1;
        }
        else {
            return 0;
        }
    });
    return sorted;
};

pokemonRepository.loadList().then(function(){
    let pokemonList = sortListAZ(pokemonRepository.getAll());
    // loop through pokemonList and display as HTML
    pokemonList.forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

