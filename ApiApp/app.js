'use strict';

const prompt = require('prompt-sync')({ sigint: true });
const spot = require('./Spotify');
const tweet = require('./Twitter');
const omdb = require('./OMDB');
const query = require('./FileQuery');

console.log(".1\tSpotify");
console.log(".2\tTwitter");
console.log(".3\tOMDb");
console.log(".4\tQuery from file");
console.log(".5\tExit");

const answer = prompt();

switch (answer) {
    case "1":
        spot.SearchSong();
        break;
    case "2":
        tweet.SearchTweets();
        break;
    case "3":
        omdb.SearchMovie();
        break;
    case "4":
        query.Query();
        break;
    default:
        console.log("Bye!");
        break;
}