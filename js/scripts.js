const pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';

    // select search bar
    const searchBar = document.getElementById('search-bar');

    // Event listener to filter pokemon buttons
    searchBar.addEventListener('input', filterPokemon);
    
    // filter pokemon based on input from user
    function filterPokemon(){
        let pokemonList = document.querySelectorAll('.list-group-item');
        // make input lowercase for comparison using indexOf()
        let filter = searchBar.value.toLowerCase();
        
        // filter pokemon by using indexOf function.
        pokemonList.forEach((pokemon)=>{
            let pokemonName = pokemon.textContent.toLowerCase();

            if(pokemonName.indexOf(filter)>-1){
                pokemon.style.display = '';
            }
            else { pokemon.style.display = 'none'; }
        });
    }
    // reset search bar event listener
    let reset = document.getElementById('reset-btn');
    reset.addEventListener('click', resetFilter);
    // reset search bar filter
    function resetFilter(){
        searchBar.value = '';
        let pokemonList = document.querySelectorAll('.group-list-item');
        pokemonList.forEach(function(pokemon){
            pokemon.style.display = '';
        });
    }
    
    // add pokemon to pokemonList array
    function addPokemon(pokemon){
        // Check if pokemon is an object
        if (typeof pokemon !== 'object'){
            alert('input not an object');
            return;
        }
        // add pokemon object to list
        pokemonList.push(pokemon);
    }

    function getAll(){
        // return list of pokemon objects
        return pokemonList;
    }

    // add buttons with pokemon name
    function addButtons(pokemon){
        let name = pokemon.name;
        let selectUl = document.getElementById('pokemon-btn-list');
        // add classes to ul for bootstrap
        selectUl.classList.add('row', 'row-cols-auto');
        let li = document.createElement('li');
        // add classes to each li for bootstrap
        li.classList.add(
            'list-group-item',
            'col'
        );
        
        // create buttons
        let button = document.createElement('button');
        // add classes and necessary attributes to buttons
        button.classList.add('btn','btn-styles');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        // add event listener to button
        button.addEventListener('click', function(){ showDetails(pokemon); });
        // add name to button
        button.innerText = name;
        // add button to li element
        li.appendChild(button);
        // add li element to ul list
        selectUl.appendChild(li);
    }

    function showLoadingGif(){
        let loadingGif = 'img/gifs/BeanEater200px.gif';
        let img = document.createElement('img');
        img.src = loadingGif;
        img.className = 'loading-icon';
        document.getElementById('body').appendChild(img);
    }

    function hideLoadingGif(){
        let element = document.getElementsByClassName('loading-icon');
        element[0].parentNode.removeChild(element[0]);
    }

    // get pokemon details from API and store in pokemonList array
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
        });
    }

    // load individual pokemon details. To be used in modal.
    function loadDetails(item){
        // set url to item url from loadList()
        let url = item.detailsUrl;
        // Hit pokemon API
        return fetch(url).then(function(response) {
          return response.json();
        }).then(function (details) {
            // Add the details information to the item. This is utilized in showDetails()
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.id = details.id;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
          console.error(e);
        });
    }

    // 
    function showDetails(pokemon){
        // show pokemon details on click event
        loadDetails(pokemon).then(function(){
            // assign variables to data
            let name = pokemon.name;
            let img = pokemon.imageUrl;
            let id = pokemon.id;
            let height = Math.round(pokemon.height * 3.93701);
            let weight = pokemon.weight;
            let types = [];
            let abilities = [];
            // loop through pokemon types array, capitalize each word, push to empty types array above
            pokemon.types.forEach((item)=>{
                types.push(item.type.name[0].toUpperCase() + item.type.name.slice(1));
            });

            pokemon.abilities.forEach((item)=>{
                abilities.push(item.ability.name[0].toUpperCase() + item.ability.name.slice(1));
            });
        // pass data into showModal function
        showModal(name, img, id, height, weight, abilities, types);
        });
    }
    
    function showModal(name, img, id, height, weight, abilities, types){
        // get screen width
        function screenWidth(){
            let screenWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
            return screenWidth;
        }
        // select attributes div to add class based on screen size
        let attrCol = document.querySelector('#modal-attr');
        // Change how pokemon attr list is styled based on screen size
        if (screenWidth() < 576){
            attrCol.classList.add('justify-content-center');
        }
        else {
            attrCol.classList.add('justify-content-start');
        }
        window.addEventListener('resize', function(){
            if (screenWidth() < 576){
                attrCol.classList.remove('justify-content-start');
                attrCol.classList.add('justify-content-center');
            }
        });

        // function to create new list items for pokemon attributes
        function newLi(x){
            let li = document.createElement('li');
            li.innerHTML = x;
            let ul = document.getElementById('pokemon-attributes');
            return ul.appendChild(li);
        }

         // Create modal body content
        let modalTitle = document.getElementById('modal-title-label');
        let pokemonImg = document.querySelector('#modal-img');
        modalTitle.innerHTML = name;
        pokemonImg.src = img;
        pokemonImg.setAttribute('width', '150px');
        pokemonImg.setAttribute('height', 'auto');
        newLi(`<strong>Pok&eacute;dex ID:</strong> <span>${id}</span>`);
        newLi(`<strong>Height:</strong> <span>${height} inches</span>`);
        newLi(`<strong>Weight:</strong> <span>${weight} lbs</span>`);
        newLi(`<strong>Types:</strong> <span>${types.join(' & ')}</span>`);
        newLi(`<strong>Abilities:</strong> <span>${abilities.join(', ')}</span>`).classList.add('abilities');
    }

    // event listener to clear modal after modal is closed by the user
    let modal = document.getElementById('modal');
    modal.addEventListener('hidden.bs.modal', ()=>{
        let modalImg= document.querySelector('#modal-img');
        let modalAttr = document.querySelector('#pokemon-attributes');
        // clear modal
        modalAttr.innerHTML = '';
        modalImg.src = '';
    });

   return {
    addPokemon: addPokemon,
    getAll: getAll,
    addButtons: addButtons,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
   };
})();

function sortListAZ(list) {
    let sorted = list.sort(function(a,b){
        let nameA = a.name;
        let nameB = b.name;
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
}

pokemonRepository.loadList().then(function(){
    let pokemonList = sortListAZ(pokemonRepository.getAll());
    // loop through pokemonList and display pokemon name on buttons
    pokemonList.forEach(function(pokemon){
        pokemonRepository.addButtons(pokemon);
    });
});

