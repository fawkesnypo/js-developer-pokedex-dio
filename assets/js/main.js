const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const dialog = document.getElementById("detailsDialog");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}" onclick="showDetails(this.id)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function showDetails(id){

    const pokemon = pokeApi.getDetails(id)

    console.log(pokemon)
    pokemon.then((poke)=>{

        const details = `
            <div class="close" onClick="closeDetails()">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <svg viewBox="0 0 36 36" class="circle">
                <path
                    stroke-dasharray="100, 100"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                </svg>
            </div>
            <div class="pokemon type ${poke.type}">
                <img src="${poke.photo}" alt="${poke.name}">
                <div class="detail">
                    <span class="title">Abilities</span>
                    <ol class="abilities">
                        ${poke.abilities.map((abilitie) => `<li class="type">${abilitie}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `

        dialog.innerHTML = details

        dialog.showModal()

    })

}

function closeDetails(){
    dialog.close()
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})