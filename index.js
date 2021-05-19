let pokemonArray= [];
let pokemon;
let root = document.getElementById('root');
let pokeCards = document.getElementById('pokeCards')
fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
    .then(data =>  data.json())
    .then(data => {
      console.log('all data', data)
      data.results.forEach(element => {
          fetch(`${element.url}`)
          .then(data =>  data.json())
          .then(pokemondata => {
              pokemonArray.push(pokemondata);
          })
          .then(() => {
            showPokemon(pokemonArray);
          })
          .catch(err => console.log(err));
        })
        console.log(pokemonArray);
      // .catch(err => console.log(err));
    })
let finder = document.getElementById("search");
finder.addEventListener('change', filterResults);

function filterResults(e) {
  console.log("This is e ", e);
  let filterArray = pokemonArray.filter(ele => ele.height >= e.target.value);
  pokeCards.innerHTML='';
  showPokemon(filterArray);
}
  
  function showPokemon(array) {
    array.forEach(element => {
      let displayCard = document.createElement('div');
      displayCard.classList.add('card');
      let image = document.createElement('img');
      image.src = element.sprites.front_shiny;
      displayCard.append(image);
      let name = document.createElement('p');
      let height = document.createElement('p');
      let weight = document.createElement('p');
      name.innerHTML += "Name: "; 
      name.innerHTML += element.name;
      height.innerHTML += "Height: "; 
      height.innerHTML +=  element.height;
      weight.innerHTML += "Weight: "; 
      weight.innerHTML +=  element.weight;
      displayCard.append(name);
      displayCard.append(height);
      displayCard.append(weight);
      pokeCards.appendChild(displayCard);
    })
     }