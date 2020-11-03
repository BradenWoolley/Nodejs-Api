const prompt = require('prompt-sync')({ sigint: true });
var Spotify = require('node-spotify-api')
var spotify = new Spotify({
    id: 'YourKeyHere',
    secret: 'YourKeyHere'
});

//User searches song
exports.SearchSong = function () {
    console.log("Enter a song name");
    var song = prompt();
    //Can't pass an empty string to search
    (song !== "") ? RequestSong(song) : console.log("Song cannot be empty");
}

//Query Search
exports.QuerySong = function (song) { RequestSong(song); }

//Shared private function to search music
RequestSong = function (song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err)
            return console.log('Error occured: ' + err);

        //if song doesn't exist or has been spelt incorrectly
        if (data.tracks.items.length === 0)
            return console.log(song + " doesn't exist, check spelling and try again");

        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            if (i === 0) {
                console.log("Artists: " + data.tracks.items[0].artists[i].name);
            }

            else {
                console.log("\t" + data.tracks.items[0].artists[i].name);
            }
        }
        console.log("Song:\t" + data.tracks.items[0].name);
        console.log("Preview Link:\t" + data.tracks.items[0].preview_url);
        console.log("Album:\t" + data.tracks.items[0].album.name);
        console.log("\n\n");
    });
}
