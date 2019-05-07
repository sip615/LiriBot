require("dotenv").config();
const keys = require("./keys.js");
// const spotifyapi = require("./API/spotify");
// const movie = require("./APIs/movie");
// const command = process.argv[2];
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//Helper function for the spotify function after it
const findArtistNames = artist => {
  return artist.name;
};
//Function for getting Spotify information
const getSpotify = songName => {
  if (songName === undefined) {
    songName = "Never Gonna Give You Up";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log(`Error Occured${err}`);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log(`artist(s)${songs[i].artists.map(findArtistNames)}`);
        console.log(`song name: ${songs[i].name}`);
        console.log(`preview song: ${songs[i].preview_url}`);
        console.log("   ");
      }
    }
  );
};
//Function for getting info from the BandsInTown API
const getMyBands = artist => {
  const queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=condingbootcamp`;

  axios.get(queryURL).then(function(response) {
    var bandsData = response.data;

    if (!bandsData.length) {
      console.log(`No results found for: ${artist}`);
      return;
    }

    console.log(`Upcoming events for ${artist}:`);

    for (var i = 0; i < bandsData.length; i++) {
      let show = bandsData[i];
      console.log(
        `${show.venue.city},${show.venue.region || show.venue.country}at${
          show.venue.name
        } ${moment(show.datetime).format("MM/DD/YYYY")}`
      );
    }
  });
};
//Function for running search at the movies API
const getAMovie = movieName => {
  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  }

  var urlHit = `http://www.omdbapi.com/?t=${movieName}&y=&plot=full&tomatoes=ture&apikey=trilogy`;

  axios.get(urlHit).then(function(response) {
    const movieData = response.data;

    console.log(`Title: ${movieData.Title}`);
    console.log(`Year: ${movieData.Year}`);
    console.log(`Rated: ${movieData.Rated}`);
    console.log(`IMDB Rating: ${movieData.imdbRating}`);
    console.log(`Country: ${movieData.Country}`);
    console.log(`Language: ${movieData.Language}`);
    console.log(`Plot: ${movieData.Plot}`);
    console.log(`Actors: ${movieData.Actors}`);
    console.log(`Tomatometer Rating: ${movieData.Ratings[1].Value}`);
  });
};

//Running commands from a text file
const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", (error, data) => {
    console.log(data);

    let dataArr = data.split(",");

    if (dataArr.length === 2) {
      choose(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      choose(dataArr[0]);
    }
  });
};
//This will determine which of the functios, defined above, is run
const choose = (caseData, functionData) => {
  switch (caseData) {
    case "concert-this":
      getMyBands(functionData);
      break;
    case "spotify-this-song":
      getSpotify(functionData);
      break;
    case "movie-this":
      getAMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Liri Don't Know");
  }
};

const runArgs = (argOne, argTwo) => {
  choose(argOne, argTwo);
};

runArgs(process.argv[2], process.argv.slice(3).join(" "));

// let s = process.argv.slice(3).join(" ");

// const getMovie = movie => {
//   axios.get(`http://img.omdbapi.com/?apikey=trilogy&t=${movie}`).then(res => {
//     console.log(res.data);
//   });
// };

// const getTweets = () => {
//   axios
//     .get("....twitterAPI")
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       return err;
//     });
// };

// const getBands = () => {
//   axios
//     .get(
//       `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
//     )
//     .then(res => {
//       res.data.forEach(e => {
//         console.log(e.venue.country);
//       });
//     })
//     .catch(err => {
//       return err;
//     });
// };

// module.exports = {
//   getBands: getBands
// };
