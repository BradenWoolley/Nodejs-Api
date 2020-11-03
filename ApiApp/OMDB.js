const prompt = require('prompt-sync')({ sigint: true });
const omdbKey = 'a7e991eb';
const request = require('request');

//User Search 
exports.SearchMovie= function () {
    console.log("Search a movie:");
    var search = prompt();
    (search !== "") ? RequestMovie(search) : console.log("Movie cannot be empty");
}

//Query search
exports.QueryMovie = function (movieQuery) { RequestMovie(movieQuery); }

//Private search movie function
function RequestMovie(movie) {

    let url = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movie}`;
    request(url, function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }

        var movieData = JSON.parse(body)

        //Spelling and check if movie exists
        if (movieData.Error)
            return console.log(`${movie} doesn't exist, please check title name`);

        var message = `Title:\t` + movieData.Title + "\n" +
            `Year:\t` + movieData.Year + "\n" +
            `IMDB Rating:\t` + movieData.Ratings[0]["Value"] + "\n" +
            `Language:\t` + movieData.Language;

        console.log(message);
        console.log("\n\n");
    });
}