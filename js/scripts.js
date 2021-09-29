let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150'

    function addPokemon(pokemon){
        // Check if pokemon is an object
        if (typeof pokemon !== 'object'){
            alert('input not an object')
            return
        }
        // add pokemon object to list
        pokemonList.push(pokemon);
    }

    function addButtons(pokemon){
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

    function getAll(){
        // return list of pokemon objects
        return pokemonList;
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
        return fetch(url).then(function(response) {
          return response.json();
        }).then(function (details) {
          // Add the details information to the item. This is utilized in showDetails()
          item.imageUrl = details.sprites.front_default;
          item.id = details.id
          item.height = details.height;
          item.weight = details.weight
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(){
        // show pokemon details on click event
        loadDetails(pokemon).then(function(){
            // assign variables to data
            let title = pokemon.name;
            let img = pokemon.imageUrl;
            let id = pokemon.id;
            let height = Math.round(pokemon.height * 3.93701);
            let weight = pokemon.weight
            let types = [];
            // loop through pokemon types array, capitalize each word, push to empty types array above
            pokemon.types.forEach((item)=>{
                types.push(item.type.name[0].toUpperCase() + item.type.name.slice(1))
            });
        // pass data into showModal function
        showModal(title, img, id, height, weight, types);
        });
    }
    
    function showModal(title, img, id, height, weight, types){
        let modalContainer = document.querySelector('#modal-container');
        let h1 = document.querySelector('div.modal h1.modal-title');
        let pokemonImg = document.querySelector('img');

        function newLi(x){
            let li = document.createElement('li');
            li.innerHTML = x
            let ul = document.getElementById('pokemon-attributes');
            return ul.appendChild(li);
        }
    
        // modal content
        h1.innerHTML = title;
        pokemonImg.src = img;
        newLi(`<strong>Pok&eacute;dex ID:</strong> <span>${id}</span>`);
        newLi(`<strong>Height:</strong> <span>${height} inches</span>`);
        newLi(`<strong>Weight:</strong> <span>${weight} lbs</span>`);
        newLi(`<strong>Types:</strong> <span>${types.join(' & ')}</span>`);
        // show modal
        modalContainer.classList.add('is-visible');
    }

    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        // reset attributes list
        let ul = document.getElementById('pokemon-attributes');
        ul.innerHTML = '';
        // reset image
        let pokemonImg = document.querySelector('img');
        pokemonImg.src = '';
    }

    // add event listner to the modal close button
    let modalX = document.querySelector('button.modal-close');
    let modalButton = document.querySelector('button.modal-button-close')
    modalX.addEventListener('click', hideModal, false);
    modalButton.addEventListener('click', hideModal, false);


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
        pokemonRepository.addButtons(pokemon);
    });
});

