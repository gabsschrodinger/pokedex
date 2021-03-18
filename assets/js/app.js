function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateTypeImages (arr) {
    let typesString = ``
    for(let i = 0; i < arr.length; i++) {
        typesString += `<img class="element-types" alt="element types" src="https://play.pokemonshowdown.com/sprites/types/${capitalizeFirstLetter(arr[i])}.png"/>`
    }
    return typesString
}

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHtml = pokemons => pokemons.reduce((accumulator, { name, id, types, stats }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    if(id !== 90) {
        accumulator += `
            <li class="card-list">
                <div class="card ${elementTypes[0]}">
                    <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
                </div>
                    <h2 class="card-title">${id}. ${name}</h2>
                    ${generateTypeImages(elementTypes)}
                    <ul class="stats-list">
                        <li><b>HP:</b> ${stats[0].base_stat}</li>
                        <li><b>Attack:</b> ${stats[1].base_stat}</li>
                        <li><b>Defense:</b> ${stats[2].base_stat}</li>
                    </ul>
            </li>
        `
    } else {
        console.log("Its working " + 90)
        accumulator += `
            <li class="card-list">
                <div class="card water">
                    <img class="card-image" alt="Shellder" src="https://pokeres.bastionbot.org/images/pokemon/90.png"/>
                </div>
                    <h2 class="card-title">90. Shellder</h2>
                    <img class="element-types" alt="element types" src="https://play.pokemonshowdown.com/sprites/types/Water.png"/>
                    <ul class="stats-list">
                        <li><b>HP:</b> 30</li>
                        <li><b>Attack:</b> 65</li>
                        <li><b>Defense:</b> 100</li>
                    </ul>
            </li>
        `
    }

    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHtml)
    .then(insertPokemonsIntoPage)