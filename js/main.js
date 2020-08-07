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
    // console.log(searchText); // check
    axios.get('http://www.omdbapi.com/?apikey=59ead2b5&s=' + searchText)
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
                    <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
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