const fs = require('fs');
const spot = require('./Spotify');
const tweet = require('./Twitter');
const omdb = require('./OMDB');
var command, query;

///README

//example codes to put in random.txt
//movie#Jurassic Park
//spotify#neko te ima
//tweet#nasa

//Code can handle empty lines and mixes of commands, partial commands (tweet# OR #<song name>, and empty strings)

exports.Query = function () {
    fs.readFile("random.txt", "utf-8", function (error, data) {

        if (error)
            return console.log("File doesn't exist or has been moved");

        if (data === "")
            return console.log("File is empty!");

        //Runs commands if there are more than more
        if (data.indexOf("\n") !== -1) {
            //return console.log("Can't run more than one command at a time");
            var rowsArr = data.split('\n');
            rowsArr.forEach(row => {
                CommandRow(row);
            })
        }
        //Runs a single command
        else {
            CommandRow(data);
        }
    });
}

function CommandRow(data) {

    if (data.indexOf("#") !== -1) {
        var dataArr = data.split("#");
        command = dataArr[0];
        query = dataArr[1];
        //Check if string is command#<null> or <null>#query
        if (command === "" || query === "")
            return console.log("Invalid command, query or command can not be empty\n");
    }

    else {
        return console.log(`No command\n`);
    }

    //Search commands
    switch (command) {
        case "movie":
            omdb.QueryMovie(query);
            break;
        case "spotify":
            spot.QuerySong(query);
            break;
        case "tweet":
            tweet.QueryTweets(query);
            break;
        default:
            //Additional fail safe if <null>#query
            console.log("Error occured: command " + command + " not recognised\n");
            break;
    }
}