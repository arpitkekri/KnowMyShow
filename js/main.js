// jQuery
$(document).ready(() => {
    // This event is executed when form is submit
    $('#searchForm').on('submit', (e) => {
        // console.log($('#searchText').val()); // check
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault(); // prevent from submiting a file, only text accepted
    });
});

function getMovies(searchText) {
    console.log(searchText); // check
    axios.get('https://www.omdbapi.com/?apikey=59ead2b5&s=' + searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center jumbotron">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Show Details</a>
                </div>
            </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id) {
   sessionStorage.setItem('movieId', id); 
   window.location = 'movie.html';
   return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?apikey=59ead2b5&i=' + movieId)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
            <div  class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>

            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
                    </div>
            </div>
        `;
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}