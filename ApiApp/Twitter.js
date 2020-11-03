var Twitter = require('twitter');
const prompt = require('prompt-sync')({ sigint: true });
const key = 'fGpaotxyTGJQcN2ae1CgbKXmB';
const secretKey = '09VLSOKQiRFT2qKqwn70NaGFhLUlD10KIxieHxF2pKZkxKsNF8';
const token = '1323671367338909702-hJKKpxRdpekZKZcdxmUOTcGny3LytR';
const secretToken = 'Whol6fgZfnI8fN9HDCxzyuQXVHrJgVZNPtuiqcQGEqVxi';

var twitterClient = new Twitter({
    consumer_key: key,
    consumer_secret: secretKey,
    access_token_key: token,
    access_token_secret: secretToken
});
//User Search
exports.SearchTweets = function () {
    console.log('Enter twitter handle?');
    var tweet = prompt();
    RequestTweets(tweet);
    (tweet !== "") ? RequestTweets(tweet) : console.log("Handle cannot be empty");
} 

//Query Search
exports.QueryTweets = function (tweet) { RequestTweets(tweet)}

//Private Search function
function RequestTweets (tweet) {
   
    twitterClient.get('statuses/user_timeline', { screen_name: tweet, count: 20 }, function (error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        }

        var result = JSON.parse(JSON.stringify(tweets))
        var count = 0;

        result.forEach(element => {
            console.log("Tweet: " + (count+1) + " :" + result[count].text) + "\n";
            count++;
        });

        console.log("\n\n");
    });
}