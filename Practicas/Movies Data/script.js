"use strict";

const key = "db2f43fb";

//En este conteneder se renderizan las tajetas pequeñas de busqueda.
const cont = document.querySelector(".container");
//En este conteneder se renderiza la tarjeta con información detallada.
const cardContainer = document.querySelector(".card-container");
const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const more = document.querySelector(".more");


let currentPage = 1;
let searching = "Avengers";

//Para obtener la tarjeta con información detallada
const renderMovie = function(movie){
    const html =  `
    <article class="card">
      <img src=${movie.Poster} />

      <div class="info-box">

        <div class="info-header">
          <h1>${movie.Title}</h1>
          <ul class=info-list>
              <li>${movie.Year}</li>
              <li>${movie.Runtime}</li>
              <li>${movie.Rated}</li>
          </ul>
        </div>

        <div class="description">
          <p>${movie.Plot}</p>
        </div>
        
        <div class=tags-container>
            <div class="tag">${movie.Genre.split(",").join(
              "</div><div class='tag'>"
            )}
            </div>
        </div>
        
        <div class="rating">
          <img src="rating.svg" height="20px"/>
          <div>${movie.imdbRating}/10</div>
        </div>

        <ul class="info-production">
          <li>
            <span class="role-production">Direction </span> 
            <div>
              <div>${movie.Director.split(",").join("</div><div>")}</div> 
            </div>
          </li>
          <li>
            <span class="role-production">Writer(s) </span> 
            <div>
              <div>${movie.Writer.split(",").join("</div><div>")}</div>
            </div>
          </li>
          <li>
            <span class="role-production">Cast </span> 
            <div>
              <div>${movie.Actors.split(",").join("</div><div>")}</div>
            </div>
          </li>
        </ul>
      </div>
    </article>
    `;

    return html;
}

//Para obtener tarjetas pequeñas
const renderInfoMovie = function(movie){

  const html = `
  <div class="small-card" data-id="${movie.imdbID}">
    <img class="poster" src=${movie.Poster}/>
    <div class="info-box-small">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  </div>
  `;

  return html;
}

//Hacer la busqueda y renderizar tarjetas pequeñas
const getDataMovie = function (name) {
  fetch(`http://www.omdbapi.com/?s=${name}&page=${currentPage}&apikey=${key}`)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.Search;
      console.log(movies);

      movies.forEach(movie => {
        const html = renderInfoMovie(movie);

        cont.insertAdjacentHTML("beforeend", html);
      })
    })
    .catch((error) => console.error("Error:", error));
};

//Renderizar tarjeta con información detallada
const displayMovie = function(id){
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=${key}`)
    .then((response) => response.json())
    .then((movie) => {
      console.log(movie);
      cont.innerHTML = "";
      cardContainer.innerHTML = renderMovie(movie);
    })
    .catch((error) => console.error("Error:", error));
};

//Butón para buscar tajetas pequeñas.
submit.addEventListener("click", function (e) {
  e.preventDefault();

  currentPage= 1;
  const text = input.value;
  searching = text;
  cont.innerHTML = "";
  cardContainer.innerHTML = "";

  more.style.display = "inline";
  
  getDataMovie(searching);
  currentPage++;
});

//Butón para más tarjetas pequeñas
more.addEventListener("click", function(e){
  e.preventDefault();

  const text = input.value;
  searching = text;
  
  getDataMovie(searching);
  currentPage++;
});

//Seleccionar tajeta pequeña y ver tarjeta con información detallada
window.addEventListener("click", function(e){
  e.preventDefault();
  const target = e.target;

  const card = target.closest(".small-card");

  if(!card) return;

  more.style.display = "none";

  displayMovie(card.dataset.id);
});


//Iniciar con Avengers como información predeterminada
const init = function(id){
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=${key}`)
    .then((response) => response.json())
    .then((movie) => {
      console.log(movie);
      cont.innerHTML = "";
      cardContainer.innerHTML = renderMovie(movie);
    })
    .catch((error) => console.error("Error:", error));
}
init("tt4154796");